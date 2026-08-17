import { z } from "zod";
import {
  INTAKE_SCHEMA_VERSION,
  type IntakeFormType,
} from "@/lib/intake/contracts";

export const INTAKE_DRAFT_TTL_MS = 30 * 24 * 60 * 60 * 1_000;

const draftEnvelopeSchema = z
  .object({
    version: z.literal(INTAKE_SCHEMA_VERSION),
    savedAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().positive(),
    data: z.unknown(),
  })
  .strict();

export type IntakeDraftResult<T> =
  | { status: "missing" | "invalid" | "expired" }
  | { status: "restored"; data: T };

export function getIntakeDraftKey(
  formType: IntakeFormType,
  contextId = "default",
): string {
  const safeContext =
    contextId.trim().replace(/[^a-zA-Z0-9_-]/g, "-") || "default";
  return `akomapa:intake:v${INTAKE_SCHEMA_VERSION}:${formType}:${safeContext}`;
}

export function serializeIntakeDraft<T>(data: T, now = Date.now()): string {
  return JSON.stringify({
    version: INTAKE_SCHEMA_VERSION,
    savedAt: now,
    expiresAt: now + INTAKE_DRAFT_TTL_MS,
    data,
  });
}

export function parseIntakeDraft<T>(
  raw: string | null,
  dataSchema: z.ZodType<T>,
  now = Date.now(),
): IntakeDraftResult<T> {
  if (!raw) return { status: "missing" };

  try {
    const envelope = draftEnvelopeSchema.safeParse(JSON.parse(raw));
    if (!envelope.success) return { status: "invalid" };
    if (envelope.data.expiresAt <= now) return { status: "expired" };

    const data = dataSchema.safeParse(envelope.data.data);
    return data.success
      ? { status: "restored", data: data.data }
      : { status: "invalid" };
  } catch {
    return { status: "invalid" };
  }
}
