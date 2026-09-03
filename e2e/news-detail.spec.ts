import { test, expect } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

test.describe("News Detail Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss the announcement modal if it appears
    await page.addInitScript((version) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    }, announcementCampaign.version);
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
    await page.goto("/news/nonexistent-item-id", {
      waitUntil: "domcontentloaded",
    });

    // With (main)/loading.tsx, the document response may stream as 200 before
    // notFound() resolves to the branded 404 UI.
    await expect(
      page.getByRole("heading", { name: /page not found/i })
    ).toBeVisible({ timeout: 15000 });
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
      .filter({ hasText: /Explore the update/i })
      .first();

    await expect(detailLink).toBeVisible({ timeout: 15000 });
    const href = await detailLink.getAttribute("href");
    expect(href).toMatch(/^\/news\/.+/);
  });

});

test.describe("Announcement modal", () => {
  test("auto-opens for first-time visitors", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("akomapa-announcements-dismissed");
    });
    await page.goto("/donate", { waitUntil: "load" });

    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    await expect(modal).toBeVisible({ timeout: 15000 });
    await expect(
      modal.getByRole("heading", {
        name: "Global Health Immersion Program applications are open",
      }),
    ).toBeVisible();
    await expect(modal.locator("time")).toHaveAttribute(
      "datetime",
      "2026-09-03T00:00:00.000Z",
    );
    await expect(modal.locator("time")).toHaveText("September 3, 2026");
    await expect(modal.getByRole("link", { name: "Apply Now" })).toBeVisible();
    await expect(
      modal.getByRole("link", { name: "RSVP for the Info Session" }),
    ).toBeVisible();
    await expect(modal.locator("img")).toHaveAttribute(
      "src",
      /Akomapa-40\.jpg/,
    );
  });

  test("does not auto-open after the campaign was dismissed", async ({
    page,
  }) => {
    await page.addInitScript((version) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    }, announcementCampaign.version);
    await page.goto("/donate", { waitUntil: "load" });

    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    await page.waitForTimeout(4000);
    await expect(modal).not.toBeVisible();
  });

  test("floating announcement button opens and closes the modal", async ({
    page,
  }) => {
    await page.addInitScript((version) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      // Silence the session tip so this test stays focused on the bell.
      sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
    }, announcementCampaign.version);
    await page.goto("/donate", { waitUntil: "load" });

    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    await expect(modal).not.toBeVisible({ timeout: 5000 });

    const trigger = page.getByTestId("announcement-trigger");
    await expect(trigger).toBeVisible({ timeout: 15000 });
    // Tip dismissed for the session: it should not show.
    await expect(page.getByTestId("announcement-trigger-tip")).toHaveCount(0);
    await trigger.click();
    await expect(modal).toBeVisible({ timeout: 15000 });

    await expect(modal.locator("h2").first()).toBeVisible();
    await expect(modal.locator("p").first()).toBeVisible();

    await modal.locator('button[aria-label="Close announcements"]').click();
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });

  test("chatbot tip opens the modal for a returning visitor", async ({
    page,
  }) => {
    await page.addInitScript((version) => {
      // Keep auto-open disabled so this test isolates the tip interaction.
      localStorage.setItem("akomapa-announcements-dismissed", version);
      sessionStorage.removeItem("akomapa-announcement-tip-dismissed");
    }, announcementCampaign.version);
    await page.goto("/donate", { waitUntil: "domcontentloaded" });

    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    const tip = page.getByTestId("announcement-trigger-tip");

    await expect(tip).toBeVisible({ timeout: 10000 });
    const tipButton = tip.getByRole("button", {
      name: /what's new at akomapa/i,
    });
    await expect(tipButton).toBeVisible();
    // Entrance motion can leave the tip "unstable" for Playwright.
    await tipButton.click({ force: true });
    await expect(modal).toBeVisible({ timeout: 15000 });
    await expect(tip).toHaveCount(0);
  });

  test("tip resurfaces for returning visitors and dismiss hides it for the session", async ({
    page,
  }) => {
    await page.addInitScript((version) => {
      // Returning visitor: campaign already seen, but a fresh session.
      localStorage.setItem("akomapa-announcements-dismissed", version);
      sessionStorage.removeItem("akomapa-announcement-tip-dismissed");
    }, announcementCampaign.version);
    await page.goto("/donate", { waitUntil: "domcontentloaded" });

    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    const tip = page.getByTestId("announcement-trigger-tip");

    // Campaign is seen, so the modal must not auto-open...
    await expect(modal).not.toBeVisible({ timeout: 5000 });
    // ...but the nudge tip still resurfaces for the returning visitor.
    await expect(tip).toBeVisible({ timeout: 10000 });

    await tip.getByRole("button", { name: /dismiss update tip/i }).click();
    await expect(tip).toHaveCount(0);

    // Dismissal is persisted for the rest of the session.
    const dismissed = await page.evaluate(() =>
      sessionStorage.getItem("akomapa-announcement-tip-dismissed"),
    );
    expect(dismissed).toBe("1");
  });
});
