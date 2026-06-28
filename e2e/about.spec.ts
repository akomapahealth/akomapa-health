import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { BRAND } from "../src/config/brand";
import {
  aboutHero,
  exploreMoreCards,
  whatWeDoCategories,
} from "../src/data/about";
import { timeline } from "../src/data/timeline";

async function preparePage(page: Page, theme?: "light" | "dark") {
  await page.addInitScript(
    ({ announcementVersion, storedTheme }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );

      if (storedTheme) {
        localStorage.setItem("akomapa-theme", storedTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(storedTheme);
      }
    },
    {
      announcementVersion: announcementCampaign.version,
      storedTheme: theme ?? null,
    },
  );
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth > 1,
  );
}

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("renders metadata, breadcrumb, hero, mission/vision, timeline, and sections", async ({
    page,
  }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/About Akomapa/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /ethical global health leaders/i,
    );
    await expect(page.locator("[data-rebrand-page]")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: aboutHero.headline,
        exact: true,
      }),
    ).toHaveCount(1);

    const heroSection = page.locator("section").filter({
      has: page.getByRole("heading", { level: 1, name: aboutHero.headline }),
    });

    await expect(heroSection.getByText(aboutHero.openingParagraph)).toBeVisible();
    await expect(
      heroSection.getByText(/non-communicable diseases/i),
    ).toBeVisible();
    await expect(
      heroSection.getByText(/students are not just the leaders of tomorrow/i),
    ).toBeVisible();
    await expect(
      heroSection.getByText(/ethical, community-centered leadership/i),
    ).toBeVisible();

    await expect(page.getByText(BRAND.mission)).toBeVisible();
    await expect(page.getByText(BRAND.vision)).toBeVisible();

    for (const event of timeline) {
      await expect(
        page.locator("#our-journey").getByRole("heading", {
          level: 3,
          name: event.title,
          exact: true,
        }),
      ).toBeVisible();
    }

    const whatWeDoSection = page.locator("#what-we-do");
    for (const category of whatWeDoCategories) {
      await expect(
        whatWeDoSection.getByRole("heading", {
          level: 3,
          name: category.title,
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        whatWeDoSection.getByRole("link", { name: new RegExp(category.title) }),
      ).toHaveAttribute("href", category.href);
    }

    const exploreSection = page.locator("#explore-more");
    for (const card of exploreMoreCards) {
      await expect(
        exploreSection.getByRole("link", { name: new RegExp(card.title) }),
      ).toHaveAttribute("href", card.href);
    }

    await expect(
      page.getByRole("navigation").filter({ hasText: "About" }).first(),
    ).toContainText("About");

    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test("does not contain old positioning language", async ({ page }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByText(/Transforming healthcare access through innovation/i),
    ).toHaveCount(0);
    await expect(
      page.getByText(/Access to Care|Healthcare Workforce/i),
    ).toHaveCount(0);
  });

  test("remains readable in dark mode", async ({ page }) => {
    await preparePage(page, "dark");
    await page.goto("/about", { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("[data-rebrand-page]")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: aboutHero.headline, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(BRAND.mission)).toBeVisible();

    expect(await hasHorizontalOverflow(page)).toBe(false);
  });
});
