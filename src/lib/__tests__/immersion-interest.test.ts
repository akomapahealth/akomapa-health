import { describe, expect, it } from "vitest";
import {
  getImmersionInterestErrorMessage,
  immersionInterestSchema,
  IMMERSION_INTEREST_COPY,
} from "@/lib/immersion-interest";

describe("immersionInterestSchema", () => {
  it("accepts a valid short alert signup payload", () => {
    const parsed = immersionInterestSchema.safeParse({
      firstName: "  Ama  ",
      email: "Ama@Example.com",
      interestAs: "undergraduate_premed",
      consent: true,
      company: "",
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      return;
    }

    expect(parsed.data).toEqual({
      firstName: "Ama",
      email: "ama@example.com",
      interestAs: "undergraduate_premed",
      consent: true,
      company: "",
    });
  });

  it("uses the approved validation messages", () => {
    const empty = immersionInterestSchema.safeParse({
      firstName: "",
      email: "",
      consent: false,
    });

    expect(empty.success).toBe(false);
    if (empty.success) {
      return;
    }

    const messages = empty.error.issues.map((issue) => issue.message);
    expect(messages).toContain("Enter your first name.");
    expect(messages).toContain("Enter your email address.");
    expect(messages).toContain(
      "Please confirm that we may email you about the Immersion Program.",
    );
  });

  it("rejects invalid email addresses with the approved copy", () => {
    const parsed = immersionInterestSchema.safeParse({
      firstName: "Ama",
      email: "not-an-email",
      consent: true,
    });

    expect(parsed.success).toBe(false);
    if (parsed.success) {
      return;
    }

    expect(parsed.error.issues[0]?.message).toBe(
      "Enter a valid email address.",
    );
  });
});

describe("getImmersionInterestErrorMessage", () => {
  it("maps offline and status codes to approved copy", () => {
    expect(getImmersionInterestErrorMessage(null, { offline: true })).toBe(
      IMMERSION_INTEREST_COPY.errors.offline,
    );
    expect(getImmersionInterestErrorMessage(429)).toBe(
      IMMERSION_INTEREST_COPY.errors.rateLimited,
    );
    expect(getImmersionInterestErrorMessage(503)).toBe(
      IMMERSION_INTEREST_COPY.errors.serviceUnavailable,
    );
    expect(getImmersionInterestErrorMessage(500)).toBe(
      IMMERSION_INTEREST_COPY.errors.unexpected,
    );
  });
});
