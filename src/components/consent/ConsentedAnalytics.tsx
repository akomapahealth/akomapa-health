"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { grantAnalyticsConsent, revokeAnalyticsConsent } from "@/lib/analytics";
import { clearAnalyticsCookies } from "@/lib/consent";
import { useCookieConsent } from "@/components/consent/ConsentProvider";

type ConsentedAnalyticsProps = {
  gaId: string;
};

/**
 * Google "basic" consent mode: gtag.js is not requested, and no page view is
 * sent, until the visitor accepts optional cookies. Nothing GA-related is in
 * the server HTML, so there is no preload either.
 *
 * Once loaded, Next keeps the script for the rest of the page load, so
 * withdrawal switches GA off with Google's opt-out flag and removes its
 * cookies rather than relying on unmounting.
 */
export default function ConsentedAnalytics({ gaId }: ConsentedAnalyticsProps) {
  const { status, analytics } = useCookieConsent();
  const [shouldLoad, setShouldLoad] = useState(false);
  const wasGrantedRef = useRef(false);

  useEffect(() => {
    if (analytics) {
      grantAnalyticsConsent(gaId);
      wasGrantedRef.current = true;
      setShouldLoad(true);
      return;
    }

    if (wasGrantedRef.current) {
      wasGrantedRef.current = false;
      revokeAnalyticsConsent(gaId);
    }

    // Also covers cookies left by an earlier visit's (now expired) consent.
    if (status === "decided") clearAnalyticsCookies(gaId);
  }, [status, analytics, gaId]);

  return shouldLoad ? <GoogleAnalytics gaId={gaId} /> : null;
}
