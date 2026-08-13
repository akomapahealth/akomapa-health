import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { academyCurriculum, academyOverview } from "../src/data/academy";
import { IMMERSION_INTEREST_COPY } from "../src/lib/immersion-interest";
import { phases } from "../src/components/roadmap/phases";

const routes = [
  "/academy",
  "/programs",
  "/programs/akomapa-foods",
  "/programs/akomapa-ghltp",
  "/programs/akomapa-network",
  "/programs/akomapa-young-advocates",
  "/roadmap",
] as const;

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
    test(`${viewport.name} · ${theme} · Academy/Programs/Roadmap editorial contracts`, async ({
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

test("academy preserves curriculum order, certification, and apply destination", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/academy", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "Akomapa Academy" }),
  ).toBeVisible();
  await expect(page.getByText(academyOverview.title)).toBeVisible();
  await expect(
    page.getByText(academyCurriculum.totalDuration, { exact: true }),
  ).toBeVisible();

  const moduleTitles = await page
    .locator("#curriculum ol > li h3")
    .allTextContents();
  expect(moduleTitles).toEqual(
    academyCurriculum.modules.map((module) => module.title),
  );

  await expect(
    page.getByRole("heading", {
      name: academyCurriculum.certificationName,
    }),
  ).toBeVisible();

  const becomeScholar = page
    .getByRole("button", { name: /Become a Scholar/i })
    .first();
  await becomeScholar.click();
  const interestDialog = page.getByRole("dialog");
  await expect(interestDialog).toBeVisible();
  await expect(
    interestDialog.getByRole("heading", {
      name: IMMERSION_INTEREST_COPY.modal.title,
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(interestDialog).toBeHidden();
});

test("programs listing preserves destinations and impact labels", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/programs", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("link", { name: /Explore Akomapa Clinics/i }),
  ).toHaveAttribute("href", "/community-hubs");
  await expect(
    page.getByRole("link", { name: /Discover the Akomapa Network/i }),
  ).toHaveAttribute("href", "/programs/akomapa-network");
  await expect(
    page.getByRole("link", { name: /Join the Leadership Program/i }),
  ).toHaveAttribute("href", "/programs/akomapa-ghltp");
  await expect(
    page.getByRole("link", { name: /Join the Akomapa Young Advocates/i }),
  ).toHaveAttribute("href", "/programs/akomapa-young-advocates");
  await expect(
    page.getByRole("link", { name: /Discover the Akomapa Foods & Stores/i }),
  ).toHaveAttribute("href", "/programs/akomapa-foods");

  await expect(
    page.getByText("Students Trained", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Partner Clinics", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Global Mentors", { exact: true })).toBeVisible();
});

test("GHLTP preserves mentor CTA, facts, and carousel region", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/programs/akomapa-ghltp", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("link", { name: /Become a Mentor/i }).first(),
  ).toHaveAttribute("href", "/contact");
  await expect(
    page.getByRole("link", { name: /Download Program Overview/i }),
  ).toHaveAttribute("href", "/programs");
  await expect(page.locator("[data-program-fact-summary]")).toHaveCount(1);
  await expect(
    page.getByRole("region", { name: "Participant testimonial carousel" }),
  ).toBeVisible();
});

test("roadmap preserves phase chronology and CTA destinations", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/roadmap", { waitUntil: "domcontentloaded" });

  for (const phase of phases) {
    await expect(page.getByText(phase.title).first()).toBeVisible();
    await expect(page.getByText(phase.period).first()).toBeVisible();
    await expect(page.locator(`#phase-${phase.id}`)).toBeVisible();
  }

  const ctaRegion = page.getByRole("region", {
    name: "Help us bring this vision to life",
  });
  await expect(
    ctaRegion.getByRole("link", { name: /Partner With Us/i }),
  ).toHaveAttribute("href", "/partnerships");
  await expect(
    ctaRegion.getByRole("link", { name: /^Donate$/i }),
  ).toHaveAttribute("href", "/partnerships");
  await expect(
    ctaRegion.getByRole("link", { name: /Contact Us/i }),
  ).toHaveAttribute("href", "mailto:info@akomapa.org");
});

test("keeps akomapa-ghip redirect unchanged", async ({ page }) => {
  const response = await page.goto("/programs/akomapa-ghip", {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/\/global-health-immersion-program$/);
});

test("supports reduced motion and narrow reflow across family routes", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    colorScheme: "light",
    viewport: { width: 720, height: 900 },
  });
  const page = await context.newPage();
  await preparePage(page, "light");

  for (const width of [720, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expectNoOverflow(page);
      await expect(page.locator("main h1")).toBeVisible();
    }
  }

  await context.close();
});

test("preserves visible keyboard focus on program listing CTA", async ({
  page,
}) => {
  await preparePage(page, "dark");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/programs", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const cta = page
    .getByRole("link", { name: /Explore Akomapa Clinics/i })
    .first();
  await cta.focus();
  await expect(cta).toBeFocused();

  const focusStyle = await cta.evaluate((element) => {
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
