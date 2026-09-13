import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatgpt.com",
      },
      {
        protocol: "https",
        hostname: "claude.ai",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "logos.hunter.io",
      },
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
      },
      {
        protocol: "https",
        hostname: "icon.horse",
      },
    ],
  },
};

export default nextConfig;