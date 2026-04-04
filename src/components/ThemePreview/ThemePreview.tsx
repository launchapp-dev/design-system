import * as React from "react";
import { cn } from "@/lib/utils";
import type { VisionColorMap } from "@/lib/vision";
import { createTheme } from "@/themes/createTheme";
import { Badge } from "../Badge";
import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card";
import { Label } from "../Label";
import { Switch } from "../Switch";

export interface ThemePreviewProps {
  colors: VisionColorMap | null;
  className?: string;
}

interface ColorSwatchProps {
  label: string;
  hslValue: string;
  hexValue?: string;
}

function _hexToHsl(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

function ColorSwatch({ label, hslValue, hexValue }: ColorSwatchProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div
        className="h-16 rounded-md border border-border"
        style={{ backgroundColor: hslValue }}
        title={`${hslValue}${hexValue ? ` (${hexValue})` : ""}`}
      />
      <p className="text-xs font-mono text-muted-foreground">
        {hexValue || hslValue}
      </p>
    </div>
  );
}

const exportThemeAsJson = (
  colors: VisionColorMap | null,
  theme: ReturnType<typeof createTheme> | null,
) => {
  if (!colors || !theme) return;

  const themeExport = {
    metadata: {
      version: "1.0.0",
      generated: new Date().toISOString(),
      name: "Generated Theme",
    },
    colors: {
      extracted: colors,
    },
    tokens: {
      light: theme.light,
      dark: theme.dark,
    },
    css: theme.cssString,
  };

  const json = JSON.stringify(themeExport, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `theme-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const ThemePreview = React.forwardRef<HTMLDivElement, ThemePreviewProps>(
  ({ colors, className }, ref) => {
    const [isDark, setIsDark] = React.useState(false);
    const [theme, setTheme] = React.useState<ReturnType<
      typeof createTheme
    > | null>(null);

    React.useEffect(() => {
      if (!colors) return;
      try {
        const generatedTheme = createTheme(colors.primary);
        setTheme(generatedTheme);
      } catch (err) {
        console.error("Failed to create theme:", err);
      }
    }, [colors]);

    if (!colors || !theme) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border bg-card p-6 text-card-foreground",
            className,
          )}
        >
          <p className="text-sm text-muted-foreground">
            Generate a theme using the Smart Theming Generator to see a preview
          </p>
        </div>
      );
    }

    const currentTokens = isDark ? theme.dark : theme.light;

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>
                Live preview of your generated theme
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="dark-mode-toggle"
                  className="text-sm font-medium"
                >
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode-toggle"
                  checked={isDark}
                  onCheckedChange={setIsDark}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportThemeAsJson(colors, theme)}
                disabled={!colors || !theme}
              >
                Export JSON
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Extracted and generated colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <ColorSwatch
                label="Primary"
                hslValue={`hsl(${currentTokens.primary})`}
                hexValue={colors.primary}
              />
              <ColorSwatch
                label="Secondary"
                hslValue={`hsl(${currentTokens.secondary})`}
                hexValue={colors.secondary}
              />
              <ColorSwatch
                label="Accent"
                hslValue={`hsl(${currentTokens.accent})`}
                hexValue={colors.accent}
              />
              <ColorSwatch
                label="Muted"
                hslValue={`hsl(${currentTokens.muted})`}
                hexValue={colors.muted}
              />
              <ColorSwatch
                label="Destructive"
                hslValue={`hsl(${currentTokens.destructive})`}
                hexValue={colors.destructive}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Examples</CardTitle>
            <CardDescription>
              See how your theme looks with real components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Badges</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Card</p>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Sample Card</CardTitle>
                  <CardDescription>
                    This card uses your generated theme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The colors and styling adapt to your theme in real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSS Tokens</CardTitle>
            <CardDescription>
              Copy and paste these CSS variables into your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                {isDark ? "Dark Mode" : "Light Mode"}
              </div>
              <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
                <code className="font-mono">
                  {isDark
                    ? `:root.dark {\n${Object.entries(currentTokens)
                        .map(([key, value]) => `  --la-${key}: ${value};`)
                        .join("\n")}\n}`
                    : `:root {\n${Object.entries(currentTokens)
                        .map(([key, value]) => `  --la-${key}: ${value};`)
                        .join("\n")}\n}`}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Full CSS Output</CardTitle>
            <CardDescription>
              Complete CSS for both light and dark modes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
              <code className="font-mono">{theme.cssString}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    );
  },
);

ThemePreview.displayName = "ThemePreview";
