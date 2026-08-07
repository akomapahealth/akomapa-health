import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
    sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
  }, announcementCampaign.version);
}

test.describe("Program CTA links", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("GHIP CTAs use the alert modal and experience anchor", async ({
    page,
  }) => {
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("[data-immersion-hero-hydrated]"))
      .toHaveAttribute("data-immersion-hero-hydrated", "true");

    const experienceLink = page.getByRole("link", {
      name: "Explore the Experience",
      exact: true,
    });

    await expect(experienceLink).toBeVisible();
    await expect(experienceLink).toHaveAttribute("href", "#experience");
    await expect(
      page.getByRole("link", { name: "Request Program Brochure" }),
    ).toHaveCount(0);

    // Register Interest is a modal trigger, not a competing contact-form path.
    await expect(
      page.getByRole("link", { name: "Register Interest", exact: true }),
    ).toHaveCount(0);

    const interestButtons = page.locator("[data-immersion-register-interest]");
    const interestButtonCount = await interestButtons.count();
    expect(interestButtonCount).toBeGreaterThan(0);

    await interestButtons.first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Get Immersion Program alerts" }),
    ).toBeVisible();
  });

  test("GHLTP Become a Mentor CTA points to /contact", async ({ page }) => {
    await page.goto("/programs/akomapa-ghltp", {
      waitUntil: "domcontentloaded",
    });

    const mentorLink = page.getByRole("link", {
      name: "Become a Mentor",
      exact: true,
    });

    await expect(mentorLink).toBeVisible();
    await expect(mentorLink).toHaveAttribute("href", "/contact");
  });
});
