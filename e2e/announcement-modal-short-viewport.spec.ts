import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "375x667", width: 375, height: 667 },
  { name: "iphone-12-pro", width: 390, height: 844 },
  { name: "iphone-16-pro", width: 402, height: 874 },
  { name: "landscape-phone", width: 667, height: 375 },
] as const;

async function openAnnouncementModal(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
    sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
  }, announcementCampaign.version);

  await page.goto("/donate", { waitUntil: "load" });

  const modal = page.locator('[role="dialog"][aria-label="Announcements"]');
  await expect(modal).not.toBeVisible({ timeout: 5000 });

  const trigger = page.getByTestId("announcement-trigger");
  await expect(trigger).toBeVisible({ timeout: 15000 });
  await trigger.click();
  await expect(modal).toBeVisible({ timeout: 15000 });

  return modal;
}

async function expectReachableInDialog(locator: Locator, dialog: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();

  const elBox = await locator.boundingBox();
  const dialogBox = await dialog.boundingBox();

  expect(elBox, "action should have a bounding box").not.toBeNull();
  expect(dialogBox, "dialog should have a bounding box").not.toBeNull();

  expect(elBox!.y).toBeGreaterThanOrEqual(dialogBox!.y - 1);
  expect(elBox!.y + elBox!.height).toBeLessThanOrEqual(
    dialogBox!.y + dialogBox!.height + 1,
  );
}

test.describe("Announcement modal on short viewports", () => {
  for (const viewport of viewports) {
    test(`keeps CTAs and Dismiss reachable at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const modal = await openAnnouncementModal(page);

      const apply = modal.getByRole("link", { name: "Apply Now", exact: true });
      const rsvp = modal.getByRole("link", {
        name: "RSVP for the Info Session",
        exact: true,
      });
      const viewAll = modal.getByRole("link", { name: /View All Updates/i });
      const dismiss = modal.getByRole("button", { name: "Dismiss", exact: true });

      await expectReachableInDialog(apply, modal);
      await expectReachableInDialog(rsvp, modal);
      await expectReachableInDialog(viewAll, modal);
      await expectReachableInDialog(dismiss, modal);

      const viewAllBox = await viewAll.boundingBox();
      const dismissBox = await dismiss.boundingBox();
      const applyBox = await apply.boundingBox();
      const rsvpBox = await rsvp.boundingBox();
      expect(viewAllBox).not.toBeNull();
      expect(dismissBox).not.toBeNull();
      expect(applyBox).not.toBeNull();
      expect(rsvpBox).not.toBeNull();
      expect(Math.abs(viewAllBox!.y - dismissBox!.y)).toBeLessThan(24);
      expect(Math.abs(applyBox!.y - rsvpBox!.y)).toBeLessThan(24);
      expect(applyBox!.x + applyBox!.width).toBeLessThanOrEqual(rsvpBox!.x + 1);
    });
  }
});
