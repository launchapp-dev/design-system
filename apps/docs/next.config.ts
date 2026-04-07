import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On Vercel, output .next to the repo root so @vercel/next finds it at the
  // expected project-root location and generates correct routing for all pages.
  // Locally, keep .next inside apps/docs/ for convenience.
  distDir: process.env.VERCEL ? "../../.next" : ".next",
  transpilePackages: ["@launchapp/design-system"],
};

export default nextConfig;
