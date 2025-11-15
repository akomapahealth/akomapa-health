"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Info, ArrowRight, DollarSign, Calendar, Heart, Sparkles } from "lucide-react";
import Image from "@/components/common/Image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "@/components/payments/StripePayment";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// Payment method options
const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay securely with your credit or debit card",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay using any mobile money service in Ghana",
  },
];

// Partner donation amounts
const partnerAmounts = [
  { value: "20", label: "$20", description: "Monthly" },
  { value: "50", label: "$50", description: "Monthly" },
  { value: "100", label: "$100", description: "Monthly" },
  { value: "custom", label: "Other", description: "Custom amount" },
];

// One-time donation amounts
const oneTimeAmounts = [
  { value: "10", label: "$10" },
  { value: "25", label: "$25" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom" },
];

// Partner benefits
const partnerBenefits = [
  {
    title: "Quarterly 'Heartbeat' Updates",
    description: "Clinic impact and stories from the field"
  },
  {
    title: "Early Event Invitations",
    description: "Akomapa events and webinars"
  },
  {
    title: "Behind-the-Scenes Access",
    description: "Research, photos, and clinic milestones"
  },
  {
    title: "Part of Something Bold",
    description: "Deep sense of knowing you're part of something lasting"
  }
];

// Impact areas
const impactAreas = [
  {
    title: "Early Disease Detection",
    description: "Reach patients with high blood pressure and diabetes before it's too late, preventing life-threatening complications through regular screenings and monitoring.",
    color: "#0097b2"
  },
  {
    title: "Professional Development",
    description: "Train the next generation of ethical, community-minded health professionals who understand the unique needs of underserved populations.",
    color: "#eeba2b"
  },
  {
    title: "Program Expansion",
    description: "Power our upcoming pharmacy and food security programs that will provide comprehensive care beyond clinical services.",
    color: "#0097b2"
  },
  {
    title: "Scalable Model",
    description: "Build a replicable model of healthcare delivery in Ghana and beyond, demonstrating sustainable solutions for underserved communities.",
    color: "#eeba2b"
  }
];

export default function PartnerPage() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedPartnerAmount, setSelectedPartnerAmount] = useState("20");
  const [selectedOneTimeAmount, setSelectedOneTimeAmount] = useState("25");
  const [customPartnerAmount, setCustomPartnerAmount] = useState("");
  const [customOneTimeAmount, setCustomOneTimeAmount] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");
  const [showMobileMoneyInfo, setShowMobileMoneyInfo] = useState(false);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [activeSection, setActiveSection] = useState<"partner" | "one-time">("partner");
  const [paymentStatus, setPaymentStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handlePaymentSuccess = async () => {
    try {
      await sendDonationNotification();
    } catch (error) {
      console.error("Failed to send notification email:", error);
      setPaymentStatus({
        type: "success",
        message: "Thank you for your partnership! Your payment was successful. Note: Email confirmation may be delayed.",
      });
      return;
    }

    setPaymentStatus({
      type: "success",
      message: "Thank you for your partnership! Your payment was successful.",
    });
    setShowDonorForm(false);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus({
      type: "error",
      message: error,
    });
  };

  const sendDonationNotification = async () => {
    const frequencyText = activeSection === "partner" ? "monthly" : selectedFrequency;
    const amount = getDonationAmount();
    
    const emailData = {
      to: "akomapahealth@gmail.com",
      subject: `New ${activeSection === "partner" ? "Partner" : "Donation"} from ${donorName}`,
      html: `
        <h2>New ${activeSection === "partner" ? "Partner" : "Donation"} Received</h2>
        <p><strong>Donor Name:</strong> ${donorName}</p>
        <p><strong>Donor Email:</strong> ${donorEmail}</p>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Frequency:</strong> ${frequencyText}</p>
        <p><strong>Type:</strong> ${activeSection === "partner" ? "Partner Program" : "One-Time Gift"}</p>
        <p><strong>Payment Method:</strong> ${selectedMethod === "card" ? "Credit/Debit Card" : "Mobile Money"}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      `
    };

    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send notification email");
    }
  };

  const getDonationAmount = () => {
    if (activeSection === "partner") {
      if (selectedPartnerAmount === "custom") {
        const amount = parseFloat(customPartnerAmount) || 0;
        return amount > 0 ? amount : 0;
      }
      return parseFloat(selectedPartnerAmount);
    } else {
      if (selectedOneTimeAmount === "custom") {
        const amount = parseFloat(customOneTimeAmount) || 0;
        return amount > 0 ? amount : 0;
      }
      return parseFloat(selectedOneTimeAmount);
    }
  };

  const handlePayClick = () => {
    if (selectedMethod === "card") {
      setShowDonorForm(true);
    } else {
      setShowMobileMoneyInfo(!showMobileMoneyInfo);
    }
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
              Every act of generosity saves a life.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              At Akomapa, we believe that healing is a shared calling—and transformation begins with bold hearts who dare to act. We are building something rare: a student-powered, community-rooted, and ethically led model of care for people who&apos;ve long been left behind.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Partnership Options - Bento Style Tab Switcher */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Bento Style Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <div className="relative max-w-2xl mx-auto">
                <div className="relative bg-white dark:bg-[#2F3332] rounded-3xl p-2 shadow-2xl border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 overflow-hidden">
                  {/* Animated Background Indicator */}
                  <motion.div
                    className="absolute top-2 bottom-2 rounded-2xl bg-gradient-to-r from-[#eeba2b] to-[#F5C94D]"
                    initial={false}
                    animate={{
                      left: activeSection === "partner" ? "4px" : "50%",
                      width: "calc(50% - 4px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  {/* Tab Buttons */}
                  <div className="relative flex gap-2">
                    <button
                      onClick={() => setActiveSection("partner")}
                      className={`flex-1 relative z-10 py-4 sm:py-5 px-4 sm:px-6 rounded-2xl text-center font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                        activeSection === "partner"
                          ? "text-[#1C1F1E] shadow-lg"
                          : "text-[#2F3332]/60 dark:text-[#E6E7E7]/60 hover:text-[#2F3332] dark:hover:text-[#E6E7E7]"
                      }`}
                    >
                      <span>Partners Program</span>
                      <motion.span
                        initial={{ opacity: 0.8, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#eeba2b] to-[#F5C94D] text-[#1C1F1E] rounded-full text-xs font-bold shadow-sm"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span className="hidden sm:inline">Featured</span>
                      </motion.span>
                    </button>
                    <button
                      onClick={() => setActiveSection("one-time")}
                      className={`flex-1 relative z-10 py-4 sm:py-5 px-4 sm:px-6 rounded-2xl text-center font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 cursor-pointer ${
                        activeSection === "one-time"
                          ? "text-[#1C1F1E] shadow-lg"
                          : "text-[#2F3332]/60 dark:text-[#E6E7E7]/60 hover:text-[#2F3332] dark:hover:text-[#E6E7E7]"
                      }`}
                    >
                      One-Time Gift
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Partner Program Section */}
            {activeSection === "partner" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Partner Program Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 mb-8 sm:mb-12"
                >
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 sm:mb-6">
                      The Akomapa Partners Program
                    </h2>
                    <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed max-w-3xl mx-auto">
                      But we cannot do it alone. The Akomapa Partners Program is a growing community of monthly donors who believe in our mission and walk with us—month by month, life by life. Whether you give $20, $50, $100, or more, your partnership sustains free care, medication, NHIS enrollment, and student training in some of Ghana&apos;s most underserved communities.
                    </p>
                  </div>
                  
                  {/* Key Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-md mx-auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-[#eeba2b]/20 to-[#eeba2b]/10 dark:from-[#eeba2b]/30 dark:to-[#eeba2b]/20 rounded-xl p-4 sm:p-6 text-center border border-[#eeba2b]/30"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#eeba2b] dark:text-[#F5C94D] mb-2">50+</div>
                      <div className="text-xs sm:text-sm text-[#2F3332] dark:text-[#E6E7E7] font-medium">Patients Served Monthly</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-[#0097b2]/20 to-[#0097b2]/10 dark:from-[#0097b2]/30 dark:to-[#0097b2]/20 rounded-xl p-4 sm:p-6 text-center border border-[#0097b2]/30"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0097b2] dark:text-[#66C4DC] mb-2">$20</div>
                      <div className="text-xs sm:text-sm text-[#2F3332] dark:text-[#E6E7E7] font-medium">Monthly Impact Starts</div>
                    </motion.div>
                  </div>
                  
                  {/* Partner Image */}
                  <div className="mt-8 sm:mt-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-[#E6E7E7]/20 dark:border-[#4F5554]/20"
                    >
                      <Image
                        src="/highlights/Akomapa-66.jpg"
                        alt="Akomapa Partners Program - Community healthcare delivery"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 bg-[#eeba2b] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium z-20">
                        Partners Program
                      </div>
                    </motion.div>
                  </div>

                  {/* Impact Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    {impactAreas.map((impact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative rounded-2xl bg-gradient-to-br from-white to-white/80 dark:from-[#2F3332] dark:to-[#2F3332]/80 p-5 sm:p-6 md:p-7 border-2 border-[#E6E7E7]/60 dark:border-[#4F5554]/60 hover:border-opacity-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                        style={{ 
                          borderLeftColor: `${impact.color}40`,
                          borderLeftWidth: '4px'
                        }}
                      >
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: impact.color }}
                            />
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] leading-tight">
                              {impact.title}
                            </h3>
                          </div>
                          <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed pl-6">
                            {impact.description}
                          </p>
                        </div>
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                          style={{ backgroundColor: impact.color }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Partner Benefits */}
                  <div className="bg-gradient-to-br from-[#eeba2b]/10 to-[#eeba2b]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] rounded-xl p-6 sm:p-8 border border-[#eeba2b]/20 dark:border-[#eeba2b]/30">
                    <div className="flex items-center gap-2 justify-center mb-6">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 text-center">
                      As a Partner, you&apos;ll receive:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {partnerBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex flex-col p-4 rounded-lg bg-white/60 dark:bg-[#2F3332]/60 hover:bg-white/80 dark:hover:bg-[#2F3332]/80 transition-colors"
                        >
                          <h4 className="font-semibold text-base sm:text-lg text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                            {benefit.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Partner Donation Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20"
                >
                  <div className="flex items-center gap-2 justify-center mb-6">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-8 text-center">
                    Choose Your Monthly Partnership Amount
                  </h3>
                  
                  {/* Partner Amount Selection - Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                    {partnerAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        onClick={() => setSelectedPartnerAmount(amount.value)}
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          selectedPartnerAmount === amount.value
                            ? "border-[#eeba2b] bg-[#eeba2b]/10 shadow-lg transform scale-105"
                            : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#eeba2b]/50"
                        }`}
                      >
                        <div className="text-lg md:text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {amount.label}
                        </div>
                        <div className="text-xs md:text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                          {amount.description}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPartnerAmount === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 sm:mb-8"
                    >
                      <Label className="text-[#1C1F1E] dark:text-[#FCFAEF] mb-2 block text-sm sm:text-base">
                        Enter your monthly amount
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customPartnerAmount}
                        onChange={(e) => setCustomPartnerAmount(e.target.value)}
                        className="h-12 bg-[#FCFAEF] dark:bg-[#1C1F1E] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] text-base sm:text-lg"
                      />
                    </motion.div>
                  )}

                  {/* Payment Method */}
                  <div className="mb-8">
                    <Label className="text-base sm:text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 block">
                      Select Payment Method
                    </Label>
                    <RadioGroup
                      value={selectedMethod}
                      onValueChange={setSelectedMethod}
                      className="space-y-3 sm:space-y-4"
                    >
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedMethod === method.id
                              ? "border-[#eeba2b] bg-[#eeba2b]/10 shadow-lg"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#eeba2b]/50 hover:shadow-md"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="text-[#eeba2b]"
                          />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div>
                              <div className="font-semibold text-base sm:text-lg text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">
                                {method.name}
                              </div>
                              <div className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                                {method.description}
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Donor Details Form */}
                  {showDonorForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-lg"
                    >
                      <h3 className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                        Please provide your details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="donorName" className="text-[#2F3332] dark:text-[#E6E7E7]">
                            Full Name *
                          </Label>
                          <Input
                            id="donorName"
                            type="text"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your full name"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorEmail" className="text-[#2F3332] dark:text-[#E6E7E7]">
                            Email Address *
                          </Label>
                          <Input
                            id="donorEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payment Form */}
                  {selectedMethod === "card" && showDonorForm && donorName && donorEmail && (
                    <Elements stripe={stripePromise}>
                      <StripePayment
                        amount={getDonationAmount()}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        frequency="monthly"
                        donorName={donorName}
                        donorEmail={donorEmail}
                      />
                    </Elements>
                  )}

                  {/* Pay Button for Card Payments */}
                  {selectedMethod === "card" && !showDonorForm && (
                    <Button
                      type="button"
                      onClick={handlePayClick}
                      className="w-full h-12 bg-[#eeba2b] hover:bg-[#0097b2] text-[#FCFAEF] text-lg"
                    >
                      Become a Partner
                    </Button>
                  )}

                  {/* Mobile Money */}
                  {selectedMethod === "mobile" && (
                    <div className="space-y-4">
                      <Button
                        type="button"
                        className="w-full h-12 bg-[#eeba2b] hover:bg-[#0097b2] text-[#FCFAEF] text-lg"
                        onClick={handlePayClick}
                      >
                        Pay with Mobile Money
                      </Button>
                      
                      {showMobileMoneyInfo && (
                        <Alert className="bg-[#FCFAEF] dark:bg-[#2F3332] border-[#eeba2b]">
                          <Info className="h-4 w-4 text-[#eeba2b]" />
                          <AlertDescription className="text-[#2F3332] dark:text-[#E6E7E7]">
                            <div className="space-y-2">
                              <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Send your monthly partnership to:</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> Akomapa Health Foundation</p>
                                <p><strong>Phone Number:</strong> +233 54 111 1111</p>
                                <p><strong>Amount:</strong> ${getDonationAmount()} (monthly)</p>
                                <p><strong>Reference:</strong> Your name + &quot;Partner&quot;</p>
                              </div>
                              <p className="mt-4 text-sm">
                                After sending the payment, please email us at{" "}
                                <a href="mailto:akomapahealth@gmail.com" className="text-[#eeba2b] hover:text-[#0097b2]">
                                  akomapahealth@gmail.com
                                </a>{" "}
                                with your payment confirmation.
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* One-Time Gift Section */}
            {activeSection === "one-time" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* One-Time Gift Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 mb-8 sm:mb-12"
                >
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 sm:mb-6">
                      Make a One-Time or Monthly Gift
                    </h2>
                    <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-3xl mx-auto leading-relaxed">
                      Want to give at your own pace? Use our secure donation form to give any amount, once or monthly. Every contribution, large or small, fuels medications, labs, and care at our clinic sites.
                    </p>
                  </div>

                  {/* Benefits List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { 
                        title: "Choose any amount",
                        icon: DollarSign,
                        description: "Give what feels right for you, whether it's $10 or $1,000"
                      },
                      { 
                        title: "Set your own frequency",
                        icon: Calendar,
                        description: "One-time, monthly, or annual—you decide when and how often"
                      },
                      { 
                        title: "100% supports care",
                        icon: Heart,
                        description: "Every dollar goes directly to patient care and clinic operations"
                      }
                    ].map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-center p-5 sm:p-6 md:p-7 bg-gradient-to-br from-[#0097b2]/10 to-[#0097b2]/5 dark:from-[#0097b2]/20 dark:to-[#0097b2]/10 rounded-2xl border-2 border-[#0097b2]/30 dark:border-[#0097b2]/40 hover:border-[#0097b2]/60 dark:hover:border-[#0097b2]/70 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 sm:p-4 rounded-full bg-[#0097b2]/20 dark:bg-[#0097b2]/30 border-2 border-[#0097b2]/40">
                              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#0097b2] dark:text-[#66C4DC]" />
                            </div>
                          </div>
                          <h4 className="text-base sm:text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2 sm:mb-3">
                            {benefit.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]/70 leading-relaxed">
                            {benefit.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* One-Time Donation Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20"
                >
                  <div className="flex items-center gap-2 justify-center mb-6">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-8 text-center">
                    Choose Your Gift Amount
                  </h3>
                  
                  {/* Amount Selection - Enhanced Responsive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
                    {oneTimeAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        onClick={() => setSelectedOneTimeAmount(amount.value)}
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          selectedOneTimeAmount === amount.value
                            ? "border-[#0097b2] bg-[#0097b2]/10 shadow-lg transform scale-105"
                            : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#0097b2]/50"
                        }`}
                      >
                        <div className="text-lg md:text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {amount.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedOneTimeAmount === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 sm:mb-8"
                    >
                      <Label className="text-[#1C1F1E] dark:text-[#FCFAEF] mb-2 block text-sm sm:text-base">
                        Enter your gift amount
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customOneTimeAmount}
                        onChange={(e) => setCustomOneTimeAmount(e.target.value)}
                        className="h-12 bg-[#FCFAEF] dark:bg-[#1C1F1E] border-[#0097b2] focus:border-[#eeba2b] dark:border-[#66C4DC] dark:focus:border-[#F5C94D] text-base sm:text-lg"
                      />
                    </motion.div>
                  )}

                  {/* Donation Frequency */}
                  <div className="mb-8">
                    <Label className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 block">
                      Select Donation Frequency
                    </Label>
                    <RadioGroup
                      value={selectedFrequency}
                      onValueChange={setSelectedFrequency}
                      className="space-y-4"
                    >
                      {[
                        { value: "one-time", label: "One-Time Gift" },
                        { value: "monthly", label: "Monthly Gift" },
                        { value: "annually", label: "Annual Gift" },
                      ].map((frequency) => (
                        <div
                          key={frequency.value}
                          className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedFrequency === frequency.value
                              ? "border-[#0097b2] bg-[#0097b2]/5"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#0097b2]/50"
                          }`}
                          onClick={() => setSelectedFrequency(frequency.value)}
                        >
                          <RadioGroupItem
                            value={frequency.value}
                            id={frequency.value}
                            className="text-[#0097b2]"
                          />
                          <Label
                            htmlFor={frequency.value}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                              {frequency.label}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <Label className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 block">
                      Select Payment Method
                    </Label>
                    <RadioGroup
                      value={selectedMethod}
                      onValueChange={setSelectedMethod}
                      className="space-y-4"
                    >
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedMethod === method.id
                              ? "border-[#0097b2] bg-[#0097b2]/5"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#0097b2]/50"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="text-[#0097b2]"
                          />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <method.icon className="h-6 w-6 mr-3 text-[#0097b2]" />
                              <div>
                                <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                                  {method.name}
                                </div>
                                <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                  {method.description}
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Donor Details Form */}
                  {showDonorForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-lg"
                    >
                      <h3 className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                        Please provide your details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="donorName" className="text-[#2F3332] dark:text-[#E6E7E7]">
                            Full Name *
                          </Label>
                          <Input
                            id="donorName"
                            type="text"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your full name"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorEmail" className="text-[#2F3332] dark:text-[#E6E7E7]">
                            Email Address *
                          </Label>
                          <Input
                            id="donorEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payment Form */}
                  {selectedMethod === "card" && showDonorForm && donorName && donorEmail && (
                    <Elements stripe={stripePromise}>
                      <StripePayment
                        amount={getDonationAmount()}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        frequency={selectedFrequency}
                        donorName={donorName}
                        donorEmail={donorEmail}
                      />
                    </Elements>
                  )}

                  {/* Pay Button for Card Payments */}
                  {selectedMethod === "card" && !showDonorForm && (
                    <Button
                      type="button"
                      onClick={handlePayClick}
                      className="w-full h-12 bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] text-lg"
                    >
                      Continue to Payment
                    </Button>
                  )}

                  {/* Mobile Money */}
                  {selectedMethod === "mobile" && (
                    <div className="space-y-4">
                      <Button
                        type="button"
                        className="w-full h-12 bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] text-lg"
                        onClick={handlePayClick}
                      >
                        Pay with Mobile Money
                      </Button>
                      
                      {showMobileMoneyInfo && (
                        <Alert className="bg-[#FCFAEF] dark:bg-[#2F3332] border-[#0097b2]">
                          <Info className="h-4 w-4 text-[#0097b2]" />
                          <AlertDescription className="text-[#2F3332] dark:text-[#E6E7E7]">
                            <div className="space-y-2">
                              <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Send your donation to:</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> Akomapa Health Foundation</p>
                                <p><strong>Phone Number:</strong> +233 54 111 1111</p>
                                <p><strong>Amount:</strong> ${getDonationAmount()}</p>
                                <p><strong>Reference:</strong> Your name + &quot;Donation&quot;</p>
                              </div>
                              <p className="mt-4 text-sm">
                                After sending the payment, please email us at{" "}
                                <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] hover:text-[#eeba2b]">
                                  akomapahealth@gmail.com
                                </a>{" "}
                                with your payment confirmation.
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Payment Status Alert */}
      {paymentStatus.type && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert
            variant={paymentStatus.type === "success" ? "default" : "destructive"}
            className="shadow-lg"
          >
            {paymentStatus.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{paymentStatus.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Corporate Sponsorship Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                CORPORATE PARTNERSHIPS
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#FCFAEF]">
                Corporate Sponsorship Opportunities
              </h2>
              <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-3xl mx-auto">
                We welcome corporate partnerships with mission-aligned businesses and organizations seeking to invest in health equity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#FCFAEF]">
                    Transform Lives Together
                  </h3>
                  <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed mb-6">
                    Your company&apos;s support can transform lives, and we&apos;re happy to work with you to recognize your contribution, including co-branding opportunities, features in our updates, and involvement in community events.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F5C94D] mt-2 flex-shrink-0" />
                    <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
                      Financial contributions
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F5C94D] mt-2 flex-shrink-0" />
                    <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
                      Donations of medications and medical supplies
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F5C94D] mt-2 flex-shrink-0" />
                    <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
                      Equipment or service support for our clinics
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F5C94D] mt-2 flex-shrink-0" />
                    <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
                      Collaboration on health education or outreach campaigns
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  className="group bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] mt-6 sm:mt-8"
                >
                  <a href="/partner/corporate-sponsorship" className="flex items-center">
                    Learn More About Corporate Sponsorship
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <Image
                  src="/highlights/Akomapa-73.jpg"
                  alt="Corporate partnerships and collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
