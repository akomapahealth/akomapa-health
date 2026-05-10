import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

/**
 * Cross-page responsive smoke coverage. For each viewport × route we assert:
 *   - the page reaches a stable load state (no thrown errors, no 500s)
 *   - global header + footer landmarks are visible
 *   - there is no horizontal page overflow (a common cause of mobile layout breaks)
 *
 * Lifted from the same announcement-popup-dismissal pattern used in
 * `e2e/nkwapa-section.spec.ts` and `e2e/hero-slider.spec.ts`.
 */

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "ipad-pro-1024", width: 1024, height: 1366 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

const routes: ReadonlyArray<{ path: string; name: string }> = [
  { path: "/", name: "home" },
  { path: "/news", name: "news" },
  { path: "/about/team", name: "team" },
  { path: "/programs", name: "programs" },
  { path: "/clinics", name: "clinics" },
  { path: "/research", name: "research" },
];

async function dismissAnnouncementPopup(page: Page) {
  await page.addInitScript((version: string) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    } catch {
      /* noop */
    }
  }, announcementCampaign.version);
}

async function hasHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    // Allow a 1px subpixel tolerance.
    return document.documentElement.scrollWidth - window.innerWidth > 1;
  });
}

test.describe("Responsive pages — header, footer, no horizontal overflow", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  for (const viewport of viewports) {
    for (const route of routes) {
      test(`${viewport.name} · ${route.name} (${route.path})`, async ({
        page,
      }) => {
        const responses: number[] = [];
        page.on("response", (response) => {
          if (new URL(response.url()).pathname === route.path) {
            responses.push(response.status());
          }
        });

        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(route.path, { waitUntil: "domcontentloaded" });

        // Page response was successful.
        expect(responses.some((s) => s >= 500)).toBe(false);

        // Header + footer landmarks render on every page.
        await expect(page.locator("header").first()).toBeVisible();
        await expect(page.locator("footer").first()).toBeVisible();

        // No horizontal scrollbar — common cause of broken responsive layouts.
        // Allow Swiper/animated sections to settle before measuring.
        await page.waitForTimeout(500);
        expect(await hasHorizontalOverflow(page)).toBe(false);
      });
    }
  }
});
