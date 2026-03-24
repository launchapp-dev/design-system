import { describe, it, expect, vi, beforeEach } from "vitest";
import { analyzeImageColors } from "./vision";

const VALID_COLORS = {
  primary: "#3b82f6",
  secondary: "#6366f1",
  muted: "#94a3b8",
  accent: "#f59e0b",
  destructive: "#ef4444",
};

function makeFetchResponse(body: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    text: () => Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
    json: () => Promise.resolve(body),
  } as Response);
}

function makeOpenAIResponse(content: unknown) {
  return {
    choices: [{ message: { role: "assistant", content: JSON.stringify(content) } }],
  };
}

const OPTIONS = { apiKey: "test-key" };

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("analyzeImageColors", () => {
  it("returns colors and theme for a valid API response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(VALID_COLORS))));

    const result = await analyzeImageColors("https://example.com/logo.png", OPTIONS);

    expect(result.colors).toEqual(VALID_COLORS);
    expect(result.theme).toBeDefined();
    expect(result.theme.light).toBeDefined();
    expect(result.theme.dark).toBeDefined();
    expect(typeof result.theme.cssString).toBe("string");
  });

  it("passes the image URL in the request body", async () => {
    const fetchMock = vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("https://example.com/image.jpg", OPTIONS);

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    const imagePart = body.messages[1].content.find(
      (p: { type: string; image_url?: { url: string } }) => p.type === "image_url"
    );
    expect(imagePart?.image_url?.url).toBe("https://example.com/image.jpg");
  });

  it("uses the provided model override", async () => {
    const fetchMock = vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("https://example.com/img.png", { ...OPTIONS, model: "gpt-4-turbo" });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.model).toBe("gpt-4-turbo");
  });

  it("uses a custom baseUrl when provided", async () => {
    const fetchMock = vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("https://example.com/img.png", {
      ...OPTIONS,
      baseUrl: "https://my-proxy.example.com/v1",
    });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain("https://my-proxy.example.com/v1");
  });

  it("throws when the API returns a non-OK status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(makeFetchResponse("Unauthorized", false, 401))
    );

    await expect(
      analyzeImageColors("https://example.com/img.png", OPTIONS)
    ).rejects.toThrow("Vision API request failed (401)");
  });

  it("throws when choices array is missing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse({ choices: [] })));

    await expect(
      analyzeImageColors("https://example.com/img.png", OPTIONS)
    ).rejects.toThrow("Vision API returned unexpected response shape");
  });

  it("throws when a required color key is missing", async () => {
    const incomplete = { primary: "#3b82f6", secondary: "#6366f1" };
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(incomplete))));

    await expect(
      analyzeImageColors("https://example.com/img.png", OPTIONS)
    ).rejects.toThrow(/missing or invalid hex for "muted"/);
  });

  it("throws when a color value is not a valid hex", async () => {
    const badColors = { ...VALID_COLORS, primary: "blue" };
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeOpenAIResponse(badColors))));

    await expect(
      analyzeImageColors("https://example.com/img.png", OPTIONS)
    ).rejects.toThrow(/missing or invalid hex for "primary"/);
  });

  it("throws when response JSON content is not an object", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        makeFetchResponse({
          choices: [{ message: { role: "assistant", content: JSON.stringify(null) } }],
        })
      )
    );

    await expect(
      analyzeImageColors("https://example.com/img.png", OPTIONS)
    ).rejects.toThrow("Vision API returned non-object JSON");
  });
});
