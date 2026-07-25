import { z } from "zod";

export const donationFollowUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Please keep your name under 100 characters."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, "Please enter a valid email address.")
      .email("Please enter a valid email address."),
    flow: z.enum(["partner", "oneTime"]),
    selectedGivingLevel: z
      .string()
      .trim()
      .min(1)
      .max(100, "The selected giving level is too long."),
    company: z.string().max(200).optional(),
  })
  .strict();

export type DonationFollowUpInput = z.infer<typeof donationFollowUpSchema>;
