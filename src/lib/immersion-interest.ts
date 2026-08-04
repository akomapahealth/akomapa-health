import { z } from "zod";

export const IMMERSION_SIGNUP_SOURCE = "immersion-program-page" as const;

export const IMMERSION_INTEREST_AS_OPTIONS = [
  {
    value: "undergraduate_premed",
    label: "Undergraduate or pre-medical student",
  },
  {
    value: "health_professional_student",
    label: "Health professional student",
  },
  {
    value: "graduate_early_career",
    label: "Graduate student or early-career professional",
  },
  {
    value: "faculty_advisor",
    label: "Faculty member or advisor",
  },
  {
    value: "other",
    label: "Other",
  },
] as const;

export type ImmersionInterestAs =
  (typeof IMMERSION_INTEREST_AS_OPTIONS)[number]["value"];

const interestAsValues = IMMERSION_INTEREST_AS_OPTIONS.map(
  (option) => option.value,
) as [ImmersionInterestAs, ...ImmersionInterestAs[]];

export const immersionInterestSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "Enter your first name.")
      .max(50, "Please keep your first name under 50 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email address.")
      .toLowerCase()
      .max(254, "Enter a valid email address.")
      .email("Enter a valid email address."),
    interestAs: z.union([z.enum(interestAsValues), z.literal("")]).optional(),
    consent: z
      .boolean({
        required_error:
          "Please confirm that we may email you about the Immersion Program.",
        invalid_type_error:
          "Please confirm that we may email you about the Immersion Program.",
      })
      .refine((value) => value === true, {
        message:
          "Please confirm that we may email you about the Immersion Program.",
      }),
    company: z.string().max(200).optional(),
  })
  .strict();

export type ImmersionInterestInput = z.infer<typeof immersionInterestSchema>;

export function normalizeImmersionInterestAs(
  value: ImmersionInterestInput["interestAs"],
): ImmersionInterestAs | undefined {
  if (!value) {
    return undefined;
  }
  return value;
}

export type ImmersionInterestOutcome =
  | "pending_confirmation"
  | "already_registered"
  | "suppressed";

export const IMMERSION_CONTACT_FALLBACK_HREF = "/contact?type=immersion";

export const IMMERSION_INTEREST_COPY = {
  section: {
    eyebrow: "Applications currently closed",
    heading: "Be first to know when the next cohort opens.",
    body: "Dates, fees, and application details are still being finalized. Join the Immersion Program alert list and we’ll let you know when applications open and important cohort updates are published.",
    cta: "Notify me when applications open",
    reassurance: "Program-specific updates only. Unsubscribe at any time.",
  },
  modal: {
    title: "Get Immersion Program alerts",
    description:
      "Tell us where to send updates. We’ll contact you when applications open and when confirmed dates, fees, or deadlines are announced.",
    submit: "Send me application alerts",
    close: "Not now",
    loading: "Saving your alert…",
  },
  success: {
    heading: "One more step—check your inbox.",
    bodyPrefix: "We sent a confirmation link to",
    bodySuffix:
      "Confirm your email to receive Immersion Program application alerts.",
    secondary:
      "Didn’t receive it? Check your spam folder or try another email address.",
    done: "Done",
  },
  alreadyRegistered: {
    heading: "You’re already on the list.",
    bodyPrefix: "We already have",
    bodySuffix:
      "registered for Immersion Program alerts. We’ll be in touch when applications open.",
    done: "Done",
  },
  errors: {
    offline:
      "You appear to be offline. Check your connection and try again.",
    rateLimited:
      "Too many attempts. Please wait a few minutes and try again.",
    serviceUnavailable:
      "We couldn’t save your alert right now. Please try again shortly.",
    unexpected:
      "Something went wrong while saving your alert. Please try again.",
    persistentFallback:
      "Still having trouble? Contact us about the Immersion Program.",
  },
} as const;

export function getImmersionInterestErrorMessage(
  status: number | null,
  options: { offline?: boolean } = {},
) {
  if (options.offline || status === null) {
    return IMMERSION_INTEREST_COPY.errors.offline;
  }

  if (status === 429) {
    return IMMERSION_INTEREST_COPY.errors.rateLimited;
  }

  if (status === 502 || status === 503) {
    return IMMERSION_INTEREST_COPY.errors.serviceUnavailable;
  }

  return IMMERSION_INTEREST_COPY.errors.unexpected;
}
