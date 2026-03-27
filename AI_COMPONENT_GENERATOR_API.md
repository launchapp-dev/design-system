# AI Component Generator API

A backend API for generating production-ready React components using Claude AI. This API accepts component descriptions and requirements, generates TypeScript component code, Storybook stories, and unit tests following the LaunchApp design system patterns.

## Features

- **Claude API Integration**: Uses Claude 3.5 Sonnet for intelligent code generation
- **Design System Compliance**: Generates components following design system patterns:
  - Radix UI primitives
  - Class Variance Authority (CVA) for variants
  - Tailwind CSS with design tokens
  - Dark mode support
- **Complete Output**: Generates component code, Storybook stories, and tests
- **Validation**: Validates generated code for TypeScript strict mode compliance
- **Accessibility**: Ensures ARIA attributes and keyboard navigation

## API Endpoints

### Request Format

The API accepts two request types:

#### 1. Structured Request

Send a detailed component specification:

```typescript
interface APIRequest {
  type: "structured";
  payload: {
    name: string;              // PascalCase component name (required)
    description: string;       // Component description (required)
    requirements?: string[];   // Additional requirements
    baseComponent?: string;    // Base Radix UI component
    variants?: Record<string, string[]>; // Variant definitions
  };
  apiKey?: string;             // Claude API key (defaults to env var)
}
```

**Example:**

```json
{
  "type": "structured",
  "payload": {
    "name": "CustomButton",
    "description": "A button component with loading state",
    "variants": {
      "variant": ["default", "outline", "ghost"],
      "size": ["sm", "md", "lg"],
      "state": ["idle", "loading", "disabled"]
    },
    "requirements": [
      "Show spinner when loading",
      "Support icon slots",
      "Keyboard accessible"
    ],
    "baseComponent": "button"
  },
  "apiKey": "sk-ant-..."
}
```

#### 2. Description Request

Send a simple natural language description:

```typescript
interface APIRequest {
  type: "description";
  payload: string;  // Component name and description
  apiKey?: string;  // Claude API key (defaults to env var)
}
```

**Example:**

```json
{
  "type": "description",
  "payload": "CustomButton - A button with loading spinner and icon support",
  "apiKey": "sk-ant-..."
}
```

### Response Format

```typescript
interface APIResponse {
  success: boolean;
  data?: {
    component: string;        // Generated TSX component code
    story: string;            // Storybook CSF3 story code
    test: string;             // Vitest test code
    validation: {
      isValid: boolean;       // TypeScript validation result
      errors: string[];       // Validation errors if any
    };
  };
  error?: string;             // Error message on failure
  code?: string;              // Error code for handling
}
```

## Usage Examples

### JavaScript/Node.js

```javascript
import { handleComponentGenerationRequest } from "@launchapp/design-system";

const request = {
  type: "structured",
  payload: {
    name: "Card",
    description: "A card component with header, content, and footer",
    variants: {
      variant: ["default", "elevated"],
      size: ["sm", "md", "lg"],
    },
  },
  apiKey: process.env.ANTHROPIC_API_KEY,
};

const response = await handleComponentGenerationRequest(request);

if (response.success) {
  const { component, story, test, validation } = response.data;

  if (validation.isValid) {
    console.log("Generated component:", component);
    console.log("Generated story:", story);
    console.log("Generated test:", test);
  } else {
    console.error("Validation errors:", validation.errors);
  }
} else {
  console.error("Generation failed:", response.error);
}
```

### TypeScript with Strict Types

```typescript
import {
  generateComponent,
  type ComponentGenerationRequest,
} from "@launchapp/design-system";

const request: ComponentGenerationRequest = {
  name: "Dialog",
  description: "An accessible modal dialog component",
  baseComponent: "Dialog",
  requirements: [
    "Focus management when opening",
    "Close on escape key",
    "Prevent body scroll when open",
  ],
};

const result = await generateComponent(request, process.env.ANTHROPIC_API_KEY);

console.log("Component validation:", result.validation);
```

### From Natural Language Description

```typescript
import { generateComponentFromDescription } from "@launchapp/design-system";

const result = await generateComponentFromDescription(
  "Toast - A notification component that appears at the bottom of the screen",
  process.env.ANTHROPIC_API_KEY
);

console.log("Generated files:");
console.log("- Component:", result.component.length, "bytes");
console.log("- Story:", result.story.length, "bytes");
console.log("- Test:", result.test.length, "bytes");
```

## Generated Component Patterns

All generated components follow these patterns:

