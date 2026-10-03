import { mkdir, writeFile } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";
import { fulfillImageKitFixture } from "./media/imagekit-isolation";
import {
  isImageKitHostname,
  isRealMediaCdnRequest,
} from "./media/imagekit-url.mjs";

type CdnDelivery = {
  url: string;
  status: number;
  contentType: string | null;
  contentLength: number | null;
  contentRange: string | null;
};

const deliveries: CdnDelivery[] = [];

test.describe.configure({ mode: "serial" });

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

async function allowOnlyRealMedia(page: Page) {
  page.on("response", (response) => {
    let hostname: string;
    try {
      hostname = new URL(response.url()).hostname;
    } catch {
      return;
    }
    if (!isImageKitHostname(hostname)) return;
    if (response.headers()["x-akomapa-media-fixture"] === "1") return;

    const contentLength = response.headers()["content-length"];
    const parsedLength = contentLength ? Number(contentLength) : Number.NaN;
    deliveries.push({
      url: response.url(),
      status: response.status(),
      contentType: response.headers()["content-type"] ?? null,
      contentLength: Number.isFinite(parsedLength) ? parsedLength : null,
      contentRange: response.headers()["content-range"] ?? null,
    });
  });

  await page.route(
    (url) => isImageKitHostname(url.hostname),
    async (route) => {
      if (isRealMediaCdnRequest(route.request().url())) {
        await route.continue();
        return;
      }
      await fulfillImageKitFixture(route);
    },
  );
}

test.afterAll(async () => {
  await mkdir("test-results", { recursive: true });
  await writeFile(
    "test-results/real-media-bandwidth.json",
    `${JSON.stringify({ deliveries }, null, 2)}\n`,
  );
});

test("decodes representative HEIF and HEIC portraits from ImageKit", async ({
  page,
}) => {
  await preparePage(page);
  await allowOnlyRealMedia(page);
  await page.goto("/about/team", { waitUntil: "domcontentloaded" });

  const jadePortrait = page.locator(
    '[data-team-node-portrait="executive-jade-kissi"] img',
  );
  const jadePortraitUrl = new URL((await jadePortrait.getAttribute("src"))!);
  expect(jadePortraitUrl.pathname).toMatch(/\/images\/team\/jade_kissi\.heif$/);
  expect(jadePortraitUrl.searchParams.get("tr")).toMatch(
    /(?:^|,)f-auto(?:,|$)/,
  );
  await expect
    .poll(() =>
      jadePortrait.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);

  const darrenCard = page.locator('[data-team-member="Darren Markwei"]');
  await darrenCard.scrollIntoViewIfNeeded();
  const darrenPortrait = darrenCard.locator("[data-team-portrait] img");
  const darrenPortraitUrl = new URL(
    (await darrenPortrait.getAttribute("src"))!,
  );
  expect(darrenPortraitUrl.pathname).toMatch(
    /\/images\/team\/darren_markwei\.heic$/i,
  );
  expect(darrenPortraitUrl.searchParams.get("tr")).toMatch(
    /(?:^|,)f-auto(?:,|$)/,
  );
  await expect
    .poll(() =>
      darrenPortrait.evaluate(
        (image: HTMLImageElement) => image.naturalWidth,
      ),
    )
    .toBeGreaterThan(0);

  expect(
    deliveries.some((delivery) => /jade_kissi\.heif/i.test(delivery.url)),
  ).toBe(true);
  expect(
    deliveries.some((delivery) => /darren_markwei\.heic/i.test(delivery.url)),
  ).toBe(true);
  expect(
    deliveries.every(
      (delivery) =>
        /jade_kissi\.heif/i.test(delivery.url) ||
        /darren_markwei\.heic/i.test(delivery.url),
    ),
  ).toBe(true);
});

test("decodes one immersion video variant and does not fetch the other", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await preparePage(page);
  await allowOnlyRealMedia(page);
  await page.goto("/global-health-immersion-program", {
    waitUntil: "domcontentloaded",
  });

  const video = page.locator("[data-immersion-hero-video]");
  await expect(
    page.locator("[data-immersion-hero-hydrated]"),
  ).toHaveAttribute("data-immersion-hero-hydrated", "true");
  const sourceUrls = await video.locator("source").evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("src")),
  );
  expect(sourceUrls.some((src) => src?.includes("w-960"))).toBe(true);
  expect(sourceUrls.some((src) => src?.includes("w-1920"))).toBe(true);

  await expect
    .poll(() =>
      video.evaluate((element) => {
        const media = element as HTMLVideoElement;
        return media.videoWidth > 0 && media.videoHeight > 0;
      }),
    )
    .toBe(true);

  await video.evaluate((element) => {
    const media = element as HTMLVideoElement;
    media.pause();
    media.removeAttribute("src");
    for (const source of media.querySelectorAll("source")) source.remove();
    media.load();
  });
  await page.close();

  const videoDeliveries = deliveries.filter((delivery) =>
    delivery.url.includes("immersion-hero.mp4"),
  );
  expect(videoDeliveries.length).toBeGreaterThan(0);
  expect(videoDeliveries.every((delivery) => delivery.url.includes("w-960"))).toBe(
    true,
  );
  expect(deliveries.some((delivery) => delivery.url.includes("w-1920"))).toBe(
    false,
  );
  for (const delivery of videoDeliveries) {
    expect([200, 206]).toContain(delivery.status);
    if (delivery.contentLength !== null) {
      expect(delivery.contentLength).toBeGreaterThan(1024);
    }
  }
});
