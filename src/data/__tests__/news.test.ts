import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NKWAPA_URL } from "@/config/links";
import { news } from "@/data/news";
import { isImageKitSrc, LOCAL_PUBLIC_ASSET_PREFIX } from "@/lib/imagekit";
import {
  getNewsItemById,
  getNewsOnlyItems,
  newsItemToAnnouncement,
} from "@/data/unified-news";

const NKWAPA_SLUG = "nkwapa-emr-launch";

describe("news collection", () => {
  it("keeps ids and slugs unique", () => {
    const ids = news.map(({ id }) => id);
    const slugs = news.map(({ slug }) => slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("points every story image at ImageKit or a committed public/static asset", () => {
    for (const story of news) {
      expect(story.image.startsWith("/")).toBe(true);
      if (story.image.startsWith(LOCAL_PUBLIC_ASSET_PREFIX)) {
        expect(isImageKitSrc(story.image)).toBe(false);
        expect(existsSync(join(process.cwd(), "public", story.image))).toBe(true);
      } else {
        expect(isImageKitSrc(story.image)).toBe(true);
      }
    }
  });

  it("dates every story with a valid ISO date", () => {
    for (const story of news) {
      expect(Number.isFinite(Date.parse(story.date))).toBe(true);
    }
  });
});

describe("Nkwapa launch story", () => {
  const story = news.find(({ id }) => id === "3")!;
  const item = getNewsItemById(NKWAPA_SLUG)!;

  it("keeps its id and resolves at the renamed slug", () => {
    expect(story.slug).toBe(NKWAPA_SLUG);
    expect(item).toBeDefined();
    expect(item.id).toBe(NKWAPA_SLUG);
    expect(getNewsItemById("nkwapa-emr-public-beta")).toBeUndefined();
  });

  it("describes the launch and real-world use without beta or staging language", () => {
    const copy = [story.title, story.excerpt, ...story.content, ...(story.tags ?? [])];

    expect(story.title).toMatch(/live/i);
    expect(story.excerpt).toMatch(/nkwapa\.app/);
    expect(story.excerpt).toMatch(/in use/i);
    expect(story.content.join(" ")).toMatch(/offline/i);

    for (const text of copy) {
      expect(text).not.toMatch(/beta/i);
      expect(text).not.toMatch(/staging/i);
    }
  });

  it("is dated to the launch and featured on the homepage", () => {
    expect(story.date).toBe("2026-10-14");
    expect(story.featured).toBe(true);
    expect(getNewsOnlyItems()[0].id).toBe(NKWAPA_SLUG);
  });

  it("links to the production app from the article body", () => {
    expect(NKWAPA_URL).toBe("https://nkwapa.app");
    expect(story.ctaText).toBe("Explore Nkwapa");
    expect(story.ctaLink).toBe(NKWAPA_URL);
    expect(story.isExternalCta).toBe(true);

    expect(item.ctaText).toBe("Explore Nkwapa");
    expect(item.ctaLink).toBe(NKWAPA_URL);
    expect(item.isExternalCta).toBe(true);
  });

  it("keeps the listing card pointed at the detail page, not the external CTA", () => {
    const card = newsItemToAnnouncement(item);
    expect(card.ctaLink).toBe(`/news/${NKWAPA_SLUG}`);
    expect(card.ctaText).toBe("Explore the update");
    expect(card.isExternal).toBe(false);
  });

  it("uses a current product visual with descriptive alt text", () => {
    expect(story.image).toBe("/static/nkwapa/nkwapa-dashboard.webp");
    expect(story.image).not.toBe("/static/nkwapa/nkwapa-launch.webp");
    expect(story.imageAlt).toMatch(/dashboard/i);
    expect(item.imageAlt).toBe(story.imageAlt);
  });
});
