import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@audiogenius/design-system"],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@audiogenius/design-system": path.resolve(__dirname, "../../src/index.ts"),
    };
    return config;
  },
};

export default nextConfig;
