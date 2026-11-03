import { expect, type Page, type Request } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";

const canonical = {
  ghanaPhone: {
    display: "+233 50 296 6072",
    href: "tel:+233502966072",
  },
  usaPhone: {
    display: "+1 (203) 410-6306",
    href: "tel:+12034106306",
  },
  emailHref: "mailto:info@akomapa.org",
  mapTitle: "Map showing Akomapa Health Foundation's Ghana Office",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=43%20Yam%20Street%2C%20Tema%20Community%2023%2C%20Adjei%20Kojo%2C%20Accra%2C%20Ghana",
};

/** Every host the Google Maps embed talks to. */
const GOOGLE_MAPS_TRAFFIC =
  /^https:\/\/(www\.google\.com\/maps|maps\.google\.com|maps\.gstatic\.com|maps\.googleapis\.com|[^/]*\.googleusercontent\.com)/;

/**
 * Records Google Maps requests and answers them locally, so the spec proves
 * when the embed is requested without sending real traffic to Google.
 */
async function stubGoogleMaps(page: Page) {
  const requests: Request[] = [];

  await page.route(GOOGLE_MAPS_TRAFFIC, async (route) => {
    requests.push(route.request());
    const isDocument = route.request().resourceType() === "document";
    await route.fulfill({
      status: isDocument ? 200 : 204,
      contentType: isDocument ? "text/html" : "text/plain",
      body: isDocument ? "<!doctype html><title>Map stub</title>" : "",
    });
  });

  return requests;
}

function officeMap(page: Page) {
  return page.getByRole("figure", { name: "Ghana Office map" });
}

