import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.sameh-ahmed.com',
        // Optional: If you want to restrict to specific ports or pathnames, you can add them here.
        // port: '',
        // pathname: '/my-path/**',
      },
      {
        protocol:"https",
        hostname:"teacher-platform.fly.storage.tigris.dev"
      }
    ],
  }
};

export default nextConfig;
