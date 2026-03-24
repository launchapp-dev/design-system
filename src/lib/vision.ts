import { createTheme } from "../themes/createTheme";
import type { ThemeResult } from "../themes/createTheme";

export interface VisionThemeOptions {
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export interface VisionColorMap {
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
  destructive: string;
}

export interface VisionThemeResult {
  colors: VisionColorMap;
  theme: ThemeResult;
}

interface OpenAIImageUrl {
  url: string;
}

interface OpenAIContentPart {
  type: "text" | "image_url";
  text?: string;
  image_url?: OpenAIImageUrl;
}

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | OpenAIContentPart[];
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens: number;
  response_format: { type: "json_object" };
}

interface OpenAIChoice {
  message: { role: string; content: string };
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
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

export async function analyzeImageColors(
  image: string,
  options: VisionThemeOptions
): Promise<VisionThemeResult> {
  const {
    apiKey,
    model = "gpt-4o",
    baseUrl = "https://api.openai.com/v1",
  } = options;

  const imageUrl: OpenAIImageUrl = { url: image };

  const body: OpenAIRequest = {
    model,
    messages: [
      {
        role: "system",
        content:
          "You are a color analysis assistant. Analyze the image and return ONLY a JSON object with exactly these five hex color keys: primary, secondary, muted, accent, destructive. Each value must be a 6-digit hex color string (e.g. \"#3b82f6\"). primary should be the most prominent brand color. secondary should be a supporting color. muted should be a low-saturation background or neutral tone. accent should be a highlight color. destructive should be a red or error-like color extracted from the image, or a sensible default like \"#ef4444\" if none is present. Return only the JSON object, no prose.",
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: imageUrl,
          },
          {
            type: "text",
            text: "Extract the dominant design system colors from this image as described.",
          },
        ],
      },
    ],
    max_tokens: 256,
    response_format: { type: "json_object" },
  };

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vision API request failed (${response.status}): ${text}`);
  }

  const json = (await response.json()) as OpenAIResponse;
  const content = json.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("Vision API returned unexpected response shape");
  }

  const colors = parseColorMap(JSON.parse(content));
  const theme = createTheme(colors.primary);

  return { colors, theme };
}
