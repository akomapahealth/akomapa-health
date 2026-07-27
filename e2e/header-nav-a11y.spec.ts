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

  test("Community Health Hubs dropdown opens with keyboard and reaches hub link", async ({
    page,
  }) => {
    const hubsTrigger = page.getByRole("button", {
      name: "Community Health Hubs",
    });
    await hubsTrigger.focus();
    await page.keyboard.press("Enter");

    const uccLink = page.getByRole("menuitem", { name: "Akomapa UCC Hub" });
    await expect(uccLink).toBeVisible();

    await uccLink.click();
    await expect(page).toHaveURL(/\/community-hubs\/ucc$/);
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

    await expect(page).toHaveURL(/\/programs\/akomapa-ghip$/);
    await expect(immersionLink).toHaveAttribute("aria-current", "page");
  });
});

test.describe("mobile learning experiences navigation", () => {
  test("shows both destinations and closes after navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await dismissAnnouncementIfPresent(page);
    await page.goto("/");

    await page.getByRole("button", { name: "Open main menu" }).click();
    const drawer = page.getByRole("dialog");

    await expect(
      drawer.getByText("Learning Experiences", { exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Akomapa Academy" }),
    ).toBeVisible();

    const immersionLink = drawer.getByRole("link", {
      name: "Global Health Immersion Program",
    });
    await expect(immersionLink).toBeVisible();
    await immersionLink.click();

    await expect(page).toHaveURL(/\/programs\/akomapa-ghip$/);
    await expect(drawer).toBeHidden();
  });
});
