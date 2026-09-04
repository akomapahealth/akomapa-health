import { describe, expect, it } from "vitest";
import {
  buildFilloutContext,
  defineIntakeRegistry,
  getImmersionProviderConfiguration,
  immersionIntakeDefinition,
  resolveImmersionIntake,
  IMMERSION_FILLOUT_FORM_ID_ENV,
  IMMERSION_FILLOUT_FORM_URL_ENV,
  IMMERSION_INTAKE_ENABLE_ENV,
} from "@/lib/intake/immersion-registry";

const enabledEnv = {
  [IMMERSION_INTAKE_ENABLE_ENV]: "true",
  [IMMERSION_FILLOUT_FORM_ID_ENV]: "abc123Example",
  [IMMERSION_FILLOUT_FORM_URL_ENV]:
    "https://forms.fillout.com/t/abc123Example",
} as const;

describe("Immersion intake registry", () => {
  it("defines one approved form with two explicit intents", () => {
    expect(immersionIntakeDefinition).toMatchObject({
      key: "immersion",
      formType: "immersion",
      schemaVersion: 1,
      status: "pilot",
      sourcePath: "/global-health-immersion-program",
      programId: "global-health-immersion-program",
      providerKey: "fillout",
      privacyUrl: "/privacy",
      fallbackUrl: "/contact",
    });
    expect(
      immersionIntakeDefinition.intents.map(({ intent }) => intent),
    ).toEqual(["register_interest", "request_brochure"]);
    expect(
      immersionIntakeDefinition.fields.map(({ key }) => key),
    ).toEqual([
      "fullName",
      "email",
      "phone",
      "affiliation",
      "message",
      "consent",
    ]);
    expect(
      immersionIntakeDefinition.fields.find(({ key }) => key === "consent"),
    ).toMatchObject({ required: true, kind: "consent" });
  });

  it("rejects duplicate form keys, intent values, and field keys", () => {
    expect(() =>
      defineIntakeRegistry([
        immersionIntakeDefinition,
        immersionIntakeDefinition,
      ]),
    ).toThrow("Duplicate intake form key");

    expect(() =>
      defineIntakeRegistry([
        {
          ...immersionIntakeDefinition,
          intents: [
            ...immersionIntakeDefinition.intents,
            immersionIntakeDefinition.intents[0],
          ],
        },
      ]),
    ).toThrow("Duplicate intake intent");

    expect(() =>
      defineIntakeRegistry([
        {
          ...immersionIntakeDefinition,
          fields: [
            ...immersionIntakeDefinition.fields,
            immersionIntakeDefinition.fields[0],
          ],
        },
      ]),
    ).toThrow("Duplicate intake field");
  });

  it("rejects incomplete intent, field, and required-field contracts", () => {
    expect(() =>
      defineIntakeRegistry([
        {
          ...immersionIntakeDefinition,
          intents: immersionIntakeDefinition.intents.slice(0, 1),
        },
      ]),
    ).toThrow("Incomplete intake intents");

    expect(() =>
      defineIntakeRegistry([
        {
          ...immersionIntakeDefinition,
          fields: immersionIntakeDefinition.fields.slice(0, -1),
        },
      ]),
    ).toThrow("Incomplete intake fields");

    expect(() =>
      defineIntakeRegistry([
        {
          ...immersionIntakeDefinition,
          fields: immersionIntakeDefinition.fields.map((field) =>
            field.key === "consent" ? { ...field, required: false } : field,
          ),
        },
      ]),
    ).toThrow("Invalid required fields");
  });

  it("fails safely for unknown form and intent values", () => {
    expect(resolveImmersionIntake({ formKey: "unknown", intent: "x" })).toEqual(
      { ok: false, reason: "unknown_form" },
    );
    expect(
      resolveImmersionIntake({ formKey: "immersion", intent: "application" }),
    ).toEqual({ ok: false, reason: "unsupported_intent" });
  });

  it("builds only the five allow-listed provider parameters", () => {
    const resolved = resolveImmersionIntake(
      { formKey: "immersion", intent: "request_brochure" },
      enabledEnv,
    );
    expect(resolved.ok).toBe(true);
    if (!resolved.ok) return;

    expect(buildFilloutContext(resolved.value)).toEqual({
      formType: "immersion",
      intent: "request_brochure",
      schemaVersion: "1",
      sourcePath: "/global-health-immersion-program",
      programId: "global-health-immersion-program",
    });
    expect(buildFilloutContext(resolved.value)).not.toHaveProperty("email");
    expect(buildFilloutContext(resolved.value)).not.toHaveProperty("campaign");
  });
});

describe("Immersion provider configuration", () => {
  it("defaults to a disabled contact fallback", () => {
    expect(getImmersionProviderConfiguration({})).toEqual({
      state: "disabled",
      filloutId: null,
      hostedFormUrl: null,
      fallbackUrl: "/contact",
    });
  });

  it("uses a verified hosted form as fallback while disabled", () => {
    expect(
      getImmersionProviderConfiguration({
        ...enabledEnv,
        [IMMERSION_INTAKE_ENABLE_ENV]: "false",
      }),
    ).toEqual({
      state: "disabled",
      filloutId: "abc123Example",
      hostedFormUrl: "https://forms.fillout.com/t/abc123Example",
      fallbackUrl: "https://forms.fillout.com/t/abc123Example",
    });
  });

  it("uses contact when a disabled hosted fallback is incomplete or mismatched", () => {
    expect(
      getImmersionProviderConfiguration({
        ...enabledEnv,
        [IMMERSION_INTAKE_ENABLE_ENV]: "false",
        [IMMERSION_FILLOUT_FORM_URL_ENV]:
          "https://forms.fillout.com/t/different123",
      }),
    ).toMatchObject({
      state: "disabled",
      hostedFormUrl: null,
      fallbackUrl: "/contact",
    });
  });

  it("enables only an exact matching Fillout ID and hosted URL", () => {
    expect(getImmersionProviderConfiguration(enabledEnv)).toEqual({
      state: "enabled",
      filloutId: "abc123Example",
      hostedFormUrl: "https://forms.fillout.com/t/abc123Example",
      fallbackUrl: "https://forms.fillout.com/t/abc123Example",
    });
  });

  it.each([
    [
      { ...enabledEnv, [IMMERSION_INTAKE_ENABLE_ENV]: "TRUE" },
      "invalid_feature_flag",
    ],
    [
      { ...enabledEnv, [IMMERSION_FILLOUT_FORM_ID_ENV]: "" },
      "missing_form_id",
    ],
    [
      { ...enabledEnv, [IMMERSION_FILLOUT_FORM_ID_ENV]: "bad id" },
      "invalid_form_id",
    ],
    [
      { ...enabledEnv, [IMMERSION_FILLOUT_FORM_URL_ENV]: "" },
      "missing_form_url",
    ],
    [
      {
        ...enabledEnv,
        [IMMERSION_FILLOUT_FORM_URL_ENV]:
          "https://example.com/t/abc123Example",
      },
      "invalid_form_url",
    ],
    [
      {
        ...enabledEnv,
        [IMMERSION_FILLOUT_FORM_URL_ENV]:
          "https://forms.fillout.com/t/different123",
      },
      "form_url_mismatch",
    ],
  ])("fails closed for invalid public configuration %#", (env, category) => {
    expect(getImmersionProviderConfiguration(env)).toEqual({
      state: "missing_configuration",
      category,
      fallbackUrl: "/contact",
    });
  });
});
