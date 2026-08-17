import { describe, expect, it } from "vitest";
import {
  donationFollowUpIntakeSchema,
  generalInquirySchema,
  getInvolvedSchema,
  normalizeSourcePath,
  partnershipRequestSchema,
  programInterestSchema,
} from "@/lib/intake/contracts";

const common = {
  name: "  Ama Mensah  ",
  email: " AMA@EXAMPLE.COM ",
  phone: "+233 50 123 4567",
  sourcePath: "/programs?campaign=private",
  consent: true as const,
  company: "",
};

describe("intake contracts", () => {
  it("normalizes general inquiries and rejects unknown fields", () => {
    const result = generalInquirySchema.parse({
      ...common,
      subject: "  Program question  ",
      message: "I would like to learn more about the program.",
    });

    expect(result.name).toBe("Ama Mensah");
    expect(result.email).toBe("ama@example.com");
    expect(result.subject).toBe("Program question");
    expect(() =>
      generalInquirySchema.parse({ ...result, unexpected: "field" }),
    ).toThrow();
  });

  it("requires explicit consent for every form", () => {
    expect(
      generalInquirySchema.safeParse({
        ...common,
        consent: false,
        subject: "Question",
        message: "This message is long enough.",
      }).success,
    ).toBe(false);
  });

  it("validates program, partnership, get-involved, and donation enums", () => {
    expect(
      programInterestSchema.safeParse({
        ...common,
        programId: "global-health-immersion-program",
      }).success,
    ).toBe(true);
    expect(
      partnershipRequestSchema.safeParse({
        ...common,
        organization: "University of Ghana",
        category: "university",
        proposedContribution: "Clinical mentorship and teaching support.",
        geography: "Accra, Ghana",
        timeline: "2027 academic year",
      }).success,
    ).toBe(true);
    expect(
      getInvolvedSchema.safeParse({
        ...common,
        pathway: "student_leadership",
        message: "I can support the student leadership program.",
      }).success,
    ).toBe(true);
    expect(
      donationFollowUpIntakeSchema.safeParse({
        ...common,
        flow: "oneTime",
        selectedGivingLevel: "$25 one time",
      }).success,
    ).toBe(true);
    expect(
      programInterestSchema.safeParse({ ...common, programId: "unknown" })
        .success,
    ).toBe(false);
  });

  it("enforces message bounds before provider delivery", () => {
    expect(
      getInvolvedSchema.safeParse({
        ...common,
        pathway: "volunteer",
        message: "short",
      }).success,
    ).toBe(false);
    expect(
      generalInquirySchema.safeParse({
        ...common,
        subject: "Question",
        message: "A".repeat(5_001),
      }).success,
    ).toBe(false);
  });
});

describe("normalizeSourcePath", () => {
  it("keeps only a safe same-site pathname", () => {
    expect(normalizeSourcePath("/programs?email=ama@example.com", "/")).toBe(
      "/programs",
    );
    expect(normalizeSourcePath("https://example.com/private", "/contact")).toBe(
      "/contact",
    );
    expect(normalizeSourcePath("//example.com/private", "/contact")).toBe(
      "/contact",
    );
  });
});
