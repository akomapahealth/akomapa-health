import { expect, test } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };

async function dismissAnnouncementIfPresent(page: import("@playwright/test").Page) {
  await page.addInitScript(
    ({ storageKey, version }) => {
      localStorage.setItem(storageKey, version);
    },
    {
      storageKey: "akomapa-announcements-dismissed",
      version: announcementCampaign.version,
    }
  );
}

test.describe("skip to main content", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await dismissAnnouncementIfPresent(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Tab focuses skip link and Enter moves focus to main content", async ({
    page,
  }) => {
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    const main = page.locator("main#main-content");

    await expect(main).toBeAttached();

    // First Tab from the document should land on the skip link.
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(main).toBeFocused();
  });
});

test.describe("desktop header dropdown keyboard accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await dismissAnnouncementIfPresent(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("About dropdown opens with Enter and navigates to child link", async ({
    page,
  }) => {
    const aboutTrigger = page.getByRole("button", { name: "About" });
    await aboutTrigger.focus();
    await expect(aboutTrigger).toBeFocused();
    await page.keyboard.press("Enter");

    const ourStoryLink = page.getByRole("menuitem", { name: "Our Story" });
    const ourTeamLink = page.getByRole("menuitem", { name: "Our Team" });
    await expect(ourTeamLink).toBeVisible();

    await expect(ourStoryLink).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(ourTeamLink).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/about\/team$/);
  });

  test("About dropdown closes with Escape and returns focus to trigger", async ({
    page,
  }) => {
    const aboutTrigger = page.getByRole("button", { name: "About" });
    await aboutTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("menuitem", { name: "Our Story" })
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("menuitem", { name: "Our Story" })
    ).toBeHidden();
    await expect(aboutTrigger).toBeFocused();
  });

  test("Our Work dropdown opens with keyboard and reaches Research", async ({
    page,
  }) => {
    const workTrigger = page.getByRole("button", {
      name: "Our Work",
    });
    await workTrigger.focus();
    await page.keyboard.press("Enter");

    const hubsLink = page.getByRole("menuitem", {
      name: "Community Health Hubs",
    });
    const researchLink = page.getByRole("menuitem", {
      name: "Research & Innovation",
    });
    await expect(hubsLink).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(researchLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/research$/);
  });

  test("Learning Experiences reaches the Immersion program by keyboard", async ({
    page,
  }) => {
    const learningTrigger = page.getByRole("button", {
      name: "Learning Experiences",
    });
    await learningTrigger.focus();
    await page.keyboard.press("Enter");

    const academyLink = page.getByRole("menuitem", {
      name: "Akomapa Academy",
    });
    const immersionLink = page.getByRole("menuitem", {
      name: "Global Health Immersion Program",
    });

    await expect(academyLink).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(immersionLink).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/global-health-immersion-program$/);
    await learningTrigger.click();
    await expect(immersionLink).toBeVisible();
    await expect(immersionLink).toHaveAttribute("aria-current", "page");
  });

  test("Join Us reaches Partnerships and exposes its active child", async ({
    page,
  }) => {
    const joinTrigger = page.getByRole("button", { name: "Join Us" });
    await joinTrigger.focus();
    await page.keyboard.press("Enter");

    const involvementLink = page.getByRole("menuitem", {
      name: "Get Involved",
    });
    const partnershipsLink = page.getByRole("menuitem", {
      name: "Partnerships",
    });

    await expect(involvementLink).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(partnershipsLink).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/partnerships$/);
    await joinTrigger.click();
    await expect(partnershipsLink).toHaveAttribute("aria-current", "page");
  });

  test("desktop navigation is spacious and overflow-free at its breakpoint", async ({
    page,
  }) => {
    for (const width of [1280, 1440, 1536]) {
      await page.setViewportSize({ width, height: 900 });
      await page.reload();

      const header = page.locator("header").first();
      const logo = header.locator("a").first();
      const nav = header.getByRole("navigation", { name: "Main" });
      const menuButton = header.getByRole("button", {
        name: "Open main menu",
      });

      await expect(nav).toBeVisible();
      await expect(menuButton).toBeHidden();

      const logoBox = await logo.boundingBox();
      const navBox = await nav.boundingBox();
      expect(logoBox).not.toBeNull();
      expect(navBox).not.toBeNull();
      expect(navBox!.x - (logoBox!.x + logoBox!.width)).toBeGreaterThanOrEqual(
        24,
      );

      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(dimensions.documentWidth).toBeLessThanOrEqual(
        dimensions.viewportWidth + 1,
      );
    }
  });
});

test.describe("mobile grouped navigation", () => {
  test("shows every group and closes after child navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await dismissAnnouncementIfPresent(page);
    await page.goto("/");

    await page.getByRole("button", { name: "Open main menu" }).click();
    const drawer = page.getByRole("dialog");

    await expect(
      drawer.getByText("Our Work", { exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByText("Learning Experiences", { exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByText("Join Us", { exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Community Health Hubs" }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Research & Innovation" }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Impact", exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Get Involved" }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Partnerships" }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Akomapa Academy" }),
    ).toBeVisible();

    const immersionLink = drawer.getByRole("link", {
      name: "Global Health Immersion Program",
    });
    await expect(immersionLink).toBeVisible();
    expect((await immersionLink.boundingBox())?.height).toBeGreaterThanOrEqual(
      44,
    );
    await immersionLink.click();

    await expect(page).toHaveURL(/\/global-health-immersion-program$/);
    await expect(drawer).toBeHidden();
  });
});
