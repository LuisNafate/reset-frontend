import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://64.23.248.243/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
