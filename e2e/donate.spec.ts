import { expect, test } from "@playwright/test";

test.describe("Donate page flow", () => {
  test("renders redesigned sections", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByRole("heading", { name: "Give health. Build hope." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What your donation enables" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose your donation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Where funds go" })).toBeVisible();
  });

  test("defaults to monthly and supports amount selection", async ({ page }) => {
    await page.goto("/donate");

    const monthlyButton = page.getByRole("button", { name: /monthly/i }).first();
    await expect(monthlyButton).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: /\$250/i }).click();
    await page.getByText("Credit / Debit Card").click();
    await expect(page.getByText("Please choose an amount and add your name and email to continue.")).toBeVisible();
  });

  test("supports mobile flow and payment method switch", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/donate");

    await page.getByRole("button", { name: "MTN Mobile Money" }).click();
    await expect(page.getByText("+233 54 111 1111")).toBeVisible();

    await page.getByRole("button", { name: "PayPal Giving" }).click();
    await expect(page.getByRole("link", { name: "Continue to PayPal Giving" })).toBeVisible();
  });
});
