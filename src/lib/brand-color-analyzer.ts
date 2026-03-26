import { Anthropic } from "@anthropic-ai/sdk";
import { createTheme } from "../themes/createTheme";
import type { ThemeResult } from "../themes/createTheme";

export interface VisionColorMap {
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
  destructive: string;
}

export interface BrandColorAnalysisResult {
  colors: VisionColorMap;
  theme: ThemeResult;
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function isValidHex(value: unknown): value is string {
  return typeof value === "string" && HEX_RE.test(value);
}

function parseColorMap(raw: unknown): VisionColorMap {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Vision API returned non-object JSON");
  }

  const obj = raw as Record<string, unknown>;
  const required: Array<keyof VisionColorMap> = [
    "primary",
    "secondary",
    "muted",
    "accent",
    "destructive",
  ];

  for (const key of required) {
    if (!isValidHex(obj[key])) {
      throw new Error(
        `Vision API response missing or invalid hex for "${key}": ${JSON.stringify(obj[key])}`
      );
    }
  }

  return {
    primary: obj.primary as string,
    secondary: obj.secondary as string,
    muted: obj.muted as string,
    accent: obj.accent as string,
    destructive: obj.destructive as string,
  };
}

/**
 * Analyzes a brand website image using Claude Vision API and extracts color palette
 *
 * This function takes an image URL (either a screenshot of a website or a brand logo)
 * and uses Claude's Vision API to identify dominant colors. It then generates a complete
 * design system theme from the extracted primary color.
 *
 * Usage (in a Next.js API route):
 * ```typescript
 * import { analyzeBrandColors } from '@launchapp/design-system';
 *
 * export async function POST(req: Request) {
 *   const { imageUrl } = await req.json();
 *   const result = await analyzeBrandColors(imageUrl);
 *   return Response.json(result);
 * }
 * ```
 *
 * @param imageUrl - URL of the image to analyze (must be a valid public HTTP/HTTPS URL)
 * @param apiKey - Optional Anthropic API key (uses ANTHROPIC_API_KEY env var if not provided)
 * @returns BrandColorAnalysisResult with extracted colors and generated theme
 * @throws Error if the image URL is invalid, API call fails, or response is malformed
 */
export async function analyzeBrandColors(
  imageUrl: string,
  apiKey?: string
): Promise<BrandColorAnalysisResult> {
  const client = new Anthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
  });

  if (!imageUrl || typeof imageUrl !== "string") {
    throw new Error("Invalid image URL provided");
  }

  // Validate URL format
  try {
    new URL(imageUrl);
  } catch {
    throw new Error("Image URL must be a valid HTTP/HTTPS URL");
  }

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "url",
                url: imageUrl,
              },
            },
            {
              type: "text",
              text: `Analyze this brand website or image and extract 5 key colors for a design system theme.

Return ONLY a valid JSON object with exactly these 5 hex color keys:
- primary: the most prominent brand color (#RRGGBB)
- secondary: a supporting color (#RRGGBB)
- muted: a low-saturation background or neutral tone (#RRGGBB)
- accent: a highlight or accent color (#RRGGBB)
- destructive: a red or error-like color, or #ef4444 if none is present (#RRGGBB)

Each value must be a valid 6-digit hex color string like "#3b82f6".

Return only the JSON object, no markdown, no prose. Example format:
{"primary":"#3b82f6","secondary":"#6366f1","muted":"#94a3b8","accent":"#f59e0b","destructive":"#ef4444"}`,
            },
          ],
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude Vision API");
    }

    const colors = parseColorMap(JSON.parse(content.text));
    const theme = createTheme(colors.primary);

    return { colors, theme };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse Claude Vision API response as JSON");
    }
    if (error instanceof Error) {
      if (error.message.includes("missing or invalid hex")) {
        throw error;
      }
      throw new Error(`Brand color analysis failed: ${error.message}`);
    }
    throw error;
  }
}
