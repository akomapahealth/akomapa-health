import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  IMMERSION_APPLICATION_FORM_URL,
  IMMERSION_INFO_SESSION_FORM_URL,
} from "../src/config/links";

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

  test("GHIP CTAs use the current Google Forms and experience anchor", async ({
    page,
  }) => {
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.locator("[data-immersion-hero-hydrated]"),
    ).toHaveAttribute("data-immersion-hero-hydrated", "true");

    const experienceLink = page.getByRole("link", {
      name: "Explore the Experience",
      exact: true,
    });

    await expect(experienceLink).toBeVisible();
    await expect(experienceLink).toHaveAttribute("href", "#experience");
    const applicationLinks = page.getByRole("link", {
      name: "Apply Now",
      exact: true,
    });
    await expect(applicationLinks).toHaveCount(3);
    await expect(applicationLinks.first()).toHaveAttribute(
      "href",
      IMMERSION_APPLICATION_FORM_URL,
    );
    const infoSessionLinks = page.getByRole("link", {
      name: "RSVP for the Info Session",
      exact: true,
    });
    await expect(infoSessionLinks).toHaveCount(2);
    await expect(infoSessionLinks.first()).toHaveAttribute(
      "href",
      IMMERSION_INFO_SESSION_FORM_URL,
    );
    await expect(page.locator("[data-intake-intent]")).toHaveCount(0);
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
