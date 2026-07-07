import type { Stripe } from "@stripe/stripe-js";

export class StripeLoadError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "StripeLoadError";
    if (cause !== undefined) {
      this.cause = cause;
    }
  }
}

let stripePromise: Promise<Stripe | null> | null = null;

function getPublishableKey(): string | undefined {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

export function isStripeConfigured(): boolean {
  return Boolean(getPublishableKey());
}

export function getStripePromise(): Promise<Stripe | null> | null {
  const key = getPublishableKey();
  if (!key) {
    return null;
  }

  if (!stripePromise) {
    stripePromise = import("@stripe/stripe-js")
      .then(({ loadStripe }) => loadStripe(key))
      .catch((error: unknown) => {
        stripePromise = null;
        const message =
          error instanceof Error ? error.message : "Failed to load Stripe.js";
        throw new StripeLoadError(message, error);
      });
  }

  return stripePromise;
}

/** @internal Test-only reset for module-level Stripe loader cache. */
export function resetStripeClientForTests(): void {
  stripePromise = null;
}
