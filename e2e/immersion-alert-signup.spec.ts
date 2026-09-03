import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  IMMERSION_APPLICATION_FORM_URL,
  IMMERSION_INFO_SESSION_FORM_URL,
} from "../src/config/links";

async function preparePage(page: Page) {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(
    ({ announcementVersion }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );
      sessionStorage.setItem("akomapa-announcement-tip-dismissed", "1");
      localStorage.setItem("akomapa-theme", "light");
    },
    { announcementVersion: announcementCampaign.version },
  );
}

test.describe("Immersion application and information-session forms", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("[data-immersion-hero-hydrated]")).toHaveAttribute(
      "data-immersion-hero-hydrated",
      "true",
    );
  });

  test("keeps the dormant Fillout route policy while hiding its launchers", async ({
    page,
    request,
  }) => {
    const response = await request.get("/global-health-immersion-program");
    expect(response.headers()["content-security-policy"]).toContain(
      "frame-src 'self' https://embed.fillout.com",
    );
    await expect(page.locator("[data-intake-intent]")).toHaveCount(0);
  });

  test("routes every visible application CTA to the supplied Google Form", async ({
    page,
  }) => {
    const links = page.getByRole("link", { name: "Apply Now", exact: true });
    await expect(links).toHaveCount(3);

    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", IMMERSION_APPLICATION_FORM_URL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("routes both information-session CTAs to the supplied RSVP form", async ({
    page,
  }) => {
    const links = page.getByRole("link", {
      name: "RSVP for the Info Session",
      exact: true,
    });
    await expect(links).toHaveCount(2);

    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", IMMERSION_INFO_SESSION_FORM_URL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("keeps all five form links usable without page overflow on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.reload({ waitUntil: "domcontentloaded" });

    const links = page.locator("[data-immersion-google-form] a");
    await expect(links).toHaveCount(5);
    for (const link of await links.all()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
      expect(
        await link.evaluate((element) => element.getBoundingClientRect().height),
      ).toBeGreaterThanOrEqual(44);
    }

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth <= 1,
      ),
    ).toBe(true);
  });
});
