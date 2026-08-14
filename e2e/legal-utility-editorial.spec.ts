import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const legalRoutes = [
  {
    path: "/privacy",
    heading: "Privacy Policy",
    lastUpdated: "Last updated: August 14, 2026",
    sectionHeading: "Who we are and what this policy covers",
  },
  {
    path: "/terms",
    heading: "Terms of Service",
    lastUpdated: "Last updated: May 9, 2026",
    sectionHeading: "Agreement to these terms",
  },
] as const;

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "ipad-pro-1024", width: 1024, height: 1366 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1536", width: 1536, height: 960 },
] as const;

const themes = ["light", "dark"] as const;

async function preparePage(page: Page, theme: (typeof themes)[number]) {
  await page.addInitScript(
    ({ version, storedTheme }) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);

      const style = document.createElement("style");
      style.textContent =
        "*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important}";
      document.documentElement.append(style);
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

async function expectElementInViewport(locator: Locator) {
  const contained = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= -1 && rect.right <= window.innerWidth + 1;
  });
  expect(contained).toBe(true);
}

test.describe("legal utility editorial contracts", () => {
  test("preserves privacy and terms copy, links, and editorial structure", async ({
    page,
  }) => {
    await preparePage(page, "light");
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(
      page.getByText("Last updated: August 14, 2026").first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Who we are and what this policy covers",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "On this page" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "info@akomapa.org" }).first(),
    ).toHaveAttribute("href", "mailto:info@akomapa.org");
    await expect(
      page.getByRole("link", { name: "contact page" }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.locator('[data-editorial-band][data-editorial-tone="teal"]').first(),
    ).toBeVisible();
    await expect(
      page
        .locator('[data-editorial-band][data-editorial-tone="cream"]')
        .first(),
    ).toBeVisible();
    await expect(page.locator("[data-legal-prose-article]")).toBeVisible();
    await expect(page.locator("[data-legal-section]").first()).toBeVisible();
    await expect(
      page.locator("[data-publication-article-measure]"),
    ).toBeVisible();

    const privacyGradientBands = await page
      .locator("[data-editorial-band]")
      .evaluateAll(
        (nodes) =>
          nodes.filter((node) => node.className.includes("gradient")).length,
      );
    expect(privacyGradientBands).toBe(0);

    await page.goto("/terms", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { level: 1, name: "Terms of Service" }),
    ).toBeVisible();
    await expect(
      page.getByText("Last updated: May 9, 2026").first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Agreement to these terms",
      }),
    ).toBeVisible();
    await expect(
      page.locator("#acceptance").getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
    await expect(
      page.getByRole("link", { name: "contact page" }),
    ).toHaveAttribute("href", "/contact");
    await expect(page.getByText("www.akomapahealth.org")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "On this page" }),
    ).toBeVisible();
  });

  test("renders accessible not-found recovery navigation", async ({ page }) => {
    await preparePage(page, "light");
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.goto("/this-route-does-not-exist-186", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: "Page Not Found" }),
    ).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "Back to Homepage" }),
    ).toHaveAttribute("href", "/");
    await expect(
      page.getByRole("link", { name: "Contact us" }),
    ).toHaveAttribute("href", "/contact");
    await expect(page.locator("[data-route-not-found-state]")).toBeVisible();

    const recovery = page.getByRole("navigation", { name: "Helpful links" });
    await expect(recovery).toBeVisible();
    await expect(
      recovery.getByRole("link", { name: "Get Involved" }),
    ).toHaveAttribute("href", "/get-involved");
    await expect(
      recovery.getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");

    const homepageCta = page.getByRole("link", { name: "Back to Homepage" });
    await homepageCta.focus();
    await expect(homepageCta).toBeFocused();
  });

  test("keeps reduced-motion loading semantics calm during soft navigation", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      colorScheme: "light",
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await preparePage(page, "light");
    await page.goto("/", { waitUntil: "networkidle" });

    let releasePrivacy: (() => void) | undefined;
    const privacyGate = new Promise<void>((resolve) => {
      releasePrivacy = resolve;
    });

    await page.route("**/privacy**", async (route) => {
      const url = route.request().url();
      // Hold only the route/RSC payload so loading.tsx can paint; let static chunks through.
      if (url.includes("/_next/static")) {
        await route.continue();
        return;
      }
      await privacyGate;
      await route.continue();
    });

    const privacyLink = page.locator('a[href="/privacy"]').first();
    await expect(privacyLink).toBeVisible();
    await privacyLink.click({ noWaitAfter: true });

    const loading = page.locator("[data-route-loading-state]");
    const loadingVisible = await loading
      .waitFor({ state: "visible", timeout: 8_000 })
      .then(() => true)
      .catch(() => false);

    if (loadingVisible) {
      // Assert while the gate still holds the destination closed.
      await expect(loading).toHaveAttribute("aria-busy", "true");
      await expect(page.getByRole("status")).toContainText(/Loading/i);
      await expect(page.locator("[data-route-loading-spinner]")).toHaveClass(
        /motion-reduce:animate-none/,
      );
    }

    releasePrivacy?.();

    await expect(
      page.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.locator("[data-route-loading-state]")).toHaveCount(0);

    // Reduced-motion contract remains covered even when prefetch skips loading UI.
    const motionState = await page
      .locator("[data-editorial-band]")
      .evaluateAll((bands) =>
        bands.map((band) => {
          const style = getComputedStyle(band);
          return { opacity: style.opacity, transform: style.transform };
        }),
      );
    expect(
      motionState.every(
        ({ opacity, transform }) =>
          opacity === "1" &&
          (transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)"),
      ),
    ).toBe(true);

    await context.close();
  });

  test("supports reduced motion and 200% zoom-equivalent reflow on utility surfaces", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      colorScheme: "light",
      viewport: { width: 720, height: 900 },
    });
    const page = await context.newPage();
    await preparePage(page, "light");

    for (const width of [720, 320]) {
      await page.setViewportSize({ width, height: 900 });

      for (const route of legalRoutes) {
        await page.goto(route.path, { waitUntil: "domcontentloaded" });
        await expect(
          page.getByRole("heading", { level: 1, name: route.heading }),
        ).toBeVisible();
        await expectNoOverflow(page);

        const motionState = await page
          .locator("[data-editorial-band]")
          .evaluateAll((bands) =>
            bands.map((band) => {
              const style = getComputedStyle(band);
              return { opacity: style.opacity, transform: style.transform };
            }),
          );
        expect(
          motionState.every(
            ({ opacity, transform }) =>
              opacity === "1" &&
              (transform === "none" ||
                transform === "matrix(1, 0, 0, 1, 0, 0)"),
          ),
        ).toBe(true);
      }

      await page.goto("/this-route-does-not-exist-186-zoom", {
        waitUntil: "domcontentloaded",
      });
      await expect(
        page.getByRole("heading", { level: 1, name: "Page Not Found" }),
      ).toBeVisible();
      await expectNoOverflow(page);
    }

    await context.close();
  });

  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`${viewport.name} · ${theme} · legal and not-found stay readable`, async ({
        page,
      }) => {
        test.setTimeout(90_000);
        await preparePage(page, theme);
        await page.setViewportSize(viewport);

        for (const route of legalRoutes) {
          await page.goto(route.path, { waitUntil: "domcontentloaded" });
          await expect(page.locator("main h1")).toHaveCount(1);
          await expect(
            page.getByRole("heading", { level: 1, name: route.heading }),
          ).toBeVisible();
          await expect(page.getByText(route.lastUpdated).first()).toBeVisible();
          await expect(
            page.getByRole("heading", {
              level: 2,
              name: route.sectionHeading,
            }),
          ).toBeVisible();
          await expectElementInViewport(page.locator("main h1"));
          await expectNoOverflow(page);

          const bands = page.locator("[data-editorial-band]");
          await expect(bands.first()).toBeVisible();
          const gradientBands = await bands.evaluateAll(
            (nodes) =>
              nodes.filter((node) => node.className.includes("gradient"))
                .length,
          );
          expect(gradientBands).toBe(0);
        }

        await page.goto("/this-route-does-not-exist-186", {
          waitUntil: "domcontentloaded",
        });
        await expect(
          page.getByRole("heading", { level: 1, name: "Page Not Found" }),
        ).toBeVisible();
        await expectElementInViewport(page.locator("main h1"));
        await expectNoOverflow(page);
        await expect(
          page.getByRole("navigation", { name: "Helpful links" }),
        ).toBeVisible();
      });
    }
  }
});
