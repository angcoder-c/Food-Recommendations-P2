import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns : [
      {
      protocol: 'https',
      hostname: '**',
      },
      {
      protocol: 'http',
      hostname: '**', 
      },
    ],
    domains: ['grupogogreen.com'],
  },
};

export default nextConfig;
