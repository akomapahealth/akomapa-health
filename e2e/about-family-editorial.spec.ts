import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { philosophySections } from "../src/data/philosophy";

const routes = ["/about", "/about/team", "/philosophy"] as const;
const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "ipad-pro-1024", width: 1024, height: 1366 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1536", width: 1536, height: 960 },
  { name: "retina-laptop-1920", width: 1920, height: 1080 },
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
    test(`${viewport.name} · ${theme} · About family editorial contracts`, async ({
      page,
    }) => {
      test.setTimeout(45_000);
      await preparePage(page, theme);
      await page.setViewportSize(viewport);

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.locator("main h1")).toHaveCount(1);
        await expectElementInViewport(page.locator("main h1"));
        await expectNoOverflow(page);

        const standaloneControls = page.locator(
          "[data-editorial-band] a, [data-editorial-band] button, nav[aria-label='On this page'] a",
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

      await page.goto("/about/team", { waitUntil: "domcontentloaded" });
      const network = page.locator("[data-team-node-network]");
      await expect(network).toHaveCount(1);
      await expect(network).toBeVisible();

      const networkLayout = await network.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const grid = element.parentElement;
        const copy = grid?.firstElementChild?.getBoundingClientRect();
        const portraits = Array.from(
          element.querySelectorAll<HTMLElement>("[data-team-node-portrait]"),
        );

        const overlapsCopy = Boolean(
          copy &&
            box.left < copy.right &&
            box.right > copy.left &&
            box.top < copy.bottom &&
            box.bottom > copy.top,
        );

        return {
          copyWidth: copy?.width ?? 0,
          contained:
            box.left >= -1 &&
            box.right <= window.innerWidth + 1 &&
            portraits.every((portrait) => {
              const portraitBox = portrait.getBoundingClientRect();
              return (
                portraitBox.width > 0 &&
                portraitBox.height > 0 &&
                portraitBox.left >= box.left - 1 &&
                portraitBox.right <= box.right + 1 &&
                portraitBox.top >= box.top - 1 &&
                portraitBox.bottom <= box.bottom + 1
              );
            }),
          minimumPortraitSize: Math.min(
            ...portraits.map(
              (portrait) => portrait.getBoundingClientRect().width,
            ),
          ),
          networkWidth: box.width,
          overlapsCopy,
        };
      });
      expect(networkLayout).toMatchObject({
        contained: true,
        overlapsCopy: false,
      });
      if (viewport.width >= 1536) {
        expect(networkLayout.networkWidth).toBeGreaterThan(
          networkLayout.copyWidth,
        );
        expect(networkLayout.minimumPortraitSize).toBeGreaterThanOrEqual(63);
      }
    });
  }
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

test("preserves philosophy band order and visible keyboard focus", async ({
  page,
}) => {
  await preparePage(page, "dark");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/philosophy", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const tones = await page
    .locator("[data-philosophy-principle]")
    .evaluateAll((principles) =>
      principles.map((principle) =>
        principle.closest("[data-editorial-band]")?.getAttribute(
          "data-editorial-tone",
        ),
      ),
    );
  expect(tones).toEqual(
    philosophySections.map((_, index) => (index % 2 === 0 ? "cream" : "teal")),
  );

  const firstOnPageLink = page
    .locator("nav[aria-label='On this page'] a")
    .first();
  await firstOnPageLink.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(firstOnPageLink).toBeFocused();
  const focusStyle = await firstOnPageLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderColor: style.borderTopColor,
      boxShadow: style.boxShadow,
      outlineStyle: style.outlineStyle,
    };
  });
  expect(focusStyle.borderColor).toBe("rgb(62, 85, 90)");
  expect(focusStyle.boxShadow).toContain("rgb(245, 201, 77)");
  expect(
    focusStyle.boxShadow !== "none" || focusStyle.outlineStyle !== "none",
  ).toBe(true);
});

for (const theme of themes) {
  test(`${theme} representative editorial text and controls meet AA contrast`, async ({
    page,
  }) => {
    await preparePage(page, theme);
    await page.setViewportSize({ width: 1280, height: 900 });

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1")).toBeVisible();
      const creamHeading = page
        .locator("[data-editorial-band][data-editorial-tone='cream'] h2")
        .first();
      await expect
        .poll(() =>
          creamHeading.evaluate((element) => getComputedStyle(element).color),
        )
        .toBe(
          theme === "dark"
            ? "rgb(252, 250, 239)"
            : "rgb(28, 31, 30)",
        );
      await page.addStyleTag({
        content:
          "*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; }",
      });

      const selectors = [
        "main h1",
        "[data-editorial-band][data-editorial-tone='cream'] h2",
        "[data-editorial-band] a",
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
          const foreground = composite(
            parse(foregroundCss),
            background,
          );
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
            `${theme} ${route} contrast: ${selector} (${foregroundCss} on ${backgroundCss})`,
          )
          .toBeGreaterThanOrEqual(4.5);
      }
    }
  });
}
