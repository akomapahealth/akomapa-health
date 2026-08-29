import { FILLOUT_EMBED_ORIGIN } from "../lib/intake/immersion-registry";

export const GLOBAL_SECURITY_ROUTE = "/:path*" as const;

const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.imagekit.io https://img.youtube.com https://i.ytimg.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io",
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
