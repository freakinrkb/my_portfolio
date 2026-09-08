import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack root: a stray package-lock.json above this dir would
  // otherwise make Next warn about an inferred workspace root.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
