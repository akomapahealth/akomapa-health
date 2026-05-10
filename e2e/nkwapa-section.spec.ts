import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
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
    test(`${viewport.name}: section, features, image, and CTA`, async ({
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
        page.getByRole("heading", {
          level: 2,
          name: /offline-first EMR built for community clinics/i,
        })
      ).toBeVisible();

      const features = section.getByTestId("nkwapa-feature");
      await expect(features).toHaveCount(4);

      const img = section.getByRole("img", {
        name: /Nkwapa EMR product screenshot/i,
      });
      await expect(img).toBeVisible();
      await page.waitForFunction(
        () => {
          const root = document.querySelector('[data-testid="nkwapa-section"]');
          const el = root?.querySelector<HTMLImageElement>(
            'img[alt="Nkwapa EMR product screenshot"]'
          );
          return !!el && el.complete && el.naturalWidth > 0;
        },
        undefined,
        { timeout: 15_000 }
      );
      await expect(img).toHaveAttribute("src", /.+/);

      const cta = section.getByTestId("nkwapa-cta");
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", "https://staging.nkwapa.app");
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", /noopener/);
      await expect(cta).toHaveAttribute("rel", /noreferrer/);
    });
  }
});
