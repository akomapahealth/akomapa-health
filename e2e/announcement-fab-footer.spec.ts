import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
] as const;

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
    sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
  }, announcementCampaign.version);
}

function boxesOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

async function expectNoOverlap(control: Locator, fab: Locator) {
  const [controlBox, fabBox] = await Promise.all([
    control.boundingBox(),
    fab.boundingBox(),
  ]);
  expect(controlBox, "control should have a bounding box").not.toBeNull();
  expect(fabBox, "FAB should have a bounding box").not.toBeNull();
  expect(boxesOverlap(controlBox!, fabBox!)).toBe(false);
}

async function expectControlOwnsHit(page: Page, control: Locator) {
  const box = await control.boundingBox();
  expect(box, "control should have a bounding box").not.toBeNull();

  const hit = await page.evaluate(
    ({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el
        ?.closest("[data-testid='announcement-trigger'], a, button")
        ?.getAttribute("data-testid");
    },
    { x: box!.x + Math.max(box!.width - 4, box!.width / 2), y: box!.y + box!.height / 2 },
  );

  expect(hit).not.toBe("announcement-trigger");
}

async function openHomepageWithFab(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const fab = page.getByTestId("announcement-trigger");
  await expect(fab).toBeVisible({ timeout: 15_000 });
  return fab;
}

test.describe("Announcement FAB vs footer controls", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: Subscribe, Privacy, and Terms stay clear of the FAB`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await preparePage(page);
      const fab = await openHomepageWithFab(page);

      const footer = page.locator("[data-site-footer]");
      const subscribe = footer.getByRole("button", {
        name: "Subscribe",
        exact: true,
      });
      const privacy = footer.getByRole("link", { name: "Privacy Policy" });
      const terms = footer.getByRole("link", { name: "Terms of Service" });

      await subscribe.scrollIntoViewIfNeeded();
      await expect(subscribe).toBeVisible();
      await expectNoOverlap(subscribe, fab);
      await expectControlOwnsHit(page, subscribe);

      await privacy.scrollIntoViewIfNeeded();
      await expectNoOverlap(privacy, fab);
      await expectControlOwnsHit(page, privacy);

      await terms.scrollIntoViewIfNeeded();
      await expectNoOverlap(terms, fab);
      await expectControlOwnsHit(page, terms);
    });
  }

  test("375px: footer controls receive the tap, not the FAB", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await preparePage(page);
    const fab = await openHomepageWithFab(page);
    const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
    const footer = page.locator("[data-site-footer]");

    const subscribe = footer.getByRole("button", {
      name: "Subscribe",
      exact: true,
    });
    await subscribe.scrollIntoViewIfNeeded();
    await subscribe.click();
    await expect(modal).toHaveCount(0);
    await expect(footer.locator("[data-newsletter-form]")).toBeVisible();

    await footer.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy$/);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(fab).toBeVisible({ timeout: 15_000 });
    await page
      .locator("[data-site-footer]")
      .getByRole("link", { name: "Terms of Service" })
      .click();
    await expect(page).toHaveURL(/\/terms$/);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    const homeFab = page.getByTestId("announcement-trigger");
    await expect(homeFab).toBeVisible({ timeout: 15_000 });
    await homeFab.click();
    await expect(modal).toBeVisible({ timeout: 15_000 });
  });
});
