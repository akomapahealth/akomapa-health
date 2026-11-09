// @vitest-environment node
import { describe, expect, it } from "vitest";
import { listSocialCardKeys } from "@/lib/social-card";
import { GET, generateStaticParams } from "@/app/og/[...key]/route";

function request(key: string[]) {
  return GET(new Request("https://akomapa.org/og/test"), {
    params: Promise.resolve({ key }),
  });
}

function pngSize(buffer: Buffer) {
  // IHDR: width at bytes 16-19, height at 20-23.
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

describe("/og/[...key].png", () => {
  it("prerenders exactly the keys the data produces, each with a .png suffix", () => {
    const params = generateStaticParams();
    const listed = listSocialCardKeys();
    expect(params).toHaveLength(listed.length);
    for (const { key } of params) {
      expect(key[key.length - 1]).toMatch(/\.png$/);
    }
  });

  it("renders a 1200x630 PNG for a known key", async () => {
    const response = await request(["static", "about.png"]);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toContain("immutable");

    const buffer = Buffer.from(await response.arrayBuffer());
    expect(buffer.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(pngSize(buffer)).toEqual({ width: 1200, height: 630 });
  });

  it("renders detail and default cards", async () => {
    for (const key of [
      ["default.png"],
      ["blog", `${listSocialCardKeys().find(([k]) => k === "blog")![1]}.png`],
      ["news", "nkwapa-emr-launch.png"],
      ["research", "stakeholder-support-student-run-free-clinics-ghana.png"],
    ]) {
      const response = await request(key);
      expect(response.status, key.join("/")).toBe(200);
      expect(response.headers.get("content-type"), key.join("/")).toBe("image/png");
    }
  });

  it("refuses keys that are not backed by data", async () => {
    for (const key of [
      ["static", "evil.png"],
      ["blog", "phishing.png"],
      ["static", "about"],
      ["static", "about.jpg"],
      ["about.png"],
      ["static", "about", "deeper.png"],
    ]) {
      await expect(request(key), key.join("/")).rejects.toThrow();
    }
  });
});
