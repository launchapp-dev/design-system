import { Anthropic } from "@anthropic-ai/sdk";

const DESIGN_SYSTEM_CONTEXT = `
You are an expert React component developer specializing in the LaunchApp design system.
This design system uses:
- React 19 with TypeScript
- Radix UI primitives for accessibility
- class-variance-authority (CVA) for variant definitions
- Tailwind CSS for styling
- CSS custom properties for theming (--la-*)
- React.forwardRef for all components
- The cn() utility from "../../lib/utils" for class merging

Component Structure:
1. All components use React.forwardRef
2. Accept a className prop and merge with cn()
3. Use CVA for variants (size, variant, color scheme)
4. Compose over Radix primitives - never re-implement accessibility
5. Support dark mode via CSS custom properties
6. Use design tokens like --la-primary, --la-secondary, --la-destructive, --la-muted, --la-accent

Design Tokens (HSL CSS custom properties):
- --la-primary (primary action color)
- --la-primary-foreground (text on primary)
- --la-secondary (secondary action color)
- --la-secondary-foreground (text on secondary)
- --la-destructive (error/delete actions)
- --la-destructive-foreground (text on destructive)
- --la-muted (muted/disabled state)
- --la-muted-foreground (text on muted)
- --la-accent (accent color)
- --la-accent-foreground (text on accent)
- --la-background (page background)
- --la-foreground (text foreground)
- --la-input (input field borders)
- --la-ring (focus ring color)
- --la-radius (border radius)

Export Pattern:
- Export the component as default or named export
- Export the variant type if using CVA
- Example: export { Button, buttonVariants };

TypeScript Requirements:
- Strict mode enabled
- Proper typing for all props
- Interface extending HTML element attributes when applicable
- Use React.forwardRef with proper types

Padding/Sizing Scale:
- sm: smaller size
- md: medium/default size
- lg: large size

Example Component Structure (Button):
\`\`\`tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "base classes here",
  {
    variants: {
      variant: {
        default: "default variant classes",
        outline: "outline variant classes",
      },
      size: {
        sm: "small size classes",
        md: "medium size classes",
        lg: "large size classes",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
\`\`\`

When generating components:
1. Always use React.forwardRef for proper ref forwarding
2. Always include TypeScript interfaces
3. Use CVA for all variant definitions
4. Use Tailwind CSS classes with the cn() utility
5. Reference design tokens via HSL CSS custom properties
6. Ensure the code is valid TypeScript that passes strict mode
7. Include proper displayName for debugging
8. Export both component and variant definitions

IMPORTANT: Generate ONLY the component code. No markdown, no explanations, no code blocks - just valid TypeScript code that can be directly imported and used.
`;

export interface ComponentGeneratorOptions {
  description: string;
  requirements?: string;
  model?: string;
}

export interface GeneratedComponent {
  code: string;
  componentName: string;
  story: string;
  timestamp: string;
  metadata: {
    hasForwardRef: boolean;
    hasCVA: boolean;
    hasTypeScript: boolean;
    hasAccessibility: boolean;
  };
}

function extractComponentName(description: string): string {
  return (
    description
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("") || "GeneratedComponent"
  );
}

function validateComponent(code: string): {
  hasForwardRef: boolean;
  hasCVA: boolean;
  hasTypeScript: boolean;
  hasAccessibility: boolean;
} {
  return {
    hasForwardRef: code.includes("React.forwardRef"),
    hasCVA: code.includes("cva("),
    hasTypeScript:
      code.includes("interface") ||
      code.includes(": ") ||
      code.includes("type "),
    hasAccessibility:
      code.includes("aria-") ||
      code.includes("role=") ||
      code.includes("Radix"),
  };
}

async function generateStorybook(
  componentCode: string,
  componentName: string,
  description: string,
  client: Anthropic,
): Promise<string> {
  const storyPrompt = `Given the following React component code, generate a Storybook story (CSF 3 format) for it.

Component Name: ${componentName}
Description: ${description}

Component Code:
\`\`\`tsx
${componentCode}
\`\`\`

Generate ONLY the Storybook story code in CSF 3 format. The story file should:
1. Import the component and necessary dependencies
2. Export default metadata with title and component
3. Create multiple story variants (default, and any variants the component supports)
4. Include proper TypeScript types
5. Show different use cases and states

Return ONLY the story code - no markdown, no explanations. Start directly with the imports.`;

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: storyPrompt,
      },
    ],
  });

  const story =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (!story) {
    throw new Error("Failed to generate Storybook story");
  }

  return story;
}

export async function generateComponent(
  options: ComponentGeneratorOptions,
): Promise<GeneratedComponent> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }

  const componentName = extractComponentName(options.description);

  const prompt = `${DESIGN_SYSTEM_CONTEXT}

Generate a React component based on the following requirements:

Description: ${options.description}

${options.requirements ? `Additional Requirements: ${options.requirements}` : ""}

Requirements:
1. Component must follow the design system patterns outlined above
2. Use React.forwardRef for the component
3. Include proper TypeScript interfaces and types
4. Use CVA for variant definitions
5. Generate code that passes TypeScript strict mode
6. Use CSS custom properties (--la-*) for theming
7. Include proper accessibility attributes
8. The component should be self-contained and ready to use

Return ONLY the component code - no markdown formatting, no code blocks, no explanations. Just the raw TypeScript code.`;

  const message = await client.messages.create({
    model: options.model || "claude-opus-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const generatedCode =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (!generatedCode) {
    throw new Error("Failed to generate component code");
  }

  // Generate Storybook story
  const story = await generateStorybook(
    generatedCode,
    componentName,
    options.description,
    client,
  );

  // Validate component structure
  const metadata = validateComponent(generatedCode);

  return {
    code: generatedCode,
    componentName,
    story,
    timestamp: new Date().toISOString(),
    metadata,
  };
}
