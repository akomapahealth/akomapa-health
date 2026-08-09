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
      sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
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
        await page.goto("/global-health-immersion-program", {
          waitUntil: "domcontentloaded",
        });
        await expect(page.locator("[data-immersion-hero-hydrated]"))
          .toHaveAttribute("data-immersion-hero-hydrated", "true");
        await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(1);
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
        await expect(
          page.getByText(immersionProgram.applicationStatus, { exact: true }),
        ).toBeVisible();
        await expect(pageShell.locator("section")).toHaveCount(7);
        await expect(
          pageShell.locator('[data-section-tone="teal"]'),
        ).toHaveCount(2);

        await assertNoHorizontalOverflow(page);

        const layoutChecks = await pageShell.evaluate((element) => {
          const headings = Array.from(
            element.querySelectorAll<HTMLElement>("h1, h2, h3"),
          );
          const experienceLinks = Array.from(
            element.querySelectorAll<HTMLElement>(
              'a[href="#experience"]',
            ),
          );
          const interestButtons = Array.from(
            element.querySelectorAll<HTMLElement>(
              "[data-immersion-register-interest], [data-immersion-alert-cta]",
            ),
          );

          return {
            headingOverflow: headings.some(
              (heading) => heading.scrollWidth > heading.clientWidth + 1,
            ),
            experienceLinks: experienceLinks.map((link) => {
              const rect = link.getBoundingClientRect();
              return {
                text: link.textContent?.trim(),
                height: rect.height,
                clipped:
                  rect.left < -1 || rect.right > window.innerWidth + 1,
                labelOverflow: link.scrollWidth > link.clientWidth + 1,
              };
            }),
            interestButtons: interestButtons.map((button) => {
              const rect = button.getBoundingClientRect();
              return {
                text: button.textContent?.trim(),
                height: rect.height,
                clipped:
                  rect.left < -1 || rect.right > window.innerWidth + 1,
                labelOverflow: button.scrollWidth > button.clientWidth + 1,
              };
            }),
          };
        });

        expect(layoutChecks.headingOverflow).toBe(false);
        expect(layoutChecks.experienceLinks).toHaveLength(1);
        expect(layoutChecks.interestButtons).toHaveLength(3);
        for (const link of layoutChecks.experienceLinks) {
          expect(link.height, link.text).toBeGreaterThanOrEqual(44);
          expect(link.clipped, link.text).toBe(false);
          expect(link.labelOverflow, link.text).toBe(false);
        }
        for (const button of layoutChecks.interestButtons) {
          expect(button.height, button.text).toBeGreaterThanOrEqual(44);
          expect(button.clipped, button.text).toBe(false);
          expect(button.labelOverflow, button.text).toBe(false);
        }
      });
    }
  }

  test("reflows at a 200%-zoom-equivalent CSS viewport", async ({ page }) => {
    await page.setViewportSize({ width: 720, height: 450 });
    await preparePage(page, "light");
    await page.goto("/global-health-immersion-program", {
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
    await page.goto("/global-health-immersion-program", {
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

    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");
    await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(0);
    await expect(
      page.locator("[data-immersion-hero-media] img"),
    ).toBeVisible();
  });

  test("hero video is decorative, immediate, muted, and optimized", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await preparePage(page, "light");
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });

    const video = page.locator("[data-immersion-hero-video]");
    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");
    await expect(video).toHaveCount(1);
    await expect(page.locator("[data-immersion-hero-media] img")).toHaveCount(
      0,
    );

    expect(
      await video.evaluate((element) => {
        const media = element as HTMLVideoElement;
        return {
          ariaHidden: media.getAttribute("aria-hidden"),
          autoplay: media.autoplay,
          loop: media.loop,
          muted: media.muted,
          playsInline: media.playsInline,
          poster: media.poster,
          preload: media.preload,
        };
      }),
    ).toMatchObject({
      ariaHidden: "true",
      autoplay: true,
      loop: true,
      muted: true,
      playsInline: true,
      poster: "",
      preload: "auto",
    });
    await expect(video).toHaveCSS("opacity", "0.7");
  });

  test("never swaps to an image when video delivery is delayed or unavailable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await preparePage(page, "light");
    await page.route("**/immersion-hero.mp4**", async (route) => {
      await route.abort("failed");
    });
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");
    await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(1);
    await expect(page.locator("[data-immersion-hero-media] img")).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: immersionProgram.title,
      }),
    ).toBeVisible();
  });

  test("Explore the Experience moves to the four program pillars", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light");
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");

    await page
      .getByRole("link", { name: "Explore the Experience", exact: true })
      .click();

    await expect(page).toHaveURL(/#experience$/);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "What participants experience",
      }),
    ).toBeInViewport();
  });

  test("primary hero inquiry action has visible keyboard focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light");
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");

    const hero = page.getByRole("region", {
      name: immersionProgram.title,
      exact: true,
    });
    const interestButton = hero.getByRole("button", {
      name: "Register Interest",
      exact: true,
    });

    await interestButton.focus();
    await expect(interestButton).toBeFocused();
    await expect(interestButton).toHaveCSS("outline-style", "solid");
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

test.describe("Immersion program route migration", () => {
  test("redirects the former Programs URL to the top-level page", async ({
    page,
  }) => {
    const response = await page.goto("/programs/akomapa-ghip", {
      waitUntil: "domcontentloaded",
    });

    const redirectedRequest = response?.request().redirectedFrom();
    expect(redirectedRequest).not.toBeNull();
    expect((await redirectedRequest?.response())?.status()).toBe(301);
    await expect(page).toHaveURL(/\/global-health-immersion-program$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: immersionProgram.title,
      }),
    ).toBeVisible();
  });
});
