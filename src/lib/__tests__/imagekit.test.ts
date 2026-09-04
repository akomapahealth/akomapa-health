import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getImageKitUrl,
  imageKitLoader,
  isImageKitSrc,
} from "@/lib/imagekit";

describe("isImageKitSrc", () => {
  it("treats relative paths as ImageKit CDN paths", () => {
    expect(isImageKitSrc("/highlights/photo.jpg")).toBe(true);
    expect(isImageKitSrc("gallery/image.webp")).toBe(true);
  });

  it("detects absolute ImageKit hosts", () => {
    expect(
      isImageKitSrc("https://ik.imagekit.io/akomapa/highlights/photo.jpg"),
    ).toBe(true);
    expect(
      isImageKitSrc("https://cdn.imagekit.io/akomapa/photo.jpg"),
    ).toBe(true);
  });

  it("rejects non-ImageKit absolute URLs", () => {
    expect(
      isImageKitSrc("https://img.youtube.com/vi/abc/maxresdefault.jpg"),
    ).toBe(false);
    expect(isImageKitSrc("https://example.com/photo.jpg")).toBe(false);
  });
});

describe("getImageKitUrl / imageKitLoader", () => {
  const endpoint = "https://ik.imagekit.io/akomapa";

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds relative ImageKit URLs with format, width, and quality", () => {
    vi.stubEnv("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT", endpoint);

    expect(
      getImageKitUrl("/highlights/photo.jpg", { width: 800, quality: 75 }),
    ).toBe(`${endpoint}/highlights/photo.jpg?tr=q-75,w-800`);

    expect(
      imageKitLoader({ src: "/highlights/photo.jpg", width: 1200, quality: 85 }),
    ).toBe(`${endpoint}/highlights/photo.jpg?tr=f-auto,q-85,w-1200`);
  });

  it.each(["/images/team/portrait.heif", "/images/team/portrait.HEIC"])(
    "transcodes %s to a browser-compatible output format",
    (src) => {
      vi.stubEnv("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT", endpoint);

      const url = new URL(imageKitLoader({ src, width: 640, quality: 75 }));
      expect(url.pathname).toBe(`/akomapa${src}`);
      expect(url.searchParams.get("tr")).toBe("f-auto,q-75,w-640");
    },
  );

  it("applies loader transforms to absolute ImageKit URLs", () => {
    const src = "https://ik.imagekit.io/akomapa/hero.jpg?tr=q-50,w-100";

    expect(imageKitLoader({ src, width: 3840, quality: 75 })).toBe(
      "https://ik.imagekit.io/akomapa/hero.jpg?tr=f-auto%2Cq-75%2Cw-3840",
    );
  });

  it("passes non-ImageKit absolute URLs through unchanged", () => {
    const src = "https://img.youtube.com/vi/abc/maxresdefault.jpg";
    expect(getImageKitUrl(src, { width: 640, quality: 75 })).toBe(src);
  });
});
