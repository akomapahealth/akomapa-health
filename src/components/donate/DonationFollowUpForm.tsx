"use client";

import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
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
import { useIntakeDraft } from "@/hooks/useIntakeDraft";
import {
  donationFollowUpIntakeSchema,
  type DonationFollowUpIntakeInput,
} from "@/lib/intake/contracts";
import { cn } from "@/lib/utils";

const draftSchema = donationFollowUpIntakeSchema
  .omit({
    consent: true,
    company: true,
    sourcePath: true,
    flow: true,
    selectedGivingLevel: true,
  })
  .partial();
type DonationDraft = z.infer<typeof draftSchema>;
type DonationFormValues = z.input<typeof donationFollowUpIntakeSchema>;
const isDraftEmpty = (draft: DonationDraft) =>
  !Object.values(draft).some((value) => value?.trim());

type Props = {
  flow: "partner" | "oneTime";
  selectedGivingLevel: string;
  onDone: () => void;
};

export default function DonationFollowUpForm({
  flow,
  selectedGivingLevel,
  onDone,
}: Props) {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const defaults = useMemo<DonationFollowUpIntakeInput>(
    () => ({
      name: "",
      email: "",
      phone: "",
      flow,
      selectedGivingLevel,
      sourcePath: "",
      consent: false,
      company: "",
    }),
    [flow, selectedGivingLevel],
  );
  const form = useForm<
    DonationFormValues,
    unknown,
    DonationFollowUpIntakeInput
  >({
    resolver: zodResolver(donationFollowUpIntakeSchema),
    defaultValues: defaults,
  });
  const restore = useCallback(
    (draft: DonationDraft) => form.reset({ ...defaults, ...draft }),
    [defaults, form],
  );
  const values = useWatch({ control: form.control });
  const { wasRestored, clearDraft } = useIntakeDraft({
    formType: "donation_follow_up",
    contextId: `${flow}-${selectedGivingLevel}`,
    data: {
      name: values.name ?? "",
      email: values.email ?? "",
      phone: values.phone ?? "",
    },
    dataSchema: draftSchema,
    isEmpty: isDraftEmpty,
    restore,
  });

  async function onSubmit(values: DonationFollowUpIntakeInput) {
    setState("idle");
    try {
      const response = await fetch("/api/donation-follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          flow,
          selectedGivingLevel,
          sourcePath: window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error("request failed");
      clearDraft();
      form.reset(defaults);
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" aria-live="polite" className="space-y-5">
        <div className="flex gap-3 border border-[#0097b2]/30 bg-[#0097b2]/8 p-4">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-[#0097b2] dark:text-[#66C4DC]"
          />
          <div>
            <p className="font-semibold">Your details were safely stored.</p>
            <p className="mt-1 text-sm leading-6">
              Our team can follow up with a personal thank-you. This does not
              verify or confirm a payment.
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
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {wasRestored ? (
          <DraftRestoredNotice
            onDiscard={() => {
              clearDraft();
              form.reset(defaults);
            }}
          />
        ) : null}
        <IntakeSafetyNotice />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={editorialLabelClassName}>
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
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
              <FormItem>
                <FormLabel className={editorialLabelClassName}>
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    className={editorialFieldClassName}
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={editorialLabelClassName}>
                Phone{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  autoComplete="tel"
                  className={editorialFieldClassName}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 h-5 w-5"
                />
              </FormControl>
              <div>
                <FormLabel>
                  <IntakeConsentText />
                </FormLabel>
                <FormMessage role="alert" />
              </div>
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
                <Input {...field} tabIndex={-1} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <p className="text-xs leading-5 text-muted-foreground">
          Incomplete contact details are saved only in this browser for up to 30
          days. Consent is never saved.
        </p>
        {state === "error" ? (
          <p role="alert" className="text-sm text-destructive">
            We could not share your details. Your draft remains saved. Please
            try again.
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sharing…
            </>
          ) : (
            "Share my details"
          )}
        </Button>
      </form>
    </Form>
  );
}
