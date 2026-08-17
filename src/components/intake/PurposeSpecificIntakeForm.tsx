"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  DraftRestoredNotice,
  IntakeConsentText,
  IntakeSafetyNotice,
} from "@/components/intake/IntakeFormSupport";
import {
  editorialFieldClassName,
  editorialLabelClassName,
  editorialPrimaryButtonClassName,
  editorialSelectTriggerClassName,
  editorialTextareaClassName,
} from "@/components/shared/editorialFormStyles";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIntakeDraft } from "@/hooks/useIntakeDraft";
import {
  getInvolvedPathways,
  getInvolvedSchema,
  partnershipCategories,
  partnershipRequestSchema,
  programIds,
  programInterestSchema,
} from "@/lib/intake/contracts";
import { cn } from "@/lib/utils";

export type PurposeSpecificRequest =
  | {
      formType: "program_interest";
      programId?: (typeof programIds)[number];
      cohortId?: string;
      contextId?: string;
    }
  | {
      formType: "partnership_request";
      category?: (typeof partnershipCategories)[number];
      contextId?: string;
    }
  | {
      formType: "get_involved";
      pathway?: (typeof getInvolvedPathways)[number];
      contextId?: string;
    };

type Field = {
  name: string;
  label: string;
  kind?: "text" | "email" | "tel" | "textarea" | "select";
  optional?: boolean;
  maxLength?: number;
  options?: readonly { value: string; label: string }[];
};

const programOptions = [
  ["global-health-immersion-program", "Global Health Immersion Program"],
  ["akomapa-academy", "Akomapa Academy"],
  ["akomapa-ghltp", "Global Health Leadership Training Program"],
  ["akomapa-young-advocates", "Young Advocates"],
  ["akomapa-network", "Akomapa Network"],
  ["akomapa-foods", "Akomapa Foods"],
  ["other", "Another program"],
] as const;
const partnershipOptions = [
  ["university", "University"],
  ["clinical", "Clinical"],
  ["research", "Research"],
  ["funding", "Funding"],
  ["community", "Community"],
  ["government", "Government"],
  ["corporate", "Corporate"],
  ["other", "Other"],
] as const;
const pathwayOptions = [
  ["volunteer", "Volunteer"],
  ["student_leadership", "Student leadership"],
  ["faculty_mentorship", "Faculty mentorship"],
  ["research", "Research"],
  ["other", "Other"],
] as const;
const options = (items: readonly (readonly [string, string])[]) =>
  items.map(([value, label]) => ({ value, label }));

const commonFields: Field[] = [
  { name: "name", label: "Full name" },
  { name: "email", label: "Email address", kind: "email" },
  { name: "phone", label: "Phone number", kind: "tel", optional: true },
];
const fieldSets: Record<PurposeSpecificRequest["formType"], Field[]> = {
  program_interest: [
    ...commonFields,
    {
      name: "programId",
      label: "Program",
      kind: "select",
      options: options(programOptions),
    },
    { name: "cohortId", label: "Cohort", optional: true },
    { name: "affiliation", label: "School or organization", optional: true },
    {
      name: "message",
      label: "Anything else we should know?",
      kind: "textarea",
      optional: true,
      maxLength: 2_000,
    },
  ],
  partnership_request: [
    ...commonFields,
    { name: "organization", label: "Organization" },
    { name: "role", label: "Your role", optional: true },
    {
      name: "category",
      label: "Partnership category",
      kind: "select",
      options: options(partnershipOptions),
    },
    {
      name: "proposedContribution",
      label: "Proposed contribution or collaboration",
      kind: "textarea",
      maxLength: 2_000,
    },
    { name: "geography", label: "Geography" },
    { name: "timeline", label: "Proposed timeline" },
    {
      name: "message",
      label: "Additional context",
      kind: "textarea",
      optional: true,
      maxLength: 2_000,
    },
  ],
  get_involved: [
    ...commonFields,
    {
      name: "pathway",
      label: "How would you like to get involved?",
      kind: "select",
      options: options(pathwayOptions),
    },
    { name: "affiliation", label: "School or organization", optional: true },
    { name: "geography", label: "Location", optional: true },
    {
      name: "availability",
      label: "Availability or experience",
      kind: "textarea",
      optional: true,
      maxLength: 500,
    },
    {
      name: "message",
      label: "Tell us about your interest",
      kind: "textarea",
      maxLength: 2_000,
    },
  ],
};

const schemas = {
  program_interest: programInterestSchema,
  partnership_request: partnershipRequestSchema,
  get_involved: getInvolvedSchema,
} as const;
const draftSchemas = {
  program_interest: programInterestSchema
    .omit({ consent: true, company: true, sourcePath: true })
    .partial(),
  partnership_request: partnershipRequestSchema
    .omit({ consent: true, company: true, sourcePath: true })
    .partial(),
  get_involved: getInvolvedSchema
    .omit({ consent: true, company: true, sourcePath: true })
    .partial(),
} satisfies Record<
  PurposeSpecificRequest["formType"],
  z.ZodType<Record<string, unknown>>
>;
const routes = {
  program_interest: "/api/intake/program-interest",
  partnership_request: "/api/intake/partnership",
  get_involved: "/api/intake/get-involved",
} as const;

