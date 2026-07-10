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

    const ourTeamLink = page.getByRole("menuitem", { name: "Our Team" });
    await expect(ourTeamLink).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
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
});
