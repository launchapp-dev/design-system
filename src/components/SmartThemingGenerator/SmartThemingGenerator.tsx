import * as React from "react";
import {
  analyzeImageColors,
  type VisionColorMap,
  type VisionThemeOptions,
} from "@/lib/vision";
import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card";
import { Input } from "../Input";
import { Label } from "../Label";

export interface SmartThemingGeneratorProps {
  apiKey: string;
  onThemeGenerated?: (colors: VisionColorMap) => void;
  disabled?: boolean;
}

interface GeneratorState {
  loading: boolean;
  error: string | null;
  colors: VisionColorMap | null;
  imagePreview: string | null;
  inputMode: "upload" | "url";
  imageUrl: string;
}

const defaultColors: VisionColorMap = {
  primary: "#3b82f6",
  secondary: "#64748b",
  muted: "#e2e8f0",
  accent: "#06b6d4",
  destructive: "#ef4444",
};

export const SmartThemingGenerator = React.forwardRef<
  HTMLDivElement,
  SmartThemingGeneratorProps
>(({ apiKey, onThemeGenerated, disabled = false }, ref) => {
  const [state, setState] = React.useState<GeneratorState>({
    loading: false,
    error: null,
    colors: null,
    imagePreview: null,
    inputMode: "upload",
    imageUrl: "",
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageSelect = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataUrl = event.target?.result as string;
          setState((prev) => ({ ...prev, imagePreview: dataUrl }));

          try {
            const options: VisionThemeOptions = { apiKey };
            const result = await analyzeImageColors(dataUrl, options);
            setState((prev) => ({
              ...prev,
              colors: result.colors,
              loading: false,
            }));
            onThemeGenerated?.(result.colors);
          } catch (err) {
            setState((prev) => ({
              ...prev,
              error:
                err instanceof Error ? err.message : "Failed to analyze image",
              loading: false,
            }));
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to read image",
          loading: false,
        }));
      }
    },
    [apiKey, onThemeGenerated],
  );

  const handleUrlSubmit = React.useCallback(
    async (url: string) => {
      if (!url.trim()) {
        setState((prev) => ({ ...prev, error: "Please enter a valid URL" }));
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const options: VisionThemeOptions = { apiKey };
        const result = await analyzeImageColors(url, options);
        setState((prev) => ({
          ...prev,
          colors: result.colors,
          imagePreview: url,
          loading: false,
        }));
        onThemeGenerated?.(result.colors);
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error:
            err instanceof Error
              ? err.message
              : "Failed to analyze image from URL",
          loading: false,
        }));
      }
    },
    [apiKey, onThemeGenerated],
  );

  const handleColorChange = React.useCallback(
    (key: keyof VisionColorMap, value: string) => {
      setState((prev) => ({
        ...prev,
        colors: prev.colors ? { ...prev.colors, [key]: value } : null,
      }));
      if (state.colors) {
        onThemeGenerated?.({ ...state.colors, [key]: value });
      }
    },
    [state.colors, onThemeGenerated],
  );

  const colors = state.colors || defaultColors;

  return (
    <div ref={ref} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Theme Generator</CardTitle>
          <CardDescription>
            Upload an image to extract a color palette using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-2 border-b">
              <Button
                variant={state.inputMode === "upload" ? "default" : "ghost"}
                size="sm"
                onClick={() =>
                  setState((prev) => ({ ...prev, inputMode: "upload" }))
                }
                disabled={disabled || state.loading}
                className="rounded-b-none"
              >
                Upload Image
              </Button>
              <Button
                variant={state.inputMode === "url" ? "default" : "ghost"}
                size="sm"
                onClick={() =>
                  setState((prev) => ({ ...prev, inputMode: "url" }))
                }
                disabled={disabled || state.loading}
                className="rounded-b-none"
              >
                Image URL
              </Button>
            </div>

            {state.inputMode === "upload" ? (
              <div className="space-y-2 pt-2">
                <Label htmlFor="image-upload">Select Image File</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={disabled || state.loading}
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || state.loading}
                  >
                    {state.loading ? "Analyzing..." : "Browse"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Label htmlFor="image-url">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-url"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={state.imageUrl}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    }
                    disabled={disabled || state.loading}
                  />
                  <Button
                    onClick={() => handleUrlSubmit(state.imageUrl)}
                    disabled={
                      disabled || state.loading || !state.imageUrl.trim()
                    }
                  >
                    {state.loading ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {state.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          {state.imagePreview && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <img
                src={state.imagePreview}
                alt="Preview"
                className="max-h-48 w-full rounded-md object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Extracted Colors</CardTitle>
          <CardDescription>
            Colors extracted from your image. Edit them to refine the theme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(
              [
                "primary",
                "secondary",
                "muted",
                "accent",
                "destructive",
              ] as const
            ).map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`color-${key}`} className="capitalize">
                  {key}
                </Label>
                <div className="flex gap-2">
                  <input
                    id={`color-${key}`}
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={disabled}
                    className="h-10 w-14 cursor-pointer rounded border border-input"
                  />
                  <Input
                    type="text"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={disabled}
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

SmartThemingGenerator.displayName = "SmartThemingGenerator";
