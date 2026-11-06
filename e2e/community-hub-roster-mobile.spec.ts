import { expect, type Page } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";
import { uccHubRoster, ugHubRoster } from "../src/data/community-hubs";

// Regression coverage for #317: the leadership roster is a single column on
// phones and taller than the viewport, so a list-level whileInView reveal never
// fired and every card stayed at opacity 0.

const hubs = [
  { slug: "ug", expectedLeaders: ugHubRoster.leadership.length },
  { slug: "ucc", expectedLeaders: uccHubRoster.leadership.length },
] as const;

const viewports = [
  { label: "iphone-se", width: 375, height: 667 },
  { label: "iphone-14-pro", width: 393, height: 852 },
  { label: "pixel-8", width: 412, height: 915 },
] as const;

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

async function scrollThrough(page: Page, step: number) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= total; y += step) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y);
    await page.waitForTimeout(40);
  }
}

function leaderCards(page: Page) {
  return page.locator("#hub-leadership ul > li");
}

test.describe("community hub rosters on mobile", () => {
  for (const hub of hubs) {
    for (const viewport of viewports) {
      test(`${hub.slug} leadership cards all become visible on ${viewport.label}`, async ({
        page,
      }) => {
        await preparePage(page);
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`/community-hubs/${hub.slug}`, { waitUntil: "load" });

        const cards = leaderCards(page);
        await expect(cards).toHaveCount(hub.expectedLeaders);

        // Cards below the fold start hidden, proving the reveal is actually exercised.
        const lastCard = cards.last();
        await expect
          .poll(() => lastCard.evaluate((el) => getComputedStyle(el).opacity))
          .toBe("0");

        // Reveal observers only exist once React has hydrated. Gate on the first
        // card revealing so a fast scroll under CI load can't outrun hydration.
        await cards.first().scrollIntoViewIfNeeded();
        await expect
          .poll(() => cards.first().evaluate((el) => getComputedStyle(el).opacity), {
            timeout: 15_000,
          })
          .toBe("1");

        await scrollThrough(page, Math.round(viewport.height * 0.6));

        // Every card must settle fully visible, no matter how tall the list is.
        await expect
          .poll(
            () =>
              cards.evaluateAll((items) =>
                items
                  .map((el, index) => ({ index, opacity: getComputedStyle(el).opacity }))
                  .filter(({ opacity }) => opacity !== "1")
                  .map(({ index }) => index),
              ),
            { timeout: 15_000, message: `${hub.slug} cards still hidden after scrolling` },
          )
          .toEqual([]);

        // And the section must not contain a blank stretch taller than the viewport.
        const gaps = await cards.evaluateAll((items) => {
          const rects = items.map((el) => el.getBoundingClientRect());
          return rects
            .slice(1)
            .map((rect, i) => rect.top - rects[i].bottom)
            .filter((gap) => gap > 0);
        });
        expect(Math.max(0, ...gaps)).toBeLessThan(viewport.height);
      });
    }
  }

  test("ucc volunteer portrait grid reveals on a phone", async ({ page }) => {
    await preparePage(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/community-hubs/ucc", { waitUntil: "domcontentloaded" });

    const grid = page.locator("[data-hub-volunteer-grid]");
    await expect(grid).toBeAttached();
    await grid.scrollIntoViewIfNeeded();
    await scrollThrough(page, 400);

    await expect
      .poll(() => grid.evaluate((el) => getComputedStyle(el).opacity), { timeout: 10_000 })
      .toBe("1");
  });
});
