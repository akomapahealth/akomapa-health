export const IMMERSION_DEPOSIT_CENTS = 124_950;
export const IMMERSION_FULL_CENTS = 249_900;

export type ImmersionPaymentLinks = {
  deposit: string;
  full: string;
};

function stripePaymentLink(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "buy.stripe.com" ||
      !url.pathname.startsWith("/test_")
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function getPreviewImmersionPaymentLinks(): ImmersionPaymentLinks | null {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development";
  if (
    !isPreview ||
    process.env.NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED !== "true"
  ) {
    return null;
  }

  const deposit = stripePaymentLink(
    process.env.NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL,
  );
  const full = stripePaymentLink(
    process.env.NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL,
  );

  return deposit && full ? { deposit, full } : null;
}
