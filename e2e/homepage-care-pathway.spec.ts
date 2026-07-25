import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const carePathwayHeading = "From screening numbers to care outcomes.";
const impactHeading =
  "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const themes = ["light", "dark"] as const;

async function preparePage(
  page: Page,
  theme: (typeof themes)[number],
  reducedMotion = false,
) {
  await page.emulateMedia({
    colorScheme: theme,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
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

test.describe("temporarily hidden homepage care pathway", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${viewport.name} ${theme}: keeps the pathway hidden and promotes impact`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await preparePage(page, theme);
        await page.goto("/", { waitUntil: "domcontentloaded" });

        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expect(
          page.getByRole("heading", {
            level: 2,
            name: carePathwayHeading,
            exact: true,
          }),
        ).toHaveCount(0);
        await expect(
          page.locator("[data-care-pathway-staircase]"),
        ).toHaveCount(0);

        const impactSection = page.getByRole("region", {
          name: impactHeading,
          exact: true,
        });
        await expect(impactSection).toBeVisible();
        await expect(
          impactSection.locator("[data-home-band-marker]"),
        ).toHaveText("03");

        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth > 1,
          ),
        ).toBe(false);
      });
    }
  }

  test("reduced motion renders the replacement impact section immediately", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page, "light", true);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const impactSection = page.getByRole("region", {
      name: impactHeading,
      exact: true,
    });
    await impactSection.scrollIntoViewIfNeeded();

    await expect(impactSection).toBeVisible();
    await expect
      .poll(() =>
        impactSection.evaluate((element) => {
          const styles = getComputedStyle(element);
          return { opacity: styles.opacity, transform: styles.transform };
        }),
      )
      .toEqual({ opacity: "1", transform: "none" });
  });
});
