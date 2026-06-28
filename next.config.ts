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
      },
       {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "8000",
    },
    ],
  }
};

export default nextConfig;
