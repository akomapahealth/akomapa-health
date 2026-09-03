import { expect, test } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const viewports = [
  { width: 320, height: 720 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    (version) =>
      localStorage.setItem("akomapa-announcements-dismissed", version),
    announcementCampaign.version,
  );
  await page.route("**/api/intake/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        requestId: "00000000-0000-4000-8000-000000000000",
      }),
    }),
  );
});

for (const viewport of viewports) {
  test(`program form links are responsive at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/global-health-immersion-program", {
      waitUntil: "domcontentloaded",
    });
    const application = page.getByRole("link", { name: "Apply Now" }).first();
    await application.scrollIntoViewIfNeeded();
    await expect(application).toBeVisible();
    await expect(application).toHaveAttribute("target", "_blank");
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}

test("maps partnership and get-involved CTAs to distinct forms", async ({
  page,
}) => {
  await page.goto("/partnerships");
  await page.getByRole("button", { name: "Get in Touch" }).click();
  await expect(
    page.getByRole("dialog").getByLabel("Organization"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.goto("/get-involved");
  await page.getByRole("button", { name: "Register Interest" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByLabel("How would you like to get involved?"),
  ).toHaveValue("student_leadership");
  await expect(dialog.getByLabel("Organization", { exact: true })).toHaveCount(
    0,
  );
});

test("supports dark mode, reduced motion, keyboard use, and 200% zoom-equivalent reflow", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto("/global-health-immersion-program");
  const application = page.getByRole("link", { name: "Apply Now" }).first();
  await expect(async () => {
    await application.focus();
    await expect(application).toBeFocused();
  }).toPass({ timeout: 10_000 });
  await expect(application).toHaveCSS("outline-style", "solid");
  const dimensions = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
});
