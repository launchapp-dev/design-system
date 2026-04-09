import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On Vercel, output .next to the repo root so @vercel/next finds it at the
  // expected project-root location and generates correct routing for all pages.
  // Locally, keep .next inside apps/docs/ for convenience.
  distDir: process.env.VERCEL ? "../../.next" : ".next",
  transpilePackages: ["@launchapp/design-system"],
  // Required for monorepo setups where distDir is outside the app directory.
  // Tells Next.js to trace output files relative to the repo root (matching
  // where distDir puts the build on Vercel), so Vercel can correctly resolve
  // file paths and serve all pages — including dynamic routes — on direct nav.
  outputFileTracingRoot: path.resolve(__dirname, "../.."),
};

export default nextConfig;
