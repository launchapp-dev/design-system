import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/design-system" : "",
  images: { unoptimized: true },
  transpilePackages: ["@launchapp/design-system"],
  turbopack: {
    resolveAlias: {
      "@launchapp/design-system": path.resolve(__dirname, "../../src/index.ts"),
    },
  },
};

export default nextConfig;
