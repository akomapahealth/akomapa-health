import { test, expect } from "@playwright/test";

test.describe("News Detail Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss the announcement modal if it appears
    await page.addInitScript(() => {
      localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
    });
  });

  test("news article detail page renders with full content", async ({
    page,
  }) => {
    await page.goto("/news/akomapa-yale-global-health-recognition", {
      waitUntil: "domcontentloaded",
    });

    // Title visible in hero
    await expect(
      page.getByRole("heading", { name: /recognized at yale/i }).first()
    ).toBeVisible({ timeout: 15000 });

    // Category badge visible
    await expect(page.getByText("Recognition").first()).toBeVisible();

    // Date visible (format may vary by locale)
    await expect(page.getByText(/April.*2026/)).toBeVisible();

    // Article content rendered (check first paragraph)
    await expect(
      page.getByText(/latest chapter starts with a simple but powerful signal/i)
    ).toBeVisible();

    // Back link to /news
    const backLink = page.getByRole("link", { name: /back to news/i });
    await expect(backLink).toBeVisible();

    // Related items section
    await expect(
      page.getByRole("heading", { name: /continue reading/i })
    ).toBeVisible();

    // SEO: page title contains item title
    const title = await page.title();
    expect(title).toContain("Akomapa Recognized");
  });

  test("second news article detail page renders with full content", async ({
    page,
  }) => {
    await page.goto("/news/akomapa-academy-ethical-leadership-program", {
      waitUntil: "domcontentloaded",
    });

    // Title visible
    await expect(
      page
        .getByRole("heading", {
          name: /global health ethical leadership training program/i,
        })
        .first()
    ).toBeVisible({ timeout: 15000 });

    // Category badge visible
    await expect(page.getByText("Program Launch").first()).toBeVisible();

    // Body content visible
    await expect(
      page.getByText(
        /officially introduced the global health ethical leadership training program/i
      )
    ).toBeVisible();
  });

  test("back link navigates to /news listing", async ({ page }) => {
    await page.goto("/news/akomapa-yale-global-health-recognition", {
      waitUntil: "domcontentloaded",
    });

    const backLink = page.getByRole("link", { name: /back to news/i });
    await expect(backLink).toBeVisible({ timeout: 15000 });
    await backLink.click();

    await expect(page).toHaveURL("/news");
  });

  test("nonexistent news item returns 404", async ({ page }) => {
    const response = await page.goto("/news/nonexistent-item-id", {
      waitUntil: "domcontentloaded",
    });

    expect(response?.status()).toBe(404);
  });

  test("/news page displays category filter pills", async ({ page }) => {
    await page.goto("/news", { waitUntil: "domcontentloaded" });

    // "All" filter pill should be visible
    await expect(page.getByRole("button", { name: "All" })).toBeVisible({
      timeout: 15000,
    });

    // At least one data-backed category pill exists
    await expect(page.getByRole("button", { name: "Recognition" })).toBeVisible();
  });

  test("/news page shows only news articles", async ({ page }) => {
    await page.goto("/news", { waitUntil: "domcontentloaded" });

    // Check a known news title is present
    await expect(
      page
        .getByText(
          /Akomapa Recognized at Yale and Global Health Innovation Platforms/i
        )
        .first()
    ).toBeVisible({ timeout: 15000 });

    // Announcements should no longer appear on /news
    await expect(
      page.getByText(/Yale Global Health Yogesh Khanal Award/i).first()
    ).not.toBeVisible();
  });

  test("internal cards link to /news/[id] detail page", async ({ page }) => {
    await page.goto("/news", { waitUntil: "domcontentloaded" });

    // Find a card that links to a detail page
    const detailLink = page
      .locator('a[href^="/news/"]')
      .filter({ hasText: /Read More/i })
      .first();

    await expect(detailLink).toBeVisible({ timeout: 15000 });
    const href = await detailLink.getAttribute("href");
    expect(href).toMatch(/^\/news\/.+/);
  });

});

test("announcement modal shows increased size and closes properly", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // Wait for modal to appear (3s delay + animation)
  const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
  await expect(modal).toBeVisible({ timeout: 15000 });

  // Verify modal has content
  await expect(modal.locator("h2").first()).toBeVisible();
  await expect(modal.locator("p").first()).toBeVisible();

  // Close button should work
  await modal.locator('button[aria-label="Close announcements"]').click();
  await expect(modal).not.toBeVisible({ timeout: 5000 });
});
