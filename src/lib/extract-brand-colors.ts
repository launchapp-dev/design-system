export type ExtractedColor = {
  hex: string;
  label: string;
  description: string;
};

export async function extractBrandColorsFromUrl(url: string): Promise<ExtractedColor[]> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = await (client.messages as any).create({
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
              url: url,
            },
          },
          {
            type: "text",
            text: `Analyze this image and extract the 5-7 most dominant and visually important brand colors.

For each color, provide:
1. The hex code (e.g., #FF5733)
2. A label (e.g., "Primary Brand Blue", "Accent Orange")
3. A brief description of where/how it's used in the design

Return the response as a JSON array with objects containing "hex", "label", and "description" fields.
Only return valid JSON, no additional text.`,
          },
        ],
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const colors = JSON.parse(content.text) as ExtractedColor[];
    return colors;
  } catch (_error) {
    throw new Error(`Failed to parse color extraction response: ${content.text}`);
  }
}

export async function extractBrandColorsFromImage(imageBase64: string): Promise<ExtractedColor[]> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = await (client.messages as any).create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: `Analyze this image and extract the 5-7 most dominant and visually important brand colors.

For each color, provide:
1. The hex code (e.g., #FF5733)
2. A label (e.g., "Primary Brand Blue", "Accent Orange")
3. A brief description of where/how it's used in the design

Return the response as a JSON array with objects containing "hex", "label", and "description" fields.
Only return valid JSON, no additional text.`,
          },
        ],
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const colors = JSON.parse(content.text) as ExtractedColor[];
    return colors;
  } catch (_error) {
    throw new Error(`Failed to parse color extraction response: ${content.text}`);
  }
}
