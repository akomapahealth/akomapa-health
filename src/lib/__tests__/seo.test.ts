import { describe, expect, it } from "vitest";
import createNextConfig from "../../../next.config";
import sitemap from "@/app/sitemap";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_URL,
  absoluteUrl,
  buildArticleMetadata,
  buildPageMetadata,
  canonicalSeoRoutes,
  noindexRoutes,
} from "@/lib/seo";

function textLength(value: string) {
  return [...value].length;
}

describe("SEO metadata contract", () => {
  it("keeps third-party browser warnings out of the development terminal", async () => {
    const nextConfig = await createNextConfig();

    expect(nextConfig.logging).toMatchObject({
      browserToTerminal: "error",
    });
  });

  it("defines unique static route titles and descriptions in the accepted length range", () => {
    const routes = [...canonicalSeoRoutes, ...noindexRoutes];
    const titles = new Set(routes.map((route) => route.title));
    const descriptions = new Set(routes.map((route) => route.description));

    expect(titles.size).toBe(routes.length);
    expect(descriptions.size).toBe(routes.length);

    for (const route of routes) {
      expect(textLength(route.title), route.path).toBeLessThanOrEqual(60);
      expect(textLength(route.description), route.path).toBeGreaterThanOrEqual(
        120,
      );
      expect(textLength(route.description), route.path).toBeLessThanOrEqual(160);
    }
  });

  it("uses the akomapa.org apex as the canonical origin", () => {
    expect(SITE_URL).toBe("https://akomapa.org");
    expect(absoluteUrl("/")).toBe("https://akomapa.org");
    expect(absoluteUrl("/about")).toBe("https://akomapa.org/about");
  });

  it("builds complete Open Graph, Twitter, and canonical metadata for public routes", () => {
    for (const route of canonicalSeoRoutes) {
      const metadata = buildPageMetadata(route.path);

      expect(metadata.title).toBe(route.title);
      expect(metadata.description).toBe(route.description);
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(route.path));
      expect(metadata.openGraph?.title).toBe(`${route.title} | Akomapa Health`);
      expect(metadata.openGraph?.description).toBe(route.description);
      expect(metadata.openGraph?.url).toBe(absoluteUrl(route.path));
      expect(metadata.openGraph?.images).toEqual([
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ]);
      const twitter = metadata.twitter as {
        card?: string;
        title?: string;
        description?: string;
        images?: Array<{ url?: string; alt?: string }>;
      };
      expect(twitter.card).toBe("summary_large_image");
      expect(twitter.title).toBe(`${route.title} | Akomapa Health`);
      expect(twitter.description).toBe(route.description);
      expect(twitter.images).toEqual([
        {
          url: DEFAULT_OG_IMAGE,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ]);
    }
  });

  it("keeps article-specific images and falls back to the homepage screenshot", () => {
    const withCover = buildArticleMetadata({
      title: "Ethical leadership",
      description:
        "A student reflection on ethical leadership in community-centered global health practice.",
      path: "/blog/ethical-leadership",
      image: "/highlights/Akomapa-20.jpg",
    });
    const fallback = buildArticleMetadata({
      title: "Untitled briefing",
      description:
        "A briefing without a dedicated cover image should reuse the homepage social share screenshot.",
      path: "/news/untitled-briefing",
    });

    expect(withCover.openGraph?.images).toEqual([
      {
        url: "/highlights/Akomapa-20.jpg",
        width: 1200,
        height: 630,
        alt: "Ethical leadership",
      },
    ]);
    expect(fallback.openGraph?.images).toEqual([
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ]);
    expect(fallback.twitter).toMatchObject({
      images: [{ url: DEFAULT_OG_IMAGE, alt: DEFAULT_OG_IMAGE_ALT }],
    });
  });

  it("describes the Immersion program without implying open enrollment", () => {
    const route = canonicalSeoRoutes.find(
      (candidate) =>
        candidate.path === "/global-health-immersion-program",
    );

    expect(route).toBeDefined();
    expect(route?.title).toBe("Global Health Immersion Program");
    expect(route?.description).toContain("three-week learning experience");
    expect(route?.description).not.toMatch(
      /apply now|applications open|enroll now|join the next cohort/i,
    );
  });

  it("keeps sitemap canonical and excludes redirected routes", async () => {
    const urls = sitemap().map((entry) => entry.url);
    const nextConfig = await createNextConfig();
    const redirects = nextConfig.redirects ? await nextConfig.redirects() : [];

    for (const route of canonicalSeoRoutes) {
      expect(urls).toContain(absoluteUrl(route.path));
    }

    for (const redirect of redirects) {
      expect(urls).not.toContain(absoluteUrl(redirect.source));
    }

    expect(urls).not.toContain(absoluteUrl("/sentry-example-page"));
    for (const url of urls) {
      const parsed = new URL(url);
      expect(parsed.origin).toBe("https://akomapa.org");
      expect(parsed.hostname).not.toBe("www.akomapa.org");
      expect(parsed.hostname).not.toBe("www.akomapahealth.org");
      expect(parsed.hostname).not.toBe("akomapahealth.org");
    }
  });
});