test.describe("canonical contact details", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((version: string) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    }, announcementCampaign.version);
  });

  test("shows actionable guidance when the contact API returns an internal error", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "text/html",
        body: "Internal Server Error",
      });
    });
    await page.goto("/contact");
    const contactForm = page.getByRole("region", { name: "Send us a message" });
    await contactForm.getByLabel("Full name").fill("Ama Mensah");
    await contactForm.getByLabel("Email address").fill("ama@example.com");
    await contactForm.getByLabel("Subject").fill("Volunteer inquiry");
    await contactForm
      .getByLabel("Message")
      .fill("I would like to learn more about volunteering.");
    await contactForm.getByRole("checkbox").check();
    await contactForm.getByRole("button", { name: "Send message" }).click();

    const alert = page.getByTestId("contact-form-error");
    await expect(alert).toContainText("We could not submit your inquiry");
    await expect(
      alert.getByRole("link", { name: "info@akomapa.org" }),
    ).toHaveAttribute("href", canonical.emailHref);
  });

  test("shows matching contact details and a click-to-load Ghana office map", async ({
    page,
  }) => {
    await stubGoogleMaps(page);
    await page.goto("/contact");

    const main = page.locator("main");
    await expect(
      main.getByRole("heading", { name: "Ghana Office", exact: true }).first(),
    ).toBeVisible();
    await expect(
      main.getByText("43 Yam Street", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { name: "USA Office", exact: true }).first(),
    ).toBeVisible();
    await expect(
      main
        .getByText("100 York Street, New Haven, CT 06511", { exact: true })
        .first(),
    ).toBeVisible();

    await expect(
      page.locator(`a[href="${canonical.ghanaPhone.href}"]`).first(),
    ).toHaveText(canonical.ghanaPhone.display);
    await expect(
      page.locator(`a[href="${canonical.usaPhone.href}"]`).first(),
    ).toHaveText(canonical.usaPhone.display);
    await expect(
      page.locator(`a[href="${canonical.emailHref}"]`).first(),
    ).toBeVisible();

    const map = officeMap(page);
    await expect(map).toBeVisible();
    await expect(map.locator("iframe")).toHaveCount(0);
    await expect(
      map.getByText(/Showing the map loads it from Google/),
    ).toBeVisible();

    await map.getByRole("button", { name: "Show map" }).click();

    const frame = map.getByTitle(canonical.mapTitle);
    await expect(frame).toBeVisible();
    await expect(frame).toHaveAttribute(
      "src",
      /43%20Yam%20Street.*Accra%2C%20Ghana.*output=embed/,
    );
    await expect(frame).not.toHaveAttribute(
      "src",
      /UCC|School%20of%20Medical%20Sciences/,
    );
  });

  test("makes no Google Maps request until the visitor asks for the map", async ({
    page,
  }) => {
    const requests = await stubGoogleMaps(page);
    await page.goto("/contact");

    const map = officeMap(page);
    await map.scrollIntoViewIfNeeded();
    await expect(map.getByRole("button", { name: "Show map" })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(requests.map((request) => request.url())).toEqual([]);

    await map.getByRole("button", { name: "Show map" }).click();

    await expect
      .poll(() =>
        requests.some(
          (request) =>
            request.resourceType() === "document" &&
            request.url().includes("output=embed"),
        ),
      )
      .toBe(true);
    await expect(map.getByTitle(canonical.mapTitle)).toBeVisible();
  });

  test("loads the map from the keyboard and moves focus to it", async ({
    page,
  }) => {
    await stubGoogleMaps(page);
    await page.goto("/contact");

    const showMap = officeMap(page).getByRole("button", { name: "Show map" });
    await showMap.focus();
    await expect(showMap).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(officeMap(page).getByTitle(canonical.mapTitle)).toBeFocused();
  });

  test("links to Google Maps in a new tab without loading the embed", async ({
    page,
  }) => {
    const requests = await stubGoogleMaps(page);
    await page.goto("/contact");

    const link = officeMap(page).getByRole("link", {
      name: "Open in Google Maps (opens in a new tab)",
    });
    await expect(link).toHaveAttribute("href", canonical.mapsSearchUrl);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(requests).toHaveLength(0);
  });

  for (const viewport of [
    { name: "small-mobile", width: 320, height: 568 },
    { name: "mobile", width: 375, height: 812 },
    { name: "short-landscape", width: 640, height: 360 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    for (const theme of ["light", "dark"] as const) {
      test(`${viewport.name} ${theme}: map stays readable and stable without horizontal overflow`, async ({
        page,
      }) => {
        await stubGoogleMaps(page);
        await page.addInitScript((storedTheme: string) => {
          localStorage.setItem("akomapa-theme", storedTheme);
        }, theme);
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto("/contact");

        const map = officeMap(page);
        await map.scrollIntoViewIfNeeded();
        await expect(page.locator("html")).toHaveClass(
          theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/,
        );

        const showMap = map.getByRole("button", { name: "Show map" });
        const openLink = map.getByRole("link", { name: /Open in Google Maps/ });
        await expect(showMap).toBeVisible();
        await expect(openLink).toBeVisible();

        const mapBox = await map.boundingBox();
        expect(mapBox).not.toBeNull();
        for (const control of [showMap, openLink]) {
          const box = await control.boundingBox();
          expect(box).not.toBeNull();
          expect(box!.x).toBeGreaterThanOrEqual(mapBox!.x);
          expect(box!.y).toBeGreaterThanOrEqual(mapBox!.y);
          expect(box!.x + box!.width).toBeLessThanOrEqual(mapBox!.x + mapBox!.width + 1);
          expect(box!.y + box!.height).toBeLessThanOrEqual(mapBox!.y + mapBox!.height + 1);
        }

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(dimensions.scrollWidth).toBeLessThanOrEqual(
          dimensions.clientWidth + 1,
        );

        await showMap.click();
        await expect(map.getByTitle(canonical.mapTitle)).toBeVisible();
        const loadedBox = await map.boundingBox();
        expect(loadedBox!.height).toBeCloseTo(mapBox!.height, 0);
      });
    }
  }
});
