/**
 * Typed analytics wrapper around Google Analytics 4 (gtag.js).
 *
 * GA is optional: <ConsentedAnalytics /> loads gtag.js only after the visitor
 * accepts optional cookies (Google "basic" consent mode). All trackEvent()
 * calls are SSR-safe and silently no-op without consent or when window.gtag is
 * unavailable (e.g. during SSR, before hydration, or if the user blocks GA).
 */

import { hasAnalyticsConsent } from "@/lib/consent";

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
  | {
      name: "donation_widget_load";
      entry_point: "partner" | "oneTime";
      success: boolean;
    }
  | {
      name: "donation_fallback_click";
      entry_point: "partner" | "oneTime";
    }
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
    }
  | { name: "immersion_alert_modal_open" }
  | { name: "immersion_alert_signup"; success: boolean }
  | {
      name: "intake_form_open";
      form_key: "immersion";
      intent: "register_interest" | "request_brochure";
    }
  | {
      name: "intake_provider_loaded";
      form_key: "immersion";
      intent: "register_interest" | "request_brochure";
    }
  | {
      name: "intake_provider_failed";
      form_key: "immersion";
      intent: "register_interest" | "request_brochure";
      error_category:
        | "offline"
        | "load_timeout"
        | "provider_error"
        | "missing_configuration";
    }
  | {
      name: "intake_fallback_selected";
      form_key: "immersion";
      intent: "register_interest" | "request_brochure";
    }
  | {
      name: "intake_submission_completed";
      form_key: "immersion";
      intent: "register_interest" | "request_brochure";
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

type GaDisableFlag = `ga-disable-${string}`;

function setGaDisabled(measurementId: string, disabled: boolean): void {
  (window as unknown as Record<GaDisableFlag, boolean>)[
    `ga-disable-${measurementId}`
  ] = disabled;
}

/** Defines the standard gtag queue (gtag.js only reads `arguments` objects). */
function ensureGtag(): GtagFn {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
  return window.gtag;
}

const DENIED_AD_SIGNALS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

/**
 * Prepares gtag for a visitor who granted analytics. Must run before
 * gtag.js loads so the consent default precedes `config`. Advertising signals
 * stay denied: the site runs no ads tags.
 */
export function grantAnalyticsConsent(measurementId: string): void {
  setGaDisabled(measurementId, false);
  // A consent default is only honoured before gtag.js processes `config`;
  // re-granting later in the same page load is an update.
  const command = typeof window.gtag === "function" ? "update" : "default";
  ensureGtag()("consent", command, {
    ...DENIED_AD_SIGNALS,
    analytics_storage: "granted",
  });
}

/**
 * Stops all further GA collection after withdrawal. The ga-disable flag is
 * Google's documented opt-out and blocks every hit, including cookieless
 * pings, even though gtag.js stays in memory until the next full load.
 */
export function revokeAnalyticsConsent(measurementId: string): void {
  setGaDisabled(measurementId, true);
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ...DENIED_AD_SIGNALS,
      analytics_storage: "denied",
    });
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function" ||
    !hasAnalyticsConsent()
  ) {
    return;
  }

  const { name, ...params } = event;
  try {
    window.gtag("event", name, params as Record<string, unknown>);
  } catch {
    // Swallow analytics errors — never break the user's flow.
  }
}
