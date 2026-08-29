import { expect, test } from "@playwright/test";

const liveEnabled = process.env.FILLOUT_LIVE_SMOKE === "true";
const stagingId = process.env.FILLOUT_STAGING_FORM_ID ?? "";
const stagingUrl = process.env.FILLOUT_STAGING_FORM_URL ?? "";

function validateStagingTarget() {
  if (!liveEnabled) return;
  if (process.env.FILLOUT_LIVE_SMOKE_ENVIRONMENT !== "staging") {
    throw new Error("Live Fillout smoke tests require an explicit staging environment.");
  }

  const url = new URL(stagingUrl);
  if (
    url.origin !== "https://forms.fillout.com" ||
    url.pathname !== `/t/${stagingId}` ||
    !stagingId
  ) {
    throw new Error("Live Fillout smoke test target is not the exact staging form.");
  }
}

validateStagingTarget();

test.describe("opt-in staging Fillout smoke", () => {
  test.skip(
    !liveEnabled,
    "Set the staging-only live smoke variables to permit a real test submission.",
  );

  test("resumes on close/reopen and submits only to the configured staging form", async ({
    page,
  }) => {
    test.slow();
    await page.goto("/global-health-immersion-program");
    await page.locator('[data-intake-intent="register_interest"]').first().click();

    let iframe = page.getByRole("dialog").locator("iframe");
    await expect(iframe).toHaveAttribute(
      "src",
      new RegExp(`^https://embed\\.fillout\\.com/t/${stagingId}(?:\\?|$)`),
    );
    let form = page.frameLocator('iframe[title="Global Health Immersion Program form"]');
    const fullName = `Akomapa staging smoke ${Date.now()}`;
    await form.getByLabel("Full name").fill(fullName);
    await form.getByLabel("Email address").fill("fillout-smoke@example.com");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await page.locator('[data-intake-intent="register_interest"]').first().click();

    iframe = page.getByRole("dialog").locator("iframe");
    await expect(iframe).toHaveAttribute(
      "src",
      new RegExp(`^https://embed\\.fillout\\.com/t/${stagingId}(?:\\?|$)`),
    );
    form = page.frameLocator('iframe[title="Global Health Immersion Program form"]');
    const resume = form.getByRole("button", { name: /resume|continue/i });
    if (await resume.isVisible().catch(() => false)) await resume.click();
    await expect(form.getByLabel("Full name")).toHaveValue(fullName);
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: /submit/i }).click();

    await expect(
      page.getByRole("dialog").getByText("Thank you. Your request is complete."),
    ).toBeVisible({ timeout: 30_000 });
  });
});
