"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// School options
const schools = [
  "School of Medicine and Surgery",
  "School of Pharmacy and Pharmaceutical Sciences",
  "School of Optometry and Vision Science",
  "School of Nursing and Midwifery",
  "School of Allied Health Sciences",
  "Other",
];

// Level options
const levels = ["100", "200", "300", "400", "500", "600"];

// Team preferences
const teams = [
  "Screening Team",
  "Education/Counseling Team",
  "Next steps Team (scheduling, referrals, follow ups)",
  "Media and Publicity",
];

// Available dates
const availableDates = [
  "14th June",
  "21st June",
  "28th June",
  "5th July",
  "12th July",
  "19th July",
  "26th July",
  "2nd August",
];

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    otherSchool: "",
    level: "",
    phone: "",
    email: "",
    motivation: "",
    expectations: "",
    screeningExperience: 5,
    counselingExperience: 5,
    selectedDates: [] as string[],
    teamPreference: "",
    isBackupVolunteer: false,
    clinicalExperience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/volunteer-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you for your application! We'll be in touch soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        school: "",
        otherSchool: "",
        level: "",
        phone: "",
        email: "",
        motivation: "",
        expectations: "",
        screeningExperience: 5,
        counselingExperience: 5,
        selectedDates: [],
        teamPreference: "",
        isBackupVolunteer: false,
        clinicalExperience: "",
      });
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateToggle = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDates: prev.selectedDates.includes(date)
        ? prev.selectedDates.filter((d) => d !== date)
        : [...prev.selectedDates, date],
    }));
  };

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl pt-4 sm:pt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Join our student-powered mission.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Become part of our student-powered initiative to improve access to preventive healthcare services in Ghana. Make a real impact while gaining valuable clinical and leadership experience.
            </motion.p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                WHAT TO EXPECT
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Your Volunteer Journey
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto">
                This phase of the clinic runs for a maximum of 3 months. Each volunteer is required to attend 4 or more sessions, with each session lasting 4 hours from 8AM to 12noon on Saturdays.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-gradient-to-br from-[#0097b2]/10 to-[#0097b2]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/10" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Hands-On Experience
                  </h3>
                  <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                    Gain real-world clinical experience in community healthcare settings, working alongside licensed professionals.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-gradient-to-br from-[#eeba2b]/10 to-[#eeba2b]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#eeba2b]/10 via-transparent to-[#0097b2]/10" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Leadership Development
                  </h3>
                  <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                    Develop leadership skills and cultural humility through interprofessional collaboration and community engagement.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-gradient-to-br from-[#0097b2]/10 to-[#0097b2]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/10" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Community Impact
                  </h3>
                  <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                    Make a meaningful difference in underserved communities while building relationships and understanding local healthcare needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#2F3332]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="flex items-center gap-2 justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Volunteer Application
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed max-w-2xl mx-auto">
                Fill out the form below to apply. All fields marked with * are required.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20"
            >
              {submitStatus.type && (
                <Alert
                  variant={submitStatus.type === "success" ? "default" : "destructive"}
                  className="mb-6"
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#1C1F1E] dark:text-[#FCFAEF]">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        required
                        className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-[#1C1F1E] dark:text-[#FCFAEF]">School *</Label>
                      <Select
                        value={formData.school}
                        onValueChange={(value) => setFormData({ ...formData, school: value })}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger className="w-full bg-white dark:bg-[#1C1F1E] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]">
                          <SelectValue placeholder="Select your school" className="text-[#1C1F1E] dark:text-[#FCFAEF]" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#FCFAEF] dark:bg-[#1C1F1E] text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {schools.map((school) => (
                            <SelectItem key={school} value={school} className="cursor-pointer">
                              {school}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.school === "Other" && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="otherSchool" className="text-[#1C1F1E] dark:text-[#FCFAEF]">Please specify *</Label>
                        <Input
                          id="otherSchool"
                          value={formData.otherSchool}
                          onChange={(e) => setFormData({ ...formData, otherSchool: e.target.value })}
                          disabled={isSubmitting}
                          required
                          className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="level" className="text-[#1C1F1E] dark:text-[#FCFAEF]">Level *</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value })}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger className="w-full bg-white dark:bg-[#1C1F1E] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]">
                          <SelectValue placeholder="Select your level" className="text-[#1C1F1E] dark:text-[#FCFAEF]" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#FCFAEF] dark:bg-[#1C1F1E] text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {levels.map((level) => (
                            <SelectItem key={level} value={level} className="cursor-pointer">
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#1C1F1E] dark:text-[#FCFAEF]">Phone Number (WhatsApp) *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        required
                        className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email" className="text-[#1C1F1E] dark:text-[#FCFAEF]">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        required
                        className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation and Experience */}
                <div className="space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Motivation and Experience
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
                      Why do you want to join this Clinic? (maximum 100 words) *
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      maxLength={500}
                      disabled={isSubmitting}
                      required
                      rows={4}
                      className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectations" className="text-[#1C1F1E] dark:text-[#FCFAEF]">What are your expectations? *</Label>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                      disabled={isSubmitting}
                      required
                      rows={4}
                      className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[#1C1F1E] dark:text-[#FCFAEF]">Screening Experience (1-10) *</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.screeningExperience]}
                        onValueChange={([value]: number[]) => setFormData({ ...formData, screeningExperience: value })}
                        min={1}
                        max={10}
                        step={1}
                        disabled={isSubmitting}
                        className="flex-1"
                      />
                      <span className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] min-w-[3rem] text-center">
                        {formData.screeningExperience}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[#1C1F1E] dark:text-[#FCFAEF]">Education/Counseling Experience (1-10) *</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.counselingExperience]}
                        onValueChange={([value]: number[]) => setFormData({ ...formData, counselingExperience: value })}
                        min={1}
                        max={10}
                        step={1}
                        disabled={isSubmitting}
                        className="flex-1"
                      />
                      <span className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] min-w-[3rem] text-center">
                        {formData.counselingExperience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Availability
                  </h3>

                  <div className="space-y-4">
                    <Label className="text-[#1C1F1E] dark:text-[#FCFAEF]">Select 4 or more available Saturdays *</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {availableDates.map((date) => (
                        <div key={date} className="flex items-center space-x-2">
                          <Checkbox
                            id={date}
                            checked={formData.selectedDates.includes(date)}
                            onCheckedChange={() => handleDateToggle(date)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={date} className="text-sm sm:text-base text-[#1C1F1E] dark:text-[#FCFAEF] cursor-pointer">
                            {date}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.selectedDates.length > 0 && (
                      <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                        Selected: {formData.selectedDates.length} date{formData.selectedDates.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[#1C1F1E] dark:text-[#FCFAEF]">Team Preference *</Label>
                    <RadioGroup
                      value={formData.teamPreference}
                      onValueChange={(value) => setFormData({ ...formData, teamPreference: value })}
                      disabled={isSubmitting}
                      className="space-y-3"
                    >
                      {teams.map((team) => (
                        <div key={team} className="flex items-start space-x-2">
                          <RadioGroupItem value={team} id={team} disabled={isSubmitting} className="mt-1" />
                          <Label htmlFor={team} className="text-sm sm:text-base text-[#1C1F1E] dark:text-[#FCFAEF] cursor-pointer leading-relaxed">
                            {team}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="backup"
                      checked={formData.isBackupVolunteer}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, isBackupVolunteer: checked as boolean })
                      }
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <Label htmlFor="backup" className="text-sm sm:text-base text-[#1C1F1E] dark:text-[#FCFAEF] cursor-pointer leading-relaxed">
                      I am interested in being a backup volunteer
                    </Label>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="clinicalExperience" className="text-[#1C1F1E] dark:text-[#FCFAEF]">
                      Share a clinical experience or an outreach experience you have had (optional)
                    </Label>
                    <Textarea
                      id="clinicalExperience"
                      value={formData.clinicalExperience}
                      onChange={(e) => setFormData({ ...formData, clinicalExperience: e.target.value })}
                      disabled={isSubmitting}
                      rows={4}
                      className="bg-white dark:bg-[#2F3332] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                  <Button
                    type="submit"
                    disabled={isSubmitting || formData.selectedDates.length < 4}
                    className="w-full h-12 bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                  
                  {formData.selectedDates.length < 4 && formData.selectedDates.length > 0 && (
                    <p className="text-sm text-[#eeba2b] text-center mt-4">
                      Please select at least 4 available dates to submit your application
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#FCFAEF]">
                  Questions About Volunteering?
                </h2>
                <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-2xl mx-auto">
                  For inquiries about the volunteer program, application process, or requirements, please reach out to our team.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:akomapahealth@gmail.com"
                  className="inline-flex items-center text-[#F5C94D] font-medium hover:text-[#FCFAEF] transition-colors text-base sm:text-lg"
                >
                  akomapahealth@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
