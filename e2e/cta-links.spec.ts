import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

test.describe("Program CTA links", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("GHIP inquiry CTAs use alert modal and brochure contact intent", async ({
    page,
  }) => {
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });

    const brochureLinks = page.getByRole("link", {
      name: "Request Program Brochure",
      exact: true,
    });

    await expect(brochureLinks.first()).toBeVisible();
    const count = await brochureLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      await expect(brochureLinks.nth(i)).toHaveAttribute(
        "href",
        "/contact?type=immersion-brochure",
      );
    }

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
