import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const heading = "From screening numbers to care outcomes.";

const introduction =
  "Akomapa measures success beyond the number of people reached. Our goal is to understand whether people at risk are identified, referred, connected to care, and supported over time.";

const steps = [
  {
    marker: "01",
    title: "Screened",
    description:
      "Community members screened for blood pressure, glucose, BMI, and related risk factors.",
  },
  {
    marker: "02",
    title: "Identified",
    description:
      "New suspected hypertension, diabetes, or high-risk cases detected.",
  },
  {
    marker: "03",
    title: "Referred",
    description:
      "Patients referred to clinics, providers, or partner facilities.",
  },
  {
    marker: "04",
    title: "Linked to care",
    description:
      "Referred patients who complete a care visit or verified follow-up.",
  },
  {
    marker: "05",
    title: "Followed up",
    description:
      "Patients contacted after outreach to encourage continuity of care.",
  },
  {
    marker: "06",
    title: "Leaders trained",
    description:
      "Student leaders and health professionals trained in NCD prevention, ethical leadership, referral support, and community-based care.",
  },
] as const;

const viewports = [
  { name: "mobile", width: 390, height: 844, columns: 1 },
  { name: "mobile-boundary", width: 767, height: 1024, columns: 1 },
  { name: "tablet", width: 768, height: 1024, columns: 2 },
  { name: "ipad-pro", width: 1024, height: 1366, columns: 2 },
  { name: "tablet-boundary", width: 1279, height: 900, columns: 2 },
  { name: "desktop-boundary", width: 1280, height: 900, columns: 6 },
  { name: "desktop", width: 1440, height: 900, columns: 6 },
] as const;

const themes = ["light", "dark"] as const;

type Rgba = { red: number; green: number; blue: number; alpha: number };

