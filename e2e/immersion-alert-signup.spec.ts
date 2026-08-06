import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { immersionProgram } from "../src/data/immersion-program";
import { IMMERSION_INTEREST_COPY } from "../src/lib/immersion-interest";

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
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("light");
    },
    { announcementVersion: announcementCampaign.version },
  );
}

async function openAlertModal(page: Page) {
  await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(1);
  const cta = page.getByRole("button", {
    name: IMMERSION_INTEREST_COPY.section.cta,
    exact: true,
  });
  await cta.scrollIntoViewIfNeeded();
  await cta.click();
  return page.getByRole("dialog");
}

test.describe("Immersion alert signup modal", () => {
  test("opens and closes by keyboard with focus restoration", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page);
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(1);

    const hero = page.getByRole("region", {
      name: immersionProgram.title,
      exact: true,
    });
    const cta = hero.locator("[data-immersion-register-interest]");
    await cta.scrollIntoViewIfNeeded();
    await cta.focus();
    await expect(cta).toBeFocused();
    // Target the control directly so activation is not lost to page-level keys.
    await cta.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", {
        name: IMMERSION_INTEREST_COPY.modal.title,
      }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect
      .poll(async () =>
        cta.evaluate((element) => element === document.activeElement),
      )
      .toBe(true);
  });

  test("submits successfully and supports retry after failure", async ({
    page,
  }) => {
    let attempt = 0;
    await page.route("**/api/immersion-interest", async (route) => {
      attempt += 1;
      if (attempt === 1) {
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({
            error: "Immersion alert service is currently unavailable",
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          outcome: "pending_confirmation",
        }),
      });
    });

    await page.setViewportSize({ width: 1280, height: 800 });
    await preparePage(page);
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });

    const dialog = await openAlertModal(page);
    await expect(dialog).toBeVisible();

    await dialog.getByLabel("First name").fill("Ama");
    await dialog.getByLabel("Email address").fill("ama@example.com");
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: IMMERSION_INTEREST_COPY.modal.submit })
      .click();

    await expect(
      dialog.getByText(IMMERSION_INTEREST_COPY.errors.serviceUnavailable),
    ).toBeVisible();
    await expect(dialog.getByLabel("First name")).toHaveValue("Ama");

    await dialog
      .getByRole("button", { name: IMMERSION_INTEREST_COPY.modal.submit })
      .click();

    await expect(
      dialog.getByRole("heading", {
        name: IMMERSION_INTEREST_COPY.success.heading,
      }),
    ).toBeVisible();
    await expect(dialog.getByText("ama@example.com")).toBeVisible();
    expect(attempt).toBe(2);
  });

  test("stays usable without overflow at 320px width", async ({ page }) => {
    await page.route("**/api/immersion-interest", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          outcome: "pending_confirmation",
        }),
      });
    });

    await page.setViewportSize({ width: 320, height: 720 });
    await preparePage(page);
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });

    const dialog = await openAlertModal(page);
    await expect(dialog).toBeVisible();

    const overflow = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      dialogWidth: document
        .querySelector('[role="dialog"]')
        ?.getBoundingClientRect().width,
    }));

    expect(overflow.documentWidth).toBeLessThanOrEqual(
      overflow.viewportWidth + 1,
    );
    expect(overflow.dialogWidth ?? 0).toBeLessThanOrEqual(
      overflow.viewportWidth + 1,
    );

    await dialog.getByLabel("First name").fill("Ama");
    await dialog.getByLabel("Email address").fill("ama@example.com");
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: IMMERSION_INTEREST_COPY.modal.submit })
      .click();

    await expect(
      dialog.getByRole("heading", {
        name: IMMERSION_INTEREST_COPY.success.heading,
      }),
    ).toBeVisible();
  });
});
