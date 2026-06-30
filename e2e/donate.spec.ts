import { expect, test } from "@playwright/test";

test.describe("Donate page flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
    });
  });

  test("renders redesigned sections", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByRole("heading", { name: "Every act of generosity saves a life." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The Akomapa Partners Program" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose Your Monthly Partnership Amount" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Corporate Sponsorship Opportunities" })).toBeVisible();
  });

  test("defaults to monthly and supports amount selection", async ({ page }) => {
    await page.goto("/donate");

    const monthlyButton = page.getByRole("button", { name: /monthly/i }).first();
    await expect(monthlyButton).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: /\$100/i }).click();
    await expect(page.getByRole("button", { name: /\$100/i })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("radio", { name: /Credit\/Debit Card/i }).click();
    await page.getByRole("button", { name: "Become a Partner" }).click();
    await expect(page.getByText("Please provide your details")).toBeVisible();
  });

  test("supports mobile flow and payment method switch", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/donate");

    await page.getByRole("radio", { name: /Mobile Money/i }).click();
    await page.getByRole("button", { name: "Pay with Mobile Money" }).click();
    await expect(page.getByText("+233 54 111 1111")).toBeVisible();

    await page.getByRole("radio", { name: /Credit\/Debit Card/i }).click();
    await expect(page.getByRole("button", { name: "Become a Partner" })).toBeVisible();
  });
});
