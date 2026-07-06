import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const loadStripeMock = vi.fn();

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: (...args: unknown[]) => loadStripeMock(...args),
}));

describe("stripe-client", () => {
  beforeEach(() => {
    vi.resetModules();
    loadStripeMock.mockReset();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not call loadStripe when the module is imported", async () => {
    vi.stubEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "pk_test_example");

    await import("@/lib/stripe-client");

    expect(loadStripeMock).not.toHaveBeenCalled();
  });

  it("returns null when the publishable key is missing", async () => {
    const { getStripePromise } = await import("@/lib/stripe-client");

    expect(getStripePromise()).toBeNull();
    expect(loadStripeMock).not.toHaveBeenCalled();
  });

  it("lazy-loads Stripe only after getStripePromise is called", async () => {
    vi.stubEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "pk_test_example");
    loadStripeMock.mockResolvedValue({ id: "stripe-instance" });

    const { getStripePromise } = await import("@/lib/stripe-client");
    const promise = getStripePromise();

    expect(promise).toBeInstanceOf(Promise);
    await promise;

    expect(loadStripeMock).toHaveBeenCalledTimes(1);
    expect(loadStripeMock).toHaveBeenCalledWith("pk_test_example");
    await expect(promise).resolves.toEqual({ id: "stripe-instance" });
  });

  it("reuses the cached promise across repeated calls", async () => {
    vi.stubEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "pk_test_example");
    loadStripeMock.mockResolvedValue({ id: "stripe-instance" });

    const { getStripePromise } = await import("@/lib/stripe-client");
    const first = getStripePromise();
    const second = getStripePromise();

    expect(first).toBe(second);
    await first;

    expect(loadStripeMock).toHaveBeenCalledTimes(1);
  });

  it("surfaces load failures as StripeLoadError without leaving unhandled rejections", async () => {
    vi.stubEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "pk_test_example");
    loadStripeMock.mockRejectedValue(new Error("Failed to load Stripe.js"));

    const { getStripePromise, StripeLoadError } = await import("@/lib/stripe-client");
    const promise = getStripePromise();

    await expect(promise).rejects.toBeInstanceOf(StripeLoadError);
    await expect(promise).rejects.toMatchObject({
      message: "Failed to load Stripe.js",
    });
  });

  it("allows a retry after a failed load", async () => {
    vi.stubEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "pk_test_example");
    loadStripeMock
      .mockRejectedValueOnce(new Error("Failed to load Stripe.js"))
      .mockResolvedValueOnce({ id: "stripe-instance" });

    const { getStripePromise, resetStripeClientForTests } = await import(
      "@/lib/stripe-client"
    );

    await expect(getStripePromise()).rejects.toThrow("Failed to load Stripe.js");

    resetStripeClientForTests();

    await expect(getStripePromise()).resolves.toEqual({ id: "stripe-instance" });
    expect(loadStripeMock).toHaveBeenCalledTimes(2);
  });
});
