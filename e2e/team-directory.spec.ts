import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  advisoryBoardMembers,
  executiveTeamMembers,
  nonExecutiveTeamMembers,
} from "../src/data/team";

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth <= 1,
      ),
    )
    .toBe(true);
}

test.describe("team directory hierarchy", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
    await page.goto("/about/team", { waitUntil: "domcontentloaded" });
  });

  test("renders the canonical groups in the approved order", async ({ page }) => {
    const sections = page.locator("[data-team-section]");
    await expect(sections).toHaveCount(3);
    await expect
      .poll(() =>
        sections.evaluateAll((elements) =>
          elements.map((element) => element.getAttribute("data-team-section")),
        ),
      )
      .toEqual(["executive", "member", "advisor"]);

    const expectedGroups = [
      ["executive", executiveTeamMembers.length, "Executive Team"],
      ["member", nonExecutiveTeamMembers.length, "Team Members"],
      ["advisor", advisoryBoardMembers.length, "Advisory Board"],
    ] as const;

    for (const [category, count, heading] of expectedGroups) {
      const section = page.locator(`[data-team-section="${category}"]`);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByText(heading, { exact: true })).toBeVisible();
      await expect(
        section.locator(`[data-team-role-category="${category}"]`),
      ).toHaveCount(count);
    }
  });

  test("renders a complete non-executive profile with consistent portrait cropping", async ({
    page,
  }) => {
    const card = page.locator('[data-team-member="David Ofosu"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card.getByRole("heading", { name: "David Ofosu" })).toBeVisible();
    await expect(card.getByText("Co-Director", { exact: true })).toBeVisible();
    await expect(
      card.getByText("Medical Student, University of Cape Coast", {
        exact: true,
      }),
    ).toBeVisible();

    const portrait = card.getByAltText("Headshot of David Ofosu, Co-Director");
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveClass(/object-cover/);
    await expect(card.locator("[data-team-portrait]")).toHaveCSS(
      "overflow",
      "hidden",
    );
  });

  test("renders verified contacts and no placeholder contact links", async ({ page }) => {
    const jeanelle = page.locator('[data-team-member="Jeanelle Forson"]');
    await jeanelle.scrollIntoViewIfNeeded();
    await expect(
      jeanelle.getByRole("link", { name: "Email Jeanelle Forson" }),
    ).toHaveAttribute("href", "mailto:jeanelledonkoh@gmail.com");
    await expect(
      jeanelle.getByRole("link", {
        name: "View Jeanelle Forson on LinkedIn",
      }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jeanelle-forson-rn-bn-b5680a162",
    );

    for (const name of ["Bernard Mensah", "Divina Selase Afenyo", "Jade Kissi"]) {
      const card = page.locator(`[data-team-member="${name}"]`);
      await card.scrollIntoViewIfNeeded();
      await expect(card.getByRole("link")).toHaveCount(0);
      await expect(card.getByRole("button", { name: "Read bio" })).toBeVisible();
    }
  });

  test("has no horizontal overflow at mobile, tablet, and desktop widths", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.reload({ waitUntil: "domcontentloaded" });

      const memberSection = page.locator('[data-team-section="member"]');
      await memberSection.scrollIntoViewIfNeeded();
      await expect(
        page.locator('[data-team-member="Martha Bawa"]'),
      ).toBeAttached();
      await expectNoPageOverflow(page);
    }
  });

  test("opens a non-executive biography by keyboard and restores focus", async ({
    page,
  }) => {
    const trigger = page.locator('[data-team-bio-trigger="David Ofosu"]');
    await page.waitForLoadState("networkidle");
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "David Ofosu", level: 2 }),
    ).toBeVisible();
    await expect(
      dialog.getByText(/helps guide Akomapa’s UCC Community Hub/i),
    ).toBeVisible();
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);

    const close = dialog.getByRole("button", {
      name: "Close David Ofosu biography",
    });
    await close.focus();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("keeps member profiles legible with dark mode and reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.reload({ waitUntil: "domcontentloaded" });

    const card = page.locator('[data-team-member="Belinda Odoom"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card.getByRole("button", { name: "Read bio" })).toBeVisible();
    await expect(card.getByAltText(/Headshot of Belinda Odoom/)).toHaveCSS(
      "transform",
      "none",
    );
    await expectNoPageOverflow(page);
  });
});
