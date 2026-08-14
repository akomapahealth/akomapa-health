import { NextRequest, NextResponse } from "next/server";
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

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 1_000;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitEntries = new Map<string, RateLimitEntry>();

type IntakeRouteOptions<T extends IntakeFormType> = {
  formType: T;
  schema: z.ZodTypeAny;
  defaultSourcePath: string;
};

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientKey(request: NextRequest, formType: IntakeFormType) {
  const address =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  return `${formType}:${address}`;
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimitEntries.get(clientKey);

  if (!current || current.resetAt <= now) {
    for (const [key, entry] of rateLimitEntries) {
      if (entry.resetAt <= now) rateLimitEntries.delete(key);
    }
    while (rateLimitEntries.size >= RATE_LIMIT_MAX_ENTRIES) {
      const oldestKey = rateLimitEntries.keys().next().value;
      if (typeof oldestKey !== "string") break;
      rateLimitEntries.delete(oldestKey);
    }
    rateLimitEntries.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export function createIntakePostHandler<T extends IntakeFormType>({
  formType,
  schema,
  defaultSourcePath,
}: IntakeRouteOptions<T>) {
  return async function POST(request: NextRequest) {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.startsWith("application/json")) {
      return jsonResponse({ error: "Unsupported content type" }, 415);
    }

    const origin = request.headers.get("origin");
    if (!origin || origin !== request.nextUrl.origin) {
      return jsonResponse({ error: "Request origin is not allowed" }, 403);
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413);
    }

    if (isRateLimited(getClientKey(request, formType))) {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000) },
      );
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }

    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413);
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse({ error: "Please check the form fields." }, 400);
    }

    const parsedData = parsed.data as IntakeInputByType[T];

    if (parsedData.company) {
      return jsonResponse({ success: true }, 200);
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
      return jsonResponse(
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

      return jsonResponse(
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
  rateLimitEntries.clear();
}
