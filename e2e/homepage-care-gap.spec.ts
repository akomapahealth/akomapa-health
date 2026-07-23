import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const careGapHeading =
  "The crisis is not only disease burden. It is the gap between risk, diagnosis, and care.";

const viewports = [
  { name: "mobile", width: 390, height: 844, layout: "stacked" },
  { name: "tablet", width: 768, height: 1024, layout: "stacked" },
  { name: "ipad-pro", width: 1024, height: 1366, layout: "columns" },
  { name: "desktop", width: 1440, height: 900, layout: "columns" },
] as const;

const themes = ["light", "dark"] as const;

const sourceLinks = [
  {
    name: "Source for 43M: WHO NCD Fact Sheet, updated 2025; mortality data year 2021 (opens in a new tab)",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    name: "Source for 75%: WHO NCD Fact Sheet, updated 2025; mortality data year 2021 (opens in a new tab)",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    name: "Source for 73%: WHO NCD Fact Sheet, updated 2025; mortality data year 2021 (opens in a new tab)",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    name: "Source for 51.1%: Ghana STEPS Report 2023 (opens in a new tab)",
    href: "https://www.afro.who.int/sites/default/files/2024-11/GHANA%20STEPS%20REPORT%202023.pdf",
  },
] as const;

type Rgba = { red: number; green: number; blue: number; alpha: number };

function parseCssColor(color: string): Rgba {
  const channels = color.match(/[\d.]+/g)?.map(Number);

  if (!channels || channels.length < 3) {
    throw new Error(`Unsupported CSS color: ${color}`);
  }

  return {
    red: channels[0],
    green: channels[1],
    blue: channels[2],
    alpha: channels[3] ?? 1,
  };
}

function composite(foreground: Rgba, background: Rgba): Rgba {
  const alpha = foreground.alpha + background.alpha * (1 - foreground.alpha);
  const blend = (foregroundChannel: number, backgroundChannel: number) =>
    (foregroundChannel * foreground.alpha +
      backgroundChannel * background.alpha * (1 - foreground.alpha)) /
    alpha;

  return {
    red: blend(foreground.red, background.red),
    green: blend(foreground.green, background.green),
    blue: blend(foreground.blue, background.blue),
    alpha,
  };
}

function relativeLuminance({ red, green, blue }: Rgba) {
  const linearize = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * linearize(red) +
    0.7152 * linearize(green) +
    0.0722 * linearize(blue)
  );
}

function contrastRatio(foregroundCss: string, backgroundCss: string) {
  const background = parseCssColor(backgroundCss);
  const foreground = composite(parseCssColor(foregroundCss), background);
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);

  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

async function preparePage(
  page: Page,
  theme: (typeof themes)[number],
  reducedMotion = false,
) {
  await page.emulateMedia({
    colorScheme: theme,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  await page.addInitScript(
    ({ announcementVersion, storedTheme }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    },
    {
      announcementVersion: announcementCampaign.version,
      storedTheme: theme,
    },
  );
}

async function getSectionColors(section: Locator) {
  return section.evaluate((element) => {
    const heading = element.querySelector("h2");
    const eyebrow = heading?.previousElementSibling;
    const value = element.querySelector("dt");
    const source = element.querySelector("dd a");
    const background = getComputedStyle(element).backgroundColor;

    if (!eyebrow || !value || !source) {
      throw new Error("Care-gap contrast targets were not rendered");
    }

    return {
      background,
      eyebrow: getComputedStyle(eyebrow).color,
      value: getComputedStyle(value).color,
      source: getComputedStyle(source).color,
    };
  });
}

test.describe("homepage care-gap evidence", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: remains readable, ordered, and overflow-free`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        await expect(page.locator("html")).toHaveClass(new RegExp(theme));

        const section = page.getByRole("region", {
          name: careGapHeading,
          exact: true,
        });
        const heading = section.getByRole("heading", {
          level: 2,
          name: careGapHeading,
          exact: true,
        });
        const definitionList = section.locator("dl");

        await expect(section).toBeVisible();
        await expect(heading).toBeVisible();
        await expect(definitionList.locator("dt")).toHaveCount(4);
        await expect(definitionList.locator("dd")).toHaveCount(4);

        for (const source of sourceLinks) {
          const link = section.getByRole("link", {
            name: source.name,
            exact: true,
          });
          await expect(link).toBeVisible();
          await expect(link).toHaveAttribute("href", source.href);
        }

        const geometry = await section.evaluate((element) => {
          const headingElement = element.querySelector("h2");
          const listElement = element.querySelector("dl");
          const sourceElements = Array.from(
            element.querySelectorAll<HTMLElement>("dd, dd a"),
          );

          if (!headingElement || !listElement) {
            throw new Error("Care-gap layout targets were not rendered");
          }

          const headingRect = headingElement.getBoundingClientRect();
          const listRect = listElement.getBoundingClientRect();

          return {
            headingLeft: headingRect.left,
            headingBottom: headingRect.bottom,
            listLeft: listRect.left,
            listTop: listRect.top,
            contentClips: sourceElements.some(
              (sourceElement) =>
                sourceElement.scrollWidth - sourceElement.clientWidth > 1,
            ),
          };
        });

        if (viewport.layout === "stacked") {
          expect(geometry.listTop).toBeGreaterThan(geometry.headingBottom);
        } else {
          expect(geometry.listLeft).toBeGreaterThan(geometry.headingLeft);
        }
        expect(geometry.contentClips).toBe(false);

        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth > 1,
        );
        expect(hasHorizontalOverflow).toBe(false);

        const colors = await getSectionColors(section);
        expect(contrastRatio(colors.eyebrow, colors.background)).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(contrastRatio(colors.source, colors.background)).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(contrastRatio(colors.value, colors.background)).toBeGreaterThanOrEqual(
          3,
        );
      });
    }
  }

  test("source links expose a visible keyboard focus indicator", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light");
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const sourceLink = page.getByRole("link", {
      name: sourceLinks[0].name,
      exact: true,
    });
    await sourceLink.focus();
    await expect(sourceLink).toBeFocused();

    const focusStyles = await sourceLink.evaluate((element) => {
      const styles = getComputedStyle(element);
      return { boxShadow: styles.boxShadow, outlineStyle: styles.outlineStyle };
    });

    expect(
      focusStyles.boxShadow !== "none" || focusStyles.outlineStyle !== "none",
    ).toBe(true);
  });

  test("reduced-motion users receive visible evidence without transform motion", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light", true);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    expect(
      await page.evaluate(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);

    const section = page.getByRole("region", {
      name: careGapHeading,
      exact: true,
    });
    await section.scrollIntoViewIfNeeded();

    const evidenceGroups = section.locator("dl > div");
    await expect(evidenceGroups).toHaveCount(4);

    for (const value of ["43M", "75%", "73%", "51.1%"]) {
      const metricValue = section.getByText(value, { exact: true });
      const evidenceGroup = evidenceGroups.filter({ hasText: value });

      await expect(evidenceGroup).toHaveCount(1);
      await metricValue.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          evidenceGroup.evaluate((element) => {
            const styles = getComputedStyle(element);
            return { opacity: styles.opacity, transform: styles.transform };
          }),
        )
        .toEqual({ opacity: "1", transform: "none" });
    }
  });
});
