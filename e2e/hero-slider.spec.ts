import { test, expect, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { BRAND } from "../src/config/brand";

/**
 * Static homepage hero E2E coverage:
 * - brand intro only (no announcement slideshow)
 * - primary/secondary CTAs present
 * - no pagination dots or slide chrome
 */

async function dismissAnnouncementPopup(page: Page) {
  await page.addInitScript((version: string) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    } catch {
      /* noop */
    }
  }, announcementCampaign.version);
}

test.describe("Homepage static hero", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  test("renders brand hero with CTAs and no carousel chrome", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const hero = page.getByTestId("hero-slider");
    await expect(hero).toBeVisible();

    await expect(
      hero.getByRole("heading", { level: 1, name: BRAND.heroHeadline }),
    ).toBeVisible();

    await expect(
      hero.getByRole("link", {
        name: new RegExp(BRAND.heroPrimaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", BRAND.heroPrimaryCTA.href);

    await expect(
      hero.getByRole("link", {
        name: new RegExp(BRAND.heroSecondaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", BRAND.heroSecondaryCTA.href);

    await expect(page.getByTestId("hero-slider-pagination")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /previous slide/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /next slide/i })).toHaveCount(0);
  });
});