### Component Structure

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  /* base styles */,
  {
    variants: {
      variant: { /* variant styles */ },
      size: { /* size variants */ },
    },
    defaultVariants: { /* defaults */ },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Component.displayName = "Component";

export { Component, componentVariants };
export type ComponentVariants = VariantProps<typeof componentVariants>;
```

### Styling with Design Tokens

Components use CSS custom properties for theming:

```css
.component {
  color: hsl(var(--la-foreground));
  background-color: hsl(var(--la-background));
}

.variant-primary {
  background-color: hsl(var(--la-primary));
  color: hsl(var(--la-primary-foreground));
}

.variant-destructive {
  background-color: hsl(var(--la-destructive));
  color: hsl(var(--la-destructive-foreground));
}

@media (prefers-color-scheme: dark) {
  .component {
    color: hsl(var(--la-foreground) / 0.8);
  }
}
```

### Accessibility Features

Generated components include:

- Proper ARIA attributes (`role`, `aria-label`, `aria-expanded`, etc.)
- Keyboard navigation support (Tab, Arrow keys, Enter, Escape)
- Focus management
- Screen reader announcements
- Semantic HTML

### Storybook Stories (CSF3)

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./Component";

const meta: Meta<typeof Component> = {
  title: "Components/Component",
  component: Component,
  parameters: {
    docs: {
      description: {
        component: "Component description with accessibility info...",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: { /* default args */ },
};

export const Variant: Story = {
  args: { /* variant args */ },
};
```

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component>Content</Component>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies variant styling", () => {
    render(<Component variant="primary">Button</Component>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });
});
```

## Input Validation

### Component Name Validation

- Must be PascalCase (e.g., `CustomButton`, `DialogBox`)
- Must start with uppercase letter
- Can contain letters and numbers only
- Maximum 100 characters

### Description Validation

- Required, must be non-empty
- Maximum 2000 characters
- Should clearly describe the component's purpose

### Variant Validation

- Variant names must be valid property names
- Each variant should have multiple options
- Options should be meaningful and self-documenting

## Error Handling

The API returns specific error codes for different failure scenarios:

| Code | Meaning | Action |
|------|---------|--------|
| `INVALID_REQUEST` | Malformed request | Check request structure |
| `MISSING_TYPE` | Missing `type` field | Add type: "structured" or "description" |
| `MISSING_PAYLOAD` | Missing `payload` field | Add payload with component spec |
| `MISSING_NAME` | Component name required | Provide PascalCase name |
| `MISSING_DESCRIPTION` | Description required | Add meaningful description |
| `INVALID_NAME_FORMAT` | Name not PascalCase | Use PascalCase (e.g., CustomButton) |
| `NAME_TOO_LONG` | Name exceeds 100 chars | Shorten the name |
| `DESCRIPTION_TOO_LONG` | Description exceeds 2000 chars | Make description more concise |
| `INVALID_REQUEST_TYPE` | Unknown request type | Use "structured" or "description" |
| `INVALID_DESCRIPTION` | Description string empty | Provide non-empty description |
| `GENERATION_ERROR` | API generation failed | Check API key and retry |

## Configuration

### Environment Variables

```bash
# Claude API key (required if not passed in request)
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Custom API endpoint
ANTHROPIC_API_URL=https://api.anthropic.com/v1
```

### API Key Management

1. **Per-Request**: Pass `apiKey` in the request (recommended for APIs)
2. **Environment**: Set `ANTHROPIC_API_KEY` for local development
3. **Priority**: Request `apiKey` takes precedence over environment variable

## Rate Limiting & Quotas

The API uses Claude 3.5 Sonnet, which has standard API limits:

- Rate limits depend on your Anthropic API plan
- Each generation request counts toward your API quota
- Component generation typically uses 1000-3000 tokens

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:3000/api/generate-component \
  -H "Content-Type: application/json" \
  -d '{
    "type": "structured",
    "payload": {
      "name": "TestButton",
      "description": "A test button"
    },
    "apiKey": "sk-ant-..."
  }'
```

### Using Fetch API

```javascript
const response = await fetch("http://localhost:3000/api/generate-component", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "structured",
    payload: {
      name: "TestButton",
      description: "A test button",
    },
    apiKey: "sk-ant-...",
  }),
});

const result = await response.json();
```

## Performance Considerations

- Generation typically takes 10-30 seconds
- Longer component descriptions may increase generation time
- Validation adds ~5 seconds
- Consider implementing request timeouts (30-60 seconds recommended)

## Integration Guide

### With Express.js

```typescript
import express from "express";
import { handleComponentGenerationRequest } from "@launchapp/design-system";

const app = express();
app.use(express.json());

app.post("/api/generate-component", async (req, res) => {
  try {
    const response = await handleComponentGenerationRequest(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.listen(3000);
```

### With Next.js API Routes

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { handleComponentGenerationRequest } from "@launchapp/design-system";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const response = await handleComponentGenerationRequest(req.body);
  res.status(response.success ? 200 : 400).json(response);
}
```

### With Serverless Functions (AWS Lambda)

```typescript
import { handleComponentGenerationRequest } from "@launchapp/design-system";

export const generateComponent = async (event: any) => {
  const response = await handleComponentGenerationRequest(JSON.parse(event.body));

  return {
    statusCode: response.success ? 200 : 400,
    body: JSON.stringify(response),
  };
};
```

## Troubleshooting

### "API key is invalid"

- Verify your Anthropic API key is correct
- Check that the key is active and has available quota
- Ensure the key is passed correctly in the request

### "Generation timeout"

- Increase request timeout to 60+ seconds
- Check network connectivity
- Retry the request

### "Invalid TypeScript validation"

- Review the validation errors returned
- Check that all imports are included
- Verify CVA usage is correct

### "Component name already exists"

- Use a different, more specific component name
- Consider adding qualifiers (e.g., `CustomButton` vs `Button`)

## API Limits & Best Practices

1. **Request Size**: Keep descriptions under 2000 characters
2. **Component Complexity**: Simple components generate faster
3. **Variant Count**: Limit variants to 5-10 per component
4. **Batch Processing**: Use async/await for sequential generations
5. **Caching**: Cache successful generations to avoid duplicates

## Support & Feedback

For issues or feature requests, visit:
- GitHub Issues: https://github.com/launchapp-dev/design-system/issues
- Documentation: https://design-system.launchapp.dev
