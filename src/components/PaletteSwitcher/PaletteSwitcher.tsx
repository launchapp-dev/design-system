import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import { builtinPalettes, type Palette } from "../../themes/palettes";

const paletteSwitcherTriggerVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md border border-input bg-background text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface PaletteSwitcherProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
      "onValueChange"
    >,
    VariantProps<typeof paletteSwitcherTriggerVariants> {
  palettes?: Palette[];
  onValueChange?: (paletteName: string, palette: Palette) => void;
  scope?: HTMLElement | null;
  className?: string;
  triggerClassName?: string;
}

function applyPaletteTokens(palette: Palette, scope: HTMLElement) {
  const isDark = document.documentElement.classList.contains("dark");
  const tokens = isDark ? palette.tokens.dark : palette.tokens.light;
  Object.entries(tokens).forEach(([prop, val]) => {
    scope.style.setProperty(prop, val);
  });
}

function PaletteSwitcher({
  palettes = builtinPalettes,
  value,
  defaultValue,
  onValueChange,
  scope,
  size,
  className,
  triggerClassName,
  ref,
  ...props
}: PaletteSwitcherProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? palettes[0]?.name ?? "",
  );
  const currentValue = value ?? internalValue;
  const currentPalette =
    palettes.find((p) => p.name === currentValue) ?? palettes[0];

  React.useEffect(() => {
    const target = scope ?? document.documentElement;
    if (currentPalette) {
      applyPaletteTokens(currentPalette, target);
    }
  }, [currentPalette, scope]);

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      const palette = palettes.find((p) => p.name === newValue);
      if (!palette) return;
      if (value === undefined) setInternalValue(newValue);
      onValueChange?.(newValue, palette);
    },
    [palettes, value, onValueChange],
  );

  return (
    <SelectPrimitive.Root
      value={currentValue}
      onValueChange={handleValueChange}
      {...props}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          paletteSwitcherTriggerVariants({ size }),
          triggerClassName,
        )}
        aria-label="Switch color palette"
      >
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/10"
            style={{ backgroundColor: currentPalette?.previewColor }}
            aria-hidden="true"
          />
          <SelectPrimitive.Value />
        </span>
        <SelectPrimitive.Icon asChild>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 opacity-50"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            "relative z-50 max-h-72 min-w-[10rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className,
          )}
          position="popper"
        >
          <SelectPrimitive.Viewport className="p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
            {palettes.map((palette) => (
              <SelectPrimitive.Item
                key={palette.name}
                value={palette.name}
                className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-3 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: palette.previewColor }}
                  aria-hidden="true"
                />
                <SelectPrimitive.ItemText>
                  {palette.label}
                </SelectPrimitive.ItemText>
                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
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
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </SelectPrimitive.ItemIndicator>
                </span>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

PaletteSwitcher.displayName = "PaletteSwitcher";

export type PaletteSwitcherTriggerVariants = VariantProps<
  typeof paletteSwitcherTriggerVariants
>;

export { PaletteSwitcher };
