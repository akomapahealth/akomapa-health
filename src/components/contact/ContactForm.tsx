"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    partnershipType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle URL parameters for partnership types
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      const partnershipTypes = {
        'outreach': 'Host Outreach Programs',
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
          partnershipType: ""
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send message. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
          Thank you for contacting us. We'll get back to you within 24-48 hours.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]"
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
      className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
          Get in Touch
        </h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7]">
          Have questions about partnerships or want to learn more? We&apos;d love to hear from you.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
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
            className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677]"
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
            className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677]"
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
            className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <Label htmlFor="partnershipType" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
            Partnership Type
          </Label>
          <Select value={formData.partnershipType} onValueChange={handleSelectChange}>
            <SelectTrigger className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677]">
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monetary Sponsorship">Monetary Sponsorship</SelectItem>
              <SelectItem value="Host Outreach Programs">Host Outreach Programs</SelectItem>
              <SelectItem value="Strategic Partnerships">Strategic Partnerships</SelectItem>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
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
          className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677]"
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
          className="mt-2 border-[#007A73] focus:border-[#C37B1E] dark:border-[#63B0AC] dark:focus:border-[#F3C677] resize-none"
          placeholder="Tell us about your partnership interest or inquiry..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
            <div>
              <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Email</p>
              <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">akomapahealth@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
            <div>
              <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Phone</p>
              <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">+233 20 954 4834</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-[#007A73] dark:text-[#63B0AC] mr-3" />
            <div>
              <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Location</p>
              <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Cape Coast, Ghana</p>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
}