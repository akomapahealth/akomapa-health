import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable the segment explorer devtool due to a dev-runtime manifest bug.
    devtoolSegmentExplorer: false,
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
    ],
  },
};

export default nextConfig;
