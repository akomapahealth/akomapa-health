"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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

  // Handle URL parameters for partnership types
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      const partnershipTypes = {
        'outreach': 'Host Community Engagement Programs',
        'partnership': 'Strategic Partnerships',
        'donation': 'Monetary Sponsorship'
      };
      
      setFormData(prev => ({
        ...prev,
        subject: `Partnership Inquiry - ${partnershipTypes[type as keyof typeof partnershipTypes] || 'General'}`,
        partnershipType: partnershipTypes[type as keyof typeof partnershipTypes] || '',
        message: `I&apos;m interested in learning more about ${partnershipTypes[type as keyof typeof partnershipTypes] || 'partnership opportunities'} with Akomapa Health Foundation.`
      }));
    }
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-[#2F3332]"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="mb-2 font-heading text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          Message Sent Successfully!
        </h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
          Thank you for contacting us. We&apos;ll get back to you within 24-48 hours.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF]"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-lg md:p-8 dark:bg-[#2F3332]"
    >
      <div className="mb-6">
        <h3 className="mb-2 font-heading text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          Get in Touch
        </h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7]">
          Have questions about partnerships or want to learn more? We&apos;d love to hear from you.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          data-testid="contact-form-error"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
        >
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            We couldn&apos;t send your message
          </p>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            If the problem continues, email us directly at{" "}
            <a
              href={CONTACT.email.href}
              className="font-semibold underline underline-offset-2 hover:text-red-800 dark:hover:text-red-200"
            >
              {CONTACT.email.display}
            </a>
            .
          </p>
        </div>
      )}

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
        className="min-h-12 w-full bg-[#0097b2] px-6 py-3 text-base text-[#FCFAEF] hover:bg-[#eeba2b] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </div>
        ) : (
          <div className="flex items-center">
            <Send size={20} className="mr-2" />
            Send Message
          </div>
        )}
      </Button>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex items-start">
            <Mail className="w-5 h-5 text-[#0097b2] dark:text-[#66C4DC] mr-3 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">Email</p>
              <a
                href={CONTACT.email.href}
                className="break-all text-sm text-[#2F3332] transition-colors hover:text-[#0097b2] dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
              >
                {CONTACT.email.display}
              </a>
            </div>
          </div>
          {CONTACT.offices.map((office) => (
            <div key={office.id} className="flex items-start">
              <MapPin className="w-5 h-5 text-[#0097b2] dark:text-[#66C4DC] mr-3 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">{office.label}</p>
                <address className="not-italic text-sm text-[#2F3332] dark:text-[#E6E7E7] break-words">
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <a
                  href={office.phone.href}
                  className="mt-1 inline-flex items-center text-sm text-[#2F3332] transition-colors hover:text-[#0097b2] dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
                >
                  <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  {office.phone.display}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0097b2] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact form...</p>
        </div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
