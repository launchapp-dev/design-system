"use client";

import * as React from "react";
import { extractBrandColorsFromUrl, extractBrandColorsFromImage } from "@/lib/extract-brand-colors";
import { generatePaletteFromColors } from "@/themes/generatePaletteFromColors";
import type { ExtractedColor } from "@/lib/extract-brand-colors";
import type { Palette } from "@/themes";
import { cn } from "@/lib/utils";

const THEME_PREVIEW_TOKENS = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "destructive", label: "Destructive" },
  { key: "muted", label: "Muted" },
];

function _hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export interface ThemeGeneratorProps {
  className?: string;
  onThemeGenerated?: (palette: Palette) => void;
}

export const ThemeGenerator = React.forwardRef<HTMLDivElement, ThemeGeneratorProps>(
  ({ className, onThemeGenerated }, ref) => {
    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [extractedColors, setExtractedColors] = React.useState<ExtractedColor[]>([]);
    const [generatedPalette, setGeneratedPalette] = React.useState<Palette | null>(null);
    const [inputMode, setInputMode] = React.useState<"url" | "upload">("url");
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleUrlSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) {
          setError("Please enter a valid URL");
          return;
        }

        setIsLoading(true);
        setError(null);
        setExtractedColors([]);
        setGeneratedPalette(null);

        try {
          const colors = await extractBrandColorsFromUrl(input);
          setExtractedColors(colors);

          const palette = generatePaletteFromColors(
            colors,
            `Generated Theme - ${new URL(input).hostname}`,
          );
          setGeneratedPalette(palette);
          onThemeGenerated?.(palette);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to extract colors");
        } finally {
          setIsLoading(false);
        }
      },
      [input, onThemeGenerated],
    );

    const handleFileUpload = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          setError("Please select a valid image file");
          return;
        }

        setIsLoading(true);
        setError(null);
        setExtractedColors([]);
        setGeneratedPalette(null);

        try {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const base64 = (event.target?.result as string)?.split(",")[1];
            if (!base64) {
              setError("Failed to read file");
              return;
            }

            try {
              const colors = await extractBrandColorsFromImage(base64);
              setExtractedColors(colors);

              const palette = generatePaletteFromColors(colors, `Generated Theme - ${file.name}`);
              setGeneratedPalette(palette);
              onThemeGenerated?.(palette);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Failed to extract colors");
            } finally {
              setIsLoading(false);
            }
          };
          reader.readAsDataURL(file);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to process image");
          setIsLoading(false);
        }
      },
      [onThemeGenerated],
    );

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Generate Theme from URL</h2>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setInputMode("url");
                setInput("");
                setExtractedColors([]);
                setGeneratedPalette(null);
                setError(null);
              }}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                inputMode === "url"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted",
              )}
            >
              URL
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode("upload");
                setInput("");
                setExtractedColors([]);
                setGeneratedPalette(null);
                setError(null);
              }}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                inputMode === "upload"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted",
              )}
            >
              Upload Image
            </button>
          </div>

          {inputMode === "url" && (
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isLoading ? "Extracting..." : "Extract Colors"}
              </button>
            </form>
          )}

          {inputMode === "upload" && (
            <div className="space-y-2">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {extractedColors.length > 0 && (
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Extracted Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {extractedColors.map((color, idx) => (
                <div key={idx} className="rounded-lg border border-border p-3">
                  <div
                    className="h-12 rounded-md border border-border mb-2"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                  <p className="text-sm font-medium text-foreground">{color.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{color.hex}</p>
                  <p className="text-xs text-muted-foreground mt-1">{color.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {generatedPalette && (
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Theme</h3>
            <p className="text-sm text-muted-foreground mb-4">{generatedPalette.name}</p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Light Mode</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {THEME_PREVIEW_TOKENS.map(({ key, label }) => {
                    const tokenKey = key as keyof typeof generatedPalette.light;
                    const value = generatedPalette.light[tokenKey];
                    return (
                      <div key={key} className="text-center">
                        <div
                          className="h-12 rounded-md border border-border mb-2 transition-transform hover:scale-105"
                          style={{ backgroundColor: `hsl(${value})` }}
                          title={`hsl(${value})`}
                        />
                        <p className="text-xs font-medium text-foreground">{label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Dark Mode</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {THEME_PREVIEW_TOKENS.map(({ key, label }) => {
                    const tokenKey = key as keyof typeof generatedPalette.dark;
                    const value = generatedPalette.dark[tokenKey];
                    return (
                      <div key={key} className="text-center">
                        <div
                          className="h-12 rounded-md border border-white/20 mb-2 transition-transform hover:scale-105"
                          style={{ backgroundColor: `hsl(${value})` }}
                          title={`hsl(${value})`}
                        />
                        <p className="text-xs font-medium text-foreground">{label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">CSS Variables</h4>
                <pre className="rounded-lg border border-border bg-muted/30 p-3 text-xs font-mono text-muted-foreground overflow-x-auto max-h-40 overflow-y-auto">
                  {`:root {
${Object.entries(generatedPalette.light)
  .map(([key, value]) => `  --la-${key}: ${value};`)
  .join("\n")}
}

.dark {
${Object.entries(generatedPalette.dark)
  .map(([key, value]) => `  --la-${key}: ${value};`)
  .join("\n")}
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ThemeGenerator.displayName = "ThemeGenerator";
