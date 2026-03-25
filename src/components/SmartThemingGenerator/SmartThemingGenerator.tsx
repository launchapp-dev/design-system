"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { Input } from "../Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { Label } from "../Label";
import { analyzeImageColors, type VisionThemeResult } from "@/lib/vision";
import { createTheme, type ThemeResult } from "@/themes/createTheme";

const themingGeneratorVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SmartThemingGeneratorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof themingGeneratorVariants> {
  apiKey?: string;
  onThemeGenerated?: (result: ThemeResult) => void;
  onVisionResult?: (result: VisionThemeResult) => void;
}

interface ColorInputs {
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
  destructive: string;
}

function ColorSwatch({
  label,
  color,
  onChange,
}: {
  label: string;
  color: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-16 cursor-pointer rounded border border-input"
          aria-label={`${label} color picker`}
        />
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm"
          placeholder="#000000"
          pattern="^#[0-9a-fA-F]{6}$"
        />
      </div>
    </div>
  );
}

function PreviewComponent({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <p className="mb-3 text-xs font-semibold text-muted-foreground">{label}</p>
      {children}
    </Card>
  );
}

const SmartThemingGenerator = React.forwardRef<
  HTMLDivElement,
  SmartThemingGeneratorProps
>(
  (
    {
      className,
      variant,
      apiKey,
      onThemeGenerated,
      onVisionResult,
      ...props
    },
    ref
  ) => {
    const [colors, setColors] = React.useState<ColorInputs>({
      primary: "#3b82f6",
      secondary: "#06b6d4",
      muted: "#94a3b8",
      accent: "#f59e0b",
      destructive: "#ef4444",
    });

    const [theme, setTheme] = React.useState<ThemeResult | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [previewScope, setPreviewScope] = React.useState<HTMLDivElement | null>(
      null
    );
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Apply theme tokens to preview scope
    React.useEffect(() => {
      if (!theme || !previewScope) return;

      const isDark = previewScope.classList.contains("dark");
      const tokens = isDark ? theme.dark : theme.light;

      Object.entries(tokens).forEach(([key, value]) => {
        previewScope.style.setProperty(`--la-${key}`, value);
      });
    }, [theme, previewScope]);

    // Generate theme from primary color
    const handleGenerateTheme = React.useCallback(() => {
      try {
        setError(null);
        const newTheme = createTheme(colors.primary);
        setTheme(newTheme);
        onThemeGenerated?.(newTheme);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to generate theme";
        setError(message);
      }
    }, [colors.primary, onThemeGenerated]);

    // Handle image upload for Vision API
    const handleImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!apiKey) {
        setError("OpenAI API key is required for Vision analysis");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const base64 = e.target?.result as string;
            const result = await analyzeImageColors(base64, {
              apiKey,
              model: "gpt-4o",
            });

            setColors({
              primary: result.colors.primary,
              secondary: result.colors.secondary,
              muted: result.colors.muted,
              accent: result.colors.accent,
              destructive: result.colors.destructive,
            });

            setTheme(result.theme);
            onVisionResult?.(result);
            onThemeGenerated?.(result.theme);
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Vision API analysis failed";
            setError(message);
          } finally {
            setLoading(false);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to read file";
        setError(message);
        setLoading(false);
      }
    };

    const handleCopyTokens = () => {
      if (!theme) return;
      const css = theme.cssString;
      navigator.clipboard.writeText(css);
    };

    return (
      <div
        ref={ref}
        className={cn(themingGeneratorVariants({ variant, className }))}
        {...props}
      >
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Theme</CardTitle>
            <CardDescription>
              Upload an image or manually adjust colors to generate a complete design
              system theme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vision API Upload */}
            {apiKey && (
              <div className="space-y-3">
                <Label>Upload Image for Vision Analysis</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  aria-label="Upload image for color analysis"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Analyzing..." : "Upload Image"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Upload a brand image to automatically extract dominant colors
                </p>
              </div>
            )}

            {/* Manual Color Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Manual Color Adjustment</Label>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ColorSwatch
                  label="Primary"
                  color={colors.primary}
                  onChange={(c) =>
                    setColors((prev) => ({ ...prev, primary: c }))
                  }
                />
                <ColorSwatch
                  label="Secondary"
                  color={colors.secondary}
                  onChange={(c) =>
                    setColors((prev) => ({ ...prev, secondary: c }))
                  }
                />
                <ColorSwatch
                  label="Muted"
                  color={colors.muted}
                  onChange={(c) =>
                    setColors((prev) => ({ ...prev, muted: c }))
                  }
                />
                <ColorSwatch
                  label="Accent"
                  color={colors.accent}
                  onChange={(c) =>
                    setColors((prev) => ({ ...prev, accent: c }))
                  }
                />
                <ColorSwatch
                  label="Destructive"
                  color={colors.destructive}
                  onChange={(c) =>
                    setColors((prev) => ({ ...prev, destructive: c }))
                  }
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerateTheme}
              className="w-full"
              size="lg"
            >
              Generate Theme
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        {theme && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  Generated colors from your theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                  {Object.entries(colors).map(([key, color]) => (
                    <div key={key} className="space-y-2">
                      <div
                        className="h-24 w-full rounded-md border border-border"
                        style={{ backgroundColor: color }}
                        aria-label={`${key} color preview`}
                      />
                      <div>
                        <p className="text-xs font-semibold capitalize text-foreground">
                          {key}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {color}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Components rendered with your generated theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  ref={setPreviewScope}
                  className="space-y-6 rounded-lg border border-border bg-background p-6"
                >
                  <PreviewComponent label="Buttons">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Primary Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </PreviewComponent>

                  <PreviewComponent label="Cards">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-base">Card Title</CardTitle>
                          <CardDescription>Card description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Card content goes here</p>
                        </CardContent>
                      </Card>
                      <Card className="border-border bg-accent">
                        <CardHeader>
                          <CardTitle className="text-base">Accent Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Uses accent color</p>
                        </CardContent>
                      </Card>
                    </div>
                  </PreviewComponent>

                  <PreviewComponent label="Badges">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Primary
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        Secondary
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        Accent
                      </span>
                      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        Muted
                      </span>
                      <span className="inline-flex items-center rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
                        Destructive
                      </span>
                    </div>
                  </PreviewComponent>

                  <PreviewComponent label="Text & Borders">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-foreground">Foreground text</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Muted text</p>
                      </div>
                      <div className="border border-border p-3 rounded-md">
                        <p className="text-sm">Content with border</p>
                      </div>
                    </div>
                  </PreviewComponent>
                </div>
              </CardContent>
            </Card>

            {/* Token Export */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Tokens</CardTitle>
                <CardDescription>
                  CSS custom properties for your generated theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                  <code className="font-mono text-muted-foreground">
                    {theme.cssString}
                  </code>
                </pre>
                <Button onClick={handleCopyTokens} variant="outline" className="w-full">
                  Copy CSS Variables
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
);

SmartThemingGenerator.displayName = "SmartThemingGenerator";

export { SmartThemingGenerator };
