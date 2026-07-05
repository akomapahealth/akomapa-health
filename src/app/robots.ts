import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/sentry-example-page",
        "/clinics",
        "/clinics/",
        "/join",
        "/partner",
        "/privacy-policy",
        "/terms-of-service",
        "/faculty",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
