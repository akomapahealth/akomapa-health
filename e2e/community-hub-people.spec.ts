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
    await expect(page.locator("html")).toHaveClass(new RegExp(`(^|\\s)${scenario.theme}(\\s|$)`));

    const leadership = page.locator("#hub-leadership");
    const volunteers = page.locator("#hub-volunteers");
    const hero = page.locator('[data-hub-id="ucc-hub"]');

    await expect(hero).toHaveAttribute("data-hub-hero-presentation", "background");
    await expect(hero.locator("[data-hub-hero-background]")).toHaveAttribute(
      "sizes",
      "100vw",
    );
    await expect(hero.locator("[data-hub-hero-panel]")).toBeVisible();

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

    const alternatingSectionIds = [
      "hub-metrics",
      "hub-leadership",
      "hub-volunteers",
      "community-stories",
      "student-stories",
      "faculty-mentorship",
      "hub-research",
      "hub-innovation",
    ];
    const backgrounds = await page.evaluate((sectionIds) => {
      return sectionIds.map((id) =>
        getComputedStyle(document.getElementById(id)!).backgroundColor,
      );
    }, alternatingSectionIds);
    const lightBackground =
      scenario.theme === "dark" ? "rgb(18, 21, 20)" : "rgb(252, 250, 239)";
    expect(backgrounds).toEqual([
      "rgb(15, 76, 92)",
      lightBackground,
      "rgb(15, 76, 92)",
      lightBackground,
      "rgb(15, 76, 92)",
      lightBackground,
      "rgb(15, 76, 92)",
      lightBackground,
    ]);

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
  await expect(dialog).toHaveAccessibleName("Our Volunteer Community");
  await expect(
    dialog.getByText(
      "We honor every volunteer whose hard work and care keep our community hub running.",
    ),
  ).toBeVisible();
  await expect(closeButton).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    )
    .toBe("hidden");

  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("Portrait 2 of 36")).toBeAttached();
  await expect(dialog).toHaveAccessibleName("Our Volunteer Community");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("Portrait 1 of 36")).toBeAttached();
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

test("UG renders leadership cards without a volunteer band; NHP stays roster-free", async ({
  page,
}) => {
  await preparePage(page);

  await page.goto("/community-hubs/ug", { waitUntil: "domcontentloaded" });
  const ugHero = page.locator('[data-hub-id="ug-hub"]');
  await expect(ugHero).toHaveAttribute(
    "data-hub-hero-presentation",
    "background",
  );
  await expect(ugHero.locator("[data-hub-hero-background]")).toHaveAttribute(
    "sizes",
    "100vw",
  );
  await expect(ugHero.locator("[data-hub-hero-panel]")).toBeVisible();

  const ugLeadership = page.locator("#hub-leadership");

  await expect(
    ugLeadership.getByRole("heading", {
      level: 2,
      name: "Meet the People Leading the Work",
    }),
  ).toBeVisible();
  await expect(page.locator("#hub-volunteers")).toHaveCount(0);
  await expect(ugLeadership).toHaveAttribute(
    "data-hub-leadership-presentation",
    "compact-modal",
  );
  await expect(ugLeadership.locator("[data-hub-leader]")).toHaveCount(4);
  await expect(
    ugLeadership.getByRole("heading", {
      level: 3,
      name: "Divina Selase Afenyo",
    }),
  ).toBeVisible();
  await expect(
    ugLeadership.getByRole("heading", { level: 3, name: "Kelvin Akoto Boateng" }),
  ).toBeVisible();
  await expect(
    ugLeadership.getByRole("heading", { level: 3, name: "Rachael Akusika Adu" }),
  ).toBeVisible();
  await expect(
    ugLeadership.locator("[data-hub-portrait-fallback]"),
  ).toHaveCount(0);

  const kelvinPortrait = ugLeadership.getByRole("button", {
    name: "Open biography for Kelvin Akoto Boateng",
  });
  await kelvinPortrait.scrollIntoViewIfNeeded();
  // Compact-modal cards hydrate as client islands; retry until the dialog mounts.
  await expect(async () => {
    await kelvinPortrait.click();
    await expect(
      page.getByRole("dialog", { name: "Kelvin Akoto Boateng" }),
    ).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15_000 });
  const dialog = page.getByRole("dialog", { name: "Kelvin Akoto Boateng" });
  await expect(
    dialog.getByText(/results-driven Pharmacy candidate/i),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Close Kelvin Akoto Boateng biography" })
    .click();
  await expect(dialog).toBeHidden();

  await expect(
    page.getByRole("link", { name: /Apply now/i }).first(),
  ).toHaveAttribute("href", /forms\.gle/);
  await expect(page.getByText("Active", { exact: true }).first()).toBeVisible();
  await expectNoOverflow(page);

  await page.goto("/community-hubs/nhp", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#hub-leadership")).toHaveCount(0);
  await expect(page.locator("#hub-volunteers")).toHaveCount(0);
  await expectNoOverflow(page);
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
