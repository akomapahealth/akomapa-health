"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  getStripePromise,
  isStripeConfigured,
  StripeLoadError,
} from "@/lib/stripe-client";
import type StripePayment from "@/components/payments/StripePayment";

interface StripeCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  frequency?: string;
  donorName?: string;
  donorEmail?: string;
}

type StripeElementsComponent = ComponentType<{
  stripe: Promise<Stripe | null> | null;
  children: React.ReactNode;
}>;

type StripePaymentComponent = ComponentType<React.ComponentProps<typeof StripePayment>>;

type CheckoutState =
  | { status: "loading" }
  | { status: "not_configured" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      stripePromise: Promise<Stripe | null>;
      Elements: StripeElementsComponent;
      StripePayment: StripePaymentComponent;
    };

const STRIPE_UNAVAILABLE_MESSAGE =
  "Card payments are unavailable right now. Please use Mobile Money or try again later.";

export default function StripeCheckout(props: StripeCheckoutProps) {
  const [state, setState] = useState<CheckoutState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function initializeStripeCheckout() {
      if (!isStripeConfigured()) {
        if (!cancelled) {
          setState({ status: "not_configured" });
        }
        return;
      }

      const promise = getStripePromise();
      if (!promise) {
        if (!cancelled) {
          setState({ status: "not_configured" });
        }
        return;
      }

      try {
        const [{ Elements }, { default: StripePayment }] = await Promise.all([
          import("@stripe/react-stripe-js"),
          import("@/components/payments/StripePayment"),
        ]);

        if (cancelled) {
          return;
        }

        setState({
          status: "ready",
          stripePromise: promise,
          Elements: Elements as StripeElementsComponent,
          StripePayment: StripePayment as StripePaymentComponent,
        });
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              error instanceof StripeLoadError
                ? error.message
                : STRIPE_UNAVAILABLE_MESSAGE,
          });
        }
      }

      promise.catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        setState({
          status: "error",
          message:
            error instanceof StripeLoadError
              ? error.message
              : STRIPE_UNAVAILABLE_MESSAGE,
        });
      });
    }

    void initializeStripeCheckout();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="flex items-center justify-center gap-2 py-6 text-sm text-[#2F3332] dark:text-[#E6E7E7]"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Loading secure card payment…
      </div>
    );
  }

  if (state.status === "not_configured") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Stripe is not configured. Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
        </AlertDescription>
      </Alert>
    );
  }

  if (state.status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

  const { Elements, StripePayment, stripePromise } = state;

  return (
    <Elements stripe={stripePromise}>
      <StripePayment {...props} />
    </Elements>
  );
}
