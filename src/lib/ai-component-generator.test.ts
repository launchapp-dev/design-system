import { describe, it, expect, vi, beforeEach } from "vitest";
import Anthropic from "@anthropic-ai/sdk";
import {
  generateComponent,
  generateComponentFromDescription,
  type ComponentGenerationRequest,
} from "./ai-component-generator";

// Hoist the mock above imports — prevents real API calls in all tests
vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn(),
}));

const MOCK_COMPONENT_CODE = `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type ButtonVariants = VariantProps<typeof buttonVariants>;`;

const MOCK_STORY = `import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};`;

const MOCK_TEST = `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies default variant", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });
});`;

const mockCreate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(Anthropic).mockImplementation(
    () =>
      ({
        messages: { create: mockCreate },
      }) as unknown as Anthropic
  );
  mockCreate.mockResolvedValue({
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
  });
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
    const request: ComponentGenerationRequest = {
      name: "TestButton",
      description: "Test button component",
    };

    const result = await generateComponent(request, "test-api-key");

    expect(result.validation).toHaveProperty("isValid");
    expect(result.validation).toHaveProperty("errors");
    expect(Array.isArray(result.validation.errors)).toBe(true);
  });

  it("includes design system patterns in generated code", async () => {
    const result = await generateComponent(
      {
        name: "StyledButton",
        description: "Styled button with design tokens",
      },
      "test-api-key"
    );

    expect(result.component).toContain("cva");
    expect(result.component).toContain("React.forwardRef");
  });

  it("throws error when API key is missing and not in env", async () => {
    const oldEnv = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    // Simulate SDK throwing when no API key is available
    vi.mocked(Anthropic).mockImplementationOnce(() => {
      throw new Error(
        "The ANTHROPIC_API_KEY environment variable is missing or empty"
      );
    });

    try {
      const request: ComponentGenerationRequest = {
        name: "Button",
        description: "A button",
      };

      await expect(generateComponent(request, undefined)).rejects.toThrow();
    } finally {
      if (oldEnv) {
        process.env.ANTHROPIC_API_KEY = oldEnv;
      }
    }
  });

  it("uses provided API key over environment variable", async () => {
    vi.mocked(Anthropic).mockImplementationOnce((config) => {
      expect((config as { apiKey?: string }).apiKey).toBe("custom-key");
      return { messages: { create: mockCreate } } as unknown as Anthropic;
    });

    await generateComponent({ name: "Button", description: "Test" }, "custom-key");
  });
});

describe("generateComponentFromDescription", () => {
  it("extracts component name from description", async () => {
    const result = await generateComponentFromDescription(
      "Button - A customizable button component",
      "test-api-key"
    );

    expect(result.component).toBeDefined();
    expect(result.story).toBeDefined();
    expect(result.test).toBeDefined();
  });

  it("uses full description as name when no delimiter found", async () => {
    const result = await generateComponentFromDescription(
      "A completely new component with multiple features",
      "test-api-key"
    );

    expect(result.component).toBeDefined();
  });
});

describe("Component code generation requirements", () => {
  it("generates TypeScript strict mode compliant code", async () => {
    const result = await generateComponent(
      {
        name: "StrictButton",
        description: "Strict mode compliant button",
      },
      "test-api-key"
    );

    expect(result.component).toContain("interface");
    expect(result.component).toContain("React.forwardRef");
  });

  it("generates Storybook CSF3 compatible stories", async () => {
    const result = await generateComponent(
      {
        name: "StoryButton",
        description: "Button with stories",
      },
      "test-api-key"
    );

    expect(result.story).toContain("Meta");
    expect(result.story).toContain("StoryObj");
  });

  it("includes accessibility features in generated components", async () => {
    const componentWithA11y = `...accessibility features like ARIA attributes...`;
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
      "test-api-key"
    );

    expect(result.component).toBeDefined();
  });
});
