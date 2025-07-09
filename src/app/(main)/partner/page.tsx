"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Heart, Users, Globe, Building, Mail, DollarSign, Calendar, CheckCircle, Info } from "lucide-react";
import { SiPaypal } from "react-icons/si";
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

// Donation frequency options
const donationFrequencies = [
  { value: "one-time", label: "One-Time Gift" },
  { value: "monthly", label: "Monthly Gift" },
  { value: "annually", label: "Annual Gift" },
];

// Partnership benefits
const partnerBenefits = [
  {
    icon: Heart,
    title: "Personalized Thank You",
    description: "A personalized thank-you from the Akomapa team"
  },
  {
    icon: Users,
    title: "Quarterly Impact Updates",
    description: "Regular updates showing how your support saves lives"
  },
  {
    icon: Globe,
    title: "Optional Recognition",
    description: "Optional recognition on our website (with your permission)"
  }
];

export default function PartnerPage() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedAmount, setSelectedAmount] = useState("20");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("one-time");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileMoneyInfo, setShowMobileMoneyInfo] = useState(false);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handlePaymentSuccess = async () => {
    // Send notification email
    try {
      await sendDonationNotification();
    } catch (error) {
      console.error("Failed to send notification email:", error);
      // Optionally show a warning (non-blocking) to the user
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
    setIsProcessing(false);
    setShowDonorForm(false);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus({
      type: "error",
      message: error,
    });
    setIsProcessing(false);
  };

  const sendDonationNotification = async () => {
    const frequencyText = selectedFrequency === "one-time" ? "one-time" : selectedFrequency;
    const amount = getDonationAmount();
    
    const emailData = {
      to: "akomapahealth@gmail.com",
      subject: `New Donation from ${donorName}`,
      html: `
        <h2>New Donation Received</h2>
        <p><strong>Donor Name:</strong> ${donorName}</p>
        <p><strong>Donor Email:</strong> ${donorEmail}</p>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Frequency:</strong> ${frequencyText}</p>
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
    if (selectedAmount === "custom") {
      const amount = parseFloat(customAmount) || 0;
      return amount > 0 ? amount : 0;
    }
    return parseFloat(selectedAmount);
  };

  const isPartnerProgram = selectedFrequency === "monthly" && getDonationAmount() >= 20;

  const handlePayClick = () => {
    if (selectedMethod === "card") {
      setShowDonorForm(true);
    } else {
      // For mobile money, show the info directly
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
            src="/hero-image.jpg"
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
                The Akomapa Student-Run Free Clinic exists to close healthcare gaps in underserved communities across Ghana. Your support directly funds life-saving care for patients living with chronic conditions like hypertension and diabetes — conditions that, without access to continuous treatment, can become fatal.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                We invite you to join our mission in two meaningful ways:
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* One-Time or Monthly Gift */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-[#007A73] dark:text-[#63B0AC]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Make a One-Time or Monthly Gift
                  </h2>
                </div>
                
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                  Want to give at your own pace? Use our secure donation form to give any amount, once or monthly. Every contribution, large or small, fuels medications, labs, and care at our clinic sites.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Choose any amount</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Set your own donation frequency (one-time, monthly, annually)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">100% of your donation supports patient care</span>
                  </li>
                </ul>
              </motion.div>

              {/* Akomapa Partner Program */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg border-2 border-[#C37B1E]"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#C37B1E]/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-[#C37B1E]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Become an Akomapa Partner
                  </h2>
                </div>
                
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                  Our Akomapa Partner Program is designed for individuals and organizations that are committed to walking with us over time. Partners commit to a monthly gift of $20 or more for at least one year — a steady stream of support that allows us to plan ahead, stock medications, and expand our services with confidence.
                </p>
                
                <h3 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">Benefits of becoming a partner:</h3>
                <div className="space-y-4 mb-8">
                  {partnerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-[#C37B1E]/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
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
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 md:p-8"
            >
              {/* Payment Status Alert */}
              {paymentStatus.type && (
                <Alert
                  variant={paymentStatus.type === "success" ? "default" : "destructive"}
                  className="mb-6"
                >
                  {paymentStatus.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{paymentStatus.message}</AlertDescription>
                </Alert>
              )}

              {/* Donation Amount */}
              <div className="mb-8">
                <Label className="text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 block">
                  Select Donation Amount
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[
                    { value: "10", label: "$10" },
                    { value: "20", label: "$20" },
                    { value: "50", label: "$50" },
                    { value: "100", label: "$100" },
                    { value: "custom", label: "Custom" }
                  ].map((amount) => (
                    <Button
                      key={amount.value}
                      type="button"
                      variant={selectedAmount === amount.value ? "default" : "outline"}
                      className={`h-12 ${
                        selectedAmount === amount.value
                          ? "bg-[#007A73] text-[#FCFAEF]"
                          : "bg-transparent border-[#007A73] text-[#007A73] hover:bg-[#007A73]/10"
                      }`}
                      onClick={() => setSelectedAmount(amount.value)}
                    >
                      {amount.label}
                    </Button>
                  ))}
                </div>
                {selectedAmount === "custom" && (
                  <div className="mt-4">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="h-12"
                    />
                  </div>
                )}
              </div>

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
                  {donationFrequencies.map((frequency) => (
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
                            <p><strong>Reference:</strong> Your name + "Donation"</p>
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

              {/* Partner Program Notice */}
              {isPartnerProgram && (
                <Alert className="mt-6 bg-[#C37B1E]/10 border-[#C37B1E]">
                  <CheckCircle2 className="h-4 w-4 text-[#C37B1E]" />
                  <AlertDescription className="text-[#C37B1E]">
                    You're joining our Akomapa Partner Program! You'll receive quarterly updates and personalized thank-yous.
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>

            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center text-[#2F3332] dark:text-[#E6E7E7]"
            >
              <p className="mb-4">
                All donations are securely processed through Stripe and are tax-deductible.
              </p>
              <p className="text-sm">
                For questions about partnerships, please contact us at{" "}
                <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
                  akomapahealth@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
                  Your company's support can transform lives, and we're happy to work with you to recognize your contribution, including co-branding opportunities, features in our updates, and involvement in community events. Let's create impact together.
                </p>
                <div className="text-center">
                  <a href="mailto:akomapahealth@gmail.com">
                    <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us for Corporate Sponsorship
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
