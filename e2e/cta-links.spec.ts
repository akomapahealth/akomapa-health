import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

test.describe("Program CTA links", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("GHIP Request Program Brochure CTAs point to /contact", async ({
    page,
  }) => {
    await page.goto("/programs/akomapa-ghip", {
      waitUntil: "domcontentloaded",
    });

    const brochureLinks = page.getByRole("link", {
      name: "Request Program Brochure",
      exact: true,
    });

    await expect(brochureLinks.first()).toBeVisible();
    const count = await brochureLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      await expect(brochureLinks.nth(i)).toHaveAttribute("href", "/contact");
    }
  });

  test("GHLTP Become a Mentor CTA points to /contact", async ({ page }) => {
    await page.goto("/programs/akomapa-ghltp", {
      waitUntil: "domcontentloaded",
    });

    const mentorLink = page.getByRole("link", {
      name: "Become a Mentor",
      exact: true,
    });

    await expect(mentorLink).toBeVisible();
    await expect(mentorLink).toHaveAttribute("href", "/contact");
  });
});
