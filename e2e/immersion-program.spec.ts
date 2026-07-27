import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { immersionProgram } from "../src/data/immersion-program";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 1366 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1536, height: 960 },
] as const;

const themes = ["light", "dark"] as const;

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
    ({ storedTheme, announcementVersion }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    },
    {
      storedTheme: theme,
      announcementVersion: announcementCampaign.version,
    },
  );
}

async function assertNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth + 1,
  );
}

test.describe("Immersion program responsive editorial layout", () => {
  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`${viewport.name} · ${theme} remains readable and overflow-free`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await preparePage(page, theme);
        await page.goto("/programs/akomapa-ghip", {
          waitUntil: "domcontentloaded",
        });
        await page.evaluate(async () => document.fonts.ready);

        const pageShell = page.locator("[data-immersion-page]");
        await expect(pageShell).toBeVisible();
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: immersionProgram.title,
          }),
        ).toBeVisible();
        await expect(page.locator("main h1")).toHaveCount(1);
        await expect(pageShell.locator("section")).toHaveCount(7);

        await assertNoHorizontalOverflow(page);

        const layoutChecks = await pageShell.evaluate((element) => {
          const headings = Array.from(
            element.querySelectorAll<HTMLElement>("h1, h2, h3"),
          );
          const inquiryLinks = Array.from(
            element.querySelectorAll<HTMLElement>(
              'a[href^="/contact?type=immersion"]',
            ),
          );

          return {
            headingOverflow: headings.some(
              (heading) => heading.scrollWidth > heading.clientWidth + 1,
            ),
            inquiryLinks: inquiryLinks.map((link) => {
              const rect = link.getBoundingClientRect();
              return {
                text: link.textContent?.trim(),
                height: rect.height,
                clipped:
                  rect.left < -1 || rect.right > window.innerWidth + 1,
                labelOverflow: link.scrollWidth > link.clientWidth + 1,
              };
            }),
          };
        });

        expect(layoutChecks.headingOverflow).toBe(false);
        expect(layoutChecks.inquiryLinks).toHaveLength(4);
        for (const link of layoutChecks.inquiryLinks) {
          expect(link.height, link.text).toBeGreaterThanOrEqual(44);
          expect(link.clipped, link.text).toBe(false);
          expect(link.labelOverflow, link.text).toBe(false);
        }
      });
    }
  }

  test("reflows at a 200%-zoom-equivalent CSS viewport", async ({ page }) => {
    await page.setViewportSize({ width: 720, height: 450 });
    await preparePage(page, "light");
    await page.goto("/programs/akomapa-ghip", {
      waitUntil: "domcontentloaded",
    });

    await assertNoHorizontalOverflow(page);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: immersionProgram.title,
      }),
    ).toBeVisible();
  });

  test("reduced motion reveals content without transform movement", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light", true);
    await page.goto("/programs/akomapa-ghip", {
      waitUntil: "domcontentloaded",
    });

    expect(
      await page.evaluate(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);

    const section = page.getByRole("region", {
      name: "What participants experience",
      exact: true,
    });
    const heading = section.getByRole("heading", {
      level: 2,
      name: "What participants experience",
    });
    const reveal = heading.locator("xpath=../..");

    await expect(reveal).toHaveCount(1);
    await reveal.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        reveal.evaluate((element) => {
          const styles = getComputedStyle(element);
          return { opacity: styles.opacity, transform: styles.transform };
        }),
      )
      .toEqual({ opacity: "1", transform: "none" });
  });

  test("primary hero inquiry action has visible keyboard focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light");
    await page.goto("/programs/akomapa-ghip", {
      waitUntil: "domcontentloaded",
    });

    const hero = page.getByRole("region", {
      name: immersionProgram.title,
      exact: true,
    });
    const interestLink = hero.getByRole("link", {
      name: "Register Interest",
      exact: true,
    });

    await interestLink.focus();
    await expect(interestLink).toBeFocused();
    await expect(interestLink).toHaveCSS("outline-style", "solid");
  });
});

test.describe("Immersion contact intents", () => {
  test("register-interest intent pre-fills the contact form", async ({ page }) => {
    await preparePage(page, "light");
    await page.goto("/contact?type=immersion", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.getByLabel("Subject *", { exact: true })).toHaveValue(
      "Global Health Immersion Program Interest",
    );
    await expect(page.getByLabel("Message *", { exact: true })).toHaveValue(
      /notify me when the next cohort details are available/,
    );
  });

  test("brochure intent pre-fills a distinct request", async ({ page }) => {
    await preparePage(page, "light");
    await page.goto("/contact?type=immersion-brochure", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.getByLabel("Subject *", { exact: true })).toHaveValue(
      "Global Health Immersion Program Brochure Request",
    );
    await expect(page.getByLabel("Message *", { exact: true })).toHaveValue(
      /latest available information/,
    );
  });

  test("unknown intent values leave the contact form untouched", async ({
    page,
  }) => {
    await preparePage(page, "light");
    await page.goto("/contact?type=not-allowed", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.getByLabel("Subject *", { exact: true })).toHaveValue("");
    await expect(page.getByLabel("Message *", { exact: true })).toHaveValue("");
  });
});
