"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONTACT } from "@/config/contact";
import {
  CONTACT_NETWORK_ERROR_MESSAGE,
  getContactErrorMessage,
} from "@/lib/contact-errors";
import { getContactIntent } from "@/lib/contact-intents";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    partnershipType: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Apply only known inquiry intents. Unknown values leave the form untouched.
  useEffect(() => {
    const intent = getContactIntent(searchParams.get("type"));
    if (!intent) return;

    setFormData((previous) => ({
      ...previous,
      ...intent,
    }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, partnershipType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          partnershipType: "",
          company: "",
        });
      } else {
        const errorData: unknown = await response.json().catch(() => null);
        const responseMessage =
          typeof errorData === "object" &&
          errorData !== null &&
          "message" in errorData
            ? errorData.message
            : undefined;
        setError(getContactErrorMessage(response.status, responseMessage));
      }
    } catch {
      setError(CONTACT_NETWORK_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#0097b2]/30 bg-white p-8 text-center dark:bg-[#1C1F1E]"
      >
        <CheckCircle
          className="mx-auto mb-4 h-12 w-12 text-[#0097b2] dark:text-[#66C4DC]"
          aria-hidden="true"
        />
        <h3 className="mb-2 font-heading text-2xl font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          Message Sent Successfully!
        </h3>
        <p className="mb-6 text-[#2F3332] dark:text-[#E6E7E7]">
          Thank you for contacting us. We&apos;ll get back to you within 24-48
          hours.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="min-h-12 bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#1C1F1E]/10 bg-white p-6 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] md:p-8"
      noValidate={false}
    >
      <div className="mb-6">
        <h3 className="mb-2 font-heading text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          Get in Touch
        </h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7]">
          Have questions about partnerships or want to learn more? We&apos;d love to hear from you.
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          data-testid="contact-form-error"
          className="mb-6 border-l-4 border-destructive bg-destructive/10 p-4"
        >
          <p className="text-sm font-semibold text-destructive">
            Error: We couldn&apos;t send your message
          </p>
          <p className="mt-1 text-sm text-destructive">{error}</p>
          <p className="mt-2 text-sm text-destructive">
            If the problem continues, email us directly at{" "}
            <a
              href={CONTACT.email.href}
              className="font-semibold underline underline-offset-2"
            >
              {CONTACT.email.display}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="name" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-2 border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-2 border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="phone" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <Label htmlFor="partnershipType" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
            Partnership Type
          </Label>
          <Select value={formData.partnershipType} onValueChange={handleSelectChange}>
            <SelectTrigger id="partnershipType" className="mt-2 w-full border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] bg-[#FCFAEF] dark:bg-[#1C1F1E] hover:bg-white dark:hover:bg-[#1C1F1E] cursor-pointer">
              <SelectValue placeholder="Select partnership type" className="text-[#1C1F1E] dark:text-[#FCFAEF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#FCFAEF] dark:bg-[#1C1F1E] text-[#1C1F1E] dark:text-[#FCFAEF]">
              <SelectItem value="Monetary Sponsorship" className="cursor-pointer">Monetary Sponsorship</SelectItem>
              <SelectItem value="Host Community Engagement Programs" className="cursor-pointer">Host Community Engagement Programs</SelectItem>
              <SelectItem value="Strategic Partnerships" className="cursor-pointer">Strategic Partnerships</SelectItem>
              <SelectItem value="General Inquiry" className="cursor-pointer">General Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="subject" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
          Subject *
        </Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          className="mt-2 border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
          placeholder="Enter subject"
        />
      </div>

      <div className="mb-8">
        <Label htmlFor="message" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="mt-2 border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] resize-none"
          placeholder="Tell us about your partnership interest or inquiry..."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full rounded-md bg-[#0097b2] px-6 py-3 text-base text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <span
              className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-[#FCFAEF] border-t-transparent"
              aria-hidden="true"
            />
            Sending...
          </span>
        ) : (
          <span className="flex items-center">
            <Send size={20} className="mr-2" aria-hidden="true" />
            Send Message
          </span>
        )}
      </Button>

      <div className="mt-8 border-t border-[#1C1F1E]/10 pt-8 dark:border-[#FCFAEF]/15">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex items-start">
            <Mail
              className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#0097b2] dark:text-[#66C4DC]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                Email
              </p>
              <a
                href={CONTACT.email.href}
                className="break-all text-sm text-[#2F3332] transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
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
                <p className="mb-1 text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {office.label}
                </p>
                <address className="break-words text-sm not-italic text-[#2F3332] dark:text-[#E6E7E7]">
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={office.phone.href}
                  className="mt-1 inline-flex min-h-11 items-center text-sm text-[#2F3332] transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
                >
                  <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  {office.phone.display}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="border border-[#1C1F1E]/10 bg-white p-8 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]">
          <div className="text-center">
            <div
              className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#0097b2] border-t-transparent"
              aria-hidden="true"
            />
            <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              Loading contact form...
            </p>
          </div>
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
