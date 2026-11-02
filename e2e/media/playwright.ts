import {
  test as base,
  type Browser,
  type BrowserContext,
  type BrowserContextOptions,
} from "@playwright/test";
import {
  assertNoImageKitLeaks,
  installImageKitFixtures,
} from "./imagekit-isolation";
import {
  rejectedConsentStorageState,
  type CookieConsentSeed,
} from "./cookie-consent";

type IsolatedFixtures = {
  context: BrowserContext;
  /** Cookie banner state every context in the test starts with. */
  cookieConsent: CookieConsentSeed;
};

type IsolatedWorkerFixtures = {
  browser: Browser;
};

/**
 * Routine E2E entry point. Every context, including browser.newContext(),
 * receives ImageKit fixtures before the test body runs, and starts with the
 * cookie banner answered. Use `test.use({ cookieConsent: "unset" })` to see
 * the first-visit banner.
 */
export const test = base.extend<IsolatedFixtures, IsolatedWorkerFixtures>({
  browser: [
    async ({ browser }, expose) => {
      const isolatedBrowser: Browser = new Proxy(browser, {
        get(target, property, receiver) {
          if (property === "newContext") {
            return async (options?: BrowserContextOptions) => {
              const context = await target.newContext(options);
              await installImageKitFixtures(context);
              return context;
            };
          }

          const value: unknown = Reflect.get(target, property, receiver);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });

      await expose(isolatedBrowser);
    },
    { scope: "worker" },
  ],
  cookieConsent: ["rejected", { option: true }],
  // Playwright applies storageState to every context the test creates.
  storageState: async ({ storageState, cookieConsent }, expose) => {
    await expose(
      storageState ??
        (cookieConsent === "rejected" ? rejectedConsentStorageState() : undefined),
    );
  },
  context: async ({ context }, expose) => {
    await installImageKitFixtures(context);
    await expose(context);
    assertNoImageKitLeaks(context);
  },
});

export { expect } from "@playwright/test";
