import { expect, type Page, test } from "@playwright/test";

const canonicalOrigin = "https://akomapa.org";
const defaultOgImage = `${canonicalOrigin}/images/og-homepage.jpg`;
const homepageOgAlt =
  "Akomapa homepage: community clinic care with the headline Advancing Noncommunicable Disease Prevention & Care and Explore Our Academy and Partner With Us";

async function expectMetadata(
  page: Page,
  {
    path,
    title,
    description,
  }: {
    path: string;
    title: string;
    description: string;
  },
) {
  await page.goto(path, { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(`${title} | Akomapa Health`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    `${title} | Akomapa Health`,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${canonicalOrigin}${path === "/" ? "" : path}`,
  );
}

test.describe("SEO metadata", () => {
  test("renders canonical metadata on representative pages", async ({ page }) => {
    await expectMetadata(page, {
      path: "/",
      title: "Building Ethical Global Health Leaders",
      description:
        "Akomapa develops ethical, community-centered leaders through healthcare service, leadership training, research, and equitable partnerships.",
    });
    await expectMetadata(page, {
      path: "/about/team",
      title: "Our Team",
      description:
        "Meet the student leaders, faculty mentors, and advisors driving Akomapa's mission forward through service, research, and partnership.",
    });
    await expectMetadata(page, {
      path: "/community-hubs/ucc",
      title: "UCC Community Health Hub",
      description:
        "Akomapa's flagship hub at the University of Cape Coast serves communities in Ghana's Central Region through student-powered NCD care.",
    });
  });

  test("serves canonical sitemap and robots directives", async ({ page }) => {
    await page.goto("/sitemap.xml");
    const sitemapText = await page.locator("body").innerText();

    expect(sitemapText).toContain(`${canonicalOrigin}/about/team`);
    expect(sitemapText).toContain(`${canonicalOrigin}/community-hubs`);
    expect(sitemapText).not.toContain(`${canonicalOrigin}/faculty`);
    expect(sitemapText).not.toContain(`${canonicalOrigin}/clinics`);
    expect(sitemapText).not.toContain("www.akomapa.org");
    expect(sitemapText).not.toContain("www.akomapahealth.org");
    expect(sitemapText).not.toContain("akomapahealth.org");

    await page.goto("/robots.txt");
    const robotsText = await page.locator("body").innerText();

    expect(robotsText).toContain("User-Agent: *");
    expect(robotsText).toContain("Allow: /");
    expect(robotsText).toContain("Disallow: /sentry-example-page");
    expect(robotsText).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
  });

  test("uses the homepage screenshot as the default social share image", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      canonicalOrigin,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      defaultOgImage,
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      homepageOgAlt,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      defaultOgImage,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonicalOrigin,
    );
  });

  test("keeps article cover images instead of the homepage screenshot", async ({
    page,
  }) => {
    await page.goto("/blog/what-ethical-leadership-means-to-me", {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${canonicalOrigin}/highlights/Akomapa-20.jpg`,
    );
    await expect(page.locator('meta[property="og:image"]')).not.toHaveAttribute(
      "content",
      defaultOgImage,
    );
  });

  test("redirects faculty route to the team page", async ({ page }) => {
    await page.goto("/faculty", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/about\/team$/);
  });
});
