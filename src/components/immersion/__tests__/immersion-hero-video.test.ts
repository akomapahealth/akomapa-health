import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveImmersionHeroVideoSrcs } from "../immersion-hero-video";

describe("resolveImmersionHeroVideoSrcs", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("emits CDN encodes when fixtures are disabled", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES", "0");
    vi.stubEnv(
      "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT",
      "https://ik.imagekit.io/akomapa",
    );

    expect(resolveImmersionHeroVideoSrcs("/immersion-hero.mp4")).toEqual({
      mobileVideoSrc:
        "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960",
      desktopVideoSrc:
        "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-1280",
    });
  });
});
