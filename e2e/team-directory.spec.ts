import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import {
  advisoryBoardMembers,
  executiveLeadership,
  teamDepartments,
  teamHeroPeople,
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
      .toEqual(["executive", "departments", "advisor"]);

    const expectedGroups = [
      ["executive", "executive", executiveLeadership.length, "Executive Leadership"],
      ["departments", "member", teamDepartments.flatMap(({ members }) => members).length, "Our Departments"],
      ["advisor", "advisor", advisoryBoardMembers.length, "Advisory Board"],
    ] as const;

    for (const [sectionName, category, count, heading] of expectedGroups) {
      const section = page.locator(`[data-team-section="${sectionName}"]`);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByText(heading, { exact: true })).toBeVisible();
      await expect(
        section.locator(`[data-team-role-category="${category}"]`),
      ).toHaveCount(count);
    }

    const departmentSections = page.locator("[data-team-department]");
    await expect(departmentSections).toHaveCount(teamDepartments.length);
    await expect.poll(() => departmentSections.evaluateAll((elements) => elements.map((element) => element.getAttribute("data-team-department")))).toEqual(teamDepartments.map(({ id }) => id));
    for (const department of teamDepartments) {
      const section = page.locator(`[data-team-department="${department.id}"]`);
      await expect(section.getByRole("heading", { name: department.name, level: 3 })).toBeVisible();
      await expect.poll(() => section.locator("[data-team-member]").evaluateAll((elements) => elements.map((element) => element.getAttribute("data-team-member")))).toEqual(department.members.map(({ name }) => name));
    }

    for (const hubOnlyName of ["David Ofosu", "Hafiz Shaban", "Divina Selase Afenyo"]) {
      await expect(page.locator(`[data-team-member="${hubOnlyName}"]`)).toHaveCount(0);
    }
    await expect(page.locator('[data-team-member="Wilfred Obeng"]')).toHaveCount(1);
    await expect(page.locator("[data-team-node-portrait]")).toHaveCount(22);
    await expect
      .poll(() =>
        page
          .locator("[data-team-node-portrait]")
          .evaluateAll((elements) =>
            elements.map((element) =>
              element.getAttribute("data-team-node-portrait"),
            ),
          ),
      )
      .toEqual(teamHeroPeople.map(({ id }) => id));
  });

  test("renders a complete non-executive profile with consistent portrait cropping", async ({
    page,
  }) => {
    const card = page.locator('[data-team-member="Wilfred Obeng"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card.getByRole("heading", { name: "Wilfred Obeng" })).toBeVisible();
    await expect(card.getByText("Clinical Standards Lead", { exact: true })).toBeVisible();
    await expect(
      card.getByText("Medical Student, University of Cape Coast", {
        exact: true,
      }),
    ).toBeVisible();

    const portrait = card.getByAltText("Headshot of Wilfred Obeng, Clinical Standards Lead");
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

    const jade = page.locator('[data-team-member="Jade Kissi"]');
    await jade.scrollIntoViewIfNeeded();
    await expect(jade.getByRole("link", { name: "Email Jade Kissi" })).toHaveAttribute(
      "href",
      "mailto:kakrakissi@gmail.com",
    );
    await expect(
      jade.getByRole("link", { name: "View Jade Kissi on LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/jadekissi/");

    const bernard = page.locator('[data-team-member="Bernard Mensah"]');
    await bernard.scrollIntoViewIfNeeded();
    await expect(bernard.getByRole("link")).toHaveCount(0);
    await expect(
      bernard.getByRole("button", { name: "Read bio" }),
    ).toBeVisible();
  });

  test("reveals the first card in each directory on a phone-width viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/about/team", { waitUntil: "domcontentloaded" });

    const samples = [
      ["executive", executiveLeadership[0].name],
      ["departments", teamDepartments[0].members[0].name],
      ["advisor", advisoryBoardMembers[0].name],
    ] as const;

    for (const [category, name] of samples) {
      const card = page.locator(
        `[data-team-section="${category}"] [data-team-member="${name}"]`,
      );
      await card.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            card.evaluate((element) => {
              for (
                let node: Element | null = element;
                node && !node.hasAttribute("data-team-section");
                node = node.parentElement
              ) {
                const opacity = Number(getComputedStyle(node).opacity);
                if (opacity < 0.99) {
                  return opacity;
                }
              }

              return 1;
            }),
          { timeout: 15_000 },
        )
        .toBe(1);
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

      const memberSection = page.locator('[data-team-section="departments"]');
      await memberSection.scrollIntoViewIfNeeded();
      await expect(
        page.locator('[data-team-member="Kelvin Fiifi Ocran"]'),
      ).toBeAttached();
      await expectNoPageOverflow(page);
    }
  });

  test("opens a non-executive biography by keyboard and restores focus", async ({
    page,
  }) => {
    const trigger = page.locator('[data-team-bio-trigger="Bernard Mensah"]');
    await page.waitForLoadState("networkidle");
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Bernard Mensah", level: 2 }),
    ).toBeVisible();
    await expect(
      dialog.getByText(/leads Akomapa’s research work/i),
    ).toBeVisible();
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);

    const close = dialog.getByRole("button", {
      name: "Close Bernard Mensah biography",
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

    const card = page.locator('[data-team-member="Erinda Aidoo"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card.getByRole("button", { name: "Read bio" })).toBeVisible();
    await expect(card.getByAltText(/Headshot of Erinda Aidoo/)).toHaveCSS(
      "transform",
      "none",
    );
    await expectNoPageOverflow(page);
  });
});
