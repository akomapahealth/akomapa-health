import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const members = [
  {
    name: "Jeanelle Forson",
    role: "Immersion Program Lead",
    image: "/images/team/jeanelle-forson.jpg",
  },
  {
    name: "Bernard Mensah",
    role: "Research Lead",
    image: "/images/team/bernard-mensah.jpg",
  },
  {
    name: "Divina Selase Afenyo",
    role: "UG Hub Co-Lead",
    image: "/images/team/divina-selase-afenyo.jpg",
  },
  {
    name: "Jade Kissi",
    role: "Head of Internal Affairs",
    image: "/images/team/jade-kissi.jpg",
  },
] as const;

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

test.describe("executive board additions", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
    await page.goto("/about/team", { waitUntil: "domcontentloaded" });
  });

  test("renders each member with the supplied role and portrait path", async ({
    page,
  }) => {
    for (const member of members) {
      const card = page.locator(`[data-team-member="${member.name}"]`);
      await expect(card).toBeVisible();
      await expect(card.getByRole("heading", { name: member.name })).toBeVisible();
      await expect(card.getByText(member.role, { exact: true })).toBeVisible();
      await expect(card.getByText("Akomapa Health Foundation")).toBeVisible();

      const imageSource = await card
        .getByAltText(`Headshot of ${member.name}, ${member.role}`)
        .getAttribute("src");
      expect(imageSource).toContain(member.image);
    }
  });

  test("exposes Jeanelle's valid contacts and suppresses placeholder links", async ({
    page,
  }) => {
    const jeanelle = page.locator('[data-team-member="Jeanelle Forson"]');
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

    for (const name of [
      "Bernard Mensah",
      "Divina Selase Afenyo",
      "Jade Kissi",
    ]) {
      const card = page.locator(`[data-team-member="${name}"]`);
      await expect(card.getByRole("link")).toHaveCount(0);
    }
  });

  test("keeps the expanded board responsive", async ({ page }) => {
    for (const viewport of [
      { width: 375, height: 812 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(
        page.locator('[data-team-member="Jade Kissi"]'),
      ).toBeVisible();
      await expectNoPageOverflow(page);
    }
  });

  test("opens and closes a biography by keyboard and returns focus", async ({
    page,
  }) => {
    const trigger = page.locator(
      '[data-team-bio-trigger="Brian Amu Fleischer, MD"]',
    );
    await page.waitForLoadState("networkidle");
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", {
        name: "Brian Amu Fleischer, MD",
        level: 2,
      }),
    ).toBeVisible();

    const close = dialog.getByRole("button", {
      name: "Close Brian Amu Fleischer, MD biography",
    });
    await expect(close).toBeVisible();
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);

    const lastControl = dialog.getByRole("link", {
      name: "View Brian Amu Fleischer, MD on LinkedIn",
    });
    await lastControl.focus();
    await expect(lastControl).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
