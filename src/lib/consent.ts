import { z } from "zod";

/**
 * Versioned cookie-consent preference, stored in localStorage.
 *
 * Only one optional purpose exists today (analytics). Everything else the site
 * stores is strictly necessary and documented in `src/config/cookies.ts`.
 *
 * Bump CONSENT_POLICY_VERSION whenever the optional purposes or providers
 * materially change; every visitor is then asked again. Records also expire
 * after CONSENT_MAX_AGE_MS so a choice is refreshed at least once a year.
 */

export const CONSENT_STORAGE_KEY = "akomapa-cookie-consent";
export const CONSENT_POLICY_VERSION = "2026-11-01";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1_000;
export const CONSENT_CHANGE_EVENT = "akomapa:consent-change";

const consentRecordSchema = z
  .object({
    version: z.string().min(1),
    analytics: z.boolean(),
    decidedAt: z.number().int().nonnegative(),
  })
  .strict();

export type ConsentRecord = z.infer<typeof consentRecordSchema>;

export type ConsentPreferences = Pick<ConsentRecord, "analytics">;

export function parseConsentRecord(
  raw: string | null,
  now = Date.now(),
): ConsentRecord | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = consentRecordSchema.safeParse(value);
  if (!parsed.success) return null;

  const record = parsed.data;
  if (record.version !== CONSENT_POLICY_VERSION) return null;
  if (record.decidedAt > now || now - record.decidedAt > CONSENT_MAX_AGE_MS) {
    return null;
  }

  return record;
}

export function readConsent(now = Date.now()): ConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    return parseConsentRecord(localStorage.getItem(CONSENT_STORAGE_KEY), now);
  } catch {
    // localStorage unavailable
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

/**
 * Persists a choice and notifies same-tab subscribers. Returns the record so
 * callers can keep using it even when storage is unavailable (private mode),
 * in which case the choice lasts for the current page only.
 */
export function writeConsent(
  preferences: ConsentPreferences,
  now = Date.now(),
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_POLICY_VERSION,
    analytics: preferences.analytics,
    decidedAt: now,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable
  }

  window.dispatchEvent(
    new CustomEvent<ConsentRecord>(CONSENT_CHANGE_EVENT, { detail: record }),
  );

  return record;
}

/** Subscribes to choices made in this tab and in other tabs. */
export function subscribeToConsent(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) onChange();
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

/** GA4 cookie names for a measurement ID (`G-ABC123` → `_ga_ABC123`). */
export function getAnalyticsCookieNames(measurementId: string): string[] {
  return ["_ga", `_ga_${measurementId.replace(/^G-/, "")}`];
}

/**
 * Candidate cookie domains for a hostname, from the host itself up to the
 * registrable parent (`www.example.org` → host-only, `www.example.org`,
 * `example.org`). GA writes `_ga` on the highest domain it can, so expiring
 * on each candidate removes it regardless of where it landed.
 */
function getCookieDomains(hostname: string): Array<string | null> {
  const domains: Array<string | null> = [null];
  // IP hosts (and IPv6 literals) only ever hold host-only cookies.
  if (/^[\d.]+$/.test(hostname) || hostname.includes(":")) return domains;

  const parts = hostname.split(".");

  for (let index = 0; index < parts.length - 1; index += 1) {
    domains.push(parts.slice(index).join("."));
  }

  return domains;
}

export function clearAnalyticsCookies(measurementId: string): void {
  if (typeof document === "undefined") return;

  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  for (const name of getAnalyticsCookieNames(measurementId)) {
    for (const domain of getCookieDomains(window.location.hostname)) {
      document.cookie = domain
        ? `${name}=; ${expired}; domain=${domain}`
        : `${name}=; ${expired}`;
    }
  }
}
