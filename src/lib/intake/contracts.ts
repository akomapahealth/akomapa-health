import { z } from "zod";

export const INTAKE_SCHEMA_VERSION = 1 as const;

export const intakeFormTypes = [
  "general_inquiry",
  "program_interest",
  "partnership_request",
  "get_involved",
  "donation_follow_up",
] as const;

export type IntakeFormType = (typeof intakeFormTypes)[number];

const nameSchema = z.string().trim().min(2).max(120);
const emailSchema = z.string().trim().toLowerCase().email().max(254);
const phoneSchema = z.string().trim().max(40).default("");
const sourcePathSchema = z.string().trim().max(240).default("");
const honeypotSchema = z.string().max(200).default("");
const consentSchema = z
  .boolean()
  .refine((value) => value, { message: "Consent is required." });

const commonFields = {
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  sourcePath: sourcePathSchema,
  consent: consentSchema,
  company: honeypotSchema,
};

export const generalInquirySchema = z
  .object({
    ...commonFields,
    subject: z.string().trim().min(2).max(160),
    message: z.string().trim().min(10).max(5_000),
  })
  .strict();

export const programIds = [
  "global-health-immersion-program",
  "akomapa-academy",
  "akomapa-ghltp",
  "akomapa-young-advocates",
  "akomapa-network",
  "akomapa-foods",
  "other",
] as const;

export const programInterestSchema = z
  .object({
    ...commonFields,
    programId: z.enum(programIds),
    cohortId: z.string().trim().max(100).default(""),
    affiliation: z.string().trim().max(160).default(""),
    message: z.string().trim().max(2_000).default(""),
  })
  .strict();

export const partnershipCategories = [
  "university",
  "clinical",
  "research",
  "funding",
  "community",
  "government",
  "corporate",
  "other",
] as const;

export const partnershipRequestSchema = z
  .object({
    ...commonFields,
    organization: z.string().trim().min(2).max(180),
    role: z.string().trim().max(120).default(""),
    category: z.enum(partnershipCategories),
    proposedContribution: z.string().trim().min(10).max(2_000),
    geography: z.string().trim().min(2).max(160),
    timeline: z.string().trim().min(2).max(160),
    message: z.string().trim().max(2_000).default(""),
  })
  .strict();

export const getInvolvedPathways = [
  "volunteer",
  "student_leadership",
  "faculty_mentorship",
  "research",
  "other",
] as const;

export const getInvolvedSchema = z
  .object({
    ...commonFields,
    pathway: z.enum(getInvolvedPathways),
    affiliation: z.string().trim().max(160).default(""),
    geography: z.string().trim().max(160).default(""),
    availability: z.string().trim().max(500).default(""),
    message: z.string().trim().min(10).max(2_000),
  })
  .strict();

export const donationFollowUpIntakeSchema = z
  .object({
    ...commonFields,
    flow: z.enum(["partner", "oneTime"]),
    selectedGivingLevel: z.string().trim().min(1).max(100),
  })
  .strict();

export const intakeSchemas = {
  general_inquiry: generalInquirySchema,
  program_interest: programInterestSchema,
  partnership_request: partnershipRequestSchema,
  get_involved: getInvolvedSchema,
  donation_follow_up: donationFollowUpIntakeSchema,
} satisfies Record<IntakeFormType, z.ZodTypeAny>;

export type GeneralInquiryInput = z.infer<typeof generalInquirySchema>;
export type ProgramInterestInput = z.infer<typeof programInterestSchema>;
export type PartnershipRequestInput = z.infer<typeof partnershipRequestSchema>;
export type GetInvolvedInput = z.infer<typeof getInvolvedSchema>;
export type DonationFollowUpIntakeInput = z.infer<
  typeof donationFollowUpIntakeSchema
>;

export type IntakeInputByType = {
  general_inquiry: GeneralInquiryInput;
  program_interest: ProgramInterestInput;
  partnership_request: PartnershipRequestInput;
  get_involved: GetInvolvedInput;
  donation_follow_up: DonationFollowUpIntakeInput;
};

export type IntakeRecord<T extends IntakeFormType = IntakeFormType> = {
  formType: T;
  requestId: string;
  submittedAt: string;
  schemaVersion: typeof INTAKE_SCHEMA_VERSION;
  sourcePath: string;
  data: Omit<IntakeInputByType[T], "company" | "sourcePath">;
};

export function normalizeSourcePath(value: string, fallback: string): string {
  const candidate = value.trim() || fallback;

  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(candidate, "https://intake.invalid");
    return url.origin === "https://intake.invalid" ? url.pathname : fallback;
  } catch {
    return fallback;
  }
}
