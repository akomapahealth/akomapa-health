import { z } from "zod";

const optionalShortText = z.string().trim().max(120).default("");

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: optionalShortText,
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(5_000),
  partnershipType: optionalShortText,
  company: optionalShortText,
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
