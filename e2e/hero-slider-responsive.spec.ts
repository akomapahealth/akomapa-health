import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { BRAND } from "../src/config/brand";

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

async function dismissAnnouncementPopup(page: Page) {
  await page.addInitScript((version: string) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    } catch {
      /* noop */
    }
  }, announcementCampaign.version);
}

test.describe("Homepage static hero — responsive smoke", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: brand hero renders without carousel or overflow`, async ({
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
        hero.getByRole("heading", { level: 1, name: BRAND.heroHeadline }),
      ).toBeVisible();

      await expect(page.getByTestId("hero-slider-pagination")).toHaveCount(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth > 1,
      );
      expect(overflow).toBe(false);
    });
  }
});
