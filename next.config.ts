import type { NextConfig } from "next";
import {
  IMMERSION_ROUTE,
  IMMERSION_SECURITY_HEADERS,
} from "./src/config/immersion-security";
import {
  getSentryPublicEnv,
  resolveSentryEnvironment,
  resolveSentryRelease,
  SENTRY_APPLICATION_KEY,
  shouldUploadSentrySourceMaps,
  shouldWrapSentryBuild,
} from "./src/lib/sentry-config";

type BundleAnalyzerFactory = (options?: {
  enabled?: boolean;
  openAnalyzer?: boolean;
  analyzerMode?: "json" | "static";
  logLevel?: "info" | "warn" | "error" | "silent";
}) => (config?: NextConfig) => NextConfig;

const sentryPublicEnv = getSentryPublicEnv();

const nextConfig: NextConfig = {
  env: sentryPublicEnv,
  outputFileTracingRoot: process.cwd(),
  // Keep actionable browser errors visible in the development terminal while
  // avoiding vendor warning floods (for example, hosted widget internals).
  logging: {
    browserToTerminal: "error",
  },
  async headers() {
    return [
      {
        source: IMMERSION_ROUTE,
        headers: [...IMMERSION_SECURITY_HEADERS],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        statusCode: 301,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        statusCode: 301,
      },
      // Rebrand route renames
      {
        source: "/clinics",
        destination: "/community-hubs",
        statusCode: 301,
      },
      {
        source: "/clinics/akomapa-ucc",
        destination: "/community-hubs/ucc",
        statusCode: 301,
      },
      {
        source: "/clinics/akomapa-ug",
        destination: "/community-hubs/ug",
        statusCode: 301,
      },
      {
        source: "/clinics/akomapa-nhp",
        destination: "/community-hubs/nhp",
        statusCode: 301,
      },
      {
        source: "/join",
        destination: "/get-involved",
        statusCode: 301,
      },
      {
        source: "/partner",
        destination: "/partnerships",
        statusCode: 301,
      },
      {
        source: "/partner/corporate-sponsorship",
        destination: "/partnerships/corporate-sponsorship",
        statusCode: 301,
      },
      {
        source: "/donate/corporate-sponsorship",
        destination: "/partnerships/corporate-sponsorship",
        statusCode: 301,
      },
      {
        source: "/faculty",
        destination: "/about/team",
        statusCode: 301,
      },
      {
        source: "/programs/akomapa-ghip",
        destination: "/global-health-immersion-program",
        statusCode: 301,
      },
    ];
  },
  images: {
    qualities: [75, 85, 100],
    // ImageKit CDN assets are optimized via the custom imageKitLoader on
    // @/components/common/Image (browser fetches ik.imagekit.io directly).
    // remotePatterns keep ImageKit/YouTube allowlisted if the default
    // /_next/image optimizer is used; local/public assets use Next optimization.
    // See docs/performance/image-optimization.md.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
};

const shouldEnableSentryBuildPlugin = shouldWrapSentryBuild();
const shouldUploadSourceMaps = shouldUploadSentrySourceMaps();

export default async function config() {
  let analyzedConfig = nextConfig;

  if (process.env.ANALYZE === "true") {
    const { default: createBundleAnalyzer } = (await import("@next/bundle-analyzer")) as {
      default: BundleAnalyzerFactory;
    };
    analyzedConfig = createBundleAnalyzer({ enabled: true })(nextConfig);
  }

  if (!shouldEnableSentryBuildPlugin) {
    return analyzedConfig;
  }

  const { withSentryConfig } = await import("@sentry/nextjs");

  return withSentryConfig(analyzedConfig, {
    org: "akomapa-health-foundation",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    applicationKey: SENTRY_APPLICATION_KEY,
    authToken: shouldUploadSourceMaps ? process.env.SENTRY_AUTH_TOKEN : undefined,
    release: {
      name: resolveSentryRelease(),
      create: shouldUploadSourceMaps,
      finalize: shouldUploadSourceMaps,
      deploy: {
        env: resolveSentryEnvironment(),
      },
    },
    sourcemaps: {
      disable: !shouldUploadSourceMaps,
    },
    widenClientFileUpload: true,
    tunnelRoute: process.env.NODE_ENV === "production" ? "/monitoring" : undefined,
    webpack: {
      automaticVercelMonitors: true,
      treeshake: {
        removeDebugLogging: true,
      },
    },
  });
}
