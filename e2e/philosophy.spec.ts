import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { philosophySections } from "../src/data/philosophy";

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

test.describe("Our Philosophy page", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("renders metadata, breadcrumb, sections, quotes, and CTAs", async ({
    page,
  }) => {
    await page.goto("/philosophy", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Our Philosophy/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /ethical global health leadership/i,
    );
    await expect(page.locator("[data-rebrand-page]")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Our Philosophy",
        exact: true,
      }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("navigation").filter({ hasText: "Our Philosophy" }).first(),
    ).toContainText("Our Philosophy");

    for (const section of philosophySections) {
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: section.title,
          exact: true,
        }),
      ).toBeVisible();

      await expect(page.locator(`#${section.id}`)).toBeVisible();

      if (section.quote) {
        await expect(page.getByText(section.quote.text)).toBeVisible();
      }
    }

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Transform how global health is taught, practiced, and led.",
      }),
    ).toBeVisible();

    const joinLinks = page.getByRole("link", { name: "Join Us", exact: true });
    await expect(joinLinks).toHaveCount(2);
    await expect(joinLinks.first()).toHaveAttribute("href", "/get-involved");

    const partnerLinks = page.getByRole("link", {
      name: "Partner With Us",
      exact: true,
    });
    await expect(partnerLinks).toHaveCount(2);
    await expect(partnerLinks.first()).toHaveAttribute("href", "/partnerships");

    await expect(page.locator("main img[alt]:not([alt=''])")).toHaveCount(
      philosophySections.length + 1,
    );
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test("alternates section media placement on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/philosophy", { waitUntil: "domcontentloaded" });

    const firstSection = page.locator(`#${philosophySections[0].id}`);
    await firstSection.scrollIntoViewIfNeeded();
    const firstHeadingBox = await firstSection
      .getByRole("heading", { level: 2 })
      .boundingBox();
    const firstImageBox = await firstSection.locator("img").boundingBox();

    expect(firstHeadingBox).not.toBeNull();
    expect(firstImageBox).not.toBeNull();
    expect(firstImageBox!.x).toBeGreaterThan(firstHeadingBox!.x);

    const secondSection = page.locator(`#${philosophySections[1].id}`);
    await secondSection.scrollIntoViewIfNeeded();
    const secondHeadingBox = await secondSection
      .getByRole("heading", { level: 2 })
      .boundingBox();
    const secondImageBox = await secondSection.locator("img").boundingBox();

    expect(secondHeadingBox).not.toBeNull();
    expect(secondImageBox).not.toBeNull();
    expect(secondImageBox!.x).toBeLessThan(secondHeadingBox!.x);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test("stacks section media above text on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/philosophy", { waitUntil: "domcontentloaded" });

    const firstSection = page.locator(`#${philosophySections[0].id}`);
    await firstSection.scrollIntoViewIfNeeded();

    const imageBox = await firstSection.locator("img").boundingBox();
    const headingBox = await firstSection
      .getByRole("heading", { level: 2 })
      .boundingBox();

    expect(imageBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(imageBox!.y).toBeLessThan(headingBox!.y);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test("remains readable in dark mode", async ({ page }) => {
    await preparePage(page, "dark");
    await page.goto("/philosophy", { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("[data-rebrand-page]")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Our Philosophy", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: philosophySections[0].title, level: 2 }),
    ).toBeVisible();

    const firstSectionStyles = await page
      .locator(`#${philosophySections[0].id}`)
      .evaluate((section) => {
        const heading = section.querySelector("h2");
        const paragraph = section.querySelector("p");

        return {
          background: getComputedStyle(section).backgroundColor,
          heading: heading ? getComputedStyle(heading).color : "",
          paragraph: paragraph ? getComputedStyle(paragraph).color : "",
        };
      });

    expect(firstSectionStyles.background).not.toBe(firstSectionStyles.heading);
    expect(firstSectionStyles.background).not.toBe(firstSectionStyles.paragraph);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });
});
