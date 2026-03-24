import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Textarea } from "../Textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { Label } from "../Label";
import { Badge } from "../Badge";
import type { ParsedRequirements } from "../../lib/ai/nlp-parser";
import type { GeneratedComponent } from "../../lib/ai/code-generator";
import { parseComponentRequirements } from "../../lib/ai/nlp-parser";
import { generateComponent } from "../../lib/ai/code-generator";

const aiComponentGeneratorVariants = cva("w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AIComponentGeneratorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiComponentGeneratorVariants> {}

interface GenerationState {
  description: string;
  isLoading: boolean;
  error: string | null;
  parsed: ParsedRequirements | null;
  generated: GeneratedComponent | null;
}

const AIComponentGenerator = React.forwardRef<HTMLDivElement, AIComponentGeneratorProps>(
  ({ className, size, ...props }, ref) => {
    const [state, setState] = React.useState<GenerationState>({
      description: "",
      isLoading: false,
      error: null,
      parsed: null,
      generated: null,
    });

    const [copied, setCopied] = React.useState(false);

    const handleGenerate = React.useCallback(async () => {
      if (!state.description.trim()) {
        setState((prev) => ({
          ...prev,
          error: "Please describe the component you want to generate",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const parsed = parseComponentRequirements(state.description);
        const generated = generateComponent(parsed);

        setState((prev) => ({
          ...prev,
          parsed,
          generated,
          isLoading: false,
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to generate component";
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      }
    }, [state.description]);

    const handleCopyCode = React.useCallback(async () => {
      if (!state.generated) return;

      try {
        await navigator.clipboard.writeText(state.generated.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }, [state.generated]);

    const handleClear = React.useCallback(() => {
      setState({
        description: "",
        isLoading: false,
        error: null,
        parsed: null,
        generated: null,
      });
      setCopied(false);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(aiComponentGeneratorVariants({ size }), "flex flex-col gap-6", className)}
        {...props}
      >
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Component</CardTitle>
            <CardDescription>
              Describe what component you want to generate in natural language. Include details about type,
              variants, size options, and any interactive features.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Component Description</Label>
              <Textarea
                id="description"
                placeholder="e.g., A primary button with small, medium, and large sizes, with loading and disabled states"
                value={state.description}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    description: e.target.value,
                    error: null,
                  }))
                }
                disabled={state.isLoading}
                rows={5}
                className="font-mono text-sm"
              />
            </div>

            {state.error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.error}</div>}

            <div className="flex gap-2">
              <Button onClick={handleGenerate} disabled={state.isLoading} className="flex-1">
                {state.isLoading ? "Generating..." : "Generate Component"}
              </Button>
              {state.generated && (
                <Button onClick={handleClear} variant="outline">
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        {state.parsed && state.generated && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <CardTitle>{state.generated.componentName}</CardTitle>
                  <CardDescription>Generated TypeScript component</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Component Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Component Type</Label>
                  <Badge variant="secondary">{state.parsed.componentType}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold text-muted-foreground">File Name</Label>
                  <Badge variant="secondary">{state.generated.fileName}</Badge>
                </div>
              </div>

              {/* Props and Variants */}
              <div className="grid grid-cols-2 gap-4">
                {state.parsed.props.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Props ({state.parsed.props.length})</Label>
                    <div className="flex flex-wrap gap-1">
                      {state.parsed.props.map((prop: typeof state.parsed.props[0]) => (
                        <Badge key={prop.name} variant="outline" className="text-xs">
                          {prop.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(state.parsed.variants).length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Variants ({Object.keys(state.parsed.variants).length})
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(state.parsed.variants).map((variant) => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Code */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-muted-foreground">Generated Code</Label>
                  <Button onClick={handleCopyCode} variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  <code className="font-mono text-foreground">{state.generated.code}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!state.parsed && !state.isLoading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Describe your component above to generate TypeScript component code with all imports, variants, and
                styling built in.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

AIComponentGenerator.displayName = "AIComponentGenerator";

export { AIComponentGenerator, aiComponentGeneratorVariants };
