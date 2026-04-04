import Anthropic from "@anthropic-ai/sdk";

export interface ComponentGenerationRequest {
  name: string;
  description: string;
  requirements?: string[];
  baseComponent?: string;
  variants?: Record<string, string[]>;
}

export interface ComponentGenerationResponse {
  component: string;
  story: string;
  test: string;
  validation: {
    isValid: boolean;
    errors: string[];
  };
}

interface AIGeneratedCode {
  component: string;
  story: string;
  test: string;
}

const SYSTEM_PROMPT = `You are an expert React component developer specializing in Radix UI design systems.
You generate production-ready components that:
1. Use Radix UI primitives as the foundation
2. Use class-variance-authority (CVA) for variant management
3. Follow TypeScript strict mode requirements
4. Include proper accessibility features (ARIA, keyboard navigation)
5. Use Tailwind CSS for styling with design system tokens (--la-*)
6. Support light and dark mode via CSS variables
7. Include proper React.forwardRef for DOM access
8. Export variants type with VariantProps

Design System Context:
- Semantic tokens: primary, secondary, muted, accent, destructive (with -foreground variants)
- Token usage: hsl(var(--la-primary)), hsl(var(--la-primary-foreground))
- Utility function: cn() from "@/lib/utils"
- Size variants: sm, md (default), lg
- Common variants: default, outline, ghost, destructive

Always respond with a JSON object containing:
{
  "component": "... full component TSX code ...",
  "story": "... full Storybook CSF3 story TSX code ...",
  "test": "... full vitest test code ..."
}

Component requirements:
- Default export the component function and named export the CVA variants
- Include proper prop interfaces extending React.HTMLAttributes
- Use React.forwardRef wrapper
- Accessible: ARIA attributes, keyboard support, focus management
- Dark mode support via CSS custom properties
- Proper TypeScript types for all props`;

const VALIDATION_PROMPT = `Check if the following TypeScript React component code:
1. Is syntactically valid
2. Follows TypeScript strict mode
3. Uses proper React patterns
4. Has accessible implementations

If valid, respond with JSON: {"valid": true}
If invalid, respond with JSON: {"valid": false, "errors": ["error1", "error2"]}`;

export async function generateComponent(
  request: ComponentGenerationRequest,
  apiKey?: string,
): Promise<ComponentGenerationResponse> {
  const client = new Anthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
  });

  const userPrompt = formatComponentRequest(request);

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  let generatedCode: AIGeneratedCode;
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    generatedCode = JSON.parse(jsonMatch[0]) as AIGeneratedCode;
  } catch (error) {
    throw new Error(`Failed to parse Claude response: ${error}`);
  }

  const validation = await validateGeneratedComponent(
    generatedCode.component,
    apiKey,
  );

  return {
    component: generatedCode.component,
    story: generatedCode.story,
    test: generatedCode.test,
    validation,
  };
}

function formatComponentRequest(request: ComponentGenerationRequest): string {
  const baseComponentInfo = request.baseComponent
    ? `Base on the ${request.baseComponent} Radix primitive. `
    : "";

  const variantsInfo =
    request.variants && Object.keys(request.variants).length > 0
      ? `
Variant requirements:
${Object.entries(request.variants)
  .map(([name, values]) => `- ${name}: ${values.join(", ")}`)
  .join("\n")}`
      : "";

  const requirementsInfo =
    request.requirements && request.requirements.length > 0
      ? `
Additional requirements:
${request.requirements.map((req) => `- ${req}`).join("\n")}`
      : "";

  return `Generate a new React component with these specifications:

Component Name: ${request.name}
Description: ${request.description}
${baseComponentInfo}${variantsInfo}${requirementsInfo}

Requirements:
- Component file (TSX)
- Storybook story with multiple examples (CSF3 format)
- Vitest unit tests with good coverage
- Full TypeScript strict mode compliance
- Accessibility features
- Dark mode support
- Design system token usage

Return the code as a JSON object with keys: component, story, test`;
}

async function validateGeneratedComponent(
  componentCode: string,
  apiKey?: string,
): Promise<{ isValid: boolean; errors: string[] }> {
  const client = new Anthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
  });

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `${VALIDATION_PROMPT}\n\nCode to validate:\n\`\`\`tsx\n${componentCode}\n\`\`\``,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        isValid: false,
        errors: ["Failed to parse validation response"],
      };
    }

    const validation = JSON.parse(jsonMatch[0]) as {
      valid: boolean;
      errors?: string[];
    };
    return {
      isValid: validation.valid,
      errors: validation.errors || [],
    };
  } catch {
    return {
      isValid: false,
      errors: ["Failed to validate component"],
    };
  }
}

export async function generateComponentFromDescription(
  componentDescription: string,
  apiKey?: string,
): Promise<ComponentGenerationResponse> {
  const nameMatch = componentDescription.match(/^(\w+)\s*[-:]\s*(.+)/);
  const name = nameMatch ? nameMatch[1] : "GeneratedComponent";
  const description = nameMatch ? nameMatch[2] : componentDescription;

  return generateComponent(
    {
      name,
      description,
    },
    apiKey,
  );
}
