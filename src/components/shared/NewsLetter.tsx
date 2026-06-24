"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      form.reset();
      trackEvent({
        name: "newsletter_signup",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
        success: true,
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
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
      className="mt-10 rounded-xl border border-[#2F3332]/15 bg-white/65 p-5 shadow-sm sm:p-6 lg:p-8 dark:border-[#FCFAEF]/20 dark:bg-[#2F3332]/35"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <div>
          <p className="mb-2 font-body text-sm font-bold uppercase tracking-[0.16em] text-[#F5C94D]">
            Stay Connected
          </p>
          <h2
            id="footer-newsletter-heading"
            className="font-heading text-2xl font-bold tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF]"
          >
            Join the Akomapa newsletter
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#FCFAEF]/75">
            Receive updates on community care, research, leadership programs,
            and opportunities to get involved.
          </p>
        </div>

        {isSubmitted ? (
          <div
            aria-live="polite"
            className="flex flex-col gap-4 rounded-xl bg-[#FCFAEF] p-4 text-[#2F3332] sm:flex-row sm:items-center sm:justify-between"
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
                <p className="font-body text-sm text-red-700 dark:text-red-100">{error}</p>
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 sm:flex-row sm:items-start"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="min-w-0 flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          aria-label="Email address"
                          placeholder="Enter your email address"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-[#FCFAEF]/30 bg-[#FCFAEF] text-[#2F3332] placeholder:text-[#2F3332]/60 focus-visible:border-[#eeba2b] focus-visible:ring-[#eeba2b]/40 dark:border-[#FCFAEF]/30 dark:bg-[#FCFAEF] dark:text-[#2F3332] dark:placeholder:text-[#2F3332]/60"
                        />
                      </FormControl>
                      <FormMessage className="font-body text-sm text-[#F5C94D]">
                        {fieldState.error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 shrink-0 bg-[#0097b2] px-6 font-medium text-[#FCFAEF] hover:bg-[#007f96] focus-visible:ring-[#F5C94D] disabled:cursor-not-allowed disabled:opacity-50 sm:px-8"
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

            <p className="font-body text-xs text-[#2F3332]/65 dark:text-[#FCFAEF]/65">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from Akomapa Health.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
