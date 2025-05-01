"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CheckCircle2, ArrowRight } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: FormValues) {
    // In a real app, you would submit to your API here
    console.log(data);
    setIsSubmitted(true);
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
            </div>
          ) : (
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
                          className="h-12 border-[#2F3332]/20 dark:border-[#FCFAEF]/20 bg-white dark:bg-[#2F3332] text-[#2F3332] dark:text-[#FCFAEF]"
                        />
                      </FormControl>
                      <FormMessage className="text-[#C37B1E]" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="bg-[#007A73] hover:bg-[#005A5F] text-[#FCFAEF] dark:bg-[#C37B1E] dark:hover:bg-[#A36419] dark:text-[#FCFAEF] h-12 px-8 font-medium"
                >
                  Subscribe Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          )}

          <p className="text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Akomapa Health Foundation.
          </p>
        </div>
      </div>
    </section>
  );
}