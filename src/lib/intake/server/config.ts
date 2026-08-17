import { z } from "zod";
import type { IntakeFormType } from "@/lib/intake/contracts";
import { intakeFormTypes } from "@/lib/intake/contracts";
import { IntakeProviderError } from "@/lib/intake/server/errors";

const identifierSchema = z.string().trim().min(1).max(200);

const formConfigSchema = z.object({
  formId: identifierSchema,
  fields: z.record(identifierSchema),
});

const filloutConfigSchema = z.object(
  Object.fromEntries(
    intakeFormTypes.map((formType) => [formType, formConfigSchema]),
  ) as Record<IntakeFormType, typeof formConfigSchema>,
);

const emailSchema = z.string().trim().email().max(254);
const senderSchema = z
  .string()
  .trim()
  .min(3)
  .max(320)
  .refine((value) => !/[\r\n]/.test(value));

export function getFilloutConfig(formType: IntakeFormType) {
  const apiKey = process.env.FILLOUT_API_KEY?.trim();
  const rawConfig = process.env.FILLOUT_FORM_CONFIG;

  if (!apiKey || !rawConfig) {
    throw new IntakeProviderError(
      "misconfigured",
      "Fillout intake configuration is unavailable",
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawConfig);
  } catch (error) {
    throw new IntakeProviderError(
      "misconfigured",
      "Fillout form mapping is not valid JSON",
      { cause: error },
    );
  }

  const parsed = filloutConfigSchema.safeParse(parsedJson);
  if (!parsed.success) {
    throw new IntakeProviderError(
      "misconfigured",
      "Fillout form mapping does not match the intake contract",
    );
  }

  return { apiKey, form: parsed.data[formType] };
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = senderSchema.safeParse(process.env.FORM_NOTIFICATION_FROM);
  const to = emailSchema.safeParse(process.env.FORM_NOTIFICATION_TO?.trim());

  if (!apiKey || !from.success || !to.success) {
    throw new IntakeProviderError(
      "misconfigured",
      "Resend notification configuration is unavailable",
    );
  }

  return { apiKey, from: from.data, to: to.data };
}
