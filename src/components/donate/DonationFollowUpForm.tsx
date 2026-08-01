"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  donationFollowUpSchema,
  type DonationFollowUpInput,
} from "@/lib/donation-follow-up";

type DonationFollowUpFormProps = {
  flow: "partner" | "oneTime";
  selectedGivingLevel: string;
};

export default function DonationFollowUpForm({
  flow,
  selectedGivingLevel,
}: DonationFollowUpFormProps) {
  const [submissionState, setSubmissionState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const form = useForm<DonationFollowUpInput>({
    resolver: zodResolver(donationFollowUpSchema),
    defaultValues: {
      name: "",
      email: "",
      flow,
      selectedGivingLevel,
      company: "",
    },
  });

  async function onSubmit(values: DonationFollowUpInput) {
    setSubmissionState("idle");

    try {
      const response = await fetch("/api/donation-follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          flow,
          selectedGivingLevel,
        }),
      });

      if (!response.ok) {
        throw new Error("Donation follow-up request failed");
      }

      setSubmissionState("success");
      form.reset({
        name: "",
        email: "",
        flow,
        selectedGivingLevel,
        company: "",
      });
    } catch {
      setSubmissionState("error");
    }
  }

  if (submissionState === "success") {
    return (
      <div
        role="status"
        className="flex gap-3 rounded-xl border border-[#0097b2]/30 bg-[#0097b2]/8 p-4 text-[#1C1F1E] dark:text-[#FCFAEF]"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-[#0097b2] dark:text-[#66C4DC]"
        />
        <div>
          <p className="font-semibold">Thank you for sharing your details.</p>
          <p className="mt-1 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
            Our team can now follow up with a personal thank-you. This message
            does not verify or confirm a payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#2F3332]/12 bg-white p-4 sm:p-5 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]/35">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#0097b2]/30 text-[#0097b2] dark:border-[#66C4DC]/40 dark:text-[#66C4DC]">
          <Mail aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            Let us thank you
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
            After making your transfer, share your details so our team can send
            a personal thank-you.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      placeholder="Your full name"
                      disabled={form.formState.isSubmitting}
                      className="h-11 bg-[#FCFAEF] dark:bg-[#2F3332]"
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
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      disabled={form.formState.isSubmitting}
                      className="h-11 bg-[#FCFAEF] dark:bg-[#2F3332]"
                    />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
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

          <FormDescription className="text-xs leading-relaxed">
            We use these details only to follow up about this donation. Sharing
            them does not verify or confirm that a transfer was completed.
          </FormDescription>

          {submissionState === "error" ? (
            <p role="alert" className="text-sm text-destructive">
              We couldn&apos;t share your details right now. Please try again.
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="h-12 min-h-12 w-full rounded-md bg-[#0097b2] py-3 text-[#FCFAEF] shadow-none hover:bg-[#007f96] focus-visible:ring-[#F5C94D] sm:w-auto"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                Sharing details...
              </>
            ) : (
              "Share my details"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
