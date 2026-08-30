import { NextRequest } from "next/server";
import type { z } from "zod";
import {
  INTAKE_SCHEMA_VERSION,
  normalizeSourcePath,
  type IntakeFormType,
  type IntakeInputByType,
  type IntakeRecord,
} from "@/lib/intake/contracts";
import { deliverIntakeRecord } from "@/lib/intake/server/deliver";
import { providerErrorCategory } from "@/lib/intake/server/errors";
import {
  createInMemoryRateLimiter,
  getRequestClientAddress,
  noStoreJson,
  readSecureJson,
} from "@/lib/http/public-api-security";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 1_000;

const intakeRateLimiter = createInMemoryRateLimiter({
  maxEntries: RATE_LIMIT_MAX_ENTRIES,
  maxRequests: RATE_LIMIT_MAX_REQUESTS,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

type IntakeRouteOptions<T extends IntakeFormType> = {
  formType: T;
  schema: z.ZodTypeAny;
  defaultSourcePath: string;
};

function getClientKey(request: NextRequest, formType: IntakeFormType) {
  return `${formType}:${getRequestClientAddress(request)}`;
}

export function createIntakePostHandler<T extends IntakeFormType>({
  formType,
  schema,
  defaultSourcePath,
}: IntakeRouteOptions<T>) {
  return async function POST(request: NextRequest) {
    const payload = await readSecureJson(request, MAX_BODY_BYTES);
    if (!payload.ok) return payload.response;

    if (intakeRateLimiter.isLimited(getClientKey(request, formType))) {
      return noStoreJson(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000) },
      );
    }

    const parsed = schema.safeParse(payload.body);
    if (!parsed.success) {
      return noStoreJson({ error: "Please check the form fields." }, 400);
    }

    const parsedData = parsed.data as IntakeInputByType[T];

    if (parsedData.company) {
      return noStoreJson({ success: true }, 200);
    }

    const data = Object.fromEntries(
      Object.entries(parsedData).filter(
        ([key]) => key !== "company" && key !== "sourcePath",
      ),
    ) as IntakeRecord<T>["data"];
    const record: IntakeRecord<T> = {
      formType,
      requestId: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      schemaVersion: INTAKE_SCHEMA_VERSION,
      sourcePath: normalizeSourcePath(parsedData.sourcePath, defaultSourcePath),
      data,
    };

    try {
      await deliverIntakeRecord(record);
      return noStoreJson(
        { success: true, requestId: record.requestId },
        200,
      );
    } catch (error) {
      const category = providerErrorCategory(error);
      console.error("Intake delivery failed", {
        requestId: record.requestId,
        formType,
        category,
      });

      return noStoreJson(
        {
          error:
            category === "misconfigured"
              ? "This form is temporarily unavailable."
              : "We could not save your request. Please try again.",
        },
        category === "misconfigured" ? 503 : 502,
      );
    }
  };
}

export function resetIntakeRateLimitForTests() {
  intakeRateLimiter.reset();
}
