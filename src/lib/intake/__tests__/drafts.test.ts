import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  getIntakeDraftKey,
  INTAKE_DRAFT_TTL_MS,
  parseIntakeDraft,
  serializeIntakeDraft,
} from "@/lib/intake/drafts";

const schema = z
  .object({ name: z.string().max(120), message: z.string().max(500) })
  .strict();

describe("intake drafts", () => {
  it("uses versioned, form-specific, sanitized keys", () => {
    expect(getIntakeDraftKey("program_interest", "cohort 2027/alpha")).toBe(
      "akomapa:intake:v1:program_interest:cohort-2027-alpha",
    );
  });

  it("round-trips a schema-valid draft before expiry", () => {
    const raw = serializeIntakeDraft({ name: "Ama", message: "Hello" }, 1_000);
    expect(
      parseIntakeDraft(raw, schema, 1_000 + INTAKE_DRAFT_TTL_MS - 1),
    ).toEqual({ status: "restored", data: { name: "Ama", message: "Hello" } });
  });

  it("rejects expired, corrupt, wrong-version, and schema-invalid values", () => {
    const raw = serializeIntakeDraft({ name: "Ama", message: "Hello" }, 1_000);
    expect(parseIntakeDraft(raw, schema, 1_000 + INTAKE_DRAFT_TTL_MS)).toEqual({
      status: "expired",
    });
    expect(parseIntakeDraft("not-json", schema)).toEqual({ status: "invalid" });
    expect(
      parseIntakeDraft(
        JSON.stringify({
          version: 999,
          savedAt: 1,
          expiresAt: Date.now() + 1_000,
          data: {},
        }),
        schema,
      ),
    ).toEqual({ status: "invalid" });
    expect(
      parseIntakeDraft(
        serializeIntakeDraft({ name: "Ama", consent: true }),
        schema,
      ),
    ).toEqual({ status: "invalid" });
  });
});
