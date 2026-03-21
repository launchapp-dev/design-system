import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import { Button } from "../Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Popover";

const colorPickerVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ColorPreset {
  label: string;
  value: string;
}

const defaultPresets: ColorPreset[] = [
  { label: "Red", value: "#EF4444" },
  { label: "Orange", value: "#F97316" },
  { label: "Amber", value: "#F59E0B" },
  { label: "Yellow", value: "#EAB308" },
  { label: "Lime", value: "#84CC16" },
  { label: "Green", value: "#22C55E" },
  { label: "Emerald", value: "#10B981" },
  { label: "Teal", value: "#14B8A6" },
  { label: "Cyan", value: "#06B6D4" },
  { label: "Sky", value: "#0EA5E9" },
  { label: "Blue", value: "#3B82F6" },
  { label: "Indigo", value: "#6366F1" },
  { label: "Violet", value: "#8B5CF6" },
  { label: "Purple", value: "#A855F7" },
  { label: "Fuchsia", value: "#D946EF" },
  { label: "Pink", value: "#EC4899" },
  { label: "Rose", value: "#F43F5E" },
  { label: "Slate", value: "#64748B" },
  { label: "Gray", value: "#6B7280" },
  { label: "Zinc", value: "#71717A" },
  { label: "Neutral", value: "#737373" },
  { label: "Stone", value: "#78716C" },
  { label: "Black", value: "#000000" },
  { label: "White", value: "#FFFFFF" },
];

type ColorFormat = "hex" | "rgb" | "hsl";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface ParsedColor {
  rgb: RGB;
  hex: string;
  hsl: HSL;
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function parseColor(value: string): ParsedColor | null {
  let rgb: RGB | null = null;

  if (value.startsWith("#")) {
    rgb = hexToRgb(value);
  } else if (value.startsWith("rgb")) {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      rgb = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      };
    }
  } else if (value.startsWith("hsl")) {
    const match = value.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
    if (match) {
      rgb = hslToRgb({
        h: parseInt(match[1]),
        s: parseInt(match[2]),
        l: parseInt(match[3]),
      });
    }
  }

  if (!rgb) return null;

  return {
    rgb,
    hex: rgbToHex(rgb),
    hsl: rgbToHsl(rgb),
  };
}

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof colorPickerVariants> {
  value: string;
  onChange: (value: string) => void;
  presets?: ColorPreset[];
  format?: ColorFormat;
  showEyedropper?: boolean;
  showInput?: boolean;
  disabled?: boolean;
}

function ColorPicker(
  {
    value,
    onChange,
    presets = defaultPresets,
    format = "hex",
    showEyedropper = true,
    showInput = true,
    disabled = false,
    size,
    className,
    ...props
  }: ColorPickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [open, setOpen] = React.useState(false);
  const [currentFormat, setCurrentFormat] = React.useState<ColorFormat>(format);
  const [internalColor, setInternalColor] = React.useState(() => parseColor(value) || parseColor("#000000")!);

  React.useEffect(() => {
    const parsed = parseColor(value);
    if (parsed) {
      setInternalColor(parsed);
    }
  }, [value]);

  const handleColorChange = React.useCallback(
    (hex: string) => {
      const parsed = parseColor(hex);
      if (parsed) {
        setInternalColor(parsed);
        onChange(hex);
      }
    },
    [onChange]
  );

  const handleEyedropper = React.useCallback(async () => {
    if (!("EyeDropper" in window)) {
      console.warn("EyeDropper API not supported");
      return;
    }

    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch (e) {
      // User cancelled or error
    }
  }, [handleColorChange]);

  const formatColorValue = React.useCallback(
    (rgb: RGB, hex: string, hsl: HSL, fmt: ColorFormat): string => {
      switch (fmt) {
        case "rgb":
          return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case "hsl":
          return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        default:
          return hex;
      }
    },
    []
  );

  const displayValue = formatColorValue(
    internalColor.rgb,
    internalColor.hex,
    internalColor.hsl,
    currentFormat
  );

  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              colorPickerVariants({ size }),
              "rounded-md border border-input overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            style={{ backgroundColor: internalColor.hex }}
            aria-label={`Choose color. Current: ${internalColor.hex}`}
          >
            <span className="sr-only">{internalColor.hex}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  className={cn(
                    "h-6 w-6 rounded border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    internalColor.hex.toUpperCase() === preset.value.toUpperCase() &&
                      "ring-2 ring-ring ring-offset-1"
                  )}
                  style={{ backgroundColor: preset.value }}
                  onClick={() => handleColorChange(preset.value)}
                  aria-label={preset.label}
                  title={preset.label}
                />
              ))}
            </div>

            {showInput && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {(["hex", "rgb", "hsl"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setCurrentFormat(fmt)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs rounded border transition-colors",
                        currentFormat === fmt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input hover:bg-accent"
                      )}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Input
                  value={displayValue}
                  onChange={(e) => {
                    const parsed = parseColor(e.target.value);
                    if (parsed) {
                      handleColorChange(parsed.hex);
                    }
                  }}
                  className="font-mono text-sm"
                  aria-label="Color value"
                />
              </div>
            )}

            {showEyedropper && "EyeDropper" in window && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleEyedropper}
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Pick from screen
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

ColorPicker.displayName = "ColorPicker";

export { ColorPicker, colorPickerVariants, defaultPresets };
export type { ColorPreset, RGB, HSL, ParsedColor };
