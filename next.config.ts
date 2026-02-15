import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
