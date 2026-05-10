import { describe, expect, it } from "vitest";
import { getAnnouncementPosterSrc, parseVideoUrl } from "@/lib/video-utils";

describe("parseVideoUrl", () => {
  it("parses youtube.com/watch?v= URLs", () => {
    const result = parseVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(result?.provider).toBe("youtube");
    expect(result?.embedUrl).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
    );
    expect(result?.thumbnailUrl).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    );
  });

  it("parses youtu.be short links", () => {
    const result = parseVideoUrl("https://youtu.be/zg8LbyzqYt0");
    expect(result?.provider).toBe("youtube");
    expect(result?.embedUrl).toContain("zg8LbyzqYt0");
  });

  it("parses youtube embed URLs", () => {
    const result = parseVideoUrl("https://www.youtube.com/embed/abc12345678");
    expect(result?.provider).toBe("youtube");
  });

  it("parses vimeo URLs", () => {
    const result = parseVideoUrl("https://vimeo.com/123456789");
    expect(result?.provider).toBe("vimeo");
    expect(result?.embedUrl).toBe(
      "https://player.vimeo.com/video/123456789?autoplay=1"
    );
  });

  it("returns null for unrecognized URLs", () => {
    expect(parseVideoUrl("https://example.com/video.mp4")).toBeNull();
    expect(parseVideoUrl("not-a-url")).toBeNull();
  });
});

describe("getAnnouncementPosterSrc", () => {
  it("prefers an explicit thumbnail", () => {
    const src = getAnnouncementPosterSrc({
      thumbnail: "/custom-poster.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: "/fallback.jpg",
    });
    expect(src).toBe("/custom-poster.jpg");
  });

  it("falls back to YouTube preview when only videoUrl is set", () => {
    const src = getAnnouncementPosterSrc({
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: "/fallback.jpg",
    });
    expect(src).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    );
  });

  it("falls back to image when no thumbnail or videoUrl", () => {
    const src = getAnnouncementPosterSrc({ image: "/img.jpg" });
    expect(src).toBe("/img.jpg");
  });

  it("returns undefined when all sources are missing", () => {
    expect(getAnnouncementPosterSrc({})).toBeUndefined();
  });
});