function initialValues(
  request: PurposeSpecificRequest,
): Record<string, string> {
  const values = Object.fromEntries(
    fieldSets[request.formType].map((field) => [field.name, ""]),
  );
  if (request.formType === "program_interest") {
    values.programId = request.programId ?? "";
    values.cohortId = request.cohortId ?? "";
  }
  if (request.formType === "partnership_request")
    values.category = request.category ?? "";
  if (request.formType === "get_involved")
    values.pathway = request.pathway ?? "";
  return values;
}

export default function PurposeSpecificIntakeForm({
  request,
  onDone,
}: {
  request: PurposeSpecificRequest;
  onDone: () => void;
}) {
  const defaults = useMemo(() => initialValues(request), [request]);
  const [values, setValues] = useState(defaults);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const restore = useCallback(
    (draft: Record<string, unknown>) =>
      setValues((current) => ({
        ...current,
        ...Object.fromEntries(
          Object.entries(draft).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        ),
      })),
    [],
  );
  const isEmpty = useCallback(
    (draft: Record<string, string>) =>
      !Object.values(draft).some((value) => value.trim()),
    [],
  );
  const { wasRestored, clearDraft } = useIntakeDraft({
    formType: request.formType,
    contextId: request.contextId,
    data: values,
    dataSchema: draftSchemas[request.formType],
    isEmpty,
    restore,
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      document.getElementById("intake-error-summary")?.focus();
    }
  }, [errors]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("idle");
    const parsed = schemas[request.formType].safeParse({
      ...values,
      consent,
      company,
      sourcePath: window.location.pathname,
    });
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        nextErrors[String(issue.path[0] ?? "form")] ??= issue.message;
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setState("submitting");
    try {
      const response = await fetch(routes[request.formType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("request failed");
      clearDraft();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success")
    return (
      <div role="status" aria-live="polite" className="space-y-5">
        <div className="flex gap-3 border border-[#0097b2]/30 bg-[#0097b2]/8 p-4">
          <CheckCircle2
            className="h-5 w-5 shrink-0 text-[#0097b2]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">Your request was safely stored.</p>
            <p className="mt-1 text-sm leading-6">
              Our team will review it and follow up using the details you
              provided.
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={onDone}
          className={editorialPrimaryButtonClassName}
        >
          Done
        </Button>
      </div>
    );

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      {wasRestored ? (
        <DraftRestoredNotice
          onDiscard={() => {
            clearDraft();
            setValues(defaults);
            setConsent(false);
          }}
        />
      ) : null}
      <IntakeSafetyNotice />
      {Object.keys(errors).length ? (
        <div
          id="intake-error-summary"
          role="alert"
          tabIndex={-1}
          className="border-l-4 border-destructive bg-destructive/10 p-4"
        >
          <p className="font-semibold text-destructive">
            Please correct the highlighted fields.
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-destructive">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>
                <a href={`#intake-${field}`} className="underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {fieldSets[request.formType].map((field) => (
        <div key={field.name} className="space-y-2">
          <Label
            htmlFor={`intake-${field.name}`}
            className={editorialLabelClassName}
          >
            {field.label}
            {field.optional ? (
              <span className="normal-case tracking-normal"> (optional)</span>
            ) : null}
          </Label>
          {field.kind === "textarea" ? (
            <Textarea
              id={`intake-${field.name}`}
              value={values[field.name] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                }))
              }
              maxLength={field.maxLength}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `intake-${field.name}-error` : undefined
              }
              className={editorialTextareaClassName}
            />
          ) : field.kind === "select" ? (
            <select
              id={`intake-${field.name}`}
              value={values[field.name] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                }))
              }
              aria-invalid={Boolean(errors[field.name])}
              className={cn(editorialSelectTriggerClassName, "appearance-auto")}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={`intake-${field.name}`}
              type={field.kind ?? "text"}
              value={values[field.name] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                }))
              }
              autoComplete={
                field.name === "name"
                  ? "name"
                  : field.kind === "email"
                    ? "email"
                    : field.kind === "tel"
                      ? "tel"
                      : undefined
              }
              aria-invalid={Boolean(errors[field.name])}
              className={editorialFieldClassName}
            />
          )}
          {errors[field.name] ? (
            <p
              id={`intake-${field.name}-error`}
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}
      <div className="flex items-start gap-3">
        <Checkbox
          id="intake-consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-1 h-5 w-5"
          aria-invalid={Boolean(errors.consent)}
        />
        <div>
          <Label htmlFor="intake-consent">
            <IntakeConsentText />
          </Label>
          {errors.consent ? (
            <p
              role="alert"
              className="mt-1 text-sm font-medium text-destructive"
            >
              {errors.consent}
            </p>
          ) : null}
        </div>
      </div>
      <div
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <Label htmlFor="intake-company">Company</Label>
        <Input
          id="intake-company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="text-xs leading-5 text-muted-foreground">
        Incomplete fields are saved only in this browser for up to 30 days.
        Consent is never saved.
      </p>
      {state === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          We could not submit this request. Your draft remains saved. Please try
          again.
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={state === "submitting"}
        className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit request"
        )}
      </Button>
    </form>
  );
}
