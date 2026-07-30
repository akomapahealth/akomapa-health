import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const heading =
  "Build healthier communities and stronger health leaders with us.";

const viewports = [
  { name: "mobile", width: 390, height: 844, columns: 1 },
  { name: "tablet", width: 768, height: 1024, columns: 2 },
  { name: "ipad-pro", width: 1024, height: 1366, columns: 2 },
  { name: "desktop", width: 1440, height: 900, columns: 2 },
] as const;

const themes = ["light", "dark"] as const;

async function preparePage(
  page: Page,
  theme: (typeof themes)[number],
) {
  await page.emulateMedia({
    colorScheme: theme,
    reducedMotion: "reduce",
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

test.describe("homepage Join the Movement call to action", () => {
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
        await page.evaluate(async () => {
          await document.fonts.ready;
        });

        const section = page.getByRole("region", {
          name: heading,
          exact: true,
        });
        const copy = section.locator("[data-join-copy]");
        const actions = section.locator("[data-join-actions]");
        const supportLink = section.getByRole("link", {
          name: "Support Our Work",
        });
        const partnershipLink = section.getByRole("link", {
          name: "Partner With Us",
        });
        const participationLink = section.getByRole("link", {
          name: "Join Akomapa",
        });

        await section.scrollIntoViewIfNeeded();
        await expect(section).toBeVisible();
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expect(section).toHaveCSS(
          "background-color",
          "rgb(15, 76, 92)",
        );
        await expect(supportLink).toHaveAttribute("href", "/donate");
        await expect(partnershipLink).toHaveAttribute(
          "href",
          "/partnerships",
        );
        await expect(participationLink).toHaveAttribute(
          "href",
          "/get-involved",
        );

        const [copyBox, actionsBox, supportBox, partnershipBox, participationBox] =
          await Promise.all([
            copy.boundingBox(),
            actions.boundingBox(),
            supportLink.boundingBox(),
            partnershipLink.boundingBox(),
            participationLink.boundingBox(),
          ]);

        expect(copyBox).not.toBeNull();
        expect(actionsBox).not.toBeNull();
        expect(supportBox).not.toBeNull();
        expect(partnershipBox).not.toBeNull();
        expect(participationBox).not.toBeNull();

        if (
          !copyBox ||
          !actionsBox ||
          !supportBox ||
          !partnershipBox ||
          !participationBox
        ) {
          throw new Error("Join the Movement geometry was not rendered");
        }

        if (viewport.width < 1024) {
          expect(actionsBox.y).toBeGreaterThanOrEqual(
            copyBox.y + copyBox.height,
          );
        } else {
          expect(actionsBox.x).toBeGreaterThanOrEqual(
            copyBox.x + copyBox.width,
          );
        }

        if (viewport.columns === 1) {
          expect(partnershipBox.y).toBeGreaterThanOrEqual(
            supportBox.y + supportBox.height,
          );
          expect(participationBox.y).toBeGreaterThanOrEqual(
            partnershipBox.y + partnershipBox.height,
          );
        } else {
          expect(partnershipBox.y).toBeGreaterThan(
            supportBox.y + supportBox.height,
          );
          expect(Math.abs(partnershipBox.y - participationBox.y)).toBeLessThan(
            2,
          );
          expect(participationBox.x).toBeGreaterThanOrEqual(
            partnershipBox.x + partnershipBox.width,
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
