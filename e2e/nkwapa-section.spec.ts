import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
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

test.describe("Nkwapa homepage placement", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: dedicated section is replaced while the announcement remains`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(page.getByTestId("nkwapa-section")).toHaveCount(0);
      await expect(
        page.getByRole("tab", {
          name: "Go to slide 5: Introducing Nkwapa — Our EMR Platform",
          exact: true,
        }),
      ).toBeVisible();
    });
  }
});
