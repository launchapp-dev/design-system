import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@launchapp/design-system"],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@launchapp/design-system": path.resolve(__dirname, "../../src/index.ts"),
    };
    return config;
  },
};

export default nextConfig;
