import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  imageKitFixturePublicFlag,
  shouldUseImageKitFixtures,
} from "@/lib/imagekit-fixture-policy.mjs";

describe("imageKit fixture policy", () => {
  it("publishes a client flag only for Vercel preview builds", () => {
    expect(imageKitFixturePublicFlag({ VERCEL_ENV: "preview" })).toBe("1");
    expect(imageKitFixturePublicFlag({ VERCEL_ENV: "production" })).toBe("0");
    expect(imageKitFixturePublicFlag({ VERCEL_ENV: "development" })).toBe("0");
    expect(imageKitFixturePublicFlag({})).toBe("0");
  });

  it("uses fixtures for local development and always for preview", () => {
    expect(
      shouldUseImageKitFixtures({ NODE_ENV: "development" }),
    ).toBe(true);
    expect(
      shouldUseImageKitFixtures({
        NODE_ENV: "development",
        NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES: "0",
      }),
    ).toBe(false);
    expect(
      shouldUseImageKitFixtures({
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES: "0",
      }),
    ).toBe(true);
    expect(
      shouldUseImageKitFixtures({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES: "1",
      }),
    ).toBe(true);
    expect(
      shouldUseImageKitFixtures({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES: "0",
      }),
    ).toBe(false);
  });

  it("bakes the preview flag into next.config env", () => {
    const source = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");
    expect(source).toContain(
      "NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES: imageKitFixturePublicFlag()",
    );
  });
});
