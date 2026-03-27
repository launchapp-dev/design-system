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

function makeAnthropicResponse(content: unknown) {
  return {
    content: [{ type: "text", text: JSON.stringify(content) }],
    usage: { input_tokens: 100, output_tokens: 50 },
  };
}

const OPTIONS = { apiKey: "test-key" };

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("analyzeImageColors", () => {
  it("returns colors and theme for a valid API response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeAnthropicResponse(VALID_COLORS))));

    const result = await analyzeImageColors("data:image/jpeg;base64,/9j/4AAQSkZJRgABA...", OPTIONS);

    expect(result.colors).toEqual(VALID_COLORS);
    expect(result.theme).toBeDefined();
    expect(result.theme.light).toBeDefined();
    expect(result.theme.dark).toBeDefined();
    expect(typeof result.theme.cssString).toBe("string");
  });

  it("converts image URL to base64 and includes in request", async () => {
    const fetchMock = vi
      .fn()
      .mockReturnValueOnce(
        Promise.resolve({
          ok: true,
          blob: () => Promise.resolve(new Blob(["fake-image-data"], { type: "image/jpeg" })),
        })
      )
      .mockReturnValueOnce(makeFetchResponse(makeAnthropicResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("https://example.com/image.jpg", OPTIONS);

    const calls = fetchMock.mock.calls;
    expect(calls.length).toBe(2);
    expect(calls[0][0]).toBe("https://example.com/image.jpg");
  });

  it("uses the provided model override", async () => {
    const fetchMock = vi.fn().mockReturnValue(makeFetchResponse(makeAnthropicResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", {
      ...OPTIONS,
      model: "claude-3-opus-20250219",
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.model).toBe("claude-3-opus-20250219");
  });

  it("uses a custom baseUrl when provided", async () => {
    const fetchMock = vi.fn().mockReturnValue(makeFetchResponse(makeAnthropicResponse(VALID_COLORS)));
    vi.stubGlobal("fetch", fetchMock);

    await analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", {
      ...OPTIONS,
      baseUrl: "https://my-proxy.example.com",
    });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain("https://my-proxy.example.com/v1/messages");
  });

  it("throws when the API returns a non-OK status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(makeFetchResponse("Unauthorized", false, 401))
    );

    await expect(
      analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", OPTIONS)
    ).rejects.toThrow("Vision API request failed (401)");
  });

  it("throws when content array is missing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse({ content: [] })));

    await expect(
      analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", OPTIONS)
    ).rejects.toThrow("Vision API returned unexpected response shape");
  });

  it("throws when a required color key is missing", async () => {
    const incomplete = { primary: "#3b82f6", secondary: "#6366f1" };
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeAnthropicResponse(incomplete))));

    await expect(
      analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", OPTIONS)
    ).rejects.toThrow(/missing or invalid hex for "muted"/);
  });

  it("throws when a color value is not a valid hex", async () => {
    const badColors = { ...VALID_COLORS, primary: "blue" };
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(makeFetchResponse(makeAnthropicResponse(badColors))));

    await expect(
      analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", OPTIONS)
    ).rejects.toThrow(/missing or invalid hex for "primary"/);
  });

  it("throws when response JSON content is not an object", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        makeFetchResponse({
          content: [{ type: "text", text: JSON.stringify(null) }],
        })
      )
    );

    await expect(
      analyzeImageColors("data:image/jpeg;base64,/9j/4AAQ...", OPTIONS)
    ).rejects.toThrow("Vision API returned non-object JSON");
  });
});
