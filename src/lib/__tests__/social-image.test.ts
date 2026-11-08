import { afterEach, describe, expect, it, vi } from "vitest";
import { blogPosts } from "@/data/blog";
import { news } from "@/data/news";
import { researchPapers } from "@/data/research-papers";
import {
  IMAGEKIT_PUBLIC_ENDPOINT,
  isLocalPublicAsset,
  resolveSocialImage,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/social-image";

const CDN_CROP = "tr=w-1200%2Ch-630%2Cfo-auto%2Cf-jpg%2Cq-80";

describe("resolveSocialImage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("serves committed public/ files from the production origin with their real size", () => {
    expect(
      resolveSocialImage({
        src: "/static/nkwapa/nkwapa-dashboard.webp",
        alt: "Nkwapa dashboard",
        width: 1600,
        height: 900,
      }),
    ).toEqual({
      url: "https://akomapa.org/static/nkwapa/nkwapa-dashboard.webp",
      width: 1600,
      height: 900,
      alt: "Nkwapa dashboard",
    });

    expect(
      resolveSocialImage({ src: "/images/og-homepage.jpg", alt: "Homepage" }).url,
    ).toBe("https://akomapa.org/images/og-homepage.jpg");
  });

  it("sends ImageKit paths to the CDN with a 1200x630 social crop", () => {
    const image = resolveSocialImage({
      src: "/highlights/Akomapa-20.jpg",
      alt: "Students",
    });

    expect(image).toEqual({
      url: `${IMAGEKIT_PUBLIC_ENDPOINT}/highlights/Akomapa-20.jpg?${CDN_CROP}`,
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      alt: "Students",
    });
  });

  it("treats /images/ paths that are not in public/ as ImageKit paths", () => {
    expect(isLocalPublicAsset("/images/og-homepage.jpg")).toBe(true);
    expect(isLocalPublicAsset("/images/akomapa-pitch-1.JPG")).toBe(false);

    expect(
      resolveSocialImage({ src: "/images/akomapa-pitch-1.JPG", alt: "Pitch" }).url,
    ).toBe(`${IMAGEKIT_PUBLIC_ENDPOINT}/images/akomapa-pitch-1.JPG?${CDN_CROP}`);
  });

  it("replaces existing transformations on absolute ImageKit URLs", () => {
    expect(
      resolveSocialImage({
        src: "https://ik.imagekit.io/akomapa/gallery/pic.jpg?tr=w-400",
        alt: "Gallery",
      }).url,
    ).toBe(`${IMAGEKIT_PUBLIC_ENDPOINT}/gallery/pic.jpg?${CDN_CROP}`);
  });

  it("passes other absolute URLs through unchanged", () => {
    const youtube = "https://img.youtube.com/vi/abc123/maxresdefault.jpg";
    expect(resolveSocialImage({ src: youtube, alt: "Video", width: 1280, height: 720 })).toEqual({
      url: youtube,
      width: 1280,
      height: 720,
      alt: "Video",
    });
  });

  it("never emits the dev/preview fixture route that crawlers cannot fetch", () => {
    vi.stubEnv("NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES", "1");
    vi.stubEnv("NODE_ENV", "development");

    const { url } = resolveSocialImage({ src: "/highlights/Akomapa-20.jpg", alt: "x" });
    expect(url).not.toContain("/api/dev-imagekit");
    expect(url.startsWith("https://ik.imagekit.io/")).toBe(true);
  });

  it("falls back to the public endpoint when the env var is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT", "");
    expect(
      resolveSocialImage({ src: "/highlights/Akomapa-20.jpg", alt: "x" }).url,
    ).toBe(`${IMAGEKIT_PUBLIC_ENDPOINT}/highlights/Akomapa-20.jpg?${CDN_CROP}`);
  });
});

describe("content share images", () => {
  const contentImages = [
    ...blogPosts.flatMap((post) => (post.image ? [{ kind: "blog", id: post.slug, src: post.image }] : [])),
    ...news.map((item) => ({ kind: "news", id: item.slug, src: item.image })),
    ...researchPapers.map((paper) => ({ kind: "research", id: paper.slug, src: paper.image })),
  ];

  it("resolve every blog, news, and research cover to an absolute, non-404 origin", () => {
    for (const { kind, id, src } of contentImages) {
      const { url } = resolveSocialImage({ src, alt: id });
      expect(url, `${kind}/${id}`).toMatch(/^https:\/\//);
      // The site origin only serves files that exist in public/.
      if (url.startsWith("https://akomapa.org/")) {
        expect(isLocalPublicAsset(src), `${kind}/${id} resolved to the site origin but is not in public/`).toBe(true);
      }
    }
  });
});
