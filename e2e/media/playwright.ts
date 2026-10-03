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

type IsolatedFixtures = {
  context: BrowserContext;
};

type IsolatedWorkerFixtures = {
  browser: Browser;
};

/**
 * Routine E2E entry point. Every context, including browser.newContext(),
 * receives ImageKit fixtures before the test body runs.
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
  context: async ({ context }, expose) => {
    await installImageKitFixtures(context);
    await expose(context);
    assertNoImageKitLeaks(context);
  },
});

export { expect } from "@playwright/test";
