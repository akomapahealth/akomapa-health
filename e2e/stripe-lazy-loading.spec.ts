import { expect, test, type Page } from "@playwright/test";

function trackStripeRequests(page: Page) {
  const stripeRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("js.stripe.com")) {
      stripeRequests.push(request.url());
    }
  });

  return stripeRequests;
}

test.describe("disabled Stripe donation flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
    });
  });

  test("does not load Stripe.js anywhere on the donate page", async ({ page }) => {
    const stripeRequests = trackStripeRequests(page);

    await page.goto("/donate", { waitUntil: "networkidle" });
    await page
      .getByTestId("donation-payment-methods-partner")
      .getByRole("button", { name: "View Mobile Money instructions" })
      .click();
    await expect(page.getByText("0249292898")).toBeVisible();

    await page.getByRole("button", { name: "One-Time Gift" }).click();
    await page
      .getByTestId("donation-payment-methods-oneTime")
      .getByRole("button", { name: "View Mobile Money instructions" })
      .click();
    await expect(page.getByText("0249292898")).toBeVisible();

    expect(stripeRequests).toHaveLength(0);
  });

  test("rejects payment-intent requests while Stripe is disabled", async ({
    request,
  }) => {
    const response = await request.post("/api/create-payment-intent", {
      data: { amount: 25, frequency: "one-time" },
    });

    expect(response.status()).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error:
        "Online card and bank-account donations are not currently available.",
    });
  });
});
