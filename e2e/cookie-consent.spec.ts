import { expect, type Locator, type Page, type Request } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";
import { CONSENT_STORAGE_KEY } from "../src/lib/consent";
import { freezeClockInAnnouncementWindow } from "./helpers";

/**
 * First-visit cookie consent: banner UX, persistence, withdrawal, and proof
 * from the network that Google Analytics never loads without acceptance.
 *
 * GA assertions need a build with NEXT_PUBLIC_GA_MEASUREMENT_ID set (CI uses a
 * sentinel ID). Google endpoints are stubbed, so no real traffic leaves.
 */

test.use({ cookieConsent: "unset" });

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GA_COOKIE = "_ga";
const GA_SESSION_COOKIE = GA_ID ? `_ga_${GA_ID.replace(/^G-/, "")}` : "";

const BANNER_NAME = "Can we use optional analytics cookies?";

type GoogleTraffic = { requests: Request[] };

async function stubGoogleAnalytics(page: Page): Promise<GoogleTraffic> {
  const traffic: GoogleTraffic = { requests: [] };

  await page.route(
    /^https:\/\/(www\.googletagmanager\.com|[^/]*\.google-analytics\.com|[^/]*\.analytics\.google\.com)\//,
    async (route) => {
      traffic.requests.push(route.request());
      const isScript = route.request().resourceType() === "script";
      await route.fulfill({
        status: isScript ? 200 : 204,
        contentType: isScript ? "application/javascript" : "text/plain",
        body: isScript ? "window.__gtagStubLoaded = true;" : "",
      });
    },
  );

  return traffic;
}

async function preparePage(page: Page, theme: "light" | "dark" = "light") {
  await page.addInitScript(
    ({ version, storedTheme }) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      localStorage.setItem("akomapa-theme", storedTheme);
      sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
    },
    { version: announcementCampaign.version, storedTheme: theme },
  );
  return stubGoogleAnalytics(page);
}

function banner(page: Page) {
  return page.getByRole("region", { name: BANNER_NAME });
}

async function storedConsent(page: Page) {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as { analytics: boolean; version: string }) : null;
  }, CONSENT_STORAGE_KEY);
}

async function gaCookieNames(page: Page) {
  const cookies = await page.context().cookies();
  return cookies
    .map((cookie) => cookie.name)
    .filter((name) => name === GA_COOKIE || name.startsWith("_ga_"));
}

