import { expect, test, type Locator, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const conversionRoutes = [
  { path: "/partnerships", heading: "Our Partnerships" },
  {
    path: "/partnerships/corporate-sponsorship",
    heading: "Partner with Purpose. Build Health. Leave a Legacy.",
  },
  { path: "/get-involved", heading: "Get Involved" },
  { path: "/donate", heading: "Every act of generosity saves a life." },
  { path: "/contact", heading: "Get in touch with us." },
] as const;

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "ipad-pro-1024", width: 1024, height: 1366 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1536", width: 1536, height: 960 },
] as const;

const themes = ["light", "dark"] as const;

async function preparePage(page: Page, theme: (typeof themes)[number]) {
  await page.addInitScript(
    ({ version, storedTheme }) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
      localStorage.setItem("akomapa-theme", storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);

      const style = document.createElement("style");
      style.textContent =
        "*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important}";
      document.documentElement.append(style);
    },
    { version: announcementCampaign.version, storedTheme: theme },
  );
}

async function expectNoOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
}

async function expectElementInViewport(locator: Locator) {
  const contained = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= -1 && rect.right <= window.innerWidth + 1;
  });
  expect(contained).toBe(true);
}

test.describe("conversion family editorial contracts", () => {
  test("redirects donate corporate sponsorship to partnerships", async ({
    request,
    page,
  }) => {
    const response = await request.get("/donate/corporate-sponsorship", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(
      "/partnerships/corporate-sponsorship",
    );

    await preparePage(page, "light");
    await page.goto("/donate/corporate-sponsorship", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveURL(/\/partnerships\/corporate-sponsorship$/);
  });

  test("exposes conversion CTA destinations and sponsorship process", async ({
    page,
  }) => {
    await preparePage(page, "light");

    await page.goto("/partnerships", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("link", { name: /Become a Partner/i }).first(),
    ).toHaveAttribute("href", "#become-a-partner");
    await expect(
      page.getByRole("link", { name: /Our Philosophy/i }).first(),
    ).toHaveAttribute("href", "/philosophy");

    await page.goto("/partnerships/corporate-sponsorship", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("link", { name: /Become a Sponsor/i }).first(),
    ).toHaveAttribute("href", "/contact?type=partnership");
    await expect(
      page.getByRole("link", { name: /Individual Donations/i }).first(),
    ).toHaveAttribute("href", "/donate");
    await expect(
      page.getByRole("link", { name: /info@akomapa\.org/i }).first(),
    ).toHaveAttribute("href", "mailto:info@akomapa.org");

    await page.goto("/get-involved", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("link", { name: /Explore Pathways/i }).first(),
    ).toHaveAttribute("href", "#pathways");
    await expect(
      page.getByRole("link", { name: /Contact Us/i }).first(),
    ).toHaveAttribute("href", "/contact");

    await page.goto("/donate", { waitUntil: "domcontentloaded" });
    await expect(
      page
        .getByRole("link", {
          name: /Learn More About Corporate Sponsorship/i,
        })
        .first(),
    ).toHaveAttribute("href", "/partnerships/corporate-sponsorship");
  });

  test("supports keyboard FAQ and donation tab switching", async ({ page }) => {
    await preparePage(page, "light");
    await page.goto("/get-involved", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    const firstFaq = page
      .locator('section[aria-labelledby="get-involved-faq-heading"]')
      .getByRole("button")
      .first();
    await firstFaq.scrollIntoViewIfNeeded();
    await expect(firstFaq).toHaveAttribute("aria-expanded", "false");
    await firstFaq.focus();
    await expect(firstFaq).toBeFocused();

    // Retry until client hydration attaches the accordion handler.
    await expect(async () => {
      if ((await firstFaq.getAttribute("aria-expanded")) !== "true") {
        await page.keyboard.press("Enter");
      }
      await expect(firstFaq).toHaveAttribute("aria-expanded", "true");
    }).toPass({ timeout: 10_000 });

    await page.keyboard.press("Enter");
    await expect(firstFaq).toHaveAttribute("aria-expanded", "false");

    await page.goto("/donate", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    const oneTimeTab = page.getByRole("button", { name: /One-Time Gift/i });
    await oneTimeTab.scrollIntoViewIfNeeded();
    await oneTimeTab.focus();
    await expect(oneTimeTab).toBeFocused();
    await expect(async () => {
      if ((await oneTimeTab.getAttribute("aria-pressed")) !== "true") {
        await oneTimeTab.click();
      }
      await expect(oneTimeTab).toHaveAttribute("aria-pressed", "true");
    }).toPass({ timeout: 10_000 });
    await expect(
      page.getByRole("heading", { name: "Make a One-Time Gift" }),
    ).toBeVisible();
  });

  test("exercises contact and donation follow-up states without real submissions", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await preparePage(page, "light");

    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Something went wrong on our side. Please try again in a few minutes.",
        }),
      });
    });
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.getByLabel("Full Name *").fill("Ama Mensah");
    await page.getByLabel("Email Address *").fill("ama@example.com");
    await page.getByLabel("Subject *").fill("Partnership inquiry");
    await page
      .getByLabel("Message *")
      .fill("I would like to discuss a corporate partnership.");
    await page.getByRole("button", { name: "Send Message" }).click();
    const contactError = page.getByTestId("contact-form-error");
    await expect(contactError).toContainText("We couldn't send your message");
    await expect(contactError).toContainText(
      "Something went wrong on our side. Please try again in a few minutes.",
    );

    await page.unroute("**/api/contact");
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(
      page.getByRole("status").getByText("Message Sent Successfully!"),
    ).toBeVisible();

    // Clear contact mocks before donate so they cannot interfere with navigation.
    await page.unroute("**/api/contact");
    await page.route("**/api/donation-follow-up", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Server error" }),
      });
    });
    await page.goto("/donate", { waitUntil: "domcontentloaded" });
    const paymentPanel = page.getByTestId("donation-payment-methods-partner");
    await expect(
      paymentPanel.getByText(/Complete a new manual transfer for each month/i),
    ).toBeVisible();

    // Match both View/Hide labels so the locator survives the toggle rename.
    const instructionsToggle = paymentPanel.getByRole("button", {
      name: /Mobile Money instructions/i,
    });
    await instructionsToggle.scrollIntoViewIfNeeded();
    await expect(instructionsToggle).toBeVisible();
    await expect(instructionsToggle).toHaveAttribute("aria-expanded", "false");

    // Retry until expanded — FadeIn/layout can swallow the first pointer event
    // under full-suite load.
    await expect(async () => {
      if ((await instructionsToggle.getAttribute("aria-expanded")) !== "true") {
        await instructionsToggle.click({ force: true });
      }
      await expect(instructionsToggle).toHaveAttribute("aria-expanded", "true");
      await expect(paymentPanel.getByText("0249292898")).toBeVisible();
    }).toPass({ timeout: 15_000 });

    await expect(paymentPanel.getByRole("alert")).toBeVisible();
    await expect(
      paymentPanel.getByRole("heading", { name: "Let us thank you" }),
    ).toBeVisible();
    await paymentPanel.getByPlaceholder("Your full name").fill("Kojo Mensah");
    await paymentPanel.getByPlaceholder("you@example.com").fill("kojo@example.com");
    await paymentPanel.getByRole("button", { name: "Share my details" }).click();
    await expect(
      paymentPanel.getByText(/couldn't share your details/i),
    ).toBeVisible();

    await page.unroute("**/api/donation-follow-up");
    await page.route("**/api/donation-follow-up", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await paymentPanel.getByRole("button", { name: "Share my details" }).click();
    await expect(
      paymentPanel.getByText(/Thank you for sharing your details/i),
    ).toBeVisible();
  });

  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`${viewport.name} · ${theme} · conversion routes stay editorial and readable`, async ({
        page,
      }) => {
        test.setTimeout(90_000);
        await preparePage(page, theme);
        await page.setViewportSize(viewport);

        for (const route of conversionRoutes) {
          await page.goto(route.path, { waitUntil: "domcontentloaded" });
          await expect(page.locator("main h1")).toHaveCount(1);
          await expect(
            page.getByRole("heading", { level: 1, name: route.heading }),
          ).toBeVisible();
          await expectElementInViewport(page.locator("main h1"));
          await expectNoOverflow(page);

          const bands = page.locator("[data-editorial-band]");
          await expect(bands.first()).toBeVisible();

          const standaloneControls = page.locator(
            "[data-editorial-band] a, [data-editorial-band] button",
          );
          const undersized = await standaloneControls.evaluateAll((controls) =>
            controls
              .filter((control) => {
                const style = getComputedStyle(control);
                if (
                  style.display === "none" ||
                  style.visibility === "hidden" ||
                  style.opacity === "0"
                ) {
                  return false;
                }
                // Native/Radix radios are intentionally compact indicators.
                if (
                  control.getAttribute("role") === "radio" ||
                  control.getAttribute("type") === "radio" ||
                  control.closest('[role="radiogroup"]')
                ) {
                  return false;
                }
                const rect = control.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                  return false;
                }
                // Logo tiles expose aria-label with image-only content.
                if (
                  control.getAttribute("aria-label") &&
                  control.querySelector("img")
                ) {
                  return false;
                }
                return rect.width < 44 || rect.height < 44;
              })
              .map(
                (control) =>
                  control.getAttribute("aria-label") ||
                  control.textContent?.trim() ||
                  control.tagName,
              ),
          );
          expect(undersized).toEqual([]);
        }
      });
    }
  }
});
