import { expect, test } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

async function prepareImpactPage(page: import("@playwright/test").Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
    sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
  }, announcementCampaign.version);
}

test.describe("impact map", () => {
  test("loads Leaflet markers, opens a stable popup with hub link, and does not overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await prepareImpactPage(page);
    await page.goto("/impact", { waitUntil: "domcontentloaded" });

    const panel = page.getByTestId("impact-map-panel");
    await expect(panel).toBeVisible({ timeout: 15000 });

    const marker = page.locator(
      '.leaflet-marker-icon[title*="Akomapa–UCC Community Health Hub"]',
    );
    await expect(marker).toBeVisible({ timeout: 15000 });
    await marker.click();

    const popup = page.getByTestId("impact-map-popup-ucc-hub");
    await expect(popup).toBeVisible({ timeout: 10000 });
    await expect(popup.getByText("Active hub", { exact: true })).toBeVisible();
    await expect(
      popup.getByText("Akomapa–UCC Community Health Hub", { exact: true }),
    ).toBeVisible();

    const hubLink = popup.getByRole("link", { name: /view hub/i });
    await expect(hubLink).toBeVisible();
    await expect(hubLink).toHaveAttribute("href", "/community-hubs/ucc");

    // Popup should remain stable (no mount/unmount flicker loop).
    await page.waitForTimeout(500);
    await expect(popup).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth > 1,
    );
    expect(overflow).toBe(false);
  });

  test("mobile width keeps popups compact within the map panel", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await prepareImpactPage(page);
    await page.goto("/impact", { waitUntil: "domcontentloaded" });

    const panel = page.getByTestId("impact-map-panel");
    await expect(panel).toBeVisible({ timeout: 15000 });

    const cardLink = page.getByRole("link", {
      name: "Akomapa–UCC Community Health Hub",
      exact: true,
    });
    await expect(cardLink).toBeVisible();
    await expect(cardLink).toHaveAttribute("href", "/community-hubs/ucc");

    // Isolated NA marker avoids Ghana pin overlap at mobile zoom.
    const marker = page.locator(
      '.leaflet-marker-icon[title*="Akomapa–NHP Yale Community Health Hub"]',
    );
    await expect(marker).toBeVisible({ timeout: 15000 });
    await marker.click({ force: true });

    const popup = page.getByTestId("impact-map-popup-nhp-yale-hub");
    await expect(popup).toBeVisible({ timeout: 10000 });
    await expect(popup.getByText("View hub")).toBeVisible();
    // Description is card-only on small screens so the popup does not cover the map.
    await expect(
      popup.locator(".impact-map-popup-description"),
    ).toBeHidden();

    const sizing = await page.evaluate(() => {
      const panelEl = document.querySelector("[data-testid='impact-map-panel']");
      const popupEl = document.querySelector(".leaflet-popup");
      if (!panelEl || !popupEl) {
        throw new Error("Missing panel or popup");
      }
      const panelRect = panelEl.getBoundingClientRect();
      const popupRect = popupEl.getBoundingClientRect();
      return {
        heightRatio: popupRect.height / panelRect.height,
        widthRatio: popupRect.width / panelRect.width,
      };
    });
    expect(sizing.heightRatio).toBeLessThan(0.75);
    expect(sizing.widthRatio).toBeLessThan(0.7);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth > 1,
    );
    expect(overflow).toBe(false);
  });
});

