"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  editorialFieldClassName,
  editorialLabelClassName,
  editorialPrimaryButtonClassName,
  editorialSelectTriggerClassName,
} from "@/components/shared/editorialFormStyles";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";
import {
  getImmersionInterestErrorMessage,
  IMMERSION_CONTACT_FALLBACK_HREF,
  IMMERSION_INTEREST_AS_OPTIONS,
  IMMERSION_INTEREST_COPY,
  immersionInterestSchema,
  normalizeImmersionInterestAs,
  type ImmersionInterestInput,
  type ImmersionInterestOutcome,
} from "@/lib/immersion-interest";
import { cn } from "@/lib/utils";

type FormViewState =
  | { kind: "form" }
  | { kind: "pending_confirmation"; email: string }
  | { kind: "already_registered"; email: string };

type ImmersionInterestFormProps = {
  onDone: () => void;
  onDismiss: () => void;
};

export default function ImmersionInterestForm({
  onDone,
  onDismiss,
}: ImmersionInterestFormProps) {
  const [view, setView] = useState<FormViewState>({ kind: "form" });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPersistentFallback, setShowPersistentFallback] = useState(false);

  const form = useForm<ImmersionInterestInput>({
    resolver: zodResolver(immersionInterestSchema),
    defaultValues: {
      firstName: "",
      email: "",
      interestAs: "",
      consent: false,
      company: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(values: ImmersionInterestInput) {
    setSubmitError(null);

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setSubmitError(getImmersionInterestErrorMessage(null, { offline: true }));
      setShowPersistentFallback(true);
      trackEvent({ name: "immersion_alert_signup", success: false });
      return;
    }

    try {
      const response = await fetch("/api/immersion-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          email: values.email,
          interestAs: normalizeImmersionInterestAs(values.interestAs),
          consent: values.consent,
          company: values.company,
        }),
      });

      if (!response.ok) {
        setSubmitError(getImmersionInterestErrorMessage(response.status));
        setShowPersistentFallback(true);
        trackEvent({ name: "immersion_alert_signup", success: false });
        return;
      }

      const result: unknown = await response.json();
      const outcome =
        typeof result === "object" &&
        result !== null &&
        "outcome" in result &&
        typeof result.outcome === "string"
          ? (result.outcome as ImmersionInterestOutcome)
          : "pending_confirmation";

      if (outcome === "suppressed") {
        setSubmitError(IMMERSION_INTEREST_COPY.errors.serviceUnavailable);
        setShowPersistentFallback(true);
        trackEvent({ name: "immersion_alert_signup", success: false });
        return;
      }

      trackEvent({ name: "immersion_alert_signup", success: true });
      setShowPersistentFallback(false);
      setView({
        kind:
          outcome === "already_registered"
            ? "already_registered"
            : "pending_confirmation",
        email: values.email,
      });
    } catch {
      const offline =
        typeof navigator !== "undefined" && navigator.onLine === false;
      setSubmitError(
        getImmersionInterestErrorMessage(null, { offline }),
      );
      setShowPersistentFallback(true);
      trackEvent({ name: "immersion_alert_signup", success: false });
    }
  }

  if (view.kind === "pending_confirmation") {
    return (
      <div role="status" aria-live="polite" className="space-y-5">
        <div>
          <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {IMMERSION_INTEREST_COPY.success.heading}
          </h3>
          <p className="mt-3 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            {IMMERSION_INTEREST_COPY.success.bodyPrefix}{" "}
            <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {view.email}
            </span>
            . {IMMERSION_INTEREST_COPY.success.bodySuffix}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
            {IMMERSION_INTEREST_COPY.success.secondary}
          </p>
        </div>
        <Button
          type="button"
          onClick={onDone}
          className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
        >
          {IMMERSION_INTEREST_COPY.success.done}
        </Button>
      </div>
    );
  }

  if (view.kind === "already_registered") {
    return (
      <div role="status" aria-live="polite" className="space-y-5">
        <div>
          <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {IMMERSION_INTEREST_COPY.alreadyRegistered.heading}
          </h3>
          <p className="mt-3 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            {IMMERSION_INTEREST_COPY.alreadyRegistered.bodyPrefix}{" "}
            <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {view.email}
            </span>{" "}
            {IMMERSION_INTEREST_COPY.alreadyRegistered.bodySuffix}
          </p>
        </div>
        <Button
          type="button"
          onClick={onDone}
          className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
        >
          {IMMERSION_INTEREST_COPY.alreadyRegistered.done}
        </Button>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        data-immersion-alert-form
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={editorialLabelClassName}>
                First name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="given-name"
                  placeholder="Your first name"
                  disabled={isSubmitting}
                  className={editorialFieldClassName}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={editorialLabelClassName}>
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className={editorialFieldClassName}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestAs"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={editorialLabelClassName}>
                I’m interested as…
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      editorialSelectTriggerClassName,
                      "cursor-pointer",
                    )}
                  >
                    <SelectValue placeholder="Select an option (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-[#0097b2]/30 bg-[#FCFAEF] text-[#1C1F1E] dark:border-[#66C4DC]/40 dark:bg-[#1C1F1E] dark:text-[#FCFAEF]">
                  {IMMERSION_INTEREST_AS_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer focus:bg-[#0097b2]/10"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    disabled={isSubmitting}
                    className="mt-1 size-5 rounded border-[#0097b2]/60 data-[state=checked]:border-[#0097b2] data-[state=checked]:bg-[#0097b2] dark:border-[#66C4DC]/60 dark:data-[state=checked]:border-[#66C4DC] dark:data-[state=checked]:bg-[#66C4DC] dark:data-[state=checked]:text-[#1C1F1E]"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal leading-6 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                  I agree to receive Immersion Program application and cohort
                  updates by email. See our{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#0F4C5C] underline decoration-[#eeba2b] decoration-2 underline-offset-4 hover:text-[#0097b2] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </FormLabel>
              </div>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {submitError ? (
          <div role="alert" className="space-y-2 text-sm text-destructive">
            <p>{submitError}</p>
            {showPersistentFallback ? (
              <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {IMMERSION_INTEREST_COPY.errors.persistentFallback}{" "}
                <Link
                  href={IMMERSION_CONTACT_FALLBACK_HREF}
                  className="font-semibold text-[#0F4C5C] underline decoration-[#eeba2b] decoration-2 underline-offset-4 hover:text-[#0097b2] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                >
                  Contact us about the Immersion Program
                </Link>
                .
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onDismiss}
            disabled={isSubmitting}
            className="min-h-12 justify-center px-4 text-base font-semibold text-[#0F4C5C] hover:bg-[#0097b2]/10 hover:text-[#0097b2] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC]/10 dark:hover:text-[#F5C94D]"
          >
            {IMMERSION_INTEREST_COPY.modal.close}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin motion-reduce:animate-none"
                />
                <span>{IMMERSION_INTEREST_COPY.modal.loading}</span>
              </>
            ) : (
              IMMERSION_INTEREST_COPY.modal.submit
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
