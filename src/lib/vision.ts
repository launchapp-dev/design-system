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

interface AnthropicImageSource {
  type: "base64" | "url";
  media_type?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  data?: string;
  url?: string;
}

interface AnthropicImageContent {
  type: "image";
  source: AnthropicImageSource;
}

interface AnthropicTextContent {
  type: "text";
  text: string;
}

type AnthropicContent = AnthropicImageContent | AnthropicTextContent;

interface AnthropicMessage {
  role: "user" | "assistant";
  content: AnthropicContent[] | string;
}

interface AnthropicRequest {
  model: string;
  max_tokens: number;
  system: string;
  messages: AnthropicMessage[];
}

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
  usage?: { input_tokens: number; output_tokens: number };
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
        `Vision API response missing or invalid hex for "${key}": ${JSON.stringify(obj[key])}`,
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

async function convertUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getMediaType(url: string): "image/jpeg" | "image/png" | "image/gif" | "image/webp" {
  const urlObj = new URL(url);
  const path = urlObj.pathname.toLowerCase();
  if (path.includes(".png")) return "image/png";
  if (path.includes(".gif")) return "image/gif";
  if (path.includes(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function analyzeImageColors(
  image: string,
  options: VisionThemeOptions,
): Promise<VisionThemeResult> {
  const {
    apiKey,
    model = "claude-3-5-sonnet-20241022",
    baseUrl = "https://api.anthropic.com",
  } = options;

  let imageSource: AnthropicImageSource;

  if (image.startsWith("data:")) {
    const matches = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid data URL format");
    }
    const mediaType = matches[1] as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    const data = matches[2];
    imageSource = { type: "base64", media_type: mediaType, data };
  } else if (image.startsWith("http://") || image.startsWith("https://")) {
    const mediaType = getMediaType(image);
    try {
      const base64 = await convertUrlToBase64(image);
      imageSource = { type: "base64", media_type: mediaType, data: base64 };
    } catch {
      imageSource = { type: "url", url: image };
    }
  } else {
    throw new Error("Image must be a valid URL or data URL");
  }

  const body: AnthropicRequest = {
    model,
    max_tokens: 256,
    system:
      'You are a color analysis assistant. Analyze the image and return ONLY a JSON object with exactly these five hex color keys: primary, secondary, muted, accent, destructive. Each value must be a 6-digit hex color string (e.g. "#3b82f6"). primary should be the most prominent brand color. secondary should be a supporting color. muted should be a low-saturation background or neutral tone. accent should be a highlight color. destructive should be a red or error-like color extracted from the image, or a sensible default like "#ef4444" if none is present. Return only the JSON object, no prose.',
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: imageSource,
          },
          {
            type: "text",
            text: "Extract the dominant design system colors from this image as described.",
          },
        ],
      },
    ],
  };

  const response = await fetch(`${baseUrl}/v1/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vision API request failed (${response.status}): ${text}`);
  }

  const json = (await response.json()) as AnthropicResponse;
  const textContent = json.content?.find((item) => item.type === "text");

  if (!textContent || typeof textContent.text !== "string") {
    throw new Error("Vision API returned unexpected response shape");
  }

  const colors = parseColorMap(JSON.parse(textContent.text));
  const theme = createTheme(colors.primary);

  return { colors, theme };
}
