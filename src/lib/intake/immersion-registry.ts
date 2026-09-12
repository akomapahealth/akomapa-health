import { z } from "zod";
import { FILLOUT_EMBED_ORIGIN } from "../../config/external-service-origins.mjs";

export { FILLOUT_EMBED_ORIGIN };

export const IMMERSION_INTAKE_ENABLE_ENV =
  "NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED" as const;
export const IMMERSION_FILLOUT_FORM_ID_ENV =
  "NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_ID" as const;
export const IMMERSION_FILLOUT_FORM_URL_ENV =
  "NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_URL" as const;

export const IMMERSION_FORM_KEY = "immersion" as const;
export const IMMERSION_FORM_TYPE = "immersion" as const;
export const IMMERSION_SCHEMA_VERSION = 1 as const;
export const IMMERSION_PROGRAM_ID =
  "global-health-immersion-program" as const;
export const IMMERSION_SOURCE_PATH =
  "/global-health-immersion-program" as const;
export const IMMERSION_DEFAULT_FALLBACK_URL = "/contact" as const;
export const immersionIntents = [
  "register_interest",
  "request_brochure",
] as const;

const approvedFieldKeys = [
  "fullName",
  "email",
  "phone",
  "affiliation",
  "message",
  "consent",
] as const;

export type IntakeFormKey = typeof IMMERSION_FORM_KEY;
export type ImmersionIntent = (typeof immersionIntents)[number];
export type IntakeFeatureStatus = "pilot";

export type ImmersionIntakeRequest = {
  formKey: IntakeFormKey;
  intent: ImmersionIntent;
};

export type IntakeFieldDefinition = {
  key:
    | "fullName"
    | "email"
    | "phone"
    | "affiliation"
    | "message"
    | "consent";
  label: string;
  kind: "text" | "email" | "tel" | "textarea" | "consent";
  required: boolean;
  minLength?: number;
  maxLength?: number;
};

export type ImmersionIntentDefinition = {
  intent: ImmersionIntent;
  title: string;
  description: string;
};

export type ImmersionIntakeDefinition = {
  key: IntakeFormKey;
  formType: typeof IMMERSION_FORM_TYPE;
  schemaVersion: typeof IMMERSION_SCHEMA_VERSION;
  status: IntakeFeatureStatus;
  sourcePath: typeof IMMERSION_SOURCE_PATH;
  programId: typeof IMMERSION_PROGRAM_ID;
  providerKey: "fillout";
  fields: readonly IntakeFieldDefinition[];
  intents: readonly ImmersionIntentDefinition[];
  privacyUrl: "/privacy";
  consentText: string;
  safetyText: string;
  resumeText: string;
  fallbackUrl: typeof IMMERSION_DEFAULT_FALLBACK_URL;
};

const fieldDefinitionSchema = z.object({
  key: z.enum([
    "fullName",
    "email",
    "phone",
    "affiliation",
    "message",
    "consent",
  ]),
  label: z.string().trim().min(1),
  kind: z.enum(["text", "email", "tel", "textarea", "consent"]),
  required: z.boolean(),
  minLength: z.number().int().positive().optional(),
  maxLength: z.number().int().positive().optional(),
});

