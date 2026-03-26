import * as React from "react";
import { Button } from "../Button";
import { Textarea } from "../Textarea";
import { Label } from "../Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { cn } from "@/lib/utils";

export interface AIComponentGeneratorProps {
  apiKey?: string;
  onComponentGenerated?: (code: string) => void;
  disabled?: boolean;
  className?: string;
}

interface GeneratorState {
  loading: boolean;
  error: string | null;
  generatedCode: string | null;
  description: string;
}

export const AIComponentGenerator = React.forwardRef<
  HTMLDivElement,
  AIComponentGeneratorProps
>(({ apiKey, onComponentGenerated, disabled = false, className }, ref) => {
  const [state, setState] = React.useState<GeneratorState>({
    loading: false,
    error: null,
    generatedCode: null,
    description: "",
  });

  const generateComponent = React.useCallback(async () => {
    if (!state.description.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a component description",
      }));
      return;
    }

    if (!apiKey) {
      setState((prev) => ({
        ...prev,
        error: "API key is required. Please provide an apiKey prop.",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4000,
          system: `You are an expert React component developer. Generate production-ready React components based on natural language descriptions.

Follow these strict guidelines:
1. Use React.forwardRef for all components
2. Import from @/lib/utils the cn utility function
3. Use Radix UI primitives when appropriate
4. Use CVA (class-variance-authority) for variants if the component has variants
5. Use CSS custom properties (--la-*) for theming support
6. Support dark mode through the "dark" class strategy
7. Use compound components pattern when appropriate (e.g., Card.Header, Card.Content)
8. Include proper TypeScript typing with React.HTMLAttributes extensions
9. Always include proper accessibility attributes (aria-*, role, etc.)
10. Use min-h-[44px] for touch-friendly mobile sizes
11. Include proper focus and hover states
12. Export both the component and variant types

Return ONLY the component code, no explanations or comments.
Wrap the code in \`\`\`tsx\n...\n\`\`\``,
          messages: [
            {
              role: "user",
              content: `Generate a React component based on this description:\n\n${state.description}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.statusText}`
        );
      }

      const data = await response.json();
      const responseText =
        data.content[0].type === "text" ? data.content[0].text : "";

      const codeMatch = responseText.match(/```(?:tsx?|jsx?)?\n?([\s\S]*?)\n?```/);
      const code = codeMatch ? codeMatch[1] : responseText;

      setState((prev) => ({
        ...prev,
        generatedCode: code,
        loading: false,
      }));

      onComponentGenerated?.(code);
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to generate component",
        loading: false,
      }));
    }
  }, [state.description, apiKey, onComponentGenerated]);

  const copyToClipboard = React.useCallback(async () => {
    if (!state.generatedCode) return;

    try {
      await navigator.clipboard.writeText(state.generatedCode);
      // Visual feedback (could be enhanced with a toast notification)
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [state.generatedCode]);

  return (
    <div ref={ref} className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>AI Component Generator</CardTitle>
          <CardDescription>
            Describe a component in natural language and let AI generate production-ready code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="component-description">Component Description</Label>
            <Textarea
              id="component-description"
              placeholder="E.g., 'A button component with variant support for default, outline, and ghost styles. Should support size variants: sm, md, lg. Dark mode compatible.'"
              value={state.description}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={disabled || state.loading}
              className="min-h-[120px]"
            />
          </div>

          {state.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={generateComponent}
              disabled={disabled || state.loading || !state.description.trim()}
              className="flex-1"
            >
              {state.loading ? "Generating..." : "Generate Component"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {state.generatedCode && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Component Code</CardTitle>
                <CardDescription>
                  Copy and paste this code into your component file
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                Copy Code
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code className="font-mono text-xs leading-relaxed">
                {state.generatedCode}
              </code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

AIComponentGenerator.displayName = "AIComponentGenerator";
