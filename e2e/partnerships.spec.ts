import { expect, test, type Page } from "@playwright/test";

async function dismissAnnouncements(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("akomapa-announcements-dismissed", "2026-04-v2");
  });
}

test.describe("Partnerships presentation", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncements(page);
    await page.goto("/partnerships", { waitUntil: "domcontentloaded" });
  });

  test("uses canonical logo assets without removed or duplicate entries", async ({
    page,
  }) => {
    const network = page.locator(
      'section[aria-labelledby="partner-logos-heading"]',
    );

    await expect(network).toBeVisible();
    await expect(network.getByText("Africa Health Collaborative")).toHaveCount(
      0,
    );
    await expect(network.locator('img[alt="University of Cape Coast logo"]')).toHaveCount(
      1,
    );
    await expect(
      network.locator(
        'img[alt="David Geffen School of Medicine at UCLA logo"]',
      ),
    ).toHaveCount(1);
    await expect(network.locator('img[alt="AFC logo"]')).toHaveAttribute(
      "src",
      /afc\.png/,
    );
    await expect(
      network.locator('img[alt="Yale School of Medicine logo"]'),
    ).toHaveAttribute("src", /yale-sm-logo\.png/);
    await expect(
      network.locator('img[alt="African Impact Initiative logo"]'),
    ).toHaveAttribute("src", /AII-logo\.png/);

    const logoSources = await network.locator("img").evaluateAll((images) =>
      images.map((image) => image.getAttribute("src")),
    );
    expect(new Set(logoSources).size).toBe(logoSources.length);
  });

  test("renders Community Collaborators without a misleading logo", async ({
    page,
  }) => {
    const communitySection = page.locator("#partners-community");

    await expect(
      communitySection.getByRole("heading", {
        name: "Community Leaders and Institutions",
      }),
    ).toBeVisible();
    await expect(communitySection.locator("img")).toHaveCount(0);
    await expect(
      communitySection.getByText(/barbershops, salons, and local organizations/i),
    ).toBeVisible();
  });
});
