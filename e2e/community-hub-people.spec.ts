import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { uccHubRoster } from "../src/data/community-hubs";

const route = "/community-hubs/ucc";

async function preparePage(page: Page, theme: "light" | "dark" = "light") {
  await page.addInitScript(
    ({ version, storedTheme }) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    },
    { version: announcementCampaign.version, storedTheme: theme },
  );
}

async function expectNoOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
}

for (const scenario of [
  { name: "mobile light", width: 320, height: 900, theme: "light" },
  { name: "mobile dark", width: 390, height: 844, theme: "dark" },
  { name: "tablet light", width: 768, height: 1024, theme: "light" },
  { name: "desktop dark", width: 1440, height: 900, theme: "dark" },
] as const) {
  test(`${scenario.name} renders the compact UCC people feature without overflow`, async ({
    page,
  }) => {
    await preparePage(page, scenario.theme);
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const leadership = page.locator("#hub-leadership");
    const volunteers = page.locator("#hub-volunteers");

    await expect(
      leadership.getByRole("heading", {
        level: 2,
        name: "Meet the People Leading the Work",
      }),
    ).toBeVisible();
    await expect(
      volunteers.getByRole("heading", {
        level: 2,
        name: "The People Who Make Service Possible",
      }),
    ).toBeVisible();
    await expect(leadership.locator("[data-hub-leader]")).toHaveCount(12);
    await expect(
      volunteers.locator("[data-volunteer-portrait-trigger]"),
    ).toHaveCount(8);
    await expect(
      volunteers.getByRole("button", { name: "Load more volunteers" }),
    ).toBeVisible();

    await expectNoOverflow(page);

    const firstLeaderImage = leadership.locator("img").first();
    await expect(firstLeaderImage).toHaveAttribute("loading", "lazy");
    await expect(firstLeaderImage).toHaveAttribute(
      "src",
      /ik\.imagekit\.io\/akomapa\/ucc-team\/.+tr=q-75,w-/,
    );
    await expect(firstLeaderImage).toHaveAttribute("sizes", /100vw/);
  });
}

test("volunteer dialog supports keyboard focus, Escape, backdrop close, and scroll cleanup", async ({
  page,
}) => {
  await preparePage(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(route, { waitUntil: "domcontentloaded" });

  const trigger = page
    .locator("#hub-volunteers [data-volunteer-portrait-trigger]")
    .first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  const closeButton = dialog.getByRole("button", {
    name: "Close volunteer portrait",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Volunteer portrait 1 of 36");
  await expect(closeButton).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    )
    .toBe("hidden");

  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("heading", { name: "Volunteer portrait 2 of 36" }),
  ).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Volunteer portrait 2 of 36");
  await page.keyboard.press("ArrowLeft");
  await expect(
    dialog.getByRole("heading", { name: "Volunteer portrait 1 of 36" }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(dialog.locator(":focus")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    )
    .not.toBe("hidden");

  await page.keyboard.press("Space");
  await expect(dialog).toBeVisible();
  await page.mouse.click(8, 8);
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("reduced-motion users receive static people content and interactions", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    colorScheme: "light",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await preparePage(page);
  await page.goto(route, { waitUntil: "domcontentloaded" });

  const grid = page.locator("[data-hub-volunteer-grid]");
  await expect(grid).toBeVisible();
  await expect
    .poll(() =>
      grid.evaluate((element) => {
        const style = getComputedStyle(element);
        return { opacity: style.opacity, transform: style.transform };
      }),
    )
    .toEqual({ opacity: "1", transform: "none" });

  const firstTrigger = page
    .locator("[data-volunteer-portrait-trigger]")
    .first();
  await firstTrigger.hover();
  expect(
    await firstTrigger.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  await expectNoOverflow(page);

  await context.close();
});

test("UG and NHP continue without empty roster sections", async ({ page }) => {
  await preparePage(page);

  for (const hubRoute of ["/community-hubs/ug", "/community-hubs/nhp"]) {
    await page.goto(hubRoute, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#hub-leadership")).toHaveCount(0);
    await expect(page.locator("#hub-volunteers")).toHaveCount(0);
    await expectNoOverflow(page);
  }
});

test("UCC volunteer triggers preserve the supplied ImageKit order", async ({
  page,
}) => {
  await preparePage(page);
  await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const loadMore = page.getByRole("button", { name: "Load more volunteers" });
  for (const expectedCount of [16, 24, 32, 36]) {
    await loadMore.click();
    await expect(
      page.locator("[data-volunteer-portrait-trigger]"),
    ).toHaveCount(expectedCount);
  }
  await expect(loadMore).toHaveCount(0);

  const ids = await page
    .locator("[data-volunteer-portrait-trigger]")
    .evaluateAll((elements) =>
      elements.map((element) =>
        element.getAttribute("data-volunteer-portrait-trigger"),
      ),
    );

  expect(ids).toEqual(uccHubRoster.volunteers.map(({ id }) => id));
});
