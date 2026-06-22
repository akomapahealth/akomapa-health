import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { BRAND } from "../src/config/brand";

const homepageTitle = `Akomapa Health - ${BRAND.tagline}`;

const quickLinks = [
  { label: "Our Philosophy", href: "/philosophy" },
  { label: "Academy", href: "/academy" },
  { label: "NCD Impact", href: "/ncd-impact" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Impact", href: "/impact" },
] as const;

const initiativeLinks = [
  { label: "Community Health Hubs", href: "/community-hubs" },
  { label: "Academy", href: "/academy" },
  { label: "Research & Innovation", href: "/research" },
  { label: "Get Involved", href: "/get-involved" },
] as const;

const destinationRoutes = [
  { path: "/philosophy", heading: "Our Philosophy" },
  { path: "/academy", heading: "Akomapa Academy" },
  { path: "/ncd-impact", heading: "NCD Impact" },
  { path: "/partnerships", heading: "Equitable Partnerships" },
  { path: "/impact", heading: "Our Impact" },
  { path: "/community-hubs", heading: "Community Health Hubs" },
  { path: "/get-involved", heading: "Get Involved" },
] as const;

async function preparePage(page: Page, theme: "light" | "dark" = "light") {
  await page.addInitScript(
    ({ announcementVersion, storedTheme }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );
      localStorage.setItem("akomapa-theme", storedTheme);
    },
    {
      announcementVersion: announcementCampaign.version,
      storedTheme: theme,
    },
  );
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth > 1,
  );
}

test.describe("Akomapa rebrand foundation", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("publishes the exact homepage metadata", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(homepageTitle);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      BRAND.heroSubheadline,
    );
  });

  test("renders the new footer mission and navigation", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toContainText(BRAND.footerMission);
    await expect(footer).toContainText(BRAND.legalNotice);

    const quickLinksColumn = footer
      .getByRole("heading", { name: "Quick Links" })
      .locator("..");
    for (const link of quickLinks) {
      await expect(
        quickLinksColumn.getByRole("link", { name: link.label, exact: true }),
      ).toHaveAttribute("href", link.href);
    }

    const initiativesColumn = footer
      .getByRole("heading", { name: "Our Initiatives" })
      .locator("..");
    for (const link of initiativeLinks) {
      await expect(
        initiativesColumn.getByRole("link", {
          name: link.label,
          exact: true,
        }),
      ).toHaveAttribute("href", link.href);
    }

    await expect(
      footer.getByRole("heading", { name: "Join the Akomapa newsletter" }),
    ).toBeVisible();
  });

  for (const destination of destinationRoutes) {
    test(`serves the ${destination.path} destination`, async ({ page }) => {
      const response = await page.goto(destination.path, {
        waitUntil: "domcontentloaded",
      });

      expect(response?.status()).toBeLessThan(400);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: destination.heading,
          exact: true,
        }),
      ).toBeVisible();
      await expect(page.locator("[data-rebrand-page]")).toBeVisible();
    });
  }

  test("validates and submits the compact newsletter form", async ({
    page,
  }) => {
    await page.route("**/api/newsletter", async (route) => {
      const body = route.request().postDataJSON() as { email?: string };

      if (body.email === "failure@example.com") {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ error: "Newsletter service unavailable" }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Successfully subscribed to newsletter",
          subscriber: { email: body.email, status: "active" },
        }),
      });
    });

    await page.goto("/", { waitUntil: "networkidle" });

    const newsletter = page.locator("[data-newsletter]");
    await newsletter.scrollIntoViewIfNeeded();
    const emailInput = newsletter.getByRole("textbox", {
      name: "Email address",
    });
    const subscribeButton = newsletter.getByRole("button", {
      name: "Subscribe",
      exact: true,
    });

    // Ensure the form is hydrated before interacting
    await expect(subscribeButton).toBeEnabled();

    await emailInput.fill("not-an-email");
    await subscribeButton.click();
    await expect(
      newsletter.getByText("Please enter a valid email address."),
    ).toBeVisible();

    await emailInput.fill("leader@example.com");
    await subscribeButton.click();
    await expect(
      newsletter.getByRole("heading", {
        name: "Thank you for subscribing!",
      }),
    ).toBeVisible();

    await newsletter
      .getByRole("button", { name: "Subscribe another email" })
      .click();
    await newsletter
      .getByRole("textbox", { name: "Email address" })
      .fill("failure@example.com");
    await newsletter
      .getByRole("button", { name: "Subscribe", exact: true })
      .click();
    await expect(newsletter.getByRole("alert")).toContainText(
      "Newsletter service unavailable",
    );
  });

  const layouts = [
    { name: "mobile", width: 375, height: 812, columns: 1 },
    { name: "tablet", width: 768, height: 1024, columns: 2 },
    { name: "desktop", width: 1440, height: 900, columns: 4 },
  ] as const;

  for (const layout of layouts) {
    test(`${layout.name} footer uses ${layout.columns} column layout`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: layout.width,
        height: layout.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      const columnCount = await footer
        .locator("[data-footer-grid]")
        .evaluate(
          (element) =>
            getComputedStyle(element).gridTemplateColumns.split(" ").length,
        );

      expect(columnCount).toBe(layout.columns);
      expect(await hasHorizontalOverflow(page)).toBe(false);
    });
  }

  for (const theme of ["light", "dark"] as const) {
    test(`footer remains readable in ${theme} mode`, async ({ page }) => {
      await preparePage(page, theme);
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(page.locator("html")).toHaveClass(new RegExp(theme));

      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(footer.locator("[data-newsletter]")).toBeVisible();
      await expect(
        footer.getByRole("link", { name: "Our Philosophy" }),
      ).toBeVisible();
      expect(await hasHorizontalOverflow(page)).toBe(false);
    });
  }

  test("footer controls expose visible keyboard focus", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const footerLink = page
      .locator("footer")
      .getByRole("link", { name: "Our Philosophy" });
    await footerLink.scrollIntoViewIfNeeded();
    await footerLink.focus();

    const focusStyle = await footerLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        boxShadow: style.boxShadow,
        outlineStyle: style.outlineStyle,
      };
    });

    expect(
      focusStyle.boxShadow !== "none" || focusStyle.outlineStyle !== "none",
    ).toBe(true);
  });
});
