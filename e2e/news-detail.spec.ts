import { test, expect } from "@playwright/test";

test.describe("News Detail Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss the announcement modal if it appears
    await page.addInitScript(() => {
      localStorage.setItem("announcement-dismissed-2026-04-v2", "true");
    });
  });

  test("news article detail page renders with full content", async ({
    page,
  }) => {
    await page.goto("/news/new-community-clinics-ghana", {
      waitUntil: "domcontentloaded",
    });

    // Title visible in hero
    await expect(
      page.getByRole("heading", { name: /community clinics/i }).first()
    ).toBeVisible({ timeout: 15000 });

    // Category badge visible
    await expect(page.getByText("Program Update").first()).toBeVisible();

    // Date visible (format may vary by locale)
    await expect(page.getByText(/August.*2023/)).toBeVisible();

    // Article content rendered (check first paragraph)
    await expect(
      page.getByText(/proud to announce the opening of 10 new/i)
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
    expect(title).toContain("Community Clinics");
  });

  test("announcement detail page renders with styled description", async ({
    page,
  }) => {
    await page.goto("/news/ethical-leadership-launch", {
      waitUntil: "domcontentloaded",
    });

    // Title visible
    await expect(
      page
        .getByRole("heading", {
          name: /akomapa ethical leadership program/i,
        })
        .first()
    ).toBeVisible({ timeout: 15000 });

    // Category badge visible (use .first() as tag text may appear in tags section too)
    await expect(page.getByText("New Program").first()).toBeVisible();

    // Description content visible
    await expect(
      page.getByText(/flagship program to develop the next generation/i)
    ).toBeVisible();

    // CTA button visible
    await expect(page.getByRole("link", { name: /learn more/i }).first()).toBeVisible();
  });

  test("back link navigates to /news listing", async ({ page }) => {
    await page.goto("/news/new-community-clinics-ghana", {
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

    // At least one category pill exists
    await expect(
      page.getByRole("button", { name: "Award" })
    ).toBeVisible();
  });

  test("/news page shows both announcements and news articles", async ({
    page,
  }) => {
    await page.goto("/news", { waitUntil: "domcontentloaded" });

    // Check an announcement title is present
    await expect(
      page.getByText(/Yale Global Health Yogesh Khanal Award/i).first()
    ).toBeVisible({ timeout: 15000 });

    // Check a news article title is present
    await expect(
      page
        .getByText(
          /Opens 10 New Community Clinics/i
        )
        .first()
    ).toBeVisible();
  });

  test("external announcement cards link externally", async ({ page }) => {
    await page.goto("/news", { waitUntil: "domcontentloaded" });

    // Yale award card should have external link
    const externalLink = page
      .locator('a[target="_blank"]')
      .filter({ hasText: /Yale Global Health/i })
      .first();

    await expect(externalLink).toBeVisible({ timeout: 15000 });
    const href = await externalLink.getAttribute("href");
    expect(href).toContain("medicine.yale.edu");
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
