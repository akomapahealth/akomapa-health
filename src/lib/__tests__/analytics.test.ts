import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  const originalGtag = window.gtag;

  beforeEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
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
      cta_link: "/join",
    });

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "hero_cta_click", {
      slide_id: "brand-intro",
      cta_text: "Join the Movement",
      cta_link: "/join",
    });
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