function parseCssColor(color: string): Rgba {
  const channels = color.match(/[\d.]+/g)?.map(Number);

  if (!channels || channels.length < 3) {
    throw new Error(`Unsupported CSS color: ${color}`);
  }

  const usesNormalizedSrgb = color.trimStart().startsWith("color(srgb ");
  const channelScale = usesNormalizedSrgb ? 255 : 1;

  return {
    red: channels[0] * channelScale,
    green: channels[1] * channelScale,
    blue: channels[2] * channelScale,
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

function getSection(page: Page) {
  return page.getByRole("region", { name: heading, exact: true });
}

async function getSectionColors(section: Locator) {
  return section.evaluate((element) => {
    const normalizeToSrgb = (color: string) => {
      const probe = document.createElement("span");
      probe.style.color = `color-mix(in srgb, ${color} 100%, transparent)`;
      element.append(probe);
      const normalizedColor = getComputedStyle(probe).color;
      probe.remove();
      return normalizedColor;
    };

    const staircase = element.querySelector<HTMLElement>(
      "[data-care-pathway-staircase]",
    );
    const firstStep = staircase?.querySelector<HTMLElement>(":scope > li");
    const title = firstStep?.querySelector<HTMLElement>("h3");
    const body = firstStep?.querySelector<HTMLElement>("p");
    const marker = firstStep?.querySelector<HTMLElement>(
      "[data-care-pathway-marker]",
    );

    if (!staircase || !firstStep || !title || !body || !marker) {
      throw new Error("Care pathway contrast targets were not rendered");
    }

    const sectionStyles = getComputedStyle(element);
    const stepStyles = getComputedStyle(firstStep);
    const stepRule =
      stepStyles.borderTopWidth === "0px"
        ? stepStyles.borderBottomColor
        : stepStyles.borderTopColor;

    return {
      sectionBackground: normalizeToSrgb(sectionStyles.backgroundColor),
      stepRule: normalizeToSrgb(stepRule),
      marker: normalizeToSrgb(getComputedStyle(marker).color),
      title: normalizeToSrgb(getComputedStyle(title).color),
      body: normalizeToSrgb(getComputedStyle(body).color),
    };
  });
}

test.describe("homepage care outcomes pathway", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: preserves copy, order, layout, and contrast`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        const section = getSection(page);
        const list = section.locator("ol");
        const listItems = list.locator(":scope > li");

        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expect(section).toBeVisible();
        await expect(
          section.getByRole("heading", {
            level: 2,
            name: heading,
            exact: true,
          }),
        ).toBeVisible();
        await expect(section.getByText("What We Measure", { exact: true })).toBeVisible();
        await expect(section.getByText(introduction, { exact: true })).toBeVisible();
        await expect(list).toHaveCount(1);
        await expect(list).toHaveAttribute("data-care-pathway-staircase");
        await expect(listItems).toHaveCount(steps.length);
        await expect(section.locator(".homepage-hover-card")).toHaveCount(0);
        await expect(
          section.locator('[data-testid$="-connector"]'),
        ).toHaveCount(0);
        await expect(section).not.toContainText("3,000+");
        await expect(section).not.toContainText("95%");

        for (const [index, step] of steps.entries()) {
          const listItem = listItems.nth(index);
          const marker = listItem.locator("[data-care-pathway-marker]");

          await expect(marker).toHaveText(step.marker);
          await expect(
            listItem.getByRole("heading", {
              level: 3,
              name: step.title,
              exact: true,
            }),
          ).toBeVisible();
          await expect(
            listItem.getByText(step.description, { exact: true }),
          ).toBeVisible();
        }

        const geometry = await listItems.evaluateAll((items) =>
          items.map((item) => {
            const rect = item.getBoundingClientRect();
            const content = Array.from(
              item.querySelectorAll<HTMLElement>("h3, p"),
            );

            return {
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
              left: rect.left,
              contentClips: content.some(
                (element) => element.scrollWidth - element.clientWidth > 1,
              ),
            };
          }),
        );

        expect(geometry.every((item) => !item.contentClips)).toBe(true);

        if (viewport.columns === 1) {
          for (let index = 1; index < geometry.length; index += 1) {
            expect(Math.abs(geometry[index].left - geometry[0].left)).toBeLessThan(
              2,
            );
            expect(geometry[index].top).toBeGreaterThanOrEqual(
              geometry[index - 1].bottom,
            );
          }
        } else if (viewport.columns === 2) {
          for (let row = 0; row < 3; row += 1) {
            const first = geometry[row * 2];
            const second = geometry[row * 2 + 1];

            expect(Math.abs(first.top - second.top)).toBeLessThan(2);
            expect(second.left).toBeGreaterThanOrEqual(first.right);

            if (row > 0) {
              expect(first.top).toBeGreaterThanOrEqual(
                geometry[(row - 1) * 2].bottom,
              );
            }
          }
        } else {
          for (let index = 1; index < geometry.length; index += 1) {
            expect(geometry[index].left).toBeGreaterThanOrEqual(
              geometry[index - 1].right,
            );
            expect(geometry[index].top).toBeGreaterThan(
              geometry[index - 1].top,
            );
          }
        }

        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth > 1,
          ),
        ).toBe(false);

        const colors = await getSectionColors(section);
        expect(
          contrastRatio(colors.title, colors.sectionBackground),
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(colors.body, colors.sectionBackground),
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(colors.stepRule, colors.sectionBackground),
        ).toBeGreaterThanOrEqual(3);
        expect(
          contrastRatio(colors.marker, colors.sectionBackground),
        ).toBeGreaterThanOrEqual(3);
      });
    }
  }

  test("reduced motion renders every step immediately without movement", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await preparePage(page, "light", true);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = getSection(page);
    const listItems = section.locator("ol > li");

    await section.scrollIntoViewIfNeeded();
    await expect(listItems).toHaveCount(steps.length);

    for (let index = 0; index < steps.length; index += 1) {
      await expect
        .poll(() =>
          listItems.nth(index).evaluate((element) => {
            const styles = getComputedStyle(element);
            return { opacity: styles.opacity, transform: styles.transform };
          }),
        )
        .toEqual({ opacity: "1", transform: "none" });
    }
  });

  test("200% text zoom preserves reflow and readable content", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await preparePage(page, "light", true);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });

    const section = getSection(page);
    const listItems = section.locator("ol > li");

    await section.scrollIntoViewIfNeeded();
    await expect(listItems).toHaveCount(steps.length);

    const clippedContent = await listItems.evaluateAll((items) =>
      items.flatMap((item) =>
        Array.from(item.querySelectorAll<HTMLElement>("h3, p"))
          .filter((element) => element.scrollWidth - element.clientWidth > 1)
          .map((element) => ({
            text: element.textContent?.trim(),
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          })),
      ),
    );

    expect(clippedContent).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth > 1,
      ),
    ).toBe(false);
  });
});
