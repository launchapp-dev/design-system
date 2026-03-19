import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@audiogenius/design-system"],
  webpack: (config) => {
    config.resolve.alias["@audiogenius/design-system"] = path.resolve(
      __dirname,
      "../../src/index.ts"
    );
    return config;
  },
};

export default nextConfig;
