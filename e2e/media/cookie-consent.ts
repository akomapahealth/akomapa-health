import type { BrowserContextOptions, Page } from "@playwright/test";
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
} from "../../src/lib/consent";

type StorageState = Exclude<BrowserContextOptions["storageState"], string | undefined>;

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://127.0.0.1:3000";

function rejectedConsentValue() {
  return JSON.stringify({
    version: CONSENT_POLICY_VERSION,
    analytics: false,
    decidedAt: Date.now(),
  });
}

/**
 * "rejected": routine specs start with the cookie banner answered so it never
 * covers the UI they assert on. "unset": consent specs see the first visit.
 */
export type CookieConsentSeed = "rejected" | "unset";

export function rejectedConsentStorageState(): StorageState {
  return {
    cookies: [],
    origins: [
      {
        origin: new URL(baseURL).origin,
        localStorage: [{ name: CONSENT_STORAGE_KEY, value: rejectedConsentValue() }],
      },
    ],
  };
}

/** For specs that use @playwright/test directly instead of the shared fixture. */
export async function seedRejectedConsent(page: Page) {
  await page.addInitScript(
    ({ key, value }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, value);
    },
    { key: CONSENT_STORAGE_KEY, value: rejectedConsentValue() },
  );
}
