import type { NextConfig } from "next";
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
  experimental: {
    // Disable the segment explorer devtool due to a dev-runtime manifest bug.
    devtoolSegmentExplorer: false,
    // The worker process can hang indefinitely on this project during production
    // compilation; keep builds in-process until the dependency graph is lighter.
    webpackBuildWorker: false,
  },
  images: {
    qualities: [75, 85, 100],
    // Configure ImageKit as a remote pattern for Next.js Image optimization
    // This enables future use of Next.js Image component with ImageKit URLs
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
