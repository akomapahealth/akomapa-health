import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/dev-imagekit/route";
import { NextRequest } from "next/server";
import { MEDIA_FIXTURE_HEADER } from "@/lib/imagekit-local-fixtures.mjs";

function requestFor(src: string | null, range?: string) {
  const url = new URL("http://127.0.0.1:3000/api/dev-imagekit");
  if (src) url.searchParams.set("src", src);
  const headers = new Headers();
  if (range) headers.set("range", range);
  return new NextRequest(url, { headers });
}

describe("dev ImageKit fixture route", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is unavailable in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const response = await GET(
      requestFor("https://ik.imagekit.io/akomapa/highlights/photo.jpg"),
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects non-ImageKit src values without fetching them", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const response = await GET(
      requestFor("https://example.com/secret.jpg"),
    );
    expect(response.status).toBe(404);
  });

  it("serves a PNG fixture for ImageKit images", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const response = await GET(
      requestFor(
        "https://ik.imagekit.io/akomapa/highlights/photo.jpg?tr=f-auto,q-75,w-640",
      ),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get(MEDIA_FIXTURE_HEADER)).toBe("1");
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(0);
  });

  it("serves a ranged MP4 fixture for the immersion video", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const response = await GET(
      requestFor(
        "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960",
        "bytes=0-10",
      ),
    );
    expect(response.status).toBe(206);
    expect(response.headers.get("content-type")).toBe("video/mp4");
    expect(response.headers.get("content-range")).toMatch(/^bytes 0-10\//);
    expect((await response.arrayBuffer()).byteLength).toBe(11);
  });
});
