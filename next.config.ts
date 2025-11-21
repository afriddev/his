import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables standalone mode to produce a minimal build output directory
  // that bundles only what's necessary to run the app.
  output: 'standalone',
  
  // Optional: Enable React strict mode for highlighting potential issues
  reactStrictMode: true,

  // Add other config options here if needed
};

export default nextConfig;