async function expectInsideViewport(page: Page, locator: Locator) {
  const viewport = page.viewportSize();
  const box = await locator.boundingBox();
  expect(box, "element should be rendered").not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width + 0.5);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height + 0.5);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("Cookie consent banner", () => {
  for (const path of ["/", "/about", "/privacy", "/cookie-policy"]) {
    test(`asks first-time visitors on ${path}`, async ({ page }) => {
      await preparePage(page);
      await page.goto(path, { waitUntil: "domcontentloaded" });

      await expect(banner(page)).toBeVisible();
      await expect(
        banner(page).getByRole("link", { name: "Cookie Policy" }),
      ).toHaveAttribute("href", "/cookie-policy");
    });
  }

  test("gives accept and reject identical weight", async ({ page }) => {
    await preparePage(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const accept = banner(page).getByRole("button", { name: "Accept optional cookies" });
    const reject = banner(page).getByRole("button", { name: "Reject optional cookies" });
    await expect(accept).toBeVisible();

    const [acceptBox, rejectBox] = await Promise.all([
      accept.boundingBox(),
      reject.boundingBox(),
    ]);
    expect(Math.abs(acceptBox!.width - rejectBox!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(acceptBox!.height - rejectBox!.height)).toBeLessThanOrEqual(1);

    const styles = await Promise.all(
      [accept, reject].map((button) =>
        button.evaluate((element) => {
          const style = getComputedStyle(element);
          return [style.backgroundColor, style.color, style.fontSize, style.fontWeight];
        }),
      ),
    );
    expect(styles[0]).toEqual(styles[1]);
  });

  test("is reachable first by keyboard and answered without a mouse", async ({ page }) => {
    await preparePage(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(banner(page)).toBeVisible();

    await page.keyboard.press("Tab");
    await expect(
      banner(page).getByRole("button", { name: "Accept optional cookies" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    const confirmation = page.getByRole("heading", {
      name: "You've rejected optional cookies.",
    });
    await expect(confirmation).toBeVisible();
    await expect(page.locator("[data-cookie-banner] [tabindex='-1']")).toBeFocused();
    expect(await storedConsent(page)).toMatchObject({ analytics: false });
  });

  test("holds the announcement until the visitor has chosen", async ({ page }) => {
    await freezeClockInAnnouncementWindow(page);
    await page.addInitScript(() => {
      sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
    });
    await stubGoogleAnalytics(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(banner(page)).toBeVisible();

    const fab = page.getByTestId("announcement-trigger");
    await page.waitForTimeout(4_000);
    await expect(fab).toHaveCount(0);
    await expect(page.getByRole("dialog", { name: "Announcements" })).toHaveCount(0);

    await banner(page).getByRole("button", { name: "Reject optional cookies" }).click();
    await expect(fab).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("Cookie choice persistence and necessary behaviour", () => {
  test("rejection persists across navigation and reloads, and keeps theme working", async ({
    page,
  }) => {
    const traffic = await preparePage(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await banner(page).getByRole("button", { name: "Reject optional cookies" }).click();
    await page.getByRole("button", { name: "Hide this message" }).click();
    await expect(page.locator("[data-cookie-banner]")).toHaveCount(0);

    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.locator("[data-cookie-banner]")).toHaveCount(0);

    // Necessary storage still works after rejection.
    await page.getByRole("button", { name: "Toggle theme" }).first().click();
    await page.getByRole("menuitem", { name: "Dark" }).click();
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    expect(await page.evaluate(() => localStorage.getItem("akomapa-theme"))).toBe("dark");

    expect(traffic.requests).toHaveLength(0);
    expect(await gaCookieNames(page)).toEqual([]);
  });

  test("re-prompts when the stored choice is from an older policy version", async ({
    page,
  }) => {
    await preparePage(page);
    await page.addInitScript((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({ version: "2020-01-01", analytics: true, decidedAt: Date.now() }),
      );
    }, CONSENT_STORAGE_KEY);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(banner(page)).toBeVisible();
  });

  test("footer and policy page reopen settings so consent can be withdrawn", async ({
    page,
  }) => {
    await preparePage(page);
    await page.goto("/cookie-policy", { waitUntil: "domcontentloaded" });
    await banner(page).getByRole("button", { name: "Accept optional cookies" }).click();
    expect(await storedConsent(page)).toMatchObject({ analytics: true });

    const footerSettings = page
      .locator("[data-footer-legal]")
      .getByRole("button", { name: "Cookie settings" });
    await footerSettings.click();

    const dialog = page.getByRole("dialog", { name: "Cookie settings" });
    await expect(dialog).toBeVisible();
    const toggle = dialog.getByRole("checkbox", { name: "Allow Google Analytics cookies" });
    await expect(toggle).toBeChecked();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(footerSettings).toBeFocused();

    await page.getByRole("button", { name: "Open cookie settings" }).click();
    await dialog.getByRole("checkbox", { name: "Allow Google Analytics cookies" }).click();
    await dialog.getByRole("button", { name: "Save my choices" }).click();

    await expect(dialog).toBeHidden();
    expect(await storedConsent(page)).toMatchObject({ analytics: false });
  });
});

test.describe("Google Analytics network gating", () => {
  test.skip(!GA_ID, "Build with NEXT_PUBLIC_GA_MEASUREMENT_ID to verify GA gating.");

  test("sends nothing to Google before a choice or after rejection", async ({ page }) => {
    const traffic = await preparePage(page);
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(banner(page)).toBeVisible();
    expect(traffic.requests).toHaveLength(0);
    expect(await page.locator('script[src*="googletagmanager.com"]').count()).toBe(0);
    expect(await page.locator('link[href*="googletagmanager.com"]').count()).toBe(0);

    await banner(page).getByRole("button", { name: "Reject optional cookies" }).click();
    await page.goto("/about", { waitUntil: "networkidle" });
    await page.locator("main a[href^='/']").first().click();
    await page.waitForLoadState("networkidle");

    expect(traffic.requests).toHaveLength(0);
    expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
    expect(await gaCookieNames(page)).toEqual([]);
  });

  test("loads GA only after acceptance, with consent queued before config", async ({
    page,
  }) => {
    const traffic = await preparePage(page);
    await page.goto("/", { waitUntil: "networkidle" });
    expect(traffic.requests).toHaveLength(0);

    await banner(page).getByRole("button", { name: "Accept optional cookies" }).click();

    await expect
      .poll(() => traffic.requests.map((request) => request.url()))
      .toContainEqual(expect.stringContaining(`gtag/js?id=${GA_ID}`));

    const commands = await page.evaluate(() =>
      (window.dataLayer ?? []).map((entry) =>
        Array.from(entry as ArrayLike<unknown>).slice(0, 2),
      ),
    );
    const consentIndex = commands.findIndex(
      ([command, type]) => command === "consent" && type === "default",
    );
    const configIndex = commands.findIndex(([command]) => command === "config");
    expect(consentIndex).toBeGreaterThanOrEqual(0);
    expect(configIndex).toBeGreaterThan(consentIndex);
  });

  test("withdrawal stops events and removes GA cookies", async ({ page }) => {
    await preparePage(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await banner(page).getByRole("button", { name: "Accept optional cookies" }).click();
    await page.getByRole("button", { name: "Hide this message" }).click();

    const origin = new URL(page.url());
    await page.context().addCookies([
      { name: GA_COOKIE, value: "GA1.1.1.1", domain: origin.hostname, path: "/" },
      { name: GA_SESSION_COOKIE, value: "GS1.1.1", domain: origin.hostname, path: "/" },
    ]);

    await page
      .locator("[data-footer-legal]")
      .getByRole("button", { name: "Cookie settings" })
      .click();
    const dialog = page.getByRole("dialog", { name: "Cookie settings" });
    await dialog.getByRole("checkbox", { name: "Allow Google Analytics cookies" }).click();
    await dialog.getByRole("button", { name: "Save my choices" }).click();
    await expect(dialog).toBeHidden();

    await expect.poll(() => gaCookieNames(page)).toEqual([]);
    expect(
      await page.evaluate((id) => (window as unknown as Record<string, unknown>)[`ga-disable-${id}`], GA_ID),
    ).toBe(true);

    const countEvents = () =>
      page.evaluate(
        () =>
          (window.dataLayer ?? []).filter(
            (entry) => Array.from(entry as ArrayLike<unknown>)[0] === "event",
          ).length,
      );
    const eventsBefore = await countEvents();
    await page.locator("[data-site-footer]").getByRole("link", { name: "Send us a message" }).click();
    await page.waitForURL("**/contact");
    expect(await countEvents()).toBe(eventsBefore);
  });
});

test.describe("Cookie banner layout", () => {
  const layouts = [
    { name: "phone-320", width: 320, height: 568 },
    { name: "phone-375", width: 375, height: 812 },
    { name: "landscape-short", width: 640, height: 360 },
    // 1280×800 at 200% browser zoom is a 640×400 CSS viewport.
    { name: "zoom-200", width: 640, height: 400 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
  ] as const;

  for (const layout of layouts) {
    for (const theme of ["light", "dark"] as const) {
      test(`${layout.name} ${theme}: choices stay reachable without sideways scroll`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: layout.width, height: layout.height });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        const region = banner(page);
        await expect(region).toBeVisible();
        // Let the entrance slide settle before measuring.
        await expect(async () => expectInsideViewport(page, region)).toPass();
        await expectNoHorizontalOverflow(page);

        for (const name of ["Accept optional cookies", "Reject optional cookies"]) {
          const button = region.getByRole("button", { name });
          await button.scrollIntoViewIfNeeded();
          await expectInsideViewport(page, button);
        }

        const surface = await region.evaluate((element) => getComputedStyle(element).backgroundColor);
        expect(surface).toBe(theme === "dark" ? "rgb(28, 31, 30)" : "rgb(252, 250, 239)");
      });
    }
  }
});
