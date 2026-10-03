import { type Page } from "@playwright/test";
import { expect, test } from "./media/playwright";
import {
  MEDIA_FIXTURE_HEADER,
  type ImageKitLeak,
} from "./media/imagekit-isolation";
import { isImageKitRequestUrl } from "./media/imagekit-url.mjs";

const probeImageUrl =
  "https://ik.imagekit.io/akomapa/highlights/probe.jpg?tr=f-auto,q-75,w-64";

async function decodedFixtureWidth(page: Page) {
  return page.evaluate(async (src) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    return image.naturalWidth;
  }, probeImageUrl);
}

test("fulfills ImageKit images from the local fixture", async ({ page }) => {
  const leaks: ImageKitLeak[] = [];
  page.on("response", (response) => {
    if (!isImageKitRequestUrl(response.url())) return;
    if (response.headers()[MEDIA_FIXTURE_HEADER] === "1") return;
    leaks.push({ url: response.url(), status: response.status() });
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await decodedFixtureWidth(page)).toBe(1);
  expect(leaks).toEqual([]);
});

test("isolates contexts opened with browser.newContext()", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const leaks: ImageKitLeak[] = [];
  page.on("response", (response) => {
    if (!isImageKitRequestUrl(response.url())) return;
    if (response.headers()[MEDIA_FIXTURE_HEADER] === "1") return;
    leaks.push({ url: response.url(), status: response.status() });
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await decodedFixtureWidth(page)).toBe(1);
  expect(leaks).toEqual([]);
  await context.close();
});

test("serves a decodable video fixture", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const size = await page.evaluate(async () => {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.src =
      "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960";
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error(String(video.error?.code ?? "media")));
    });
    return { width: video.videoWidth, height: video.videoHeight };
  });
  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
});

test("a page route can still abort the immersion video", async ({ page }) => {
  const failed: string[] = [];
  const fixtureResponses: string[] = [];
  page.on("requestfailed", (request) => {
    if (request.url().includes("immersion-hero.mp4")) failed.push(request.url());
  });
  page.on("response", (response) => {
    if (!response.url().includes("immersion-hero.mp4")) return;
    if (response.headers()[MEDIA_FIXTURE_HEADER] === "1") {
      fixtureResponses.push(response.url());
    }
  });

  await page.route("**/immersion-hero.mp4**", (route) => route.abort("failed"));
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/global-health-immersion-program", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("[data-immersion-hero-hydrated]")).toHaveAttribute(
    "data-immersion-hero-hydrated",
    "true",
  );
  await expect.poll(() => failed.length).toBeGreaterThan(0);
  expect(fixtureResponses).toEqual([]);
  await expect(page.locator("[data-immersion-hero-video]")).toHaveCount(1);
});
