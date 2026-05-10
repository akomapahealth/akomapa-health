import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

const expectedSlideCount = 1 + announcementCampaign.slides.length;

async function dismissAnnouncementPopup(page: Page) {
  await page.addInitScript((version: string) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    } catch {
      /* noop */
    }
  }, announcementCampaign.version);
}

test.describe("Hero slider — responsive smoke", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: brand intro renders, dots match, no overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const hero = page.getByTestId("hero-slider");
      await expect(hero).toBeVisible();

      await expect(
        hero
          .getByRole("heading", { level: 1, name: /global partnership/i })
          .first()
      ).toBeVisible();

      const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");
      await expect(dots).toHaveCount(expectedSlideCount);

      // No horizontal overflow at this viewport.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth > 1
      );
      expect(overflow).toBe(false);
    });
  }
});
