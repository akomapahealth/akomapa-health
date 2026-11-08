import { expect, type Page } from "@playwright/test";
import { test } from "./media/playwright";

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

  test("uses the homepage screenshot for the homepage only", async ({
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

    // The cover lives on ImageKit, not in public/, so the share image must be
    // the CDN crop. The site-origin URL was a 404 for crawlers.
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /^https:\/\/ik\.imagekit\.io\/akomapa\/highlights\/Akomapa-20\.jpg\?tr=w-1200/,
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

  test("gives representative pages distinct, relevant share images and copy", async ({
    page,
    request,
  }) => {
    const routes = [
      { path: "/", kind: "homepage screenshot" },
      { path: "/about", kind: "curated photo" },
      { path: "/community-hubs/ug", kind: "curated photo" },
      { path: "/privacy", kind: "generated card" },
      { path: "/programs/akomapa-foods", kind: "generated card" },
      { path: "/global-health-immersion-program/payment-terms", kind: "generated card" },
      { path: "/research/stakeholder-support-student-run-free-clinics-ghana", kind: "curated photo" },
      { path: "/news/nkwapa-emr-launch", kind: "curated photo" },
      { path: "/blog/what-ethical-leadership-means-to-me", kind: "curated photo" },
    ];

    const seen = new Map<string, { title: string; description: string; image: string; url: string }>();

    for (const { path, kind } of routes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const read = (selector: string) =>
        page.locator(selector).getAttribute("content");

      const title = (await read('meta[property="og:title"]')) ?? "";
      const description = (await read('meta[property="og:description"]')) ?? "";
      const image = (await read('meta[property="og:image"]')) ?? "";
      const imageAlt = (await read('meta[property="og:image:alt"]')) ?? "";
      const url = (await read('meta[property="og:url"]')) ?? "";
      const twitterImage = (await read('meta[name="twitter:image"]')) ?? "";
      const twitterTitle = (await read('meta[name="twitter:title"]')) ?? "";

      expect(url, path).toBe(`${canonicalOrigin}${path === "/" ? "" : path}`);
      expect(image, path).toMatch(/^https:\/\//);
      expect(twitterImage, path).toBe(image);
      expect(twitterTitle, path).toBe(title);
      expect(imageAlt.length, path).toBeGreaterThan(10);

      if (path === "/") {
        expect(image).toBe(defaultOgImage);
      } else {
        expect(image, `${path} must not inherit the homepage screenshot`).not.toBe(defaultOgImage);
      }
      if (kind === "generated card") {
        expect(image, path).toMatch(/^https:\/\/akomapa\.org\/og\/.+\.png$/);
        // The card is served by this deployment; fetch it through the local origin.
        const local = image.replace(canonicalOrigin, "");
        const card = await request.get(local);
        expect(card.status(), `${path} card ${local}`).toBe(200);
        expect(card.headers()["content-type"], path).toBe("image/png");
      }

      seen.set(path, { title, description, image, url });
    }

    // Every route is distinct on every axis that share surfaces display.
    for (const field of ["title", "description", "image", "url"] as const) {
      const values = [...seen.values()].map((v) => v[field]);
      expect(new Set(values).size, `duplicate og:${field}`).toBe(values.length);
    }
  });

  test("serves generated cards only for data-backed keys", async ({ request }) => {
    const known = await request.get("/og/static/about.png");
    expect(known.status()).toBe(200);
    expect(known.headers()["content-type"]).toBe("image/png");

    for (const path of ["/og/static/evil.png", "/og/blog/phishing.png", "/og/static/about"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });

  test("presents noindex routes honestly instead of as the homepage", async ({ page }) => {
    await page.goto("/sentry-example-page", { waitUntil: "domcontentloaded" });
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Sentry Diagnostics | Akomapa Health",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${canonicalOrigin}/og/default.png`,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });
});
