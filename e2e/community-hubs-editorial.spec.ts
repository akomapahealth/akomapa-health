import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  communityHubs,
  communityHubsListing,
  getHubHref,
  hubMissions,
  hubRouteSlugs,
} from "../src/data/community-hubs";

const listingRoute = "/community-hubs";
const detailRoutes = hubRouteSlugs.map((slug) => `/community-hubs/${slug}`);
const routes = [listingRoute, ...detailRoutes] as const;

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

const statusLabels = {
  active: "Active",
  "in-development": "In development",
  planned: "Planned",
  future: "Future",
} as const;

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
    test(`${viewport.name} · ${theme} · Community hubs editorial contracts`, async ({
      page,
    }) => {
      test.setTimeout(60_000);
      await preparePage(page, theme);
      await page.setViewportSize(viewport);

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.locator("main h1")).toHaveCount(1);
        await expectElementInViewport(page.locator("main h1"));
        await expectNoOverflow(page);

        const bands = page.locator("[data-editorial-band]");
        await expect(bands.first()).toBeVisible();

        const standaloneControls = page.locator(
          "[data-editorial-band] a, [data-editorial-band] button",
        );
        const undersized = await standaloneControls.evaluateAll((controls) =>
          controls
            .filter((control) => {
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

test("listing preserves mission order, hub status text, and destinations", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(listingRoute, { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: communityHubsListing.headline,
    }),
  ).toHaveCount(1);

  const missionTitles = await page
    .locator("#five-missions ol li h3")
    .allTextContents();
  expect(missionTitles).toEqual(hubMissions.map((mission) => mission.title));

  const listingTones = await page
    .locator("[data-editorial-band]")
    .evaluateAll((bands) =>
      bands.map((band) => band.getAttribute("data-editorial-tone")),
    );
  expect(listingTones).toEqual(["teal", "cream", "white", "cream", "teal"]);

  for (const hub of communityHubs) {
    const card = page.locator(
      `[data-testid="community-hub-card"][data-hub-id="${hub.id}"]`,
    );
    await expect(card).toHaveAttribute("data-hub-status", hub.status);
    await expect(card.getByText(statusLabels[hub.status], { exact: true })).toBeVisible();
    await expect(
      card.getByRole("link", { name: new RegExp(hub.name) }),
    ).toHaveAttribute("href", getHubHref(hub));
  }
});

for (const routeSlug of hubRouteSlugs) {
  test(`detail /community-hubs/${routeSlug} preserves status and semantic metrics`, async ({
    page,
  }) => {
    const hub = communityHubs.find(({ routeSlug: slug }) => slug === routeSlug)!;

    await preparePage(page, "light");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/community-hubs/${routeSlug}`, {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: hub.name, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(statusLabels[hub.status], { exact: true }),
    ).toBeVisible();

    const metrics = page.locator("[data-hub-metrics]");
    await expect(metrics).toHaveCount(1);
    await expect(metrics.locator("dt")).toHaveCount(4);
    await expect(metrics.locator("dd")).toHaveCount(4);
    await expect(page.getByText("Community members served")).toBeVisible();
    await expect(page.getByText("Students trained")).toBeVisible();
    await expect(page.getByText("Communities reached")).toBeVisible();
    await expect(page.getByText("Partners engaged")).toBeVisible();

    if (hub.status === "in-development") {
      await expect(page.getByText(/This hub is in development/i)).toBeVisible();
    }

    await expect(page.locator("[data-hub-empty-state]")).toHaveCount(4);
  });
}

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
    }
  }

  await context.close();
});

test("preserves visible keyboard focus on hub destination links", async ({
  page,
}) => {
  await preparePage(page, "dark");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(listingRoute, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const firstHubLink = page
    .locator("#our-hubs [data-testid='community-hub-card'] a")
    .first();
  await firstHubLink.focus();
  await expect(firstHubLink).toBeFocused();

  const focusStyle = await firstHubLink.evaluate((element) => {
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

for (const theme of themes) {
  test(`${theme} representative hub editorial text meets AA contrast`, async ({
    page,
  }) => {
    await preparePage(page, theme);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(listingRoute, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1")).toBeVisible();

    const creamHeading = page
      .locator("[data-editorial-band][data-editorial-tone='cream'] h2")
      .first();
    await expect
      .poll(() =>
        creamHeading.evaluate((element) => getComputedStyle(element).color),
      )
      .toBe(
        theme === "dark" ? "rgb(252, 250, 239)" : "rgb(28, 31, 30)",
      );

    await page.addStyleTag({
      content:
        "*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; }",
    });

    const selectors = [
      "main h1",
      "[data-editorial-band][data-editorial-tone='cream'] h2",
      "#our-hubs [data-testid='community-hub-card'] a",
    ];
    const ratios = await page.evaluate((sampleSelectors) => {
      type Rgba = { r: number; g: number; b: number; a: number };

      const parse = (value: string): Rgba => {
        if (value === "transparent") {
          return { r: 0, g: 0, b: 0, a: 0 };
        }
        const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
        return {
          r: channels[0] ?? 0,
          g: channels[1] ?? 0,
          b: channels[2] ?? 0,
          a: channels[3] ?? 1,
        };
      };
      const composite = (front: Rgba, back: Rgba): Rgba => {
        const alpha = front.a + back.a * (1 - front.a);
        return {
          r: (front.r * front.a + back.r * back.a * (1 - front.a)) / alpha,
          g: (front.g * front.a + back.g * back.a * (1 - front.a)) / alpha,
          b: (front.b * front.a + back.b * back.a * (1 - front.a)) / alpha,
          a: alpha,
        };
      };
      const backgroundFor = (element: Element): Rgba => {
        let background: Rgba = { r: 255, g: 255, b: 255, a: 1 };
        const ancestors: Element[] = [];
        for (let node: Element | null = element; node; node = node.parentElement) {
          ancestors.unshift(node);
        }
        for (const ancestor of ancestors) {
          const layer = parse(getComputedStyle(ancestor).backgroundColor);
          if (layer.a > 0) background = composite(layer, background);
        }
        return background;
      };
      const luminance = ({ r, g, b }: Rgba) => {
        const linear = [r, g, b].map((channel) => {
          const value = channel / 255;
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
      };

      return sampleSelectors.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) {
          return {
            selector,
            ratio: 0,
            foregroundCss: "",
            backgroundCss: "",
          };
        }
        const background = backgroundFor(element);
        const foregroundCss = getComputedStyle(element).color;
        const foreground = composite(parse(foregroundCss), background);
        const light = Math.max(luminance(foreground), luminance(background));
        const dark = Math.min(luminance(foreground), luminance(background));
        return {
          selector,
          ratio: (light + 0.05) / (dark + 0.05),
          foregroundCss,
          backgroundCss: getComputedStyle(element).backgroundColor,
        };
      });
    }, selectors);

    for (const { selector, ratio, foregroundCss, backgroundCss } of ratios) {
      expect
        .soft(
          ratio,
          `${theme} contrast: ${selector} (${foregroundCss} on ${backgroundCss})`,
        )
        .toBeGreaterThanOrEqual(4.5);
    }
  });
}
