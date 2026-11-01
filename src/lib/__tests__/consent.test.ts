import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_MAX_AGE_MS,
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  clearAnalyticsCookies,
  getAnalyticsCookieNames,
  hasAnalyticsConsent,
  parseConsentRecord,
  readConsent,
  subscribeToConsent,
  writeConsent,
} from "@/lib/consent";

const NOW = Date.UTC(2026, 10, 1);

function serialize(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    version: CONSENT_POLICY_VERSION,
    analytics: true,
    decidedAt: NOW,
    ...overrides,
  });
}

describe("parseConsentRecord", () => {
  it("accepts a current, unexpired record", () => {
    expect(parseConsentRecord(serialize(), NOW)).toEqual({
      version: CONSENT_POLICY_VERSION,
      analytics: true,
      decidedAt: NOW,
    });
  });

  it.each([
    ["missing", null],
    ["corrupt JSON", "{not json"],
    ["wrong shape", JSON.stringify({ analytics: "yes" })],
    ["extra keys", serialize({ marketing: true })],
    ["an older policy version", serialize({ version: "2020-01-01" })],
    ["a far-future timestamp", serialize({ decidedAt: NOW + CONSENT_MAX_AGE_MS + 1 })],
    ["an expired choice", serialize({ decidedAt: NOW - CONSENT_MAX_AGE_MS - 1 })],
  ])("treats %s as undecided", (_label, raw) => {
    expect(parseConsentRecord(raw, NOW)).toBeNull();
  });
});

it("tolerates a device clock that is behind the stored choice", () => {
  expect(parseConsentRecord(serialize({ decidedAt: NOW + 60_000 }), NOW)).not.toBeNull();
});

describe("consent storage", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("persists a versioned choice and reads it back", () => {
    writeConsent({ analytics: false });

    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? "");
    expect(stored).toMatchObject({
      version: CONSENT_POLICY_VERSION,
      analytics: false,
    });
    expect(readConsent()?.analytics).toBe(false);
    expect(hasAnalyticsConsent()).toBe(false);

    writeConsent({ analytics: true });
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it("falls back to undecided when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(readConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("still notifies listeners when storage cannot be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    const listener = vi.fn();
    window.addEventListener(CONSENT_CHANGE_EVENT, listener);

    const record = writeConsent({ analytics: true });

    expect(record.analytics).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
    // The choice is still honoured for the rest of this page load.
    expect(hasAnalyticsConsent()).toBe(true);
    window.removeEventListener(CONSENT_CHANGE_EVENT, listener);
  });
});

describe("subscribeToConsent", () => {
  it("fires for same-tab writes and other-tab storage events", () => {
    const onChange = vi.fn();
    const unsubscribe = subscribeToConsent(onChange);

    writeConsent({ analytics: true });
    window.dispatchEvent(
      new StorageEvent("storage", { key: CONSENT_STORAGE_KEY }),
    );
    window.dispatchEvent(new StorageEvent("storage", { key: "akomapa-theme" }));

    expect(onChange).toHaveBeenCalledTimes(2);

    unsubscribe();
    writeConsent({ analytics: false });
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});

describe("analytics cookies", () => {
  it("derives GA4 cookie names from the measurement ID", () => {
    expect(getAnalyticsCookieNames("G-ABC123")).toEqual(["_ga", "_ga_ABC123"]);
  });

  it("expires GA cookies on the current host", () => {
    document.cookie = "_ga=GA1.1.1; path=/";
    document.cookie = "_ga_ABC123=GS1.1.1; path=/";
    document.cookie = "akomapa-other=keep; path=/";

    clearAnalyticsCookies("G-ABC123");

    expect(document.cookie).not.toMatch(/_ga/);
    expect(document.cookie).toContain("akomapa-other=keep");
  });
});
