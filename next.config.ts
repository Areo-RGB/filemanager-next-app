import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
  },
  // Silence Turbopack warning with Serwist injected webpack config
  turbopack: {},
};

export default withSerwist(nextConfig);
