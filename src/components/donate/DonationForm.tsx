"use client";

import { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StripePayment from "@/components/payments/StripePayment";
import AmountSelector from "@/components/donate/AmountSelector";
import FrequencyToggle from "@/components/donate/FrequencyToggle";
import { DonationFrequency, paymentMethods, PaymentMethod } from "@/data/donation";
import { cn } from "@/lib/utils";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function DonationForm() {
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(100);
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const paymentFrequency = useMemo(() => (frequency === "monthly" ? "monthly" : "one-time"), [frequency]);
  const canProcessCard = amount > 0 && donorName.trim().length > 0 && donorEmail.trim().length > 0;

  const handlePreset = (preset: number | "custom") => {
    setSelectedPreset(preset);
    if (preset !== "custom") {
      setAmount(preset);
    } else {
      setAmount(0);
    }
  };

  const handleCustomChange = (value: string) => {
    const parsed = Number(value);
    setAmount(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E6E7E7] bg-white p-6 shadow-sm dark:border-[#4F5554] dark:bg-[#2F3332] md:p-8">
          <h2 className="mb-2 text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Choose your donation</h2>
          <p className="mb-8 text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            Monthly support is prioritized because it sustains clinics year-round.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <FrequencyToggle value={frequency} onChange={setFrequency} />
              <AmountSelector
                value={amount}
                selectedPreset={selectedPreset}
                onSelectPreset={handlePreset}
                onCustomChange={handleCustomChange}
              />

              <div className="space-y-3">
                <p className="text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">Your details</p>
                <Input placeholder="Full name" value={donorName} onChange={(event) => setDonorName(event.target.value)} />
                <Input placeholder="Email address" type="email" value={donorEmail} onChange={(event) => setDonorEmail(event.target.value)} />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">Select payment method</p>
              <div className="grid gap-2">
                {paymentMethods.map((paymentMethod) => (
                  <button
                    key={paymentMethod.id}
                    type="button"
                    onClick={() => setMethod(paymentMethod.id)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition",
                      method === paymentMethod.id
                        ? "border-lapis bg-lapis/10"
                        : "border-[#E6E7E7] hover:border-lapis/60 dark:border-[#4F5554]",
                    )}
                  >
                    {paymentMethod.label}
                  </button>
                ))}
              </div>

              {method === "card" && (
                <div className="rounded-xl border border-[#E6E7E7] p-4 dark:border-[#4F5554]">
                  {!stripePromise && (
                    <Alert variant="destructive">
                      <AlertDescription>Stripe is not configured. Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.</AlertDescription>
                    </Alert>
                  )}
                  {stripePromise && canProcessCard && (
                    <Elements stripe={stripePromise}>
                      <StripePayment
                        amount={amount}
                        onSuccess={() => setStatus({ type: "success", message: "Thank you. Your donation was successful." })}
                        onError={(error) => setStatus({ type: "error", message: error })}
                        frequency={paymentFrequency}
                        donorName={donorName}
                        donorEmail={donorEmail}
                      />
                    </Elements>
                  )}
                  {stripePromise && !canProcessCard && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>Please choose an amount and add your name and email to continue.</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {method === "momo" && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Send via MTN Mobile Money to <strong>+233 54 111 1111</strong> with your name as reference.
                  </AlertDescription>
                </Alert>
              )}

              {method === "paypal" && (
                <Button asChild className="w-full">
                  <a href="https://paypal.me/akomapahealth" target="_blank" rel="noreferrer">
                    Continue to PayPal Giving
                  </a>
                </Button>
              )}

              {method === "bank" && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Bank transfer: Ghana Commercial Bank, Akomapa Health Foundation, Account: 1234567890.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {status.type && (
            <Alert className={cn("mt-6", status.type === "success" ? "border-lapis" : "")} variant={status.type === "error" ? "destructive" : "default"}>
              {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
}
