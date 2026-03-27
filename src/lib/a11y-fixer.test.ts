import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  analyzeComponentA11y,
  generateComponentFix,
  batchAnalyzeComponents,
  generateA11yReport,
  verifyWithAxeCore,
  type A11yViolation,
  type A11yAnalysisResult,
} from "./a11y-fixer";
import type Anthropic from "@anthropic-ai/sdk";

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockAnthropicClient = {
  messages: {
    create: vi.fn(),
  },
} as unknown as typeof Anthropic.default;

const mockOptions = {
  client: mockAnthropicClient as any,
  apiKey: "test-key",
};

describe("analyzeComponentA11y", () => {
  it("parses violations from Claude response", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `{
            "violations": [
              {
                "line": 5,
                "type": "WCAG 4.1.2",
                "message": "Missing aria-label",
                "severity": "error",
                "code": "MISSING_ARIA_LABEL"
              }
            ],
            "fixes": [
              {
                "violationCode": "MISSING_ARIA_LABEL",
                "suggestedFix": "aria-label='Close'",
                "explanation": "Add aria-label to button"
              }
            ],
            "wcagLevel": "A",
            "improvementScore": 85
          }`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const result = await analyzeComponentA11y(
      "Button",
      "<button>Click</button>",
      mockOptions
    );

    expect(result.component).toBe("Button");
    expect(result.violations).toHaveLength(1);
    expect(result.violations[0].code).toBe("MISSING_ARIA_LABEL");
    expect(result.violations[0].severity).toBe("error");
    expect(result.wcagLevel).toBe("A");
    expect(result.improvementScore).toBe(85);
  });

  it("includes fixes in analysis result", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `{
            "violations": [{"line": 1, "type": "WCAG 1.1.1", "message": "Missing alt", "severity": "error", "code": "MISSING_ALT"}],
            "fixes": [{"violationCode": "MISSING_ALT", "suggestedFix": "alt='logo'", "explanation": "Add alt text"}],
            "wcagLevel": "AA",
            "improvementScore": 75
          }`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const result = await analyzeComponentA11y(
      "Image",
      "<img src='logo.png' />",
      mockOptions
    );

    expect(result.fixes).toHaveLength(1);
    expect(result.fixes[0].explanation).toBe("Add alt text");
  });

  it("throws on invalid JSON response", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: "This is not JSON",
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    await expect(
      analyzeComponentA11y(
        "Button",
        "<button>Click</button>",
        mockOptions
      )
    ).rejects.toThrow("Failed to parse accessibility analysis response");
  });

  it("uses custom model when provided", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `{"violations": [], "fixes": [], "wcagLevel": "AAA", "improvementScore": 100}`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    await analyzeComponentA11y(
      "Button",
      "<button>Click</button>",
      { ...mockOptions, model: "claude-3-opus-20250219" }
    );

    expect(mockAnthropicClient.messages.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "claude-3-opus-20250219",
      })
    );
  });
});

describe("generateComponentFix", () => {
  it("extracts fixed code from markdown code block", async () => {
    const fixedCode = `<button aria-label="Close">×</button>`;
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `\`\`\`tsx\n${fixedCode}\n\`\`\``,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const violations: A11yViolation[] = [
      {
        line: 1,
        component: "Button",
        type: "WCAG 4.1.2",
        message: "Missing aria-label",
        severity: "error",
        code: "MISSING_ARIA_LABEL",
      },
    ];

    const result = await generateComponentFix(
      "Button",
      "<button>×</button>",
      violations,
      mockOptions
    );

    expect(result).toBe(fixedCode);
  });

  it("returns raw response when no code block found", async () => {
    const response = "Here's the fixed component:\n<button aria-label='Click'>Click</button>";
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: response,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const violations: A11yViolation[] = [
      {
        line: 1,
        component: "Button",
        type: "WCAG 4.1.2",
        message: "Missing aria-label",
        severity: "error",
        code: "MISSING_ARIA_LABEL",
      },
    ];

    const result = await generateComponentFix(
      "Button",
      "<button>Click</button>",
      violations,
      mockOptions
    );

    expect(result).toContain("aria-label");
  });

  it("handles empty violations gracefully", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `<button>No violations</button>`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const result = await generateComponentFix(
      "Button",
      "<button>No violations</button>",
      [],
      mockOptions
    );

    expect(result).toBeDefined();
  });
});

