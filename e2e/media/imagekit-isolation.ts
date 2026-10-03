import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import type { BrowserContext, Route } from "@playwright/test";
import {
  isImageKitHostname,
  isImageKitRequestUrl,
} from "./imagekit-url.mjs";
import {
  localMediaFixture,
  MEDIA_FIXTURE_HEADER,
} from "../../src/lib/imagekit-local-fixtures.mjs";

const accountLogPath = path.join("test-results", "imagekit-account.log");

function recordImageKitOutcome(kind: "fixture" | "leak", url: string): void {
  try {
    mkdirSync(path.dirname(accountLogPath), { recursive: true });
    appendFileSync(accountLogPath, `${kind}\t${url}\n`);
  } catch {
    // Accounting is diagnostic. A write failure must not hide the test result.
  }
}

export { MEDIA_FIXTURE_HEADER };

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

export async function fulfillImageKitFixture(route: Route): Promise<void> {
  const requestUrl = route.request().url();
  const fixture = localMediaFixture(
    requestUrl,
    route.request().headers().range,
  );

  recordImageKitOutcome("fixture", requestUrl);

  await route.fulfill({
    status: fixture.status,
    contentType: fixture.contentType,
    headers: {
      [MEDIA_FIXTURE_HEADER]: "1",
      "accept-ranges": fixture.acceptRanges,
      "cache-control": "no-store",
      ...(fixture.contentRange ? { "content-range": fixture.contentRange } : {}),
    },
    body: fixture.body,
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
    recordImageKitOutcome("leak", response.url());
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
