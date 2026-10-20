import { afterEach, describe, expect, it, vi } from "vitest";
import { getPreviewImmersionPaymentLinks } from "../immersion";

afterEach(() => vi.unstubAllEnvs());

describe("Immersion payment configuration", () => {
  it("shows only configured sandbox links in preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL", "https://buy.stripe.com/test_deposit");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL", "https://buy.stripe.com/test_full");

    expect(getPreviewImmersionPaymentLinks()).toEqual({
      deposit: "https://buy.stripe.com/test_deposit",
      full: "https://buy.stripe.com/test_full",
    });
  });

  it("hides links when configuration is incomplete or unsafe", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL", "https://buy.stripe.com/test_deposit");
    expect(getPreviewImmersionPaymentLinks()).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL", "https://example.com/test_full");
    expect(getPreviewImmersionPaymentLinks()).toBeNull();
  });

  it("hides test checkout on production even if configured", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL", "https://buy.stripe.com/test_deposit");
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL", "https://buy.stripe.com/test_full");
    expect(getPreviewImmersionPaymentLinks()).toBeNull();
  });
});
