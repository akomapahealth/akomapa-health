import { describe, expect, it } from "vitest";
import { getContactIntent } from "@/lib/contact-intents";

describe("contact intents", () => {
  it("returns allow-listed Immersion inquiry details", () => {
    expect(getContactIntent("immersion")).toEqual({
      subject: "Global Health Immersion Program Interest",
      partnershipType: "General Inquiry",
      message:
        "I'm interested in the Akomapa Global Health Immersion Program. Please notify me when the next cohort details are available.",
    });
    expect(getContactIntent("immersion-brochure")).toEqual(
      expect.objectContaining({
        subject: "Global Health Immersion Program Brochure Request",
        partnershipType: "General Inquiry",
      }),
    );
  });

  it("rejects unknown and missing intent values", () => {
    expect(getContactIntent(null)).toBeNull();
    expect(getContactIntent("not-allowed")).toBeNull();
    expect(getContactIntent("__proto__")).toBeNull();
  });
});
