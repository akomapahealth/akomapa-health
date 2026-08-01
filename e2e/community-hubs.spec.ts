import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  communityHubs,
  communityHubsListing,
  getHubHref,
  hubActivities,
  hubMissions,
  hubBreadcrumbLabels,
  hubRouteSlugs,
} from "../src/data/community-hubs";

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

test.describe("Community Health Hubs listing page", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("renders metadata, hero, missions, activities, hub cards, and value props", async ({
    page,
  }) => {
    await page.goto("/community-hubs", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Community Health Hubs/);
    await expect(page.locator("[data-rebrand-page]")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: communityHubsListing.headline,
        exact: true,
      }),
    ).toHaveCount(1);

    await expect(page.getByText(communityHubsListing.subheadline)).toBeVisible();

    for (const mission of hubMissions) {
      await expect(
        page.locator("#five-missions").getByRole("heading", {
          level: 3,
          name: mission.title,
          exact: true,
        }),
      ).toBeVisible();
    }

    for (const activity of hubActivities) {
      await expect(
        page.locator("#hub-activities").getByRole("heading", {
          level: 3,
          name: activity.title,
          exact: true,
        }),
      ).toBeVisible();
    }

    const hubCardsSection = page.locator("#our-hubs");
    for (const hub of communityHubs) {
      await expect(
        hubCardsSection.getByRole("link", { name: new RegExp(hub.name) }),
      ).toHaveAttribute("href", getHubHref(hub));
    }

    await expect(
      page.getByRole("navigation").filter({ hasText: "Community Health Hubs" }).first(),
    ).toBeVisible();

    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test("does not contain student-run clinic language", async ({ page }) => {
    await page.goto("/community-hubs", { waitUntil: "domcontentloaded" });

    await expect(page.getByText(/student-run clinic/i)).toHaveCount(0);
    await expect(page.getByText(/Student-powered clinics/i)).toHaveCount(0);
  });

  test("remains readable in dark mode", async ({ page }) => {
    await preparePage(page, "dark");
    await page.goto("/community-hubs", { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      page.getByRole("heading", { name: communityHubsListing.headline, level: 1 }),
    ).toBeVisible();

    expect(await hasHorizontalOverflow(page)).toBe(false);
  });
});

for (const routeSlug of hubRouteSlugs) {
  test.describe(`Community hub detail page /community-hubs/${routeSlug}`, () => {
    test.beforeEach(async ({ page }) => {
      await preparePage(page);
    });

    test("renders hero, metrics, mentorship, and placeholder sections", async ({
      page,
    }) => {
      const hub = communityHubs.find(({ routeSlug: slug }) => slug === routeSlug)!;

      await page.goto(`/community-hubs/${routeSlug}`, {
        waitUntil: "domcontentloaded",
      });

      await expect(page.locator("[data-rebrand-page]")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: hub.name, exact: true }),
      ).toBeVisible();

      await expect(page.getByText("Community members served")).toBeVisible();
      await expect(page.getByText("Students trained")).toBeVisible();
      await expect(page.getByText("Communities reached")).toBeVisible();
      await expect(page.getByText("Partners engaged")).toBeVisible();

      await expect(page.getByText(hub.facultyMentorship!.model)).toBeVisible();

      await expect(page.getByText(/Community stories are coming soon/i)).toBeVisible();
      await expect(page.getByText(/Student stories are coming soon/i)).toBeVisible();
      await expect(page.getByText(/Research updates are coming soon/i)).toBeVisible();
      await expect(page.getByText(/Innovation updates are coming soon/i)).toBeVisible();

      await expect(
        page.getByRole("navigation").filter({ hasText: hubBreadcrumbLabels[routeSlug] }).first(),
      ).toBeVisible();

      expect(await hasHorizontalOverflow(page)).toBe(false);
    });
  });
}

const legacyRedirects = [
  { source: "/clinics", destination: "/community-hubs" },
  { source: "/clinics/akomapa-ucc", destination: "/community-hubs/ucc" },
  { source: "/clinics/akomapa-ug", destination: "/community-hubs/ug" },
  { source: "/clinics/akomapa-nhp", destination: "/community-hubs/nhp" },
  { source: "/join", destination: "/get-involved" },
  { source: "/partner", destination: "/partnerships" },
  {
    source: "/partner/corporate-sponsorship",
    destination: "/partnerships/corporate-sponsorship",
  },
  {
    source: "/donate/corporate-sponsorship",
    destination: "/partnerships/corporate-sponsorship",
  },
] as const;

test.describe("Legacy route redirects", () => {
  for (const { source, destination } of legacyRedirects) {
    test(`${source} redirects to ${destination} with 301`, async ({ page, request }) => {
      const response = await request.get(source, { maxRedirects: 0 });

      expect(response.status()).toBe(301);
      expect(response.headers().location).toBe(destination);

      await preparePage(page);
      await page.goto(source, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(new RegExp(`${destination}$`));
    });
  }
});
