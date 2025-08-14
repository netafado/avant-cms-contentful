import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  // Disable caching in development
  ...(process.env.NODE_ENV === "development" && {
    experimental: {
      staleTimes: {
        dynamic: 0,
        static: 0,
      },
    },
  }),
};

export default nextConfig;
