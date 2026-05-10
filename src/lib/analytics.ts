/**
 * Typed analytics wrapper around Google Analytics 4 (gtag.js).
 *
 * Loaded site-wide via @next/third-parties' <GoogleAnalytics /> in the root layout.
 * All trackEvent() calls are SSR-safe and silently no-op when window.gtag is unavailable
 * (e.g. during SSR, before hydration, or if the user blocks GA).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type AnalyticsEvent =
  | { name: "announcement_popup_open"; version: string; slide_count: number }
  | { name: "announcement_popup_dismiss"; version: string; viewed_slides: number }
  | { name: "announcement_slide_view"; slide_id: string; slide_index: number }
  | {
      name: "announcement_cta_click";
      slide_id: string;
      cta_text: string;
      cta_link: string;
    }
  | { name: "hero_slide_view"; slide_id: string; slide_index: number }
  | {
      name: "hero_cta_click";
      slide_id: string;
      cta_text: string;
      cta_link: string;
    }
  | {
      name: "news_click";
      news_id: string;
      source: "feed" | "featured" | "detail";
    }
  | { name: "donation_cta_click"; location: string; amount?: number }
  | { name: "application_cta_click"; location: string; program?: string }
  // Site-wide auto-instrumented events fired by GlobalClickTracker.
  | {
      name: "link_click";
      link_text: string;
      link_url: string;
      link_external: boolean;
      page_path: string;
      surface: "header" | "footer" | "newsletter" | "main" | "modal" | "unknown";
    }
  | {
      name: "outbound_click";
      link_text: string;
      link_url: string;
      page_path: string;
    }
  | {
      name: "newsletter_signup";
      page_path: string;
      success: boolean;
    };

type GtagFn = (
  command: "event" | "config" | "set" | "js" | "consent",
  targetIdOrName: string | Date,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const { name, ...params } = event;
  try {
    window.gtag("event", name, params as Record<string, unknown>);
  } catch {
    // Swallow analytics errors — never break the user's flow.
  }
}