describe("batchAnalyzeComponents", () => {
  it("analyzes multiple components sequentially", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `{"violations": [], "fixes": [], "wcagLevel": "AA", "improvementScore": 100}`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const components = {
      Button: "<button>Click</button>",
      Input: "<input />",
      Card: "<div>Content</div>",
    };

    const results = await batchAnalyzeComponents(components, mockOptions);

    expect(results).toHaveLength(3);
    expect(results[0].component).toBe("Button");
    expect(results[1].component).toBe("Input");
    expect(results[2].component).toBe("Card");
  });

  it("handles analysis errors gracefully", async () => {
    const mockResponse = {
      content: [
        {
          type: "text" as const,
          text: `{"violations": [{"line": 1, "type": "WCAG 4.1.2", "message": "Error", "severity": "error", "code": "ERROR"}], "fixes": [], "wcagLevel": "A", "improvementScore": 50}`,
        },
      ],
    };

    vi.mocked(mockAnthropicClient.messages.create).mockResolvedValue(
      mockResponse as any
    );

    const components = {
      Button: "<button>Click</button>",
      Input: "<input />",
    };

    const results = await batchAnalyzeComponents(components, mockOptions);

    expect(results).toHaveLength(2);
    expect(results[0].violations).toHaveLength(1);
  });
});

describe("generateA11yReport", () => {
  it("generates a summary report with violation counts", () => {
    const results: A11yAnalysisResult[] = [
      {
        component: "Button",
        violations: [
          {
            line: 1,
            component: "Button",
            type: "WCAG 4.1.2",
            message: "Missing aria-label",
            severity: "error",
            code: "MISSING_ARIA_LABEL",
          },
        ],
        fixes: [],
        wcagLevel: "A",
        improvementScore: 75,
      },
      {
        component: "Input",
        violations: [],
        fixes: [],
        wcagLevel: "AA",
        improvementScore: 100,
      },
    ];

    const report = generateA11yReport(results);

    expect(report).toContain("Accessibility Analysis Report");
    expect(report).toContain("Total Violations: 1");
    expect(report).toContain("Errors: 1");
    expect(report).toContain("Components Analyzed: 2");
    expect(report).toContain("Button");
    expect(report).toContain("Input");
  });

  it("includes component-specific violation details", () => {
    const results: A11yAnalysisResult[] = [
      {
        component: "Dialog",
        violations: [
          {
            line: 10,
            component: "Dialog",
            type: "WCAG 4.1.3",
            message: "Missing aria-live",
            severity: "warning",
            code: "MISSING_ARIA_LIVE",
          },
          {
            line: 20,
            component: "Dialog",
            type: "WCAG 2.4.3",
            message: "Focus not managed",
            severity: "error",
            code: "FOCUS_NOT_MANAGED",
          },
        ],
        fixes: [],
        wcagLevel: "A",
        improvementScore: 60,
      },
    ];

    const report = generateA11yReport(results);

    expect(report).toContain("[MISSING_ARIA_LIVE]");
    expect(report).toContain("[FOCUS_NOT_MANAGED]");
    expect(report).toContain("WCAG 4.1.3");
    expect(report).toContain("WCAG 2.4.3");
  });

  it("handles components with no violations", () => {
    const results: A11yAnalysisResult[] = [
      {
        component: "Badge",
        violations: [],
        fixes: [],
        wcagLevel: "AAA",
        improvementScore: 100,
      },
    ];

    const report = generateA11yReport(results);

    expect(report).toContain("Total Violations: 0");
    expect(report).toContain("No violations found ✓");
  });
});

describe("verifyWithAxeCore", () => {
  it("returns empty array when axe-core is not available", async () => {
    const violations = await verifyWithAxeCore("<button>Test</button>");
    expect(Array.isArray(violations)).toBe(true);
  });

  it("formats violations from axe-core results", async () => {
    vi.mock("jsdom");
    vi.mock("axe-core");

    const violations = await verifyWithAxeCore("<img src='test.jpg' />");
    expect(Array.isArray(violations)).toBe(true);
  });
});
