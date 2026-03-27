"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { codeToTokens } from "shiki";

interface GenerateComponentRequest {
  description: string;
  requirements?: string;
}

interface GenerateComponentResponse {
  code: string;
  componentName: string;
  timestamp: string;
}

export function AIComponentGenerator() {
  const [description, setDescription] = React.useState("");
  const [requirements, setRequirements] = React.useState("");
  const [generatedCode, setGeneratedCode] = React.useState<string | null>(null);
  const [componentName, setComponentName] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [highlightedCode, setHighlightedCode] = React.useState<any>(null);

  const generateComponent = async () => {
    if (!description.trim()) {
      setError("Please enter a component description");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description.trim(),
          requirements: requirements.trim() || undefined,
        } as GenerateComponentRequest),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate component");
      }

      const data = (await response.json()) as GenerateComponentResponse & {
        responseTime: number;
      };
      setGeneratedCode(data.code);
      setComponentName(data.componentName);
      setError(null);

      // Highlight code
      try {
        const tokens = await codeToTokens(data.code.trim(), {
          lang: "tsx",
          theme: "github-dark",
        });
        setHighlightedCode(tokens);
      } catch (e) {
        console.error("Failed to highlight code:", e);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate component";
      setError(message);
      setGeneratedCode(null);
      setHighlightedCode(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedCode) return;

    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      generateComponent();
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-bold mb-2">AI Component Generator</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Describe a component in natural language, and AI will generate the code for you.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Component Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., A button component with primary, secondary, and outline variants, with sizes sm, md, lg"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-2">
              Additional Requirements (optional)
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Must support loading state, accessible keyboard navigation, custom icons"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={generateComponent}
            disabled={isLoading || !description.trim()}
            className={cn(
              "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
              isLoading || !description.trim()
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" opacity="0.25" />
                  <path d="M4 12a8 8 0 018-8v8" strokeWidth="2" />
                </svg>
                Generating...
              </>
            ) : (
              "Generate Component"
            )}
          </button>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <p className="font-medium">Error</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
          )}
        </div>
      </div>

      {generatedCode && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Generated Code</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Component: <span className="font-mono text-foreground">{componentName}</span>
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs font-medium transition-colors",
                  copied
                    ? "bg-emerald-600/20 text-emerald-600 dark:text-emerald-400"
                    : "text-white/50 hover:text-white/80 hover:bg-white/10"
                )}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {highlightedCode ? (
              <CodeBlockHighlighted tokens={highlightedCode.tokens} bg={highlightedCode.bg} fg={highlightedCode.fg} />
            ) : (
              <pre className="overflow-x-auto p-4 bg-muted rounded-md text-sm">
                <code className="text-foreground">{generatedCode}</code>
              </pre>
            )}
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Component Preview</h3>
            <ComponentPreviewArea code={generatedCode} componentName={componentName || "GeneratedComponent"} />
          </div>
        </div>
      )}

      {!generatedCode && !isLoading && !error && (
        <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Generate a component by filling in the description and clicking the button above.
          </p>
        </div>
      )}
    </div>
  );
}

function CodeBlockHighlighted({
  tokens,
  bg,
  fg,
}: {
  tokens: any[];
  bg: string;
  fg: string;
}) {
  return (
    <pre
      className="overflow-x-auto p-4 rounded-md text-sm m-0"
      style={{ background: bg, color: fg }}
    >
      <code>
        {tokens.map((line, lineIdx) => (
          <span key={lineIdx} className="block">
            {line.map((token: any, tokenIdx: number) => (
              <span
                key={tokenIdx}
                style={{
                  color: token.color,
                  fontStyle: token.fontStyle === 1 ? "italic" : undefined,
                  fontWeight: token.fontStyle === 2 ? "bold" : undefined,
                }}
              >
                {token.content}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}

function ComponentPreviewArea({ code, componentName }: { code: string; componentName: string }) {
  const [previewError, setPreviewError] = React.useState<string | null>(null);
  const [previewElement, setPreviewElement] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    setPreviewError(null);
    setPreviewElement(null);

    try {
      // Attempt to execute the generated code in a sandboxed context
      // For now, we'll show a message that this is a preview
      setPreviewElement(
        <div className="text-center p-8 text-muted-foreground">
          <p className="font-medium mb-2">Component Preview</p>
          <p className="text-sm">
            The generated component <code className="font-mono bg-muted px-2 py-1 rounded">{componentName}</code> has been created and is ready to use.
          </p>
          <p className="text-xs mt-4">Copy the code and integrate it into your project to see it in action.</p>
        </div>
      );
    } catch (err) {
      setPreviewError(err instanceof Error ? err.message : "Failed to preview component");
    }
  }, [code, componentName]);

  if (previewError) {
    return (
      <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
        <p className="font-medium">Preview Error</p>
        <p className="text-xs mt-1">{previewError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[200px] rounded-md border bg-muted/20 flex items-center justify-center p-6">
      {previewElement}
    </div>
  );
}
