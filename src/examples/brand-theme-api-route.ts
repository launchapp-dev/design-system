/**
 * Example Next.js API Route: /api/analyze-brand
 *
 * This is an example implementation of the backend endpoint that the
 * BrandThemeGenerator component expects. Copy this to your application's
 * pages/api/analyze-brand.ts (or app/api/analyze-brand/route.ts for App Router)
 *
 * Requirements:
 * - Install @anthropic-ai/sdk: npm install @anthropic-ai/sdk
 * - Set ANTHROPIC_API_KEY environment variable
 * - Deploy to a Node.js runtime (Vercel, etc.)
 */

// For Next.js Pages Router:
export default async function handler(
  req: { method?: string; body?: { imageUrl: string } },
  res: { status: (code: number) => { json: (data: unknown) => void } }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body || {};

  if (!imageUrl || typeof imageUrl !== "string") {
    return res.status(400).json({ error: "imageUrl is required" });
  }

  try {
    // Import analyzeBrandColors from the design system
    const { analyzeBrandColors } = await import("@launchapp/design-system");

    const result = await analyzeBrandColors(imageUrl);
    return res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res.status(500).json({ error: message });
  }
}

/**
 * Example Next.js App Router Implementation:
 *
 * Create app/api/analyze-brand/route.ts:
 *
 * import { analyzeBrandColors } from "@launchapp/design-system";
 * import { NextRequest, NextResponse } from "next/server";
 *
 * export async function POST(request: NextRequest) {
 *   try {
 *     const { imageUrl } = await request.json();
 *
 *     if (!imageUrl || typeof imageUrl !== "string") {
 *       return NextResponse.json(
 *         { error: "imageUrl is required" },
 *         { status: 400 }
 *       );
 *     }
 *
 *     const result = await analyzeBrandColors(imageUrl);
 *     return NextResponse.json(result);
 *   } catch (error) {
 *     const message =
 *       error instanceof Error ? error.message : "Unknown error occurred";
 *     return NextResponse.json({ error: message }, { status: 500 });
 *   }
 * }
 */
