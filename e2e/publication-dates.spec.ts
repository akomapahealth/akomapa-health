import { expect, type ConsoleMessage, type Page } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";
import { blogPosts } from "../src/data/blog";
import { news } from "../src/data/news";

/**
 * Publication dates are calendar days. They must read the same for every
 * visitor and match the server render, whatever the browser's time zone.
 * GitHub-hosted runners use UTC, so each block emulates a browser far from it.
 * https://playwright.dev/docs/emulation#locale--timezone
 */
const expectedDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function calendarDate(isoDate: string) {
  return expectedDate.format(new Date(isoDate));
}

const nkwapa = news.find((item) => item.slug === "nkwapa-emr-launch")!;
const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

function trackHydrationErrors(page: Page) {
  const errors: string[] = [];
  const onMessage = (message: ConsoleMessage) => {
    const text = message.text();
    if (
      message.type() === "error" &&
      /hydrat|didn't match|did not match/i.test(text)
    ) {
      errors.push(text);
    }
  };
  page.on("console", onMessage);
  page.on("pageerror", (error) => {
    if (/hydrat/i.test(error.message)) errors.push(error.message);
  });
  return errors;
}

for (const timeZone of ["America/Los_Angeles", "Pacific/Auckland"]) {
  test.describe(`publication dates in ${timeZone}`, () => {
    test.use({ timezoneId: timeZone });

    test.beforeEach(async ({ page }) => {
      await page.addInitScript((version) => {
        localStorage.setItem("akomapa-announcements-dismissed", version);
      }, announcementCampaign.version);
    });

    test("the browser really runs in the emulated time zone", async ({ page }) => {
      await page.goto("/news", { waitUntil: "domcontentloaded" });
      expect(
        await page.evaluate(
          () => Intl.DateTimeFormat().resolvedOptions().timeZone,
        ),
      ).toBe(timeZone);
    });

    test("news detail shows the published calendar day", async ({ page }) => {
      const hydrationErrors = trackHydrationErrors(page);
      await page.goto(`/news/${nkwapa.slug}`, { waitUntil: "networkidle" });

      expect(calendarDate(nkwapa.date)).toBe("October 14, 2026");
      const published = page.locator(`main time[datetime="${nkwapa.date}"]`).first();
      await expect(published).toHaveText(calendarDate(nkwapa.date));
      expect(hydrationErrors).toEqual([]);
    });

    test("news listing cards show the published calendar day", async ({ page }) => {
      const hydrationErrors = trackHydrationErrors(page);
      await page.goto("/news", { waitUntil: "networkidle" });

      for (const item of news) {
        await expect(
          page.locator(`main time[datetime="${item.date}"]`).first(),
        ).toHaveText(calendarDate(item.date));
      }
      expect(hydrationErrors).toEqual([]);
    });

    test("blog listing and post show the published calendar day", async ({ page }) => {
      const hydrationErrors = trackHydrationErrors(page);
      await page.goto("/blog", { waitUntil: "networkidle" });

      await expect(
        page.locator(`main time[datetime="${featuredPost.date}"]`).first(),
      ).toHaveText(calendarDate(featuredPost.date));

      await page.goto(`/blog/${featuredPost.slug}`, { waitUntil: "networkidle" });
      await expect(
        page.locator(`main time[datetime="${featuredPost.date}"]`).first(),
      ).toHaveText(calendarDate(featuredPost.date));
      expect(hydrationErrors).toEqual([]);
    });
  });
}
