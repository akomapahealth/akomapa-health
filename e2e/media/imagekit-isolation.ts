import type { BrowserContext, Route } from "@playwright/test";
import {
  isImageKitHostname,
  isImageKitRequestUrl,
  isVideoRequestUrl,
} from "./imagekit-url.mjs";

export const MEDIA_FIXTURE_HEADER = "x-akomapa-media-fixture";

/** 1×1 PNG. Layout boxes come from CSS, not intrinsic image size. */
const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

/** One black 16×16 H.264 frame, generated locally. Valid for Chromium decode. */
const TINY_MP4 = Buffer.from(
  "AAAAHGZ0eXBtcDQyAAAAAWlzb21tcDQxbXA0MgAAAAFtZGF0AAAAAAAAAIUAAAA7BgUyR1ZK3FxMQz+U78URPNFDqAEAAAMAAQMAAAMAAQIAAeYACwAAAwAAAwAAAwA8DAOJHQEN/////4AAAAAyJbggH94I5Uz/gswem1JEAFF721iPegoZHua5g6fVtrKB82GsqGNvqOenAAA2gBXDPRgAAAKnbW9vdgAAAGxtdmhkAAAAAObmSAzm5kgMAAACWAAAABQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAjN0cmFrAAAAXHRraGQAAAAB5uZIDObmSAwAAAABAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAUAAAAAAABAAAAAAGrbWRpYQAAACBtZGhkAAAAAObmSAzm5kgMAAACWAAAAChVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAVJtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAESc3RibAAAAKFzdHNkAAAAAAAAAAEAAACRYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAACdhdmNDAWQAC//hAAwnZAALrFZQw3gWYKUBAAQo7jyw/fj4AAAAAApmaWVsAQAAAAAKY2hybQAAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAAoAAAADXNkdHAAAAAAIAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAB1AAAAAQAAABRzdGNvAAAAAAAAAAEAAAAs",
  "base64",
);

export type ImageKitLeak = {
  url: string;
  status: number;
};

const installed = new WeakSet<BrowserContext>();
const leaksByContext = new WeakMap<BrowserContext, ImageKitLeak[]>();

export function imageKitLeaks(context: BrowserContext): readonly ImageKitLeak[] {
  return leaksByContext.get(context) ?? [];
}

export function assertNoImageKitLeaks(context: BrowserContext): void {
  const leaks = imageKitLeaks(context);
  if (leaks.length === 0) return;

  const sample = leaks
    .slice(0, 5)
    .map((leak) => `${leak.status} ${leak.url}`)
    .join("\n");
  const noun = leaks.length === 1 ? "response" : "responses";
  throw new Error(
    `Production ImageKit media was delivered outside the real-media check (${leaks.length} ${noun}).\n${sample}`,
  );
}

function bytesForRange(
  body: Buffer,
  rangeHeader: string | undefined,
): { status: number; body: Buffer; contentRange?: string } {
  if (!rangeHeader) return { status: 200, body };

  const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader);
  if (!match) return { status: 200, body };

  const start = Number(match[1]);
  const requestedEnd = match[2] ? Number(match[2]) : body.length - 1;
  const end = Math.min(requestedEnd, body.length - 1);
  if (!Number.isInteger(start) || start < 0 || start > end) {
    return { status: 200, body };
  }

  return {
    status: 206,
    body: Buffer.from(body.subarray(start, end + 1)),
    contentRange: `bytes ${start}-${end}/${body.length}`,
  };
}

export async function fulfillImageKitFixture(route: Route): Promise<void> {
  const requestUrl = route.request().url();
  const video = isVideoRequestUrl(requestUrl);
  const payload = video ? TINY_MP4 : TINY_PNG;
  const ranged = video
    ? bytesForRange(payload, route.request().headers().range)
    : { status: 200, body: payload };

  await route.fulfill({
    status: ranged.status,
    contentType: video ? "video/mp4" : "image/png",
    headers: {
      [MEDIA_FIXTURE_HEADER]: "1",
      "accept-ranges": video ? "bytes" : "none",
      "cache-control": "no-store",
      ...(ranged.contentRange ? { "content-range": ranged.contentRange } : {}),
    },
    body: ranged.body,
  });
}

/**
 * Intercept ImageKit before navigation and fulfill with local bytes.
 * Safe to call more than once on the same context.
 * A later page.route still wins, so tests can abort a video on purpose.
 */
export async function installImageKitFixtures(
  context: BrowserContext,
): Promise<void> {
  if (installed.has(context)) return;
  installed.add(context);

  const leaks: ImageKitLeak[] = [];
  leaksByContext.set(context, leaks);

  context.on("response", (response) => {
    if (!isImageKitRequestUrl(response.url())) return;
    if (response.headers()[MEDIA_FIXTURE_HEADER] === "1") return;
    leaks.push({ url: response.url(), status: response.status() });
  });

  const originalClose = context.close.bind(context);
  context.close = async (options) => {
    assertNoImageKitLeaks(context);
    await originalClose(options);
  };

  await context.route(
    (url) => isImageKitHostname(url.hostname),
    async (route) => {
      await fulfillImageKitFixture(route);
    },
  );
}
