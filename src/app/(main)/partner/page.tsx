"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Heart, Users, Globe, Building, Mail, DollarSign, CheckCircle, Info, Star, Gift, Shield, Target } from "lucide-react";
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
    icon: Heart,
    title: "Quarterly 'Heartbeat' Updates",
    description: "Clinic impact and stories from the field"
  },
  {
    icon: Star,
    title: "Early Event Invitations",
    description: "Akomapa events and webinars"
  },
  {
    icon: Gift,
    title: "Behind-the-Scenes Access",
    description: "Research, photos, and clinic milestones"
  },
  {
    icon: Shield,
    title: "Part of Something Bold",
    description: "Deep sense of knowing you're part of something lasting"
  }
];

// Impact areas
const impactAreas = [
  {
    icon: Target,
    title: "Reach patients with high blood pressure and diabetes before it's too late",
    color: "#007A73"
  },
  {
    icon: Users,
    title: "Train the next generation of ethical, community-minded health professionals",
    color: "#C37B1E"
  },
  {
    icon: Building,
    title: "Power our upcoming pharmacy and food security programs",
    color: "#007A73"
  },
  {
    icon: Globe,
    title: "Build a replicable model of healthcare in Ghana and beyond",
    color: "#C37B1E"
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
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/highlights/Akomapa-73.jpg"
            alt="group of people"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#007A73] dark:text-[#FCFAEF] mb-6"
            >
              Partner With Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-8"
            >
              Every cedi, every dollar, every act of generosity saves a life.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-left"
            >
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
                At Akomapa, we believe that healing is a shared calling—and transformation begins with bold hearts who dare to act.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                We are building something rare: a student-powered, community-rooted, and ethically led model of care for people who&apos;ve long been left behind. We are not waiting for change—we are becoming it. One patient. One clinic day. One act of compassion at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Options - Enhanced Layout */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Tab Navigation with Visual Hierarchy */}
            <div className="mb-16">
              {/* Featured Partner Program - More Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative mb-8"
              >
                <button
                  onClick={() => setActiveSection("partner")}
                  className={`w-full p-6 md:p-8 rounded-2xl text-center transition-all duration-500 relative overflow-hidden cursor-pointer ${
                    activeSection === "partner"
                      ? "bg-gradient-to-br from-[#C37B1E] via-[#D4851F] to-[#C37B1E] text-[#FCFAEF] shadow-2xl transform scale-105"
                      : "bg-white dark:bg-[#2F3332] text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#C37B1E]/10 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-50"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className={`p-3 rounded-full ${activeSection === "partner" ? "bg-white/20" : "bg-[#C37B1E]/10"}`}>
                        <Heart className={`h-8 w-8 ${activeSection === "partner" ? "text-white" : "text-[#C37B1E]"}`} />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold">The Akomapa Partners Program</span>
                    </div>
                    <p className="text-lg md:text-xl opacity-90 mb-2">💛 Our Featured Partnership Opportunity</p>
                    <p className="text-base md:text-lg opacity-80">Join a community of monthly donors changing lives in Ghana</p>
                    
                    {activeSection === "partner" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-medium"
                      >
                        ✨ Currently Active
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>

              {/* Secondary Option - More Subtle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setActiveSection("one-time")}
                  className={`w-full p-4 md:p-6 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                    activeSection === "one-time"
                      ? "bg-[#007A73] text-[#FCFAEF] shadow-lg"
                      : "bg-white/60 dark:bg-[#2F3332]/60 text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#007A73]/10 border border-[#E6E7E7] dark:border-[#4F5554]"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Gift className="h-6 w-6" />
                    <span className="text-lg font-semibold">Alternative: Make a One-Time or Monthly Gift</span>
                  </div>
                  <p className="text-sm mt-1 opacity-80">Flexible giving options for your convenience</p>
                </button>
              </motion.div>

              {/* Corporate Sponsorship Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <a href="/corporate-sponsorship">
                  <button className="w-full p-4 rounded-xl text-center transition-all duration-300 bg-gradient-to-r from-[#007A73]/10 to-[#C37B1E]/10 dark:from-[#007A73]/20 dark:to-[#C37B1E]/20 text-[#1C1F1E] dark:text-[#FCFAEF] hover:from-[#007A73]/20 hover:to-[#C37B1E]/20 border border-[#007A73]/30 dark:border-[#007A73]/50 cursor-pointer">
                    <div className="flex items-center justify-center space-x-3">
                      <Building className="h-6 w-6 text-[#007A73]" />
                      <span className="text-lg font-semibold">Corporate Sponsorship Opportunities</span>
                      <span className="text-sm bg-[#C37B1E] text-white px-2 py-1 rounded-full">NEW</span>
                    </div>
                    <p className="text-sm mt-1 opacity-80">Comprehensive partnership opportunities for businesses and organizations</p>
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Partner Program Section */}
            {activeSection === "partner" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Partner Program Description with Slideshow */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 md:p-8 shadow-lg border-2 border-[#C37B1E]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                        The Akomapa Partners Program
                      </h2>
                      <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                        But we cannot do it alone. The Akomapa Partners Program is a growing community of monthly donors who believe in our mission and walk with us—month by month, life by life. Whether you give $20, $50, $100, or more, your partnership sustains free care, medication, NHIS enrollment, and student training in some of Ghana&apos;s most underserved communities.
                      </p>
                      
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-lg p-4 text-center">
                          <div className="text-2xl md:text-3xl font-bold text-[#C37B1E] dark:text-[#F3C677]">50+</div>
                          <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Patients Served Monthly</div>
                        </div>
                        <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-4 text-center">
                          <div className="text-2xl md:text-3xl font-bold text-[#007A73] dark:text-[#63B0AC]">$20</div>
                          <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Monthly Impact Starts</div>
                        </div>
                      </div>
                    </div>

                    {/* Image Slideshow */}
                    <div className="order-1 lg:order-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#C37B1E]/40 via-transparent to-transparent z-10"></div>
                        
                        {/* Slideshow Container */}
                        <div className="relative w-full h-full">
                          {/* Image 1 */}
                          <motion.div
                            key="slide1"
                            initial={{ opacity: 1 }}
                            animate={{ 
                              opacity: [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                              scale: [1, 1.05, 1.05, 1, 1, 1, 1, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/gallery/gallery-pic-4.JPG"
                              alt="Healthcare professionals providing compassionate care"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 2 */}
                          <motion.div
                            key="slide2"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                              scale: [1, 1, 1, 1.05, 1.05, 1, 1, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-66.jpg"
                              alt="Students leading clinical care in community settings"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 3 */}
                          <motion.div
                            key="slide3"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                              scale: [1, 1, 1, 1, 1, 1.05, 1.05, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/gallery/gallery-pic-24.JPG"
                              alt="Global health leadership training in action"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 4 */}
                          <motion.div
                            key="slide4"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                              scale: [1, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-30.jpg"
                              alt="Community partnership and collaboration"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 5 */}
                          <motion.div
                            key="slide5"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                              scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.05]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-23.jpg"
                              alt="Expert supervision ensuring quality care"
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </div>

                        {/* Slideshow Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-2 h-2 rounded-full bg-white/60"
                              animate={{
                                backgroundColor: [
                                  "rgba(255,255,255,0.6)",
                                  "rgba(255,255,255,0.6)",
                                  dot === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 2 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 3 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 4 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 5 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  "rgba(255,255,255,0.6)"
                                ]
                              }}
                              transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>

                        {/* Partner Program Badge */}
                        <div className="absolute top-4 right-4 bg-[#C37B1E] text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                          Partners Program
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Impact Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {impactAreas.map((impact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-[#FCFAEF]/50 dark:bg-[#1C1F1E]/50"
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${impact.color}20` }}
                        >
                          <impact.icon className="h-6 w-6" style={{ color: impact.color }} />
                        </div>
                        <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                          {impact.title}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Partner Benefits */}
                  <div className="bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 text-center">
                      🤝 As a Partner, you&apos;ll receive:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {partnerBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-8 h-8 bg-[#C37B1E]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <benefit.icon className="h-4 w-4 text-[#C37B1E]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Partner Donation Form */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 text-center">
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
                            ? "border-[#C37B1E] bg-[#C37B1E]/10 shadow-lg transform scale-105"
                            : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#C37B1E]/50"
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
                    <div className="mb-6">
                      <Label className="text-[#2F3332] dark:text-[#E6E7E7] mb-2 block">
                        Enter your monthly amount
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customPartnerAmount}
                        onChange={(e) => setCustomPartnerAmount(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  )}

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
                              ? "border-[#C37B1E] bg-[#C37B1E]/5"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#C37B1E]/50"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="text-[#C37B1E]"
                          />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <method.icon className="h-6 w-6 mr-3 text-[#C37B1E]" />
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
                      className="w-full h-12 bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF] text-lg"
                    >
                      Become a Partner
                    </Button>
                  )}

                  {/* Mobile Money */}
                  {selectedMethod === "mobile" && (
                    <div className="space-y-4">
                      <Button
                        type="button"
                        className="w-full h-12 bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF] text-lg"
                        onClick={handlePayClick}
                      >
                        Pay with Mobile Money
                      </Button>
                      
                      {showMobileMoneyInfo && (
                        <Alert className="bg-[#FCFAEF] dark:bg-[#2F3332] border-[#C37B1E]">
                          <Info className="h-4 w-4 text-[#C37B1E]" />
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
                                <a href="mailto:akomapahealth@gmail.com" className="text-[#C37B1E] hover:text-[#007A73]">
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
                </div>
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
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                      Make a One-Time or Monthly Gift
                    </h2>
                    <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] max-w-3xl mx-auto leading-relaxed">
                      Want to give at your own pace? Use our secure donation form to give any amount, once or monthly. Every contribution, large or small, fuels medications, labs, and care at our clinic sites.
                    </p>
                  </div>

                  {/* Benefits List - Enhanced Responsive Design */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Choose any amount</h4>
                    </div>
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Set your own frequency</h4>
                    </div>
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">100% supports care</h4>
                    </div>
                  </div>
                </div>

                {/* One-Time Donation Form */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 text-center">
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
                            ? "border-[#007A73] bg-[#007A73]/10 shadow-lg transform scale-105"
                            : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#007A73]/50"
                        }`}
                      >
                        <div className="text-lg md:text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {amount.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedOneTimeAmount === "custom" && (
                    <div className="mb-6">
                      <Label className="text-[#2F3332] dark:text-[#E6E7E7] mb-2 block">
                        Enter your gift amount
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customOneTimeAmount}
                        onChange={(e) => setCustomOneTimeAmount(e.target.value)}
                        className="h-12"
                      />
                    </div>
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
                              ? "border-[#007A73] bg-[#007A73]/5"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#007A73]/50"
                          }`}
                          onClick={() => setSelectedFrequency(frequency.value)}
                        >
                          <RadioGroupItem
                            value={frequency.value}
                            id={frequency.value}
                            className="text-[#007A73]"
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
                              ? "border-[#007A73] bg-[#007A73]/5"
                              : "border-[#E6E7E7] dark:border-[#4F5554] hover:border-[#007A73]/50"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="text-[#007A73]"
                          />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <method.icon className="h-6 w-6 mr-3 text-[#007A73]" />
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
                      className="w-full h-12 bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg"
                    >
                      Continue to Payment
                    </Button>
                  )}

                  {/* Mobile Money */}
                  {selectedMethod === "mobile" && (
                    <div className="space-y-4">
                      <Button
                        type="button"
                        className="w-full h-12 bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg"
                        onClick={handlePayClick}
                      >
                        Pay with Mobile Money
                      </Button>
                      
                      {showMobileMoneyInfo && (
                        <Alert className="bg-[#FCFAEF] dark:bg-[#2F3332] border-[#007A73]">
                          <Info className="h-4 w-4 text-[#007A73]" />
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
                                <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
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
                </div>
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

      {/* Corporate Sponsorship */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
                CORPORATE PARTNERSHIPS
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Corporate Sponsorship
              </h3>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
                We also welcome corporate partnerships with mission-aligned businesses and organizations seeking to invest in health equity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
            >
              <h4 className="text-xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Akomapa gratefully accepts:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Financial contributions</span>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Donations of medications and medical supplies</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Equipment or service support for our clinics</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Collaboration on health education or outreach campaigns</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-lg">
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-4">
                  Your company&apos;s support can transform lives, and we&apos;re happy to work with you to recognize your contribution, including co-branding opportunities, features in our updates, and involvement in community events. Let&apos;s create impact together.
                </p>
                <div className="text-center">
                  <a href="/corporate-sponsorship">
                    <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]">
                      <Mail className="h-4 w-4 mr-2" />
                      Check out our Corporate Sponsorship
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
