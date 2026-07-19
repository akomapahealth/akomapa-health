import { expect, test } from "@playwright/test";

const canonical = {
  ghanaPhone: {
    display: "+233 50 296 6072",
    href: "tel:+233502966072",
  },
  usaPhone: {
    display: "+1 (203) 410-6306",
    href: "tel:+12034106306",
  },
  emailHref: "mailto:akomapahealth@gmail.com",
  mapTitle: "Map showing Akomapa Health Foundation's Ghana Office",
};

test.describe("canonical contact details", () => {
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

    await page.getByLabel("Full Name *").fill("Ama Mensah");
    await page.getByLabel("Email Address *").fill("ama@example.com");
    await page.getByLabel("Subject *").fill("Volunteer inquiry");
    await page
      .getByLabel("Message *")
      .fill("I would like to learn more about volunteering.");
    await page.getByRole("button", { name: "Send Message" }).click();

    const alert = page.getByTestId("contact-form-error");
    await expect(alert).toContainText("We couldn't send your message");
    await expect(alert).toContainText(
      "Something went wrong on our side. Please try again in a few minutes.",
    );
    await expect(
      alert.getByRole("link", { name: "akomapahealth@gmail.com" }),
    ).toHaveAttribute("href", canonical.emailHref);
  });

  test("shows matching contact details and the Ghana office map", async ({ page }) => {
    await page.goto("/contact");

    const main = page.locator("main");
    await expect(main.getByRole("heading", { name: "Ghana Office", exact: true }).first()).toBeVisible();
    await expect(main.getByText("43 Yam Street", { exact: true }).first()).toBeVisible();
    await expect(main.getByRole("heading", { name: "USA Office", exact: true }).first()).toBeVisible();
    await expect(main.getByText("100 York Street, New Haven, CT 06511", { exact: true }).first()).toBeVisible();

    await expect(page.locator(`a[href="${canonical.ghanaPhone.href}"]`).first()).toHaveText(canonical.ghanaPhone.display);
    await expect(page.locator(`a[href="${canonical.usaPhone.href}"]`).first()).toHaveText(canonical.usaPhone.display);
    await expect(page.locator(`a[href="${canonical.emailHref}"]`).first()).toBeVisible();

    await expect(main.getByText("Ghana Office map", { exact: true })).toBeVisible();
    const map = main.getByTitle(canonical.mapTitle);
    await expect(map).toBeVisible();
    await expect(map).toHaveAttribute("src", /43%20Yam%20Street.*Accra%2C%20Ghana.*output=embed/);
    await expect(map).not.toHaveAttribute("src", /UCC|School%20of%20Medical%20Sciences/);
  });

  for (const viewport of [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`remains readable without horizontal overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/contact");

      await expect(page.getByText("Ghana Office map", { exact: true })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    });
  }
});
