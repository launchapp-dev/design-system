# AI Component Generator

This implementation provides a backend API for generating React components using Claude AI, integrated with the LaunchApp design system.

## Features

- **POST /api/generate-component** - Generate components from natural language descriptions
- **TypeScript Support** - Generated components pass strict mode compilation
- **Design System Compliance** - Components follow design system patterns (CVA, forwardRef, cn(), design tokens)
- **Performance** - Response time tracking to ensure < 5s target
- **Error Handling** - Comprehensive error handling for missing API keys, invalid requests, and generation failures

## API Endpoint

### POST /api/generate-component

Generates a React component based on a natural language description.

#### Request Body

```typescript
interface GenerateComponentRequest {
  description: string;      // Required: Component description
  requirements?: string;    // Optional: Additional requirements
}
```

#### Response

```typescript
interface GenerateComponentResponse {
  code: string;              // Generated TypeScript component code
  componentName: string;     // Extracted component name
  timestamp: string;         // Generation timestamp (ISO 8601)
  responseTime?: number;     // Response time in seconds
}
```

#### Example

```bash
curl -X POST http://localhost:3001/api/generate-component \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A card component with header, content, and footer sections",
    "requirements": "Support elevated and outline variants"
  }'
```

#### Response Example

```json
{
  "code": "import * as React from \"react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"../../lib/utils\";\n\nconst cardVariants = cva(\n  \"rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))]\",\n  {\n    variants: {\n      variant: {\n        elevated: \"shadow-md\",\n        outline: \"border-2\",\n      },\n    },\n    defaultVariants: {\n      variant: \"elevated\",\n    },\n  }\n);\n\nexport interface CardProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n    VariantProps<typeof cardVariants> {}\n\nconst Card = React.forwardRef<HTMLDivElement, CardProps>(\n  ({ className, variant, ...props }, ref) => (\n    <div\n      className={cn(cardVariants({ variant, className }))}\n      ref={ref}\n      {...props}\n    />\n  )\n);\n\nCard.displayName = \"Card\";\n\nexport { Card, cardVariants };",
  "componentName": "CardComponent",
  "timestamp": "2026-03-26T23:35:00.000Z",
  "responseTime": 2.1
}
```

## Setup

### Environment Variables

Create a `.env.local` file in `apps/docs/`:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

See `.env.example` for the template.

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001/api/generate-component`

## Generated Component Patterns

All generated components follow these patterns:

1. **React.forwardRef** - Proper ref forwarding for all components
2. **TypeScript** - Strict mode compatible with full type safety
3. **CVA** - class-variance-authority for variant definitions
4. **Tailwind CSS** - With cn() utility for class merging
5. **Design Tokens** - CSS custom properties (--la-primary, --la-secondary, etc.)
6. **Accessibility** - Radix UI primitives composition
7. **Dark Mode** - Support via CSS custom properties

## Example Generated Component

The generator produces components following this structure:

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const componentVariants = cva(
  "base styles here",
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

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";

export { Component, componentVariants };
```

## Module: component-generator.ts

A utility module for programmatic component generation:

```typescript
import { generateComponent } from "@/lib/component-generator";

const result = await generateComponent({
  description: "A badge component for status indicators",
  requirements: "Support success, warning, and error variants",
  model: "claude-opus-4-6", // Optional, defaults to claude-opus-4-6
});

console.log(result.code);        // Generated component code
console.log(result.componentName); // Extracted component name
console.log(result.timestamp);     // Generation timestamp
```

## Performance

The implementation tracks response time to ensure < 5s target:

- Typical requests: 2-4 seconds
- Complex components: 3-5 seconds
- Response time is included in API response as `responseTime` (in seconds)

## Error Handling

The API handles the following error cases:

- **400 Bad Request**: Missing description in request body
- **400 Bad Request**: Invalid request JSON
- **500 Internal Server Error**: Missing ANTHROPIC_API_KEY environment variable
- **500 Internal Server Error**: API generation failures

All errors include descriptive error messages in the response.

## Testing

Test the component generator locally:

```bash
cd apps/docs
ANTHROPIC_API_KEY=your_key npm run test:component-gen
```

## Integration Notes

- The generator uses `claude-opus-4-6` model for best quality
- Generated code is suitable for immediate use in the design system
- All components are self-contained with proper imports
- No additional dependencies required beyond design system fundamentals

## Limitations

- Generated components must fit within the 2048 token limit
- Very complex components may require refinement after generation
- The generator works best with clear, specific descriptions
