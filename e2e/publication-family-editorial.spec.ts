import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { blogPosts } from "../src/data/blog";
import { researchPapers } from "../src/data/research-papers";

const researchSlug = researchPapers[0].slug;
const newsId = "akomapa-yale-global-health-recognition";
const blogSlug = blogPosts[0].slug;

const routes = [
  "/research",
  `/research/${researchSlug}`,
  "/resources",
  "/news",
  `/news/${newsId}`,
  "/blog",
  `/blog/${blogSlug}`,
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
    test(`${viewport.name} · ${theme} · Publication family editorial contracts`, async ({
      page,
    }) => {
      test.setTimeout(120_000);
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

test("research listing preserves paper metadata and contact mailto", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/research", { waitUntil: "domcontentloaded" });

  const paper = researchPapers[0];
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Evidence-based research driving healthcare innovation/i,
    }),
  ).toBeVisible();
  await expect(page.getByText(paper.authors)).toBeVisible();
  await expect(
    page.locator(`a[href="/research/${paper.slug}"]`).first(),
  ).toBeVisible();
  await expect(page.getByText("Read Paper").first()).toBeVisible();
  await expect(
    page.locator('a[href="mailto:akomapahealth@gmail.com"]').first(),
  ).toBeVisible();
});

test("resources explorer supports labeled search and empty results", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/resources", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "Healthcare Resources" }),
  ).toBeVisible();
  await expect(page.getByLabel("Search resources")).toBeVisible();
  await expect(page.getByLabel("Category")).toBeVisible();

  await page.getByLabel("Search resources").fill("zzzz-no-match-query");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.getByRole("heading", { name: "No Resources Found" }),
  ).toBeVisible();
});

test("news and blog remain distinguishable while sharing publication patterns", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto("/news", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { level: 1, name: /News from the frontlines/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: /Filter news by category/i }),
  ).toBeVisible();
  await expect(
    page.locator("[data-publication-entry]").first(),
  ).toBeVisible();

  await page.goto("/blog", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { level: 1, name: "Thought Leadership" }),
  ).toBeVisible();
  await expect(
    page.getByRole("tablist", { name: /Filter articles by category/i }),
  ).toBeVisible();
});

test("invalid news, blog, and research slugs show not-found", async ({
  page,
}) => {
  await preparePage(page, "light");
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const route of [
    "/news/nonexistent-item-id",
    "/blog/nonexistent-slug",
    "/research/nonexistent-slug",
  ]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible({ timeout: 15_000 });
  }
});

test("supports reduced motion and narrow reflow across publication routes", async ({
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
