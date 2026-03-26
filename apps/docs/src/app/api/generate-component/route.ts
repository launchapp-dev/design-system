import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

interface GenerateComponentRequest {
  description: string;
  requirements?: string;
}

interface GenerateComponentResponse {
  code: string;
  componentName: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    const body: GenerateComponentRequest = await request.json();

    if (!body.description) {
      return NextResponse.json(
        { error: "Component description is required" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    const prompt = `${DESIGN_SYSTEM_CONTEXT}

Generate a React component based on the following requirements:

Description: ${body.description}

${body.requirements ? `Additional Requirements: ${body.requirements}` : ""}

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
      model: "claude-opus-4-6",
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
      return NextResponse.json(
        { error: "Failed to generate component code" },
        { status: 500 }
      );
    }

    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;

    // Extract component name from description (simple heuristic)
    const componentName =
      body.description
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("") || "GeneratedComponent";

    const response: GenerateComponentResponse = {
      code: generatedCode,
      componentName,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        ...response,
        responseTime,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating component:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
