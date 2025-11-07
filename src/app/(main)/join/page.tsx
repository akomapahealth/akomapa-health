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
import Image from "@/components/common/Image";
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
    <div className="min-h-screen bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/join-hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Join Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Become part of our student-powered initiative to improve access to preventive healthcare services in Ghana.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 md:p-8"
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

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">School *</Label>
                      <Select
                        value={formData.school}
                        onValueChange={(value) => setFormData({ ...formData, school: value })}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your school" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem key={school} value={school}>
                              {school}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.school === "Other" && (
                      <div className="space-y-2">
                        <Label htmlFor="otherSchool">Please specify *</Label>
                        <Input
                          id="otherSchool"
                          value={formData.otherSchool}
                          onChange={(e) => setFormData({ ...formData, otherSchool: e.target.value })}
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="level">Level *</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value })}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation and Experience */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Motivation and Experience
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join this Clinic? (maximum 100 words) *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      maxLength={500}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectations">What are your expectations? *</Label>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Screening Experience (1-10) *</Label>
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
                      <span className="text-lg font-medium">{formData.screeningExperience}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Education/Counseling Experience (1-10) *</Label>
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
                      <span className="text-lg font-medium">{formData.counselingExperience}</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Availability
                  </h2>

                  <div className="space-y-4">
                    <Label>Select 4 or more available Saturdays *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {availableDates.map((date) => (
                        <div key={date} className="flex items-center space-x-2">
                          <Checkbox
                            id={date}
                            checked={formData.selectedDates.includes(date)}
                            onCheckedChange={() => handleDateToggle(date)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={date}>{date}</Label>
                        </div>
                      ))}
                    </div>
                    {formData.selectedDates.length > 0 && (
                      <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                        Selected: {formData.selectedDates.length} dates
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Team Preference *</Label>
                    <RadioGroup
                      value={formData.teamPreference}
                      onValueChange={(value) => setFormData({ ...formData, teamPreference: value })}
                      disabled={isSubmitting}
                      className="space-y-2"
                    >
                      {teams.map((team) => (
                        <div key={team} className="flex items-center space-x-2">
                          <RadioGroupItem value={team} id={team} disabled={isSubmitting} />
                          <Label htmlFor={team}>{team}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="backup"
                      checked={formData.isBackupVolunteer}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, isBackupVolunteer: checked as boolean })
                      }
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="backup">
                      I am interested in being a backup volunteer
                    </Label>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Additional Information
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="clinicalExperience">
                      Share a clinical experience or an outreach experience you have had (optional)
                    </Label>
                    <Textarea
                      id="clinicalExperience"
                      value={formData.clinicalExperience}
                      onChange={(e) => setFormData({ ...formData, clinicalExperience: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || formData.selectedDates.length < 4}
                  className="w-full h-12 bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
                
                {formData.selectedDates.length < 4 && formData.selectedDates.length > 0 && (
                  <p className="text-sm text-[#eeba2b] text-center">
                    Please select at least 4 available dates to submit your application
                  </p>
                )}
              </form>
            </motion.div>

            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center text-[#2F3332] dark:text-[#E6E7E7]"
            >
              <p className="mb-4">
                This phase of the clinic will run for a maximum of 3 months. Each volunteer is required to appear for 4 or more sessions, with each session lasting 4 hours from 8AM to 12noon on Saturdays.
              </p>
              <p className="text-sm">
                For questions about volunteering, please contact us at{" "}
                <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] hover:text-[#eeba2b]">
                  akomapahealth@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
