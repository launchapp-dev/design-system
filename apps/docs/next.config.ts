import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/design-system" : "",
  images: { unoptimized: true },
  transpilePackages: ["@launchapp/design-system"],
};

export default nextConfig;
