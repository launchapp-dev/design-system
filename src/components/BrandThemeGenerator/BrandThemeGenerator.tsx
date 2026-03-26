"use client";

import React, { useState } from "react";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { Badge } from "../Badge/Badge";
import type { VisionColorMap, VisionThemeResult } from "../../lib/vision";
import { createTheme } from "../../themes/createTheme";
import { cn } from "../../lib/utils";

export interface BrandThemeGeneratorProps {
  onSaveTheme?: (theme: VisionThemeResult, name: string) => void;
  className?: string;
}

interface ColorInputState {
  [key: string]: string;
}

const ColorKeys: Array<keyof VisionColorMap> = [
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
];

const BrandThemeGenerator = React.forwardRef<
  HTMLDivElement,
  BrandThemeGeneratorProps
>(({ onSaveTheme, className }, ref) => {
  const [imageUrl, setImageUrl] = useState("");
  const [colors, setColors] = useState<VisionColorMap | null>(null);
  const [theme, setTheme] = useState<VisionThemeResult["theme"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [colorOverrides, setColorOverrides] = useState<ColorInputState>({});
  const [themeName, setThemeName] = useState("");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  const extractedColors: VisionColorMap = colorOverrides.primary
    ? {
        primary: colorOverrides.primary || colors?.primary || "#3b82f6",
        secondary: colorOverrides.secondary || colors?.secondary || "#6366f1",
        muted: colorOverrides.muted || colors?.muted || "#94a3b8",
        accent: colorOverrides.accent || colors?.accent || "#f59e0b",
        destructive:
          colorOverrides.destructive || colors?.destructive || "#ef4444",
      }
    : colors || {
        primary: "#3b82f6",
        secondary: "#6366f1",
        muted: "#94a3b8",
        accent: "#f59e0b",
        destructive: "#ef4444",
      };

  const handleAnalyzeImage = async () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the vision API endpoint
      // This assumes a backend API is available at /api/analyze-brand
      const response = await fetch("/api/analyze-brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to analyze image: ${text}`);
      }

      const result = (await response.json()) as {
        colors: VisionColorMap;
        theme: VisionThemeResult["theme"];
      };

      setColors(result.colors);
      setTheme(result.theme);
      setColorOverrides({});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while analyzing the image"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: string, value: string) => {
    const validHex = /^#[0-9a-fA-F]{6}$/.test(value);
    if (validHex || value === "") {
      setColorOverrides((prev) => ({
        ...prev,
        [key]: value,
      }));
      if (validHex) {
        const newTheme = createTheme(value);
        if (key === "primary") {
          setTheme(newTheme);
        }
      }
    }
  };

  const handleSaveTheme = () => {
    if (!theme || !themeName.trim()) {
      setError("Please enter a theme name");
      return;
    }

    onSaveTheme?.(
      {
        colors: extractedColors,
        theme,
      },
      themeName
    );

    setThemeName("");
    setImageUrl("");
    setColors(null);
    setTheme(null);
    setColorOverrides({});
  };

  const applyThemeStyles = (isDark: boolean) => {
    if (!theme) return {};

    const tokens = isDark ? theme.dark : theme.light;
    const styles: Record<string, string> = {};

    for (const [key, value] of Object.entries(tokens)) {
      styles[`--la-${key}`] = `${value}`;
    }

    return styles;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-4xl mx-auto space-y-6 p-6",
        className
      )}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Brand Theme Generator</h2>
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          Extract colors from your brand website and generate a complete design
          system theme
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-url">Website Screenshot URL or Image URL</Label>
          <Input
            id="image-url"
            placeholder="https://example.com/screenshot.png or https://yoursite.com"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
            Provide a screenshot of your website or a direct image URL. The AI
            will extract dominant colors.
          </p>
        </div>

        <Button
          onClick={handleAnalyzeImage}
          disabled={loading || !imageUrl.trim()}
          className="w-full"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </Button>

        {error && (
          <div className="p-3 bg-[hsl(var(--la-destructive)/0.1)] text-[hsl(var(--la-destructive))] rounded-md text-sm">
            {error}
          </div>
        )}
      </Card>

      {colors && theme && (
        <>
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Extracted Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {ColorKeys.map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-xs font-medium capitalize text-[hsl(var(--la-foreground))]">
                      {key}
                    </label>
                    <div className="space-y-1">
                      <div
                        className="w-full h-16 rounded-md border border-[hsl(var(--la-border))]"
                        style={{
                          backgroundColor:
                            colorOverrides[key] || colors[key],
                        }}
                      />
                      <Input
                        type="text"
                        value={colorOverrides[key] || colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        placeholder="#000000"
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Theme Preview</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={previewMode === "light" ? "default" : "outline"}
                  onClick={() => setPreviewMode("light")}
                >
                  Light
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "dark" ? "default" : "outline"}
                  onClick={() => setPreviewMode("dark")}
                >
                  Dark
                </Button>
              </div>
            </div>

            <div
              className={cn(
                "p-6 rounded-lg space-y-3",
                previewMode === "dark"
                  ? "bg-[hsl(var(--la-background))] dark"
                  : "bg-[hsl(var(--la-background))]"
              )}
              style={applyThemeStyles(previewMode === "dark") as React.CSSProperties}
            >
              <div className="space-y-3">
                <Button className="w-full">
                  Primary Button
                </Button>
                <Button variant="secondary" className="w-full">
                  Secondary Button
                </Button>
                <Button variant="outline" className="w-full">
                  Outline Button
                </Button>
                <Button variant="destructive" className="w-full">
                  Destructive Button
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>

                <div className="pt-3 space-y-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[hsl(var(--la-muted-foreground))]">
                      BADGES
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-3 p-4 bg-[hsl(var(--la-card))] rounded-md border border-[hsl(var(--la-border))]">
                  <p className="text-sm text-[hsl(var(--la-foreground))]">
                    This is a card preview with the extracted theme applied.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Save Generated Theme</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    placeholder="e.g., Acme Brand"
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSaveTheme}
                  disabled={!themeName.trim()}
                  className="w-full"
                >
                  Save Theme
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
});

BrandThemeGenerator.displayName = "BrandThemeGenerator";

export { BrandThemeGenerator };
