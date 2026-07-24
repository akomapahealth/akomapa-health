import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 375, height: 812, columns: 1 },
  { name: "tablet", width: 768, height: 1024, columns: 2 },
  { name: "ipad-pro", width: 1024, height: 1366, columns: 4 },
  { name: "desktop", width: 1440, height: 900, columns: 4 },
] as const;

const themes = ["light", "dark"] as const;

async function preparePage(
  page: Page,
  theme: (typeof themes)[number],
) {
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript(
    ({ announcementVersion, storedTheme }) => {
      localStorage.setItem(
        "akomapa-announcements-dismissed",
        announcementVersion,
      );
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    },
    {
      announcementVersion: announcementCampaign.version,
      storedTheme: theme,
    },
  );
}

async function boxesFor(locator: Locator) {
  return locator.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    }),
  );
}

test.describe("editorial site footer", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: preserves hierarchy and responsive layout`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        const footer = page.locator("[data-site-footer]");
        const grid = footer.locator("[data-footer-grid]");
        const newsletter = footer.locator("[data-newsletter]");
        const newsletterCopy = newsletter.locator("[data-newsletter-copy]");
        const newsletterForm = newsletter.locator("[data-newsletter-form]");
        const legal = footer.locator("[data-footer-legal]");

        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();
        await expect(newsletter).toBeVisible();
        await expect(footer).toHaveCSS(
          "background-color",
          theme === "light" ? "rgb(252, 250, 239)" : "rgb(18, 21, 20)",
        );
        await expect(newsletter).toHaveCSS(
          "background-color",
          "rgb(15, 76, 92)",
        );

        const columnCount = await grid.evaluate(
          (element) =>
            getComputedStyle(element).gridTemplateColumns.split(" ").length,
        );
        expect(columnCount).toBe(viewport.columns);

        const gridBoxes = await boxesFor(grid.locator(":scope > div"));
        expect(gridBoxes).toHaveLength(4);
        if (viewport.columns === 1) {
          expect(gridBoxes[1].y).toBeGreaterThan(gridBoxes[0].y);
        } else if (viewport.columns === 2) {
          expect(Math.abs(gridBoxes[0].y - gridBoxes[1].y)).toBeLessThan(2);
          expect(gridBoxes[2].y).toBeGreaterThan(gridBoxes[0].y);
        } else {
          for (const box of gridBoxes.slice(1)) {
            expect(Math.abs(gridBoxes[0].y - box.y)).toBeLessThan(2);
          }
        }

        const [newsletterCopyBox, newsletterFormBox, legalBox] =
          await Promise.all([
            newsletterCopy.boundingBox(),
            newsletterForm.boundingBox(),
            legal.boundingBox(),
          ]);

        expect(newsletterCopyBox).not.toBeNull();
        expect(newsletterFormBox).not.toBeNull();
        expect(legalBox).not.toBeNull();
        if (!newsletterCopyBox || !newsletterFormBox || !legalBox) {
          throw new Error("Footer geometry was not rendered");
        }

        if (viewport.width < 1024) {
          expect(newsletterFormBox.y).toBeGreaterThanOrEqual(
            newsletterCopyBox.y + newsletterCopyBox.height,
          );
        } else {
          expect(newsletterFormBox.x).toBeGreaterThanOrEqual(
            newsletterCopyBox.x + newsletterCopyBox.width,
          );
        }

        const socialLinks = footer.locator(
          "[aria-label='Follow Akomapa Health'] > a",
        );
        await expect(socialLinks).toHaveCount(4);
        for (const box of await boxesFor(socialLinks)) {
          expect(box.width).toBeGreaterThanOrEqual(40);
          expect(box.height).toBeGreaterThanOrEqual(40);
        }

        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth > 1,
          ),
        ).toBe(false);
      });
    }
  }
});
