import type { NextConfig } from "next";

type BundleAnalyzerFactory = (options?: {
  enabled?: boolean;
  openAnalyzer?: boolean;
  analyzerMode?: "json" | "static";
  logLevel?: "info" | "warn" | "error" | "silent";
}) => (config?: NextConfig) => NextConfig;

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      // Rebrand route renames
      {
        source: "/clinics",
        destination: "/community-hubs",
        permanent: true,
      },
      {
        source: "/clinics/akomapa-ucc",
        destination: "/community-hubs/ucc",
        permanent: true,
      },
      {
        source: "/clinics/akomapa-ug",
        destination: "/community-hubs/ug",
        permanent: true,
      },
      {
        source: "/clinics/akomapa-nhp",
        destination: "/community-hubs/nhp",
        permanent: true,
      },
      {
        source: "/join",
        destination: "/get-involved",
        permanent: true,
      },
      {
        source: "/partner",
        destination: "/partnerships",
        permanent: true,
      },
      {
        source: "/partner/corporate-sponsorship",
        destination: "/partnerships/corporate-sponsorship",
        permanent: true,
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

const shouldEnableSentryBuildPlugin =
  process.env.SENTRY_BUILD_PLUGIN === "true" ||
  Boolean(process.env.CI && process.env.SENTRY_AUTH_TOKEN);

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
