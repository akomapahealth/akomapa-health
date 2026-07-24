"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      setIsSubmitted(true);
      form.reset();
      trackEvent({
        name: "newsletter_signup",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
        success: true,
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
      trackEvent({
        name: "newsletter_signup",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
        success: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      data-newsletter
      aria-labelledby="footer-newsletter-heading"
      className="relative mt-14 overflow-hidden border border-[#66C4DC]/45 bg-[#0F4C5C] p-5 text-[#FCFAEF] sm:p-7 lg:p-9"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-24 bg-[#eeba2b] sm:w-36"
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
        <div data-newsletter-copy>
          <p className="mb-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
            Stay Connected
          </p>
          <h2
            id="footer-newsletter-heading"
            className="max-w-md font-heading text-3xl font-semibold leading-tight tracking-tight text-[#FCFAEF] md:text-4xl"
          >
            Join the Akomapa newsletter
          </h2>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-[#FCFAEF]/75">
            Receive updates on community care, research, leadership programs,
            and opportunities to get involved.
          </p>
        </div>

        {isSubmitted ? (
          <div
            aria-live="polite"
            className="flex flex-col gap-4 bg-[#FCFAEF] p-5 text-[#2F3332] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0097b2]" />
              <div>
                <h3 className="font-heading font-semibold">
                  Thank you for subscribing!
                </h3>
                <p className="mt-1 font-body text-sm text-[#2F3332]/75">
                  You&apos;ll now receive the latest Akomapa updates.
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setError(null);
              }}
              variant="outline"
              className="shrink-0 border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-white"
            >
              Subscribe another email
            </Button>
          </div>
        ) : (
          <div className="min-w-0 space-y-3">
            {error && (
              <div
                role="alert"
                className="flex items-center gap-3 rounded-lg border border-red-300/60 bg-red-50 p-3 dark:bg-red-950/40"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-200" />
                <p className="font-body text-sm text-red-700 dark:text-red-100">
                  {error}
                </p>
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                data-newsletter-form
                className="flex flex-col gap-3 sm:flex-row sm:items-start"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="min-w-0 flex-1">
                      <FormLabel className="sr-only">Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="Enter your email address"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-[#FCFAEF]/30 bg-[#FCFAEF] text-[#2F3332] placeholder:text-[#2F3332]/60 focus-visible:border-[#eeba2b] focus-visible:ring-[#eeba2b]/40 dark:border-[#FCFAEF]/30 dark:bg-[#FCFAEF] dark:text-[#2F3332] dark:placeholder:text-[#2F3332]/60"
                        />
                      </FormControl>
                      <FormMessage
                        role="alert"
                        className="font-body text-sm text-[#F5C94D]"
                      >
                        {fieldState.error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 shrink-0 bg-[#F5C94D] px-6 font-semibold text-[#121514] hover:bg-[#FCFAEF] focus-visible:ring-[#F5C94D] disabled:cursor-not-allowed disabled:opacity-50 sm:px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <p className="font-body text-xs text-[#FCFAEF]/65">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from Akomapa Health.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
