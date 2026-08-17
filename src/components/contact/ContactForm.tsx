"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  DraftRestoredNotice,
  IntakeConsentText,
  IntakeSafetyNotice,
} from "@/components/intake/IntakeFormSupport";
import {
  editorialFieldClassName,
  editorialFormShellClassName,
  editorialLabelClassName,
  editorialPrimaryButtonClassName,
  editorialTextareaClassName,
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
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/config/contact";
import { useIntakeDraft } from "@/hooks/useIntakeDraft";
import {
  generalInquirySchema,
  type GeneralInquiryInput,
} from "@/lib/intake/contracts";
import { getContactIntent } from "@/lib/contact-intents";
import { cn } from "@/lib/utils";

const defaults: GeneralInquiryInput = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  sourcePath: "",
  consent: false as never,
  company: "",
};

const generalInquiryDraftSchema = generalInquirySchema
  .omit({ consent: true, company: true, sourcePath: true })
  .partial();
type GeneralInquiryDraft = z.infer<typeof generalInquiryDraftSchema>;
type GeneralInquiryFormValues = z.input<typeof generalInquirySchema>;

function isDraftEmpty(data: GeneralInquiryDraft) {
  return !Object.values(data).some((value) => value?.trim());
}

function ContactDetails() {
  return (
    <div className="mt-8 border-t border-[#1C1F1E]/10 pt-8 dark:border-[#FCFAEF]/15">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex items-start">
          <Mail
            className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#0097b2] dark:text-[#66C4DC]"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-medium">Email</p>
            <a
              href={CONTACT.email.href}
              className="inline-flex min-h-11 items-center break-all text-sm underline-offset-2 hover:underline"
            >
              {CONTACT.email.display}
            </a>
          </div>
        </div>
        {CONTACT.offices.map((office) => (
          <div key={office.id} className="flex items-start">
            <MapPin
              className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#0097b2] dark:text-[#66C4DC]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm font-medium">{office.label}</p>
              <address className="break-words text-sm not-italic">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={office.phone.href}
                className="mt-1 inline-flex min-h-11 items-center text-sm underline-offset-2 hover:underline"
              >
                <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {office.phone.display}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const form = useForm<GeneralInquiryFormValues, unknown, GeneralInquiryInput>({
    resolver: zodResolver(generalInquirySchema),
    defaultValues: defaults,
    mode: "onSubmit",
  });

  const restore = useCallback(
    (draft: GeneralInquiryDraft) => {
      form.reset({ ...defaults, ...draft });
    },
    [form],
  );
  const values = useWatch({ control: form.control });
  const draft = {
    name: values.name ?? "",
    email: values.email ?? "",
    phone: values.phone ?? "",
    subject: values.subject ?? "",
    message: values.message ?? "",
  };
  const { wasRestored, clearDraft } = useIntakeDraft({
    formType: "general_inquiry",
    data: draft,
    dataSchema: generalInquiryDraftSchema,
    isEmpty: isDraftEmpty,
    restore,
  });

  useEffect(() => {
    const intent = getContactIntent(searchParams.get("type"));
    if (!intent || form.formState.isDirty) return;
    form.reset({
      ...defaults,
      subject: intent.subject,
      message: intent.message,
    });
  }, [form, searchParams]);

  async function onSubmit(values: GeneralInquiryInput) {
    setState("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
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
      <div
        role="status"
        aria-live="polite"
        className={cn(editorialFormShellClassName, "text-center")}
      >
        <CheckCircle
          className="mx-auto mb-4 h-12 w-12 text-[#0097b2] dark:text-[#66C4DC]"
          aria-hidden="true"
        />
        <h3 className="font-heading text-2xl font-semibold">
          Message received
        </h3>
        <p className="mx-auto mt-2 max-w-lg leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          Your inquiry was safely stored. Our team will review it and respond as
          soon as practical.
        </p>
        <Button
          type="button"
          onClick={() => setState("idle")}
          className={cn(editorialPrimaryButtonClassName, "mt-6")}
        >
          Send another message
        </Button>
        <ContactDetails />
      </div>
    );
  }

  return (
    <div className={editorialFormShellClassName}>
      <div className="mb-8">
        <p className={editorialLabelClassName}>General inquiry</p>
        <h3 className="mb-2 mt-3 font-heading text-2xl font-bold sm:text-3xl">
          Get in touch
        </h3>
        <p className="max-w-xl leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          Ask a general question here. For partnership, program, or volunteer
          requests, use the purpose-specific form on the relevant page.
        </p>
      </div>

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
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
          {state === "error" ? (
            <p
              role="alert"
              data-testid="contact-form-error"
              className="border-l-4 border-destructive bg-destructive/10 p-4 text-sm text-destructive"
            >
              We could not submit your inquiry. Your draft remains on this
              device. Try again or email{" "}
              <a className="font-semibold underline" href={CONTACT.email.href}>
                {CONTACT.email.display}
              </a>
              .
            </p>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
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
                      inputMode="email"
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
                  Phone number{" "}
                  <span className="normal-case tracking-normal">
                    (optional)
                  </span>
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={editorialLabelClassName}>
                  Subject
                </FormLabel>
                <FormControl>
                  <Input {...field} className={editorialFieldClassName} />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={editorialLabelClassName}>
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    className={editorialTextareaClassName}
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
            Incomplete fields are saved only in this browser for up to 30 days.
            Consent is never saved.{" "}
            <Link href="/privacy" className="underline">
              Learn more
            </Link>
            .
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={cn(editorialPrimaryButtonClassName, "w-full sm:w-auto")}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send message
              </>
            )}
          </Button>
        </form>
      </Form>
      <ContactDetails />
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className={editorialFormShellClassName}>Loading contact form…</div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