const intentDefinitionSchema = z.object({
  intent: z.enum(immersionIntents),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

const intakeDefinitionSchema = z.object({
  key: z.literal(IMMERSION_FORM_KEY),
  formType: z.literal(IMMERSION_FORM_TYPE),
  schemaVersion: z.literal(IMMERSION_SCHEMA_VERSION),
  status: z.literal("pilot"),
  sourcePath: z.literal(IMMERSION_SOURCE_PATH),
  programId: z.literal(IMMERSION_PROGRAM_ID),
  providerKey: z.literal("fillout"),
  fields: z.array(fieldDefinitionSchema).min(1),
  intents: z.array(intentDefinitionSchema).min(1),
  privacyUrl: z.literal("/privacy"),
  consentText: z.string().trim().min(1),
  safetyText: z.string().trim().min(1),
  resumeText: z.string().trim().min(1),
  fallbackUrl: z.literal(IMMERSION_DEFAULT_FALLBACK_URL),
});

export const immersionIntakeDefinition = {
  key: IMMERSION_FORM_KEY,
  formType: IMMERSION_FORM_TYPE,
  schemaVersion: IMMERSION_SCHEMA_VERSION,
  status: "pilot",
  sourcePath: IMMERSION_SOURCE_PATH,
  programId: IMMERSION_PROGRAM_ID,
  providerKey: "fillout",
  fields: [
    {
      key: "fullName",
      label: "Full name",
      kind: "text",
      required: true,
      minLength: 2,
      maxLength: 120,
    },
    {
      key: "email",
      label: "Email address",
      kind: "email",
      required: true,
      maxLength: 254,
    },
    {
      key: "phone",
      label: "Phone number",
      kind: "tel",
      required: false,
      maxLength: 40,
    },
    {
      key: "affiliation",
      label: "School or organization",
      kind: "text",
      required: false,
      maxLength: 160,
    },
    {
      key: "message",
      label: "Message",
      kind: "textarea",
      required: false,
      maxLength: 2_000,
    },
    {
      key: "consent",
      label: "Consent",
      kind: "consent",
      required: true,
    },
  ],
  intents: [
    {
      intent: "register_interest",
      title: "Register your interest",
      description:
        "Share your details so the program team can follow up when confirmed dates and next steps are available.",
    },
    {
      intent: "request_brochure",
      title: "Request the program brochure",
      description:
        "Share your details and the program team will send the latest approved Immersion Program information.",
    },
  ],
  privacyUrl: "/privacy",
  consentText:
    "I consent to Akomapa using these details to respond to this request, as described in the privacy notice.",
  safetyText:
    "Do not submit medical details, urgent medical requests, payment or financial account data, government IDs, or files. For an emergency, contact local emergency services.",
  resumeText:
    "Your progress is saved by Fillout on this device. You can resume only in the same non-private browser and device.",
  fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
} as const satisfies ImmersionIntakeDefinition;

export function defineIntakeRegistry(
  definitions: readonly ImmersionIntakeDefinition[],
): ReadonlyMap<IntakeFormKey, ImmersionIntakeDefinition> {
  const registry = new Map<IntakeFormKey, ImmersionIntakeDefinition>();

  for (const candidate of definitions) {
    const definition = intakeDefinitionSchema.parse(candidate);
    if (registry.has(definition.key)) {
      throw new Error(`Duplicate intake form key: ${definition.key}`);
    }

    const intentKeys = new Set<ImmersionIntent>();
    for (const intent of definition.intents) {
      if (intentKeys.has(intent.intent)) {
        throw new Error(
          `Duplicate intake intent for ${definition.key}: ${intent.intent}`,
        );
      }
      intentKeys.add(intent.intent);
    }
    if (
      intentKeys.size !== immersionIntents.length ||
      immersionIntents.some((intent) => !intentKeys.has(intent))
    ) {
      throw new Error(`Incomplete intake intents for ${definition.key}`);
    }

    const fieldKeys = new Set<string>();
    for (const field of definition.fields) {
      if (fieldKeys.has(field.key)) {
        throw new Error(
          `Duplicate intake field for ${definition.key}: ${field.key}`,
        );
      }
      fieldKeys.add(field.key);
    }
    if (
      fieldKeys.size !== approvedFieldKeys.length ||
      approvedFieldKeys.some((field) => !fieldKeys.has(field))
    ) {
      throw new Error(`Incomplete intake fields for ${definition.key}`);
    }

    const requiredFields = new Set(
      definition.fields.filter(({ required }) => required).map(({ key }) => key),
    );
    if (
      requiredFields.size !== 3 ||
      !requiredFields.has("fullName") ||
      !requiredFields.has("email") ||
      !requiredFields.has("consent")
    ) {
      throw new Error(`Invalid required fields for ${definition.key}`);
    }

    registry.set(definition.key, definition as ImmersionIntakeDefinition);
  }

  return registry;
}

export const intakeFormRegistry = defineIntakeRegistry([
  immersionIntakeDefinition,
]);

export type ImmersionClientEnv = Readonly<
  Partial<
    Record<
      | typeof IMMERSION_INTAKE_ENABLE_ENV
      | typeof IMMERSION_FILLOUT_FORM_ID_ENV
      | typeof IMMERSION_FILLOUT_FORM_URL_ENV,
      string
    >
  >
>;

export type ImmersionProviderErrorCategory =
  | "invalid_feature_flag"
  | "missing_form_id"
  | "invalid_form_id"
  | "missing_form_url"
  | "invalid_form_url"
  | "form_url_mismatch";

export type ImmersionProviderConfiguration =
  | {
      state: "enabled";
      filloutId: string;
      hostedFormUrl: string;
      fallbackUrl: string;
    }
  | {
      state: "disabled";
      filloutId: string | null;
      hostedFormUrl: string | null;
      fallbackUrl: string;
    }
  | {
      state: "missing_configuration";
      category: ImmersionProviderErrorCategory;
      fallbackUrl: string;
    };

function getPublicClientEnv(): ImmersionClientEnv {
  return {
    [IMMERSION_INTAKE_ENABLE_ENV]:
      process.env.NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED,
    [IMMERSION_FILLOUT_FORM_ID_ENV]:
      process.env.NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_ID,
    [IMMERSION_FILLOUT_FORM_URL_ENV]:
      process.env.NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_URL,
  };
}

function isValidFilloutId(value: string): boolean {
  return /^[A-Za-z0-9_-]{6,80}$/.test(value);
}

function parseHostedFormUrl(
  value: string,
): { url: string; filloutId: string } | null {
  try {
    const url = new URL(value);
    const pathMatch = url.pathname.match(/^\/t\/([A-Za-z0-9_-]{6,80})\/?$/);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "forms.fillout.com" ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !pathMatch
    ) {
      return null;
    }

    return {
      url: `https://forms.fillout.com/t/${pathMatch[1]}`,
      filloutId: pathMatch[1],
    };
  } catch {
    return null;
  }
}

export function getImmersionProviderConfiguration(
  env: ImmersionClientEnv = getPublicClientEnv(),
): ImmersionProviderConfiguration {
  const flag = env[IMMERSION_INTAKE_ENABLE_ENV];
  const filloutId = env[IMMERSION_FILLOUT_FORM_ID_ENV]?.trim() ?? "";
  const hostedFormUrl = env[IMMERSION_FILLOUT_FORM_URL_ENV]?.trim() ?? "";
  const parsedHostedUrl = hostedFormUrl
    ? parseHostedFormUrl(hostedFormUrl)
    : null;

  if (flag !== undefined && flag !== "true" && flag !== "false") {
    return {
      state: "missing_configuration",
      category: "invalid_feature_flag",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }

  if (flag !== "true") {
    const hasMatchingHostedFallback =
      isValidFilloutId(filloutId) && parsedHostedUrl?.filloutId === filloutId;
    return {
      state: "disabled",
      filloutId: isValidFilloutId(filloutId) ? filloutId : null,
      hostedFormUrl: hasMatchingHostedFallback ? parsedHostedUrl.url : null,
      fallbackUrl:
        (hasMatchingHostedFallback && parsedHostedUrl.url) ||
        IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }

  if (!filloutId) {
    return {
      state: "missing_configuration",
      category: "missing_form_id",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }
  if (!isValidFilloutId(filloutId)) {
    return {
      state: "missing_configuration",
      category: "invalid_form_id",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }
  if (!hostedFormUrl) {
    return {
      state: "missing_configuration",
      category: "missing_form_url",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }
  if (!parsedHostedUrl) {
    return {
      state: "missing_configuration",
      category: "invalid_form_url",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }
  if (parsedHostedUrl.filloutId !== filloutId) {
    return {
      state: "missing_configuration",
      category: "form_url_mismatch",
      fallbackUrl: IMMERSION_DEFAULT_FALLBACK_URL,
    };
  }

  return {
    state: "enabled",
    filloutId,
    hostedFormUrl: parsedHostedUrl.url,
    fallbackUrl: parsedHostedUrl.url,
  };
}

export type ResolvedImmersionIntake = {
  definition: ImmersionIntakeDefinition;
  intent: ImmersionIntentDefinition;
  provider: ImmersionProviderConfiguration;
};

export type IntakeResolution =
  | { ok: true; value: ResolvedImmersionIntake }
  | { ok: false; reason: "unknown_form" | "unsupported_intent" };

export function resolveImmersionIntake(
  request: Readonly<{ formKey?: unknown; intent?: unknown }>,
  env?: ImmersionClientEnv,
): IntakeResolution {
  if (request.formKey !== IMMERSION_FORM_KEY) {
    return { ok: false, reason: "unknown_form" };
  }

  const definition = intakeFormRegistry.get(request.formKey);
  const intent = definition?.intents.find(
    (candidate) => candidate.intent === request.intent,
  );
  if (!definition || !intent) {
    return { ok: false, reason: "unsupported_intent" };
  }

  return {
    ok: true,
    value: {
      definition,
      intent,
      provider: getImmersionProviderConfiguration(env),
    },
  };
}

export type FilloutContext = Readonly<{
  formType: typeof IMMERSION_FORM_TYPE;
  intent: ImmersionIntent;
  schemaVersion: `${typeof IMMERSION_SCHEMA_VERSION}`;
  sourcePath: typeof IMMERSION_SOURCE_PATH;
  programId: typeof IMMERSION_PROGRAM_ID;
}>;

export function buildFilloutContext(
  resolved: Pick<ResolvedImmersionIntake, "definition" | "intent">,
): FilloutContext {
  return {
    formType: resolved.definition.formType,
    intent: resolved.intent.intent,
    schemaVersion: String(
      resolved.definition.schemaVersion,
    ) as FilloutContext["schemaVersion"],
    sourcePath: resolved.definition.sourcePath,
    programId: resolved.definition.programId,
  };
}
