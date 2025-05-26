"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import Image from "@/components/common/Image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "@/components/payments/StripePayment";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Payment method options
const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay securely with your credit or debit card",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: SiPaypal,
    description: "Pay using your PayPal account",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay using any mobile money service in Ghana",
  },
];

// Donation amount presets
const donationAmounts = [
  { value: "10", label: "$10" },
  { value: "25", label: "$25" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom" },
];

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handlePaymentSuccess = () => {
    setPaymentStatus({
      type: "success",
      message: "Thank you for your donation! Your payment was successful.",
    });
    setIsProcessing(false);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus({
      type: "error",
      message: error,
    });
    setIsProcessing(false);
  };

  const getDonationAmount = () => {
    if (selectedAmount === "custom") {
      return parseFloat(customAmount) || 0;
    }
    return parseFloat(selectedAmount);
  };

  return (
    <div className="min-h-screen bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/donate-hero.jpg"
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
              Support Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Your donation helps us provide accessible healthcare and train the next generation of healthcare leaders in Ghana.
            </motion.p>
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
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {donationAmounts.map((amount) => (
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

              {/* Payment Form */}
              {selectedMethod === "card" && (
                <Elements stripe={stripePromise}>
                  <StripePayment
                    amount={getDonationAmount()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              )}

              {/* PayPal Button (placeholder) */}
              {selectedMethod === "paypal" && (
                <Button
                  type="button"
                  className="w-full h-12 bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg"
                  onClick={() => {
                    // PayPal integration will go here
                    console.log("PayPal payment initiated");
                  }}
                >
                  Pay with PayPal
                </Button>
              )}

              {/* Mobile Money Button (placeholder) */}
              {selectedMethod === "mobile" && (
                <Button
                  type="button"
                  className="w-full h-12 bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg"
                  onClick={() => {
                    // Mobile money integration will go here
                    console.log("Mobile money payment initiated");
                  }}
                >
                  Pay with Mobile Money
                </Button>
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
                Your donation is tax-deductible and will be used to support our mission of providing accessible healthcare in Ghana.
              </p>
              <p className="text-sm">
                For questions about donations, please contact us at{" "}
                <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
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
