import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  futureVision,
  healthImpact,
  leadershipImpact,
  mapLocations,
} from "../src/data/impact";
import {
  ncdDataVizContent,
  ncdFutureVisionContent,
  ncdHeroContent,
  whyNCDsMatterContent,
} from "../src/data/ncd-impact";

const routes = ["/impact", "/ncd-impact"] as const;

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "boundary-640", width: 640, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "boundary-900", width: 900, height: 1024 },
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

for (const viewport of viewports) {
  for (const theme of themes) {
    test(`${viewport.name} · ${theme} · Impact/NCD editorial contracts`, async ({
      page,
    }) => {
      test.setTimeout(90_000);
      await preparePage(page, theme);
      await page.setViewportSize(viewport);

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.locator("main h1")).toHaveCount(1);
        await expectElementInViewport(page.locator("main h1"));
        await expectNoOverflow(page);

        const bands = page.locator("[data-editorial-band]");
        await expect(bands.first()).toBeVisible();

        const gradientBands = await bands.evaluateAll((nodes) =>
          nodes
            .filter((node) => node.className.includes("gradient"))
            .map((node) => node.getAttribute("data-editorial-tone")),
        );
        expect(gradientBands).toEqual([]);

        // Exclude Leaflet chrome (zoom ±, attribution) — third-party map UI.
        const standaloneControls = page.locator(
          "[data-editorial-band] a, [data-editorial-band] button",
        );
        const undersized = await standaloneControls.evaluateAll((controls) =>
          controls
            .filter((control) => {
              if (control.closest(".leaflet-container")) return false;
              const style = getComputedStyle(control);
              const rect = control.getBoundingClientRect();
              return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                (rect.width < 44 || rect.height < 44)
              );
            })
            .map((control) => control.textContent?.trim() ?? control.tagName),
        );
        expect(undersized).toEqual([]);
      }
    });
  }
}

test("/impact preserves verified metrics, tones, and future distinction", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/impact", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "Our Impact" }),
  ).toHaveCount(1);

  const tones = await page
    .locator("[data-editorial-band]")
    .evaluateAll((bands) =>
      bands.map((band) => band.getAttribute("data-editorial-tone")),
    );
  expect(tones).toEqual([
    "teal",
    "cream",
    "teal",
    "cream",
    "white",
    "teal",
    "teal",
  ]);

  const healthMetrics = page.locator("[data-health-impact-metrics]");
  await expect(healthMetrics).toHaveCount(1);
  await expect(healthMetrics.locator("dt")).toHaveCount(
    healthImpact.metrics.length,
  );
  for (const metric of healthImpact.metrics) {
    await expect(
      healthMetrics.getByText(metric.label, { exact: true }),
    ).toBeVisible();
    await expect(
      healthMetrics.getByText(`Target ${metric.futureValue}`),
    ).toBeVisible();
  }

  const leadershipMetrics = page.locator("[data-leadership-impact-metrics]");
  await expect(leadershipMetrics).toHaveCount(1);
  for (const metric of leadershipImpact.metrics) {
    await expect(
      leadershipMetrics.getByText(metric.label, { exact: true }),
    ).toBeVisible();
  }

  const futureTargets = page.locator("[data-future-vision-targets]");
  await expect(page.getByText("Future targets")).toBeVisible();
  await expect(page.getByText(/By 2028 — not yet achieved/i)).toBeVisible();
  for (const target of futureVision) {
    await expect(
      futureTargets.getByText(target.label, { exact: true }),
    ).toBeVisible();
    if (target.currentValue) {
      await expect(
        futureTargets.getByText(`Today: ${target.currentValue}`, {
          exact: true,
        }),
      ).toBeVisible();
    }
  }

  for (const location of mapLocations) {
    await expect(
      page.getByText(location.name, { exact: true }).first(),
    ).toBeVisible();
  }

  const ctaBand = page.locator("#impact-cta");
  await expect(
    ctaBand.getByRole("link", { name: /Get Involved/i }),
  ).toHaveAttribute("href", "/get-involved");
  await expect(
    ctaBand.getByRole("link", { name: /^Donate$/i }),
  ).toHaveAttribute("href", "/donate");
});

test("/ncd-impact preserves burden evidence, current results, and future targets", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ncd-impact", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: ncdHeroContent.heading }),
  ).toHaveCount(1);

  const tones = await page
    .locator("[data-editorial-band]")
    .evaluateAll((bands) =>
      bands.map((band) => band.getAttribute("data-editorial-tone")),
    );
  expect(tones).toEqual([
    "teal",
    "cream",
    "teal",
    "cream",
    "white",
    "cream",
    "teal",
  ]);

  await expect(page.getByText("External evidence").first()).toBeVisible();
  for (const stat of whyNCDsMatterContent.globalStats) {
    await expect(page.getByText(stat.label, { exact: true })).toBeVisible();
  }
  await expect(
    page.getByRole("link", { name: whyNCDsMatterContent.source.label }),
  ).toHaveAttribute("href", whyNCDsMatterContent.source.href);

  const comparisonViz = page.locator("[data-ncd-comparison-viz]");
  for (const comparison of ncdDataVizContent.comparisons) {
    await expect(
      comparisonViz.getByText(comparison.label, { exact: true }),
    ).toBeVisible();
    await expect(
      comparisonViz.getByText(`${comparison.ghana}${comparison.unit}`, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      comparisonViz.getByText(`${comparison.global}${comparison.unit}`, {
        exact: true,
      }),
    ).toBeVisible();
  }

  await expect(page.getByText("Akomapa current results")).toBeVisible();
  await expect(
    page.locator('[data-ncd-current-metrics="health"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('[data-ncd-current-metrics="leadership"]'),
  ).toHaveCount(1);

  await expect(
    page.getByText(/Future targets — not yet achieved/i),
  ).toBeVisible();
  for (const target of ncdFutureVisionContent.targets) {
    await expect(page.getByText(target.futureValue, { exact: true })).toBeVisible();
    await expect(
      page.getByText(`Target by ${target.futureYear}`).first(),
    ).toBeVisible();
  }
});

test("supports reduced motion and 200% zoom-equivalent reflow", async ({
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
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
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
            opacity === "1" && transform === "none",
        ),
      ).toBe(true);

      if (route === "/impact") {
        await expect(page.getByText("Current results").first()).toBeVisible();
        await expect(page.getByText("Future targets")).toBeVisible();
      }
      if (route === "/ncd-impact") {
        await expect(page.getByText("External evidence").first()).toBeVisible();
        await expect(page.getByText("Akomapa current results")).toBeVisible();
      }
    }
  }

  await context.close();
});

test("preserves visible keyboard focus on impact CTA links", async ({
  page,
}) => {
  await preparePage(page, "dark");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/impact", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const getInvolved = page.getByRole("link", { name: /Get Involved/i }).last();
  await getInvolved.focus();
  await expect(getInvolved).toBeFocused();

  const focusStyle = await getInvolved.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      boxShadow: style.boxShadow,
      outlineStyle: style.outlineStyle,
    };
  });
  expect(
    focusStyle.boxShadow !== "none" || focusStyle.outlineStyle !== "none",
  ).toBe(true);
});
