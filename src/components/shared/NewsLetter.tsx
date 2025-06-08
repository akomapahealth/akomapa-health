"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";

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
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-20 bg-[#007A73]/5 dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
            STAY CONNECTED
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF] font-heading">
            Newsletter Signup
          </h3>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg mb-8 font-body">
            Join our mailing list for updates on clinics, research, and opportunities to get involved.
          </p>

          {isSubmitted ? (
            <div className="bg-white dark:bg-[#2F3332] p-6 rounded-lg shadow-sm flex flex-col items-center">
              <CheckCircle2 className="h-12 w-12 text-[#007A73] dark:text-[#00A99D] mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-[#FCFAEF]">Thank You for Subscribing!</h3>
              <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]">
                You'll now receive our newsletter with the latest updates on our programs and initiatives.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setError(null);
                }}
                variant="outline"
                className="mt-4 border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-white dark:border-[#C37B1E] dark:text-[#C37B1E] dark:hover:bg-[#C37B1E] dark:hover:text-white"
              >
                Subscribe Another Email
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            placeholder="Enter your email address" 
                            {...field} 
                            disabled={isLoading}
                            className="h-12 border-[#2F3332]/20 dark:border-[#FCFAEF]/20 bg-white dark:bg-[#2F3332] text-[#2F3332] dark:text-[#FCFAEF]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#C37B1E]" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-[#007A73] hover:bg-[#005A5F] text-[#FCFAEF] dark:bg-[#C37B1E] dark:hover:bg-[#A36419] dark:text-[#FCFAEF] h-12 px-8 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          <p className="text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Akomapa Health Foundation.
          </p>
        </div>
      </div>
    </section>
  );
}