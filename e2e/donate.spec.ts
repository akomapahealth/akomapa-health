import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const givebutterScriptPattern = "https://widgets.givebutter.com/**";
const requiredWidths = [375, 768, 1024, 1280, 1440, 1536, 1728] as const;

const forbiddenPaymentValues = [
  ["+233", "54", "111", "1111"].join(" "),
  ["054", "111", "1111"].join(" "),
  ["123", "456", "7890"].join(""),
];

const mockGivebutterLibrary = `
  if (!customElements.get("givebutter-giving-form")) {
    customElements.define("givebutter-giving-form", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '<div role="group" aria-label="Mock secure Givebutter form"><p>Secure Givebutter checkout</p><button type="button">Continue in test form</button></div>';
      }
    });
  }
`;

async function dismissAnnouncements(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

async function mockGivebutter(page: Page) {
  await page.route(givebutterScriptPattern, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: mockGivebutterLibrary,
    });
  });
}

test.describe("Donate page flow", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncements(page);
  });

  test("supports normal client-side navigation into the donate page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Donate" }).click();

    await expect(page).toHaveURL(/\/donate$/);
    await expect(
      page.getByRole("heading", {
        name: "Every act of generosity saves a life.",
      })
    ).toBeVisible();
  });

  test("fails closed while the Givebutter rollout gate is disabled", async ({
    page,
  }) => {
    await mockGivebutter(page);
    const widgetRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().startsWith("https://widgets.givebutter.com/")) {
        widgetRequests.push(request.url());
      }
    });

    await page.goto("/donate");
    test.skip(
      (await page.getByTestId("donation-provider-unavailable").count()) === 0,
      "This build explicitly enables Givebutter QA",
    );

    await expect(
      page.getByTestId("donation-provider-unavailable"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Givebutter campaign/i }),
    ).toHaveCount(0);
    await expect(page.getByTestId("ghana-mobile-money")).toBeVisible();
    expect(widgetRequests).toEqual([]);
  });

  test("retired local payment and follow-up APIs are unavailable", async ({
    request,
  }) => {
    const paymentIntent = await request.post("/api/create-payment-intent", {
      data: { amount: 25 },
    });
    const donationFollowUp = await request.post("/api/donation-follow-up", {
      data: { name: "Test donor" },
    });

    expect(paymentIntent.status()).toBe(404);
    expect(donationFollowUp.status()).toBe(404);
  });

  test("uses one campaign for monthly and one-time entry points", async ({
    page,
  }) => {
    await mockGivebutter(page);
    const widgetRequests: string[] = [];
    const prohibitedRequests: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith("https://widgets.givebutter.com/")) {
        widgetRequests.push(url);
      }
      if (
        url.includes("/api/create-payment-intent") ||
        url.includes("/api/donation-follow-up") ||
        url.startsWith("https://js.stripe.com/")
      ) {
        prohibitedRequests.push(url);
      }
    });

    await page.goto("/donate");
    test.skip(
      (await page.getByTestId("donation-provider-unavailable").count()) > 0,
      "Givebutter is disabled in this build",
    );

    await expect(
      page.getByRole("heading", {
        name: "Every act of generosity saves a life.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("group", { name: "Mock secure Givebutter form" }),
    ).toBeVisible();
    await expect(page).toHaveURL(/frequency=monthly/);
    await expect(
      page.locator('givebutter-giving-form[campaign="HE1MLG"]'),
    ).toHaveCount(1);

    await expect(
      page.getByRole("heading", {
        name: "Choose Your Monthly Partnership Amount",
      }),
    ).toHaveCount(0);

    await page.getByRole("link", { name: "One-Time Gift" }).click();
    await expect(
      page.getByRole("heading", { name: "Make a One-Time Gift" }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/frequency=/);
    await expect(
      page.locator('givebutter-giving-form[campaign="HE1MLG"]'),
    ).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "Choose Your Gift Amount" }),
    ).toHaveCount(0);
    expect(widgetRequests).toHaveLength(2);
    expect(prohibitedRequests).toEqual([]);
  });

  test("recovers from a blocked widget script and keeps a safe fallback", async ({
    page,
  }) => {
    await page.route(givebutterScriptPattern, (route) =>
      route.abort("blockedbyclient"),
    );
    await page.goto("/donate");
    test.skip(
      (await page.getByTestId("donation-provider-unavailable").count()) > 0,
      "Givebutter is disabled in this build",
    );

    await expect(
      page.getByTestId("givebutter-checkout-partner").getByRole("alert"),
    ).toContainText(/could not be loaded/i);
    const fallback = page.getByRole("link", {
      name: /Open the secure Givebutter campaign/i,
    });
    await expect(fallback).toHaveAttribute("target", "_blank");
    await expect(fallback).toHaveAttribute("rel", "noopener noreferrer");

    await page.unroute(givebutterScriptPattern);
    await mockGivebutter(page);
    await page.getByRole("button", { name: "Retry secure form" }).click();
    await expect(
      page.getByRole("group", { name: "Mock secure Givebutter form" }),
    ).toBeVisible();
  });

  test("keeps the secure checkout within every required viewport", async ({
    page,
  }) => {
    await mockGivebutter(page);

    await page.goto("/donate");
    test.skip(
      (await page.getByTestId("donation-provider-unavailable").count()) > 0,
      "Givebutter is disabled in this build",
    );

    for (const width of requiredWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/donate");
      await expect(
        page.getByRole("group", { name: "Mock secure Givebutter form" }),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
    }
  });

  test("renders verified manual MTN instructions without unsafe completion controls", async ({
    page,
  }) => {
    await mockGivebutter(page);
    await page.goto("/donate");
    const pageText = await page.locator("body").innerText();

    for (const value of forbiddenPaymentValues) {
      expect(pageText).not.toContain(value);
    }
    const mobileMoney = page.getByTestId("ghana-mobile-money");
    await expect(mobileMoney).toBeVisible();
    await expect(
      mobileMoney.getByText("Akomapa Health Foundation", { exact: true }),
    ).toBeVisible();
    await expect(mobileMoney.getByText("MTN", { exact: true })).toBeVisible();
    await expect(mobileMoney.getByText("0249292898")).toBeVisible();
    await expect(
      mobileMoney.getByText(/confirm the account name appears/i),
    ).toBeVisible();
    await expect(mobileMoney.getByRole("button")).toHaveCount(0);
    await expect(mobileMoney.getByRole("link")).toHaveCount(0);
    await expect(page.getByText(/payment complete/i)).toHaveCount(0);
  });
});
