"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface StripePaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  frequency?: string;
  donorName?: string;
  donorEmail?: string;
}

export default function StripePayment({ 
  amount, 
  onSuccess, 
  onError, 
  frequency = "one-time",
  donorName = "",
  donorEmail = ""
}: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent or subscription on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount, 
          frequency,
          donorName,
          donorEmail
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (frequency === "monthly" || frequency === "annually") {
        // Handle subscription payment
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: donorName || "Donor",
                email: donorEmail || "donor@example.com",
              },
            },
          }
        );

        if (paymentError) {
          setError(paymentError.message || "An error occurred during payment");
          onError(paymentError.message || "Payment failed");
        } else if (paymentIntent.status === "succeeded") {
          onSuccess();
        }
      } else {
        // Handle one-time payment
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: donorName || "Donor",
                email: donorEmail || "donor@example.com",
              },
            },
          }
        );

        if (paymentError) {
          setError(paymentError.message || "An error occurred during payment");
          onError(paymentError.message || "Payment failed");
        } else if (paymentIntent.status === "succeeded") {
          onSuccess();
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred");
      onError("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonText = () => {
    if (isProcessing) return "Processing...";
    if (frequency === "monthly") return `Pay $${amount.toFixed(2)} Monthly`;
    if (frequency === "annually") return `Pay $${amount.toFixed(2)} Annually`;
    return `Pay $${amount.toFixed(2)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-white dark:bg-[#2F3332]">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1C1F1E",
                  "::placeholder": {
                    color: "#6B7280",
                  },
                },
              },
              // Add security features
              hidePostalCode: false,
            }}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full h-12 bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg"
      >
        {getButtonText()}
      </Button>
    </form>
  );
} 