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

async function dismissAnnouncements(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
  });
}

test.describe("Stripe lazy loading", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncements(page);
  });

  function partnerDonationPanel(page: Page) {
    return page
      .locator("div")
      .filter({ hasText: "Choose Your Monthly Partnership Amount" })
      .filter({ hasText: "Select Payment Method" })
      .first();
  }

  async function fillDonorDetails(page: Page) {
    await page.locator("#donorName").fill("Test Donor");
    await page.locator("#donorEmail").fill("test@example.com");
  }

  test("does not load Stripe.js when visiting a community hub page with donate links", async ({
    page,
  }) => {
    const stripeRequests = trackStripeRequests(page);

    await page.goto("/community-hubs/ucc", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    expect(stripeRequests).toHaveLength(0);
  });

  test("does not load Stripe.js on donate page when using Mobile Money only", async ({ page }) => {
    const stripeRequests = trackStripeRequests(page);

    await page.goto("/donate", { waitUntil: "networkidle" });

    await page.getByRole("radio", { name: /Mobile Money/i }).first().click();
    await page.getByRole("button", { name: "Pay with Mobile Money" }).first().click();
    await expect(page.getByText("+233 54 111 1111")).toBeVisible();
    await page.waitForTimeout(1500);

    expect(stripeRequests).toHaveLength(0);
  });

  test("loads Stripe.js only after the card payment step begins", async ({ page }) => {
    const stripeRequests = trackStripeRequests(page);

    await page.goto("/donate", { waitUntil: "networkidle" });
    expect(stripeRequests).toHaveLength(0);

    const donationPanel = partnerDonationPanel(page);

    await donationPanel.getByRole("button", { name: /\$100/i }).click();
    await donationPanel.getByRole("radio", { name: /Credit\/Debit Card/i }).click();
    expect(stripeRequests).toHaveLength(0);

    await donationPanel.getByRole("button", { name: "Become a Partner" }).click();
    await expect(donationPanel.getByText("Please provide your details")).toBeVisible();
    expect(stripeRequests).toHaveLength(0);

    await fillDonorDetails(page);

    await expect(
      page.getByRole("button", { name: /Pay \$[\d.]+ Monthly/i })
    ).toBeVisible({ timeout: 15000 });

    await page.waitForTimeout(2000);

    const stripeNotConfigured = await page
      .getByText("Stripe is not configured")
      .isVisible()
      .catch(() => false);

    if (stripeNotConfigured) {
      expect(stripeRequests).toHaveLength(0);
      return;
    }

    expect(stripeRequests.length).toBeGreaterThan(0);
  });

  test("shows a recoverable error when Stripe.js is blocked", async ({ page }) => {
    await page.route("**/*js.stripe.com/**", (route) => route.abort());

    await page.goto("/donate", { waitUntil: "networkidle" });

    const donationPanel = partnerDonationPanel(page);

    await donationPanel.getByRole("button", { name: /\$100/i }).click();
    await donationPanel.getByRole("radio", { name: /Credit\/Debit Card/i }).click();
    await donationPanel.getByRole("button", { name: "Become a Partner" }).click();
    await expect(donationPanel.getByText("Please provide your details")).toBeVisible();
    await fillDonorDetails(page);

    const stripeNotConfigured = await page
      .getByText("Stripe is not configured")
      .isVisible()
      .catch(() => false);

    test.skip(stripeNotConfigured, "Stripe publishable key is not configured in this build");

    await expect(
      page.getByText(/Card payments are unavailable|Failed to load Stripe/i)
    ).toBeVisible({ timeout: 15000 });

    await donationPanel.getByRole("radio", { name: /Mobile Money/i }).click();
    await expect(page.getByRole("button", { name: "Pay with Mobile Money" })).toBeVisible();
  });
});
