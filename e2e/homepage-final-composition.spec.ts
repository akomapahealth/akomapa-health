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
          name: "The world's fastest-growing health crisis demands a better system of care.",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "From screening numbers to care outcomes.",
          exact: true,
        }),
      ).toHaveCount(0);
      await expect(
        page.getByRole("heading", {
          name: 'Akomapa means "A Good Heart."',
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: /five components, one connected system/i,
        }),
      ).toBeVisible();
      await expect(
        page
          .locator("[data-impact-metrics] dd")
          .filter({ hasText: "People screened for chronic disease risk" }),
      ).toBeVisible();
      await expect(
        page
          .locator("[data-impact-metrics] dd")
          .filter({
            hasText:
              "Patients successfully connected to ongoing primary care",
          }),
      ).toBeVisible();

      const narrativeHeadingOrder = await page
        .locator("main h2")
        .evaluateAll((headings) => headings.map((heading) => heading.textContent?.trim()));
      expect(narrativeHeadingOrder.indexOf("One model. Two challenges. Lasting impact."))
        .toBeLessThan(
          narrativeHeadingOrder.indexOf(
            "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
          ),
        );
      expect(
        narrativeHeadingOrder.indexOf(
          "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
        ),
      ).toBeLessThan(
        narrativeHeadingOrder.indexOf("Research before implementation."),
      );

      await expect(page.locator("[data-home-band-marker]")).toHaveText([
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
      ]);
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
