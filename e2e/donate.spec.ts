import { expect, test, type Locator, type Page } from "@playwright/test";

const forbiddenPaymentValues = [
  ["+233", "54", "111", "1111"].join(" "),
  ["054", "111", "1111"].join(" "),
  ["123", "456", "7890"].join(""),
];

async function dismissAnnouncements(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
  });
}

async function verifySafePaymentPanel(panel: Locator) {
  await expect(
    panel.getByRole("radio", { name: /MTN Mobile Money/i }),
  ).toBeChecked();
  await expect(
    panel.getByText(
      "Bank transfer instructions are being verified and will be available soon.",
    ),
  ).toBeVisible();
  await expect(panel.getByText("PayPal", { exact: true })).toBeVisible();
  await expect(panel.getByText("Coming soon").first()).toBeVisible();
  await expect(panel.getByRole("link")).toHaveCount(0);
  await expect(panel.getByRole("radio")).toHaveCount(1);
  await expect(panel.getByTestId("payment-method-paypal")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await expect(panel.getByTestId("payment-method-venmo")).toHaveCSS(
    "cursor",
    "not-allowed",
  );

  await panel
    .getByRole("button", { name: "View Mobile Money instructions" })
    .click();
  await expect(panel.getByText("0249292898")).toBeVisible();
  await expect(panel.getByText("MTN", { exact: true })).toBeVisible();
  await expect(
    panel.getByText("Akomapa Health Foundation", { exact: true }),
  ).toBeVisible();
  await expect(
    panel.getByText(
      "Before completing your transfer, please confirm the account name appears as Akomapa Health Foundation.",
    ),
  ).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "Let us thank you" }),
  ).toBeVisible();
  await expect(panel.getByLabel("Full name")).toBeVisible();
  await expect(panel.getByLabel("Email address")).toBeVisible();
  await expect(
    panel.getByText(/does not verify or confirm that a transfer was completed/i),
  ).toBeVisible();
}

test.describe("Donate page flow", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncements(page);
  });

  test("renders the verified partner manual-transfer flow", async ({ page }) => {
    await page.goto("/donate");

    await expect(
      page.getByRole("heading", {
        name: "Every act of generosity saves a life.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The Akomapa Partners Program" }),
    ).toBeVisible();

    const panel = page.getByTestId("donation-payment-methods-partner");
    await expect(
      panel.getByText(/Complete a new manual transfer for each month/i),
    ).toBeVisible();
    await expect(
      panel.getByText(/does not calculate or display a Mobile Money currency conversion/i),
    ).toBeVisible();
    await verifySafePaymentPanel(panel);
  });

  test("reuses the safe payment configuration for one-time gifts", async ({
    page,
  }) => {
    await page.goto("/donate");
    await page.getByRole("button", { name: "One-Time Gift" }).click();

    await expect(
      page.getByRole("heading", { name: "Make a One-Time Gift" }),
    ).toBeVisible();
    const panel = page.getByTestId("donation-payment-methods-oneTime");
    await expect(
      panel.getByText(
        "This is a one-time manual transfer. No recurring payment will be created.",
      ),
    ).toBeVisible();
    await verifySafePaymentPanel(panel);
    await expect(page.getByRole("button", { name: /annual/i })).toHaveCount(0);
  });

  test("never renders forbidden payment values", async ({ page }) => {
    await page.goto("/donate");
    const pageText = await page.locator("body").innerText();

    for (const value of forbiddenPaymentValues) {
      expect(pageText).not.toContain(value);
    }
  });
});
