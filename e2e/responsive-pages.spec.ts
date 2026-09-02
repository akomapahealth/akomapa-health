import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { teamHeroPeople } from "../src/data/team";

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
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1536", width: 1536, height: 960 },
  { name: "wide-1728", width: 1728, height: 1080 },
] as const;

const expectedGutterByWidth = new Map<number, number>([
  [375, 16],
  [768, 32],
  [1024, 40],
  [1280, 48],
  [1440, 48],
  [1536, 64],
  [1728, 64],
]);

const themes = ["light", "dark"] as const;

const routes: ReadonlyArray<{ path: string; name: string }> = [
  { path: "/", name: "home" },
  { path: "/academy", name: "academy" },
  { path: "/community-hubs", name: "hubs" },
  { path: "/ncd-impact", name: "ncd-impact" },
  { path: "/impact", name: "impact" },
  { path: "/research", name: "research" },
  { path: "/partnerships", name: "partnerships" },
  { path: "/get-involved", name: "get-involved" },
  { path: "/donate", name: "donate" },
  { path: "/contact", name: "contact" },
  { path: "/resources", name: "resources" },
  { path: "/news", name: "news" },
  { path: "/blog", name: "blog" },
  { path: "/about", name: "about" },
  { path: "/about/team", name: "team" },
  { path: "/programs", name: "programs" },
  {
    path: "/global-health-immersion-program",
    name: "global-health-immersion-program",
  },
  { path: "/philosophy", name: "philosophy" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
];

async function preparePage(page: Page, theme: (typeof themes)[number]) {
  await page.addInitScript(({ version, storedTheme }) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    } catch {
      /* noop */
    }
  }, { version: announcementCampaign.version, storedTheme: theme });
}

async function hasHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    // Allow a 1px subpixel tolerance.
    return document.documentElement.scrollWidth - window.innerWidth > 1;
  });
}

async function getSiteContainerPadding(page: Page): Promise<number> {
  const container = page
    .locator("main .site-container")
    .filter({ visible: true })
    .first();

  await expect(container).toBeVisible();
  return container.evaluate((element) =>
      Number.parseFloat(window.getComputedStyle(element).paddingInlineStart),
  );
}

test.describe("Responsive pages — header, footer, no horizontal overflow", () => {
  for (const viewport of viewports) {
    for (const theme of themes) {
      for (const route of routes) {
        test(`${viewport.name} · ${theme} · ${route.name} (${route.path})`, async ({
          page,
        }) => {
        await preparePage(page, theme);

        const responses: number[] = [];
        const consoleErrors: string[] = [];
        page.on("response", (response) => {
          if (new URL(response.url()).pathname === route.path) {
            responses.push(response.status());
          }
        });
        page.on("console", (message) => {
          if (message.type() === "error") {
            consoleErrors.push(message.text());
          }
        });

        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(route.path, { waitUntil: "domcontentloaded" });

        if (route.path === "/global-health-immersion-program") {
          await expect(
            page.locator("[data-immersion-hero-hydrated]"),
          ).toHaveAttribute("data-immersion-hero-hydrated", "true");
        }

        // Page response was successful.
        expect(responses.some((s) => s >= 500)).toBe(false);

        // Header + footer landmarks render on every page.
        await expect(page.locator("header").first()).toBeVisible();
        await expect(page.locator("footer").first()).toBeVisible();

        await expect(page.locator("main h1, main h2").first()).toBeVisible();

        expect(await getSiteContainerPadding(page)).toBe(
          expectedGutterByWidth.get(viewport.width),
        );

        // No horizontal scrollbar — common cause of broken responsive layouts.
        // Allow Swiper/animated sections to settle before measuring.
        await page.waitForTimeout(500);
        expect(await hasHorizontalOverflow(page)).toBe(false);

        const criticalErrors = consoleErrors.filter(
          (error) =>
            !error.includes("Failed to load resource") &&
            !error.includes("net::ERR_") &&
            !error.includes("404"),
        );
        expect(criticalErrors).toEqual([]);
      });
    }
  }
  }
});

test("the Team node network is unique and contained to its editorial band", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about/team", { waitUntil: "domcontentloaded" });

  const network = page.locator("[data-team-node-network]");
  await expect(network).toHaveCount(1);
  await expect(network).toBeVisible();
  await expect(network).toHaveAttribute("aria-hidden", "true");
  await expect(network.locator("[data-team-node-portrait]")).toHaveCount(
    teamHeroPeople.length,
  );

  const isContained = await network.evaluate((element) => {
    const networkBox = element.getBoundingClientRect();
    const bandBox = element.closest("[data-editorial-band]")?.getBoundingClientRect();

    return Boolean(
      bandBox &&
        networkBox.left >= bandBox.left - 1 &&
        networkBox.right <= bandBox.right + 1 &&
        networkBox.top >= bandBox.top - 1 &&
        networkBox.bottom <= bandBox.bottom + 1,
    );
  });
  expect(isContained).toBe(true);

  for (const path of ["/about", "/philosophy"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-team-node-network]")).toHaveCount(0);
  }
});
