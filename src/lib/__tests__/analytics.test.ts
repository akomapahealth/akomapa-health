import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  grantAnalyticsConsent,
  revokeAnalyticsConsent,
  trackEvent,
} from "@/lib/analytics";
import { writeConsent } from "@/lib/consent";

describe("trackEvent", () => {
  const originalGtag = window.gtag;

  beforeEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    writeConsent({ analytics: true });
  });

  afterEach(() => {
    if (originalGtag) {
      window.gtag = originalGtag;
    } else {
      delete (window as unknown as { gtag?: unknown }).gtag;
    }
  });

  it("no-ops silently when window.gtag is undefined", () => {
    expect(() =>
      trackEvent({
        name: "hero_slide_view",
        slide_id: "test",
        slide_index: 0,
      })
    ).not.toThrow();
  });

  it("forwards events to gtag with name and params", () => {
    const gtag = vi.fn();
    window.gtag = gtag as typeof window.gtag;

    trackEvent({
      name: "hero_cta_click",
      slide_id: "brand-intro",
      cta_text: "Join the Movement",
      cta_link: "/get-involved",
    });

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "hero_cta_click", {
      slide_id: "brand-intro",
      cta_text: "Join the Movement",
      cta_link: "/get-involved",
    });
  });

  it.each([
    ["rejected", () => writeConsent({ analytics: false })],
    ["undecided", () => localStorage.clear()],
  ])("sends nothing when optional cookies are %s", (_label, setConsent) => {
    const gtag = vi.fn();
    window.gtag = gtag as typeof window.gtag;
    setConsent();

    trackEvent({ name: "hero_slide_view", slide_id: "test", slide_index: 0 });

    expect(gtag).not.toHaveBeenCalled();
  });

  it("swallows errors thrown by gtag", () => {
    window.gtag = (() => {
      throw new Error("boom");
    }) as typeof window.gtag;

    expect(() =>
      trackEvent({
        name: "newsletter_signup",
        page_path: "/",
        success: true,
      })
    ).not.toThrow();
  });
});

describe("analytics consent signals", () => {
  const flag = "ga-disable-G-TEST123";
  const flags = window as unknown as Record<string, unknown>;

  beforeEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    delete window.dataLayer;
    delete flags[flag];
  });

  it("queues a granted analytics default before gtag.js loads", () => {
    grantAnalyticsConsent("G-TEST123");

    expect(flags[flag]).toBe(false);
    expect(window.dataLayer).toHaveLength(1);
    expect(Array.from(window.dataLayer?.[0] as ArrayLike<unknown>)).toEqual([
      "consent",
      "default",
      {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      },
    ]);
  });

  it("disables GA and denies storage on withdrawal, then re-grants as an update", () => {
    grantAnalyticsConsent("G-TEST123");
    revokeAnalyticsConsent("G-TEST123");

    expect(flags[flag]).toBe(true);
    expect(Array.from(window.dataLayer?.[1] as ArrayLike<unknown>)).toEqual([
      "consent",
      "update",
      expect.objectContaining({ analytics_storage: "denied" }),
    ]);

    grantAnalyticsConsent("G-TEST123");

    expect(flags[flag]).toBe(false);
    expect(Array.from(window.dataLayer?.[2] as ArrayLike<unknown>)).toEqual([
      "consent",
      "update",
      expect.objectContaining({ analytics_storage: "granted" }),
    ]);
  });
});
