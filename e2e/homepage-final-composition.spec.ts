import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function preparePage(page: Page) {
  await page.addInitScript((version: string) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth > 1,
  );
}

test.describe("final homepage composition", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: renders final sections without deprecated homepage blocks`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", {
          name: /the world.s fastest-growing health crisis deserves a stronger response/i,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: 'Akomapa means "A Good Heart."',
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: /building healthier communities\. preparing stronger health leaders\./i,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: /five components, one connected system/i,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Nkwapa connects care, learning, and evidence.",
          exact: true,
        }),
      ).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "Gallery" })).toHaveCount(
        0,
      );
      await expect(
        page.getByRole("heading", { name: /latest updates/i }),
      ).toHaveCount(0);
      expect(await hasHorizontalOverflow(page)).toBe(false);
    });
  }
});
