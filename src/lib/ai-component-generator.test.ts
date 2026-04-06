import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  generateComponent,
  generateComponentFromDescription,
  type ComponentGenerationRequest,
} from "./ai-component-generator";

const MOCK_COMPONENT_CODE = `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("...", {
  variants: {
    variant: { default: "bg-primary", outline: "border" },
    size: { sm: "h-8", md: "h-10", lg: "h-12" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
export { Button, buttonVariants };`;

const MOCK_STORY = `import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
const meta: Meta<typeof Button> = { title: "Components/Button", component: Button };
export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = { args: { children: "Click me" } };`;

const MOCK_TEST = `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
describe("Button", () => {
  it("renders", () => { render(<Button>Test</Button>); });
});`;

const { mockCreate } = vi.hoisted(() => ({ mockCreate: vi.fn() }));

vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn(function () {
    return { messages: { create: mockCreate } };
  }),
}));

const MOCK_SUCCESS_RESPONSE = {
  content: [
    {
      type: "text",
      text: JSON.stringify({
        component: MOCK_COMPONENT_CODE,
        story: MOCK_STORY,
        test: MOCK_TEST,
      }),
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  mockCreate.mockResolvedValue(MOCK_SUCCESS_RESPONSE);
});

describe("generateComponent", () => {
  it("generates component, story, and tests from request", async () => {
    const request: ComponentGenerationRequest = {
      name: "Button",
      description: "A customizable button component",
      variants: {
        variant: ["default", "outline", "ghost"],
        size: ["sm", "md", "lg"],
      },
    };

    const result = await generateComponent(request, "test-api-key");

    expect(result.component).toContain("Button");
    expect(result.story).toContain("Button");
    expect(result.test).toContain("Button");
    expect(result.validation).toBeDefined();
  });

  it("validates generated component code", async () => {
    const result = await generateComponent(
      { name: "TestButton", description: "Test button component" },
      "test-api-key",
    );

    expect(result.validation).toHaveProperty("isValid");
    expect(result.validation).toHaveProperty("errors");
    expect(Array.isArray(result.validation.errors)).toBe(true);
  });

  it("includes design system patterns in generated code", async () => {
    const result = await generateComponent(
      { name: "StyledButton", description: "Styled button with design tokens" },
      "test-api-key",
    );

    expect(result.component).toContain("cva");
    expect(result.component).toContain("React.forwardRef");
  });

  it("throws error when API key is missing and not in env", async () => {
    const oldEnv = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    mockCreate.mockRejectedValueOnce(new Error("Missing API key"));

    try {
      await expect(
        generateComponent({ name: "Button", description: "A button" }, undefined),
      ).rejects.toThrow();
    } finally {
      if (oldEnv) process.env.ANTHROPIC_API_KEY = oldEnv;
    }
  });

  it("uses provided API key over environment variable", async () => {
    await generateComponent({ name: "Button", description: "Test" }, "custom-key");
    expect(mockCreate).toHaveBeenCalledTimes(2);
  });
});

describe("generateComponentFromDescription", () => {
  it("extracts component name from description", async () => {
    const result = await generateComponentFromDescription(
      "Button - A customizable button component",
      "test-api-key",
    );

    expect(result.component).toBeDefined();
    expect(result.story).toBeDefined();
    expect(result.test).toBeDefined();
  });

  it("uses full description as name when no delimiter found", async () => {
    const result = await generateComponentFromDescription(
      "A completely new component with multiple features",
      "test-api-key",
    );

    expect(result.component).toBeDefined();
  });
});

describe("Component code generation requirements", () => {
  it("generates TypeScript strict mode compliant code", async () => {
    const result = await generateComponent(
      { name: "StrictButton", description: "Strict mode compliant button" },
      "test-api-key",
    );

    expect(result.component).toContain("interface");
    expect(result.component).toContain("React.forwardRef");
  });

  it("generates Storybook CSF3 compatible stories", async () => {
    const result = await generateComponent(
      { name: "StoryButton", description: "Button with stories" },
      "test-api-key",
    );

    expect(result.story).toContain("Meta");
    expect(result.story).toContain("StoryObj");
  });

  it("includes accessibility features in generated components", async () => {
    const componentWithA11y = `...ARIA attributes...`;
    mockCreate.mockResolvedValueOnce({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            component: componentWithA11y,
            story: MOCK_STORY,
            test: MOCK_TEST,
          }),
        },
      ],
    });

    const result = await generateComponent(
      {
        name: "A11yButton",
        description: "Accessible button component",
        requirements: ["ARIA labels", "Keyboard navigation"],
      },
      "test-api-key",
    );

    expect(result.component).toBeDefined();
  });
});
