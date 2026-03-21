import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperAPI {
  open(options?: { signal?: AbortSignal }): Promise<EyeDropperResult>;
}

declare global {
  interface Window {
    EyeDropper?: new () => EyeDropperAPI;
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")
  );
}

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
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

function hslToHex(h: number, s: number, l: number): string {
  const hn = h / 360;
  const sn = s / 100;
  const ln = l / 100;
  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = g = b = ln;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hue2rgb(p, q, hn + 1 / 3);
    g = hue2rgb(p, q, hn);
    b = hue2rgb(p, q, hn - 1 / 3);
  }
  return rgbToHex(r * 255, g * 255, b * 255);
}

function isValidHex(hex: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(hex);
}

export const DEFAULT_PRESETS: string[] = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#000000",
  "#374151",
  "#6b7280",
  "#d1d5db",
  "#f9fafb",
  "#ffffff",
];

const colorPickerTriggerVariants = cva(
  "inline-flex items-center gap-2 rounded-[--la-radius] border font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:bg-[hsl(var(--la-accent))] text-[hsl(var(--la-foreground))]",
        outline:
          "border-[hsl(var(--la-border))] bg-transparent hover:bg-[hsl(var(--la-accent))] text-[hsl(var(--la-foreground))]",
        ghost:
          "border-transparent bg-transparent hover:bg-[hsl(var(--la-accent))] text-[hsl(var(--la-foreground))]",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ColorPickerProps
  extends VariantProps<typeof colorPickerTriggerVariants> {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
}

type ColorFormat = "hex" | "rgb" | "hsl";

function ColorPicker({
  value = "#000000",
  onChange,
  presets = DEFAULT_PRESETS,
  disabled,
  className,
  triggerClassName,
  placeholder = "Pick a color",
  variant,
  size,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [format, setFormat] = React.useState<ColorFormat>("hex");
  const [hexInput, setHexInput] = React.useState(value);
  const [rgbInput, setRgbInput] = React.useState({ r: "0", g: "0", b: "0" });
  const [hslInput, setHslInput] = React.useState({ h: "0", s: "0", l: "0" });

  const supportsEyeDropper =
    typeof window !== "undefined" && "EyeDropper" in window;

  React.useEffect(() => {
    if (!isValidHex(value)) return;
    setHexInput(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbInput({
        r: String(rgb.r),
        g: String(rgb.g),
        b: String(rgb.b),
      });
    }
    const hsl = hexToHsl(value);
    if (hsl) {
      setHslInput({
        h: String(hsl.h),
        s: String(hsl.s),
        l: String(hsl.l),
      });
    }
  }, [value]);

  const handleColorChange = (hex: string) => {
    if (!isValidHex(hex)) return;
    onChange?.(hex);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHexInput(v);
    if (isValidHex(v)) handleColorChange(v);
  };

  const handleRgbChange = (channel: "r" | "g" | "b", v: string) => {
    const next = { ...rgbInput, [channel]: v };
    setRgbInput(next);
    const r = Math.min(255, Math.max(0, Number(next.r)));
    const g = Math.min(255, Math.max(0, Number(next.g)));
    const b = Math.min(255, Math.max(0, Number(next.b)));
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      handleColorChange(rgbToHex(r, g, b));
    }
  };

  const handleHslChange = (channel: "h" | "s" | "l", v: string) => {
    const next = { ...hslInput, [channel]: v };
    setHslInput(next);
    const h = Math.min(360, Math.max(0, Number(next.h)));
    const s = Math.min(100, Math.max(0, Number(next.s)));
    const l = Math.min(100, Math.max(0, Number(next.l)));
    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
      handleColorChange(hslToHex(h, s, l));
    }
  };

  const handleEyeDropper = async () => {
    if (!supportsEyeDropper || !window.EyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch {
      // user cancelled or browser denied
    }
  };

  const displayColor = isValidHex(value) ? value : "#000000";

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          disabled={disabled}
          className={cn(
            colorPickerTriggerVariants({ variant, size }),
            triggerClassName
          )}
          aria-label={`Color picker, current color: ${value}`}
        >
          <span
            className="h-4 w-4 shrink-0 rounded-sm border border-[hsl(var(--la-border))]"
            style={{ backgroundColor: displayColor }}
          />
          <span className="text-[hsl(var(--la-muted-foreground))]">
            {value || placeholder}
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "z-50 w-64 rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-3 text-[hsl(var(--la-popover-foreground))] shadow-md outline-none data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
            className
          )}
          sideOffset={6}
          align="start"
        >
          <div
            className="mb-3 h-8 w-full rounded-md border border-[hsl(var(--la-border))]"
            style={{ backgroundColor: displayColor }}
          />
          {presets.length > 0 && (
            <div className="mb-3 grid grid-cols-7 gap-1">
              {presets.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "h-6 w-6 rounded-sm border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-1",
                    value === color
                      ? "border-[hsl(var(--la-ring))] ring-1 ring-[hsl(var(--la-ring))]"
                      : "border-[hsl(var(--la-border))]"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                  title={color}
                />
              ))}
            </div>
          )}
          <div className="mb-2 flex rounded-md border border-[hsl(var(--la-border))] p-0.5">
            {(["hex", "rgb", "hsl"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={cn(
                  "flex-1 rounded-sm py-0.5 text-xs font-medium uppercase transition-colors",
                  format === f
                    ? "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]"
                    : "text-[hsl(var(--la-muted-foreground))] hover:text-[hsl(var(--la-foreground))]"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {format === "hex" && (
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                maxLength={7}
                className="h-8 w-full rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-2 text-xs text-[hsl(var(--la-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-1"
                aria-label="Hex color value"
                spellCheck={false}
              />
            )}
            {format === "rgb" && (
              <>
                {(["r", "g", "b"] as const).map((ch) => (
                  <div key={ch} className="flex flex-1 flex-col gap-0.5">
                    <span className="text-center text-[10px] uppercase text-[hsl(var(--la-muted-foreground))]">
                      {ch}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgbInput[ch]}
                      onChange={(e) => handleRgbChange(ch, e.target.value)}
                      className="h-8 w-full rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-1 text-center text-xs text-[hsl(var(--la-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-1"
                      aria-label={`${ch.toUpperCase()} value`}
                    />
                  </div>
                ))}
              </>
            )}
            {format === "hsl" && (
              <>
                {(["h", "s", "l"] as const).map((ch) => (
                  <div key={ch} className="flex flex-1 flex-col gap-0.5">
                    <span className="text-center text-[10px] uppercase text-[hsl(var(--la-muted-foreground))]">
                      {ch}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={ch === "h" ? 360 : 100}
                      value={hslInput[ch]}
                      onChange={(e) => handleHslChange(ch, e.target.value)}
                      className="h-8 w-full rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-1 text-center text-xs text-[hsl(var(--la-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-1"
                      aria-label={`${ch.toUpperCase()} value`}
                    />
                  </div>
                ))}
              </>
            )}
            {supportsEyeDropper && (
              <button
                onClick={handleEyeDropper}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] text-[hsl(var(--la-muted-foreground))] transition-colors hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]"
                aria-label="Pick color from screen"
                title="Eyedropper"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m2 22 1-1h3l9-9" />
                  <path d="M3 21v-3l9-9" />
                  <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8Z" />
                </svg>
              </button>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

ColorPicker.displayName = "ColorPicker";

export { ColorPicker, colorPickerTriggerVariants };
