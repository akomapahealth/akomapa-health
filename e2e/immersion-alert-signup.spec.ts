import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const embedOrigin = "https://embed.fillout.com";

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
    },
    { announcementVersion: announcementCampaign.version },
  );
  await page.route(`${embedOrigin}/**`, (route) => route.abort("blockedbyclient"));
}

async function openIntent(
  page: Page,
  intent: "register_interest" | "request_brochure",
) {
  const trigger = page.locator(`[data-intake-intent="${intent}"]`).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  return { dialog, trigger };
}

function readContext(src: string) {
  const url = new URL(src);
  return {
    url,
    context: Object.fromEntries(
      ["formType", "intent", "schemaVersion", "sourcePath", "programId"].map(
        (key) => [key, url.searchParams.get(key)],
      ),
    ),
  };
}

test.describe("Immersion Fillout pilot", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
    await page.goto(
      "/global-health-immersion-program?utm_source=must-not-forward&email=private%40example.com",
      { waitUntil: "domcontentloaded" },
    );
    await expect(page.locator("[data-immersion-hero-hydrated]")).toHaveAttribute(
      "data-immersion-hero-hydrated",
      "true",
    );
  });

  test("serves an exact route-scoped frame and permissions policy", async ({
    request,
  }) => {
    const response = await request.get("/global-health-immersion-program");
    expect(response.headers()["content-security-policy"]).toBe(
      "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'self' https://embed.fillout.com;",
    );
    expect(response.headers()["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    );
  });

  test("maps both CTA intents to one allow-listed provider context", async ({
    page,
  }) => {
    const register = await openIntent(page, "register_interest");
    await expect(
      register.dialog.getByRole("heading", { name: "Register your interest" }),
    ).toBeVisible();

    const disabled = register.dialog.locator(
      '[data-intake-provider-state="disabled"]',
    );
    if (await disabled.isVisible()) {
      await expect(
        register.dialog.getByRole("link", { name: "Contact Akomapa instead" }),
      ).toHaveAttribute("href", "/contact");
      return;
    }

    const registerFrame = register.dialog.locator("iframe");
    await expect(registerFrame).toHaveCount(1);
    const registerSrc = await registerFrame.getAttribute("src");
    expect(registerSrc).not.toBeNull();
    const registerRequest = readContext(registerSrc!);
    expect(registerRequest.url.origin).toBe(embedOrigin);
    expect(registerRequest.context).toEqual({
      formType: "immersion",
      intent: "register_interest",
      schemaVersion: "1",
      sourcePath: "/global-health-immersion-program",
      programId: "global-health-immersion-program",
    });
    expect(registerRequest.url.searchParams.has("utm_source")).toBe(false);
    expect(registerRequest.url.searchParams.has("email")).toBe(false);

    await page.keyboard.press("Escape");
    await expect(register.dialog).toBeHidden();

    const brochure = await openIntent(page, "request_brochure");
    await expect(
      brochure.dialog.getByRole("heading", {
        name: "Request the program brochure",
      }),
    ).toBeVisible();
    const brochureSrc = await brochure.dialog.locator("iframe").getAttribute("src");
    expect(brochureSrc).not.toBeNull();
    const brochureRequest = readContext(brochureSrc!);
    expect(brochureRequest.url.pathname).toBe(registerRequest.url.pathname);
    expect(brochureRequest.context).toEqual({
      ...registerRequest.context,
      intent: "request_brochure",
    });
  });

  test("normalizes provider readiness and completion without using callback payloads", async ({
    page,
  }) => {
    const { dialog } = await openIntent(page, "register_interest");
    if (await dialog.locator('[data-intake-provider-state="disabled"]').isVisible()) {
      test.skip(true, "The production-safe default disables the provider embed.");
    }

    const iframe = dialog.locator("iframe");
    const src = await iframe.getAttribute("src");
    const embedId = new URL(src!).searchParams.get("fillout-embed-id");
    expect(embedId).toBeTruthy();

    await page.evaluate(
      ({ expectedOrigin, expectedEmbedId }) => {
        window.dispatchEvent(
          new MessageEvent("message", {
            origin: expectedOrigin,
            data: { type: "form_init", embedId: expectedEmbedId },
          }),
        );
      },
      { expectedOrigin: embedOrigin, expectedEmbedId: embedId },
    );
    await expect(
      dialog.locator('[data-intake-provider-state="loading"]'),
    ).toHaveCount(0);

    await page.evaluate(
      ({ expectedOrigin, expectedEmbedId }) => {
        window.dispatchEvent(
          new MessageEvent("message", {
            origin: expectedOrigin,
            data: {
              type: "form_submit",
              embedId: expectedEmbedId,
              submissionUuid: "discard-me",
              email: "private@example.com",
              answers: { fullName: "Discard Me" },
            },
          }),
        );
      },
      { expectedOrigin: embedOrigin, expectedEmbedId: embedId },
    );
    await expect(
      dialog.getByText("Thank you. Your request is complete."),
    ).toBeVisible();
  });

  test("shows blocked, offline, fallback, and mobile-safe states", async ({
    page,
    context,
  }) => {
    test.slow();
    await page.setViewportSize({ width: 320, height: 720 });
    const { dialog } = await openIntent(page, "request_brochure");
    const disabled = dialog.locator('[data-intake-provider-state="disabled"]');

    if (!(await disabled.isVisible())) {
      await expect(
        dialog.locator('[data-intake-provider-state="load_timeout"]'),
      ).toBeVisible({ timeout: 15_000 });
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();

      await context.setOffline(true);
      const offline = await openIntent(page, "register_interest");
      await expect(
        offline.dialog.locator('[data-intake-provider-state="offline"]'),
      ).toBeVisible();
      await context.setOffline(false);
    }

    const activeDialog = page.getByRole("dialog");
    const fallback = activeDialog.getByRole("link", {
      name: /Open the secure hosted form|Contact Akomapa instead/,
    });
    await expect(fallback).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      dialog: document.querySelector('[role="dialog"]')?.scrollWidth ?? 0,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.dialog).toBeLessThanOrEqual(dimensions.viewport + 1);
  });

  test("keeps keyboard focus contained and returns it to the launcher", async ({
    page,
  }) => {
    const { dialog, trigger } = await openIntent(page, "register_interest");
    await expect(dialog.getByRole("button", { name: /Close register/ })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
