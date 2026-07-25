import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { name: "mobile", width: 390, height: 844, impactColumns: 1 },
  { name: "tablet", width: 768, height: 1024, impactColumns: 2 },
  { name: "ipad-pro", width: 1024, height: 1366, impactColumns: 2 },
  { name: "desktop", width: 1440, height: 900, impactColumns: 3 },
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
  const boxes = await locator.evaluateAll((elements) =>
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

  expect(boxes.length).toBeGreaterThan(0);
  return boxes;
}

test.describe("homepage editorial impact, values, and vision sections", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: preserves section tones and responsive hierarchy`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        const impact = page.locator("[data-transformational-impact]");
        const values = page.locator("[data-values-section]");
        const vision = page.locator("[data-vision-section]");
        const impactCopyLocator = impact.locator("[data-impact-copy]");
        const valuesCopyLocator = values.locator("[data-values-copy]");
        const visionStatementLocator = vision.locator(
          "[data-vision-statement]",
        );

        await Promise.all([
          expect(impactCopyLocator).toBeVisible({ timeout: 15_000 }),
          expect(valuesCopyLocator).toBeVisible({ timeout: 15_000 }),
          expect(visionStatementLocator).toBeVisible({ timeout: 15_000 }),
        ]);

        await expect(impact).toHaveCSS("background-color", "rgb(0, 151, 178)");
        await expect(values).toHaveCSS(
          "background-color",
          theme === "light" ? "rgb(252, 250, 239)" : "rgb(18, 21, 20)",
        );
        await expect(vision).toHaveCSS(
          "background-color",
          theme === "light" ? "rgb(255, 255, 255)" : "rgb(28, 31, 30)",
        );

        const impactCopy = await impactCopyLocator.boundingBox();
        const impactContext = await impact
          .locator("[data-impact-context]")
          .boundingBox();
        const valuesCopy = await valuesCopyLocator.boundingBox();
        const valuesImage = await values
          .locator("[data-values-image]")
          .boundingBox();
        const visionStatement = await visionStatementLocator.boundingBox();
        const visionCopy = await vision.locator("[data-vision-copy]").boundingBox();

        expect(impactCopy).not.toBeNull();
        expect(impactContext).not.toBeNull();
        expect(valuesCopy).not.toBeNull();
        expect(valuesImage).not.toBeNull();
        expect(visionStatement).not.toBeNull();
        expect(visionCopy).not.toBeNull();

        if (
          !impactCopy ||
          !impactContext ||
          !valuesCopy ||
          !valuesImage ||
          !visionStatement ||
          !visionCopy
        ) {
          throw new Error("Editorial section geometry was not rendered");
        }

        if (viewport.width < 1024) {
          expect(impactContext.y).toBeGreaterThanOrEqual(
            impactCopy.y + impactCopy.height,
          );
          expect(valuesImage.y).toBeGreaterThanOrEqual(
            valuesCopy.y + valuesCopy.height,
          );
          expect(visionCopy.y).toBeGreaterThanOrEqual(
            visionStatement.y + visionStatement.height,
          );
        } else {
          expect(impactContext.x).toBeGreaterThanOrEqual(
            impactCopy.x + impactCopy.width,
          );
          expect(valuesImage.x).toBeGreaterThanOrEqual(
            valuesCopy.x + valuesCopy.width,
          );
          expect(visionCopy.x).toBeGreaterThanOrEqual(
            visionStatement.x + visionStatement.width,
          );
        }

        const metricBoxes = await boxesFor(
          impact.locator("[data-impact-metrics] > *"),
        );
        expect(metricBoxes).toHaveLength(6);
        for (let index = 0; index < metricBoxes.length; index += 1) {
          const columnIndex = index % viewport.impactColumns;
          const rowIndex = Math.floor(index / viewport.impactColumns);
          const rowStartIndex = index - columnIndex;

          if (columnIndex > 0) {
            expect(
              Math.abs(metricBoxes[rowStartIndex].y - metricBoxes[index].y),
            ).toBeLessThan(2);
          }

          if (rowIndex > 0) {
            expect(metricBoxes[index].y).toBeGreaterThan(
              metricBoxes[index - viewport.impactColumns].y,
            );
          }
        }

        const valueBoxes = await boxesFor(
          values.locator("[data-values-list] > li"),
        );
        const priorityBoxes = await boxesFor(
          vision.locator("[data-vision-priorities] > li"),
        );
        if (viewport.width < 640) {
          expect(valueBoxes[1].y).toBeGreaterThan(valueBoxes[0].y);
          expect(priorityBoxes[1].y).toBeGreaterThan(priorityBoxes[0].y);
        } else {
          expect(Math.abs(valueBoxes[0].y - valueBoxes[1].y)).toBeLessThan(2);
          expect(Math.abs(priorityBoxes[0].y - priorityBoxes[1].y)).toBeLessThan(
            2,
          );
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
