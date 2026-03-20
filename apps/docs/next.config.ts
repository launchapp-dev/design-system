import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/design-system" : "",
  images: { unoptimized: true },
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
