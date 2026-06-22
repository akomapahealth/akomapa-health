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

test.describe("Nkwapa homepage section", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: patient management section supports the impact narrative`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const section = page.getByTestId("nkwapa-section");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", {
          level: 2,
          name: "Nkwapa connects care, learning, and evidence.",
          exact: true,
        }),
      ).toBeVisible();
      await expect(section.getByTestId("nkwapa-feature")).toHaveCount(4);

      const image = section.getByTestId("nkwapa-screenshot");
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute(
        "alt",
        "Nkwapa patient management system dashboard",
      );

      const cta = section.getByTestId("nkwapa-cta");
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", "https://staging.nkwapa.app");
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", /noopener/);
    });
  }
});
