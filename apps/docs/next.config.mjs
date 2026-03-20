import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@launchapp/design-system"],
  webpack: (config) => {
    config.resolve.alias["@launchapp/design-system"] = path.resolve(
      __dirname,
      "../../src/index.ts"
    );
    config.resolve.alias["@ds/blocks"] = path.resolve(
      __dirname,
      "../../src/blocks/index.ts"
    );
    config.resolve.alias["@ds/blocks/auth"] = path.resolve(
      __dirname,
      "../../src/blocks/auth/index.ts"
    );
    config.resolve.alias["@ds/blocks/dashboard"] = path.resolve(
      __dirname,
      "../../src/blocks/dashboard/index.ts"
    );
    config.resolve.alias["@ds/blocks/settings"] = path.resolve(
      __dirname,
      "../../src/blocks/settings/index.ts"
    );
    config.resolve.alias["@ds/blocks/navigation"] = path.resolve(
      __dirname,
      "../../src/blocks/navigation/index.ts"
    );
    config.resolve.alias["@ds/blocks/data"] = path.resolve(
      __dirname,
      "../../src/blocks/data/index.ts"
    );
    config.resolve.alias["@ds/blocks/ecommerce"] = path.resolve(
      __dirname,
      "../../src/blocks/ecommerce/index.ts"
    );
    config.resolve.alias["@ds/blocks/marketing"] = path.resolve(
      __dirname,
      "../../src/blocks/marketing/index.ts"
    );
    return config;
  },
};

export default nextConfig;
