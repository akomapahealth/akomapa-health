import { FILLOUT_EMBED_ORIGIN } from "../lib/intake/immersion-registry";

export const GLOBAL_SECURITY_ROUTE = "/:path*" as const;

// Google's documented CSP for GA4 without Ads features. gtag.js is only
// requested after a visitor accepts optional analytics cookies.
// https://developers.google.com/tag-platform/security/guides/csp
export const GOOGLE_TAG_ORIGIN = "https://www.googletagmanager.com";
export const GOOGLE_ANALYTICS_ORIGINS = "https://*.google-analytics.com";
const GOOGLE_ANALYTICS_CONNECT_ORIGINS = `${GOOGLE_TAG_ORIGIN} ${GOOGLE_ANALYTICS_ORIGINS} https://*.google.com`;

const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `script-src 'self' 'unsafe-inline' ${GOOGLE_TAG_ORIGIN}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://*.imagekit.io https://img.youtube.com https://i.ytimg.com ${GOOGLE_TAG_ORIGIN} ${GOOGLE_ANALYTICS_ORIGINS}`,
  "font-src 'self' data:",
  `connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io ${GOOGLE_ANALYTICS_CONNECT_ORIGINS}`,
  `frame-src 'self' ${FILLOUT_EMBED_ORIGIN} https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://givebutter.com`,
  "worker-src 'self' blob:",
].join("; ");

type SecurityHeaderOptions = {
  allowFilloutFrame?: boolean;
};

export function composeSecurityHeaders({
  allowFilloutFrame = false,
}: SecurityHeaderOptions = {}) {
  const enforcedCsp = [
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    ...(allowFilloutFrame
      ? [`frame-src 'self' ${FILLOUT_EMBED_ORIGIN}`]
      : []),
  ].join("; ");

  return [
    { key: "Content-Security-Policy", value: `${enforcedCsp};` },
    {
      key: "Content-Security-Policy-Report-Only",
      value: `${CONTENT_SECURITY_POLICY_REPORT_ONLY};`,
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains",
    },
  ] as const;
}

export const GLOBAL_SECURITY_HEADERS = composeSecurityHeaders();
