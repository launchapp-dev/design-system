import * as React from "react";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

type ColorMode = "hex" | "rgb" | "hsl";

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6",
  "#64748b", "#1e293b", "#ffffff", "#000000",
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

const EyeDropperIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 3 21 6.5l-8.5 8.5L9 11.5 17.5 3z" />
    <path d="m16 7 1.5 1.5" />
    <path d="M9.96 11.25 3 18.21V21h2.79l6.96-6.96" />
  </svg>
);

export interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLButtonElement, ColorPickerProps>(
  ({ value = "#3b82f6",
  onChange,
  presets = DEFAULT_PRESETS,
  disabled,
  className }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<ColorMode>("hex");

  const [hexInput, setHexInput] = React.useState(() => value);
  const [rgbInput, setRgbInput] = React.useState(() => hexToRgb(value) ?? { r: 59, g: 130, b: 246 });
  const [hslInput, setHslInput] = React.useState(() => {
    const rgb = hexToRgb(value);
    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 217, s: 91, l: 60 };
  });

  const [eyedropperSupported] = React.useState(
    () => typeof window !== "undefined" && "EyeDropper" in window
  );

  const syncFromHex = React.useCallback((hex: string) => {
    setHexInput(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbInput(rgb);
      setHslInput(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  }, []);

  React.useEffect(() => {
    syncFromHex(value);
  }, [value, syncFromHex]);

  const commit = (hex: string) => {
    syncFromHex(hex);
    onChange?.(hex);
  };

  const handleHexChange = (raw: string) => {
    setHexInput(raw);
    const hex = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      commit(hex);
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", raw: string) => {
    const n = parseInt(raw, 10);
    const next = { ...rgbInput, [channel]: isNaN(n) ? 0 : clamp(n, 0, 255) };
    setRgbInput(next);
    commit(rgbToHex(next.r, next.g, next.b));
  };

  const handleHslChange = (channel: "h" | "s" | "l", raw: string) => {
    const n = parseInt(raw, 10);
    const max = channel === "h" ? 360 : 100;
    const next = { ...hslInput, [channel]: isNaN(n) ? 0 : clamp(n, 0, max) };
    setHslInput(next);
    const rgb = hslToRgb(next.h, next.s, next.l);
    commit(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleEyedropper = async () => {
    try {
      type EyeDropperAPI = { open: () => Promise<{ sRGBHex: string }> };
      const dropper = new (window as unknown as { EyeDropper: new () => EyeDropperAPI }).EyeDropper();
      const result = await dropper.open();
      commit(result.sRGBHex);
    } catch {
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          disabled={disabled}
          aria-label={`Color picker, current color ${value}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          style={{ backgroundColor: value }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div className="grid grid-cols-6 gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset}
                aria-label={`Select color ${preset}`}
                onClick={() => commit(preset)}
                className={cn(
                  "h-7 w-7 rounded border border-border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  value.toLowerCase() === preset.toLowerCase() && "ring-2 ring-ring ring-offset-1"
                )}
                style={{ backgroundColor: preset }}
              />
            ))}
          </div>

          <div className="flex rounded-md border border-input text-xs overflow-hidden">
            {(["hex", "rgb", "hsl"] as ColorMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 py-1 font-medium uppercase transition-colors",
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {mode === "hex" && (
              <input
                aria-label="Hex color value"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                maxLength={7}
                spellCheck={false}
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            )}
            {mode === "rgb" && (
              <>
                {(["r", "g", "b"] as const).map((ch) => (
                  <div key={ch} className="flex flex-col items-center gap-0.5 flex-1">
                    <input
                      aria-label={`RGB ${ch.toUpperCase()} channel`}
                      type="number"
                      min={0}
                      max={255}
                      value={rgbInput[ch]}
                      onChange={(e) => handleRgbChange(ch, e.target.value)}
                      className="h-8 w-full rounded-md border border-input bg-background px-1 text-xs text-center font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <span className="text-[10px] text-muted-foreground uppercase">{ch}</span>
                  </div>
                ))}
              </>
            )}
            {mode === "hsl" && (
              <>
                {(["h", "s", "l"] as const).map((ch) => (
                  <div key={ch} className="flex flex-col items-center gap-0.5 flex-1">
                    <input
                      aria-label={`HSL ${ch.toUpperCase()} channel`}
                      type="number"
                      min={0}
                      max={ch === "h" ? 360 : 100}
                      value={hslInput[ch]}
                      onChange={(e) => handleHslChange(ch, e.target.value)}
                      className="h-8 w-full rounded-md border border-input bg-background px-1 text-xs text-center font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <span className="text-[10px] text-muted-foreground uppercase">{ch}</span>
                  </div>
                ))}
              </>
            )}
            {eyedropperSupported && (
              <button
                aria-label="Pick color from screen"
                onClick={handleEyedropper}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              >
                <EyeDropperIcon />
              </button>
            )}
          </div>

          <div
            className="h-8 w-full rounded-md border border-input"
            style={{ backgroundColor: value }}
            aria-label={`Color preview: ${value}`}
            role="img"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
