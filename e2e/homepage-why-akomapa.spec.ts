import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const heading = "One model. Two challenges. Lasting impact.";

const introduction =
  "Most interventions focus on either community care or professional training. Akomapa brings both together. Through Community Learning & Care Hubs, we support early NCD detection, referral, follow-up, and health education while training student leaders and health professionals to serve with clinical competence, cultural humility, and ethical leadership.";

const steps = [
  {
    marker: "01",
    accent: "teal",
    title: "Catch cases earlier",
    body: "We screen for hypertension, diabetes, and related risk factors so communities can identify preventable complications before they become emergencies.",
  },
  {
    marker: "02",
    accent: "gold",
    title: "Close the loop to care",
    body: "We track referrals, linkage to care, and follow-up so outreach does not end at screening day.",
  },
  {
    marker: "03",
    accent: "teal",
    title: "Train ethical health leaders",
    body: "We prepare students and professionals to lead community-centered NCD prevention, education, data collection, referral support, and patient advocacy.",
  },
] as const;

const closingStatement =
  "Akomapa is building healthier communities by caring for today's patients and preparing tomorrow's NCD-ready health leaders.";

const viewports = [
  { name: "mobile", width: 390, height: 844, columns: 1 },
  { name: "tablet", width: 768, height: 1024, columns: 2 },
  { name: "ipad-pro", width: 1024, height: 1366, columns: 3 },
  { name: "desktop", width: 1440, height: 900, columns: 3 },
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

    const card = element.querySelector<HTMLElement>(".homepage-hover-card");
    const title = card?.querySelector<HTMLElement>("h3");
    const body = card?.querySelector<HTMLElement>("p");
    const markers = Array.from(
      element.querySelectorAll<HTMLElement>('span[data-accent]'),
    );
    const connector = element.querySelector<HTMLElement>(
      '[data-testid="why-akomapa-connector"]',
    );

    if (!card || !title || !body || markers.length !== 3 || !connector) {
      throw new Error("Why Akomapa contrast targets were not rendered");
    }

    const cardStyles = getComputedStyle(card);

    return {
      background: normalizeToSrgb(cardStyles.backgroundColor),
      border: normalizeToSrgb(cardStyles.borderTopColor),
      markers: markers.map((marker) => {
        const markerStyles = getComputedStyle(marker);
        return {
          background: normalizeToSrgb(markerStyles.backgroundColor),
          border: normalizeToSrgb(markerStyles.borderTopColor),
          color: normalizeToSrgb(markerStyles.color),
        };
      }),
      title: normalizeToSrgb(getComputedStyle(title).color),
      body: normalizeToSrgb(getComputedStyle(body).color),
      connector: normalizeToSrgb(
        getComputedStyle(connector).backgroundColor,
      ),
    };
  });
}

test.describe("homepage Why Akomapa model", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: preserves copy, sequence, layout, and contrast`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        // Reduced motion avoids mid-FadeIn opacity compositing flaking contrast.
        await preparePage(page, theme, true);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        const section = getSection(page);
        const list = section.locator("ol");
        const listItems = list.locator(":scope > li");
        const connectors = section.getByTestId("why-akomapa-connector");

        await expect(section).toBeVisible();
        await expect(
          section.getByRole("heading", {
            level: 2,
            name: heading,
            exact: true,
          }),
        ).toBeVisible();
        await expect(section.getByText(introduction, { exact: true })).toBeVisible();
        await expect(
          section.getByText(closingStatement, { exact: true }),
        ).toBeVisible();
        await expect(list).toHaveCount(1);
        await expect(listItems).toHaveCount(steps.length);
        await expect(section.locator("a, button")).toHaveCount(0);

        for (const [index, step] of steps.entries()) {
          const listItem = listItems.nth(index);
          const marker = listItem.locator('span[aria-hidden="true"]').first();

          await expect(marker).toHaveText(step.marker);
          await expect(marker).toHaveAttribute("data-accent", step.accent);
          await expect(
            listItem.getByRole("heading", {
              level: 3,
              name: step.title,
              exact: true,
            }),
          ).toBeVisible();
          await expect(listItem.getByText(step.body, { exact: true })).toBeVisible();
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
              width: rect.width,
              contentClips: content.some(
                (element) => element.scrollWidth - element.clientWidth > 1,
              ),
            };
          }),
        );

        expect(geometry.every((card) => !card.contentClips)).toBe(true);

        if (viewport.columns === 1) {
          expect(Math.abs(geometry[0].left - geometry[1].left)).toBeLessThan(2);
          expect(geometry[1].top).toBeGreaterThan(geometry[0].bottom);
          expect(geometry[2].top).toBeGreaterThan(geometry[1].bottom);
        } else if (viewport.columns === 2) {
          expect(Math.abs(geometry[0].top - geometry[1].top)).toBeLessThan(2);
          expect(geometry[1].left).toBeGreaterThan(geometry[0].right);
          expect(geometry[2].top).toBeGreaterThan(geometry[0].bottom);
          expect(geometry[2].width).toBeGreaterThan(geometry[0].width * 1.9);
        } else {
          expect(Math.max(...geometry.map((card) => card.top))).toBeLessThan(
            Math.min(...geometry.map((card) => card.top)) + 2,
          );
          expect(geometry[1].left).toBeGreaterThan(geometry[0].right);
          expect(geometry[2].left).toBeGreaterThan(geometry[1].right);
        }

        await expect(connectors).toHaveCount(2);
        for (let index = 0; index < 2; index += 1) {
          const connector = connectors.nth(index);
          const display = await connector.evaluate(
            (element) => getComputedStyle(element).display,
          );

          expect(display).toBe(viewport.columns === 3 ? "block" : "none");
        }

        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth > 1,
          ),
        ).toBe(false);

        const colors = await getSectionColors(section);
        // The 20px semibold card title qualifies as WCAG large text.
        expect(contrastRatio(colors.title, colors.background)).toBeGreaterThanOrEqual(
          3,
        );
        expect(contrastRatio(colors.body, colors.background)).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(contrastRatio(colors.border, colors.background)).toBeGreaterThanOrEqual(
          3,
        );
        for (const marker of colors.markers) {
          expect(
            contrastRatio(marker.color, marker.background),
          ).toBeGreaterThanOrEqual(4.5);
          expect(
            contrastRatio(marker.border, colors.background),
          ).toBeGreaterThanOrEqual(3);
        }
        expect(
          contrastRatio(colors.connector, colors.background),
        ).toBeGreaterThanOrEqual(3);
      });
    }
  }

  test("desktop hover enhances the card without changing its information", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await preparePage(page, "light");
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = getSection(page);
    const card = section.locator(".homepage-hover-card").first();
    const textBeforeHover = await card.textContent();

    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await expect
      .poll(() =>
        card.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe("none");

    expect(await card.textContent()).toBe(textBeforeHover);
  });

  test("reduced motion keeps the sequence visible without transform movement", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await preparePage(page, "light", true);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = getSection(page);
    const listItems = section.locator("ol > li");
    const firstCard = section.locator(".homepage-hover-card").first();

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

    await firstCard.hover();
    await expect
      .poll(() =>
        firstCard.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe("none");
  });
});
