import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const dockVariants = cva(
  "flex items-end justify-center gap-1 px-3 py-2 rounded-2xl bg-[hsl(var(--la-background)/0.8)] backdrop-blur-xl border border-[hsl(var(--la-border)/0.2)] shadow-lg",
  {
    variants: {
      size: {
        sm: "min-h-[52px]",
        md: "min-h-[64px]",
        lg: "min-h-[76px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const dockItemVariants = cva(
  "relative flex items-center justify-center rounded-xl transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--la-background))]",
  {
    variants: {
      size: {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-14 h-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface DockItemData {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface DockContextValue {
  mouseX: number;
  magnification: number;
  magnificationDistance: number;
  baseSize: number;
  size: "sm" | "md" | "lg";
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

const DockContext = React.createContext<DockContextValue | null>(null);

function useDockContext() {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error("DockItem must be used within a Dock component");
  }
  return context;
}

export interface DockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dockVariants> {
  items: DockItemData[];
  magnification?: number;
  magnificationDistance?: number;
  baseSize?: number;
  tooltipDelayDuration?: number;
  tooltipSideOffset?: number;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      items,
      size = "md",
      magnification = 1.5,
      magnificationDistance = 140,
      baseSize = 48,
      tooltipDelayDuration = 300,
      tooltipSideOffset = 8,
      ...props
    },
    ref,
  ) => {
    const [mouseX, setMouseX] = React.useState<number>(-1000);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const externalRef = ref || containerRef;
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
      }
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setMouseX(-1000);
    }, []);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = focusedIndex;
        let newIndex = currentIndex;

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            newIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            newIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
            break;
          case "Home":
            event.preventDefault();
            newIndex = 0;
            break;
          case "End":
            event.preventDefault();
            newIndex = items.length - 1;
            break;
          default:
            return;
        }

        setFocusedIndex(newIndex);
        itemRefs.current[newIndex]?.focus();
      },
      [focusedIndex, items.length],
    );

    const handleFocus = React.useCallback((index: number) => {
      setFocusedIndex(index);
    }, []);

    const contextValue = React.useMemo<DockContextValue>(
      () => ({
        mouseX,
        magnification,
        magnificationDistance,
        baseSize,
        size: size as "sm" | "md" | "lg",
        focusedIndex,
        setFocusedIndex: handleFocus,
      }),
      [
        mouseX,
        magnification,
        magnificationDistance,
        baseSize,
        size,
        focusedIndex,
        handleFocus,
      ],
    );

    return (
      <TooltipPrimitive.Provider delayDuration={tooltipDelayDuration}>
        <div
          ref={externalRef}
          className={cn(dockVariants({ size, className }))}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          role="toolbar"
          aria-label="Dock navigation"
          {...props}
        >
          <DockContext.Provider value={contextValue}>
            {items.map((item, index) => (
              <DockItem
                key={item.id}
                item={item}
                index={index}
                isFocused={focusedIndex === index}
                tooltipSideOffset={tooltipSideOffset}
                itemRef={(el) => {
                  itemRefs.current[index] = el;
                }}
              />
            ))}
          </DockContext.Provider>
        </div>
      </TooltipPrimitive.Provider>
    );
  },
);
Dock.displayName = "Dock";

interface DockItemProps {
  item: DockItemData;
  index: number;
  isFocused: boolean;
  tooltipSideOffset?: number;
  itemRef: (el: HTMLButtonElement | null) => void;
}

function DockItem({
  item,
  index,
  isFocused,
  tooltipSideOffset = 8,
  itemRef,
}: DockItemProps) {
  const { mouseX, magnification, magnificationDistance, baseSize, size } =
    useDockContext();
  const internalRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    itemRef(internalRef.current);
  }, [itemRef]);

  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const containerRect = el.parentElement?.getBoundingClientRect();
    if (containerRect) {
      const relativeX = itemCenterX - containerRect.left;
      const distance = Math.abs(mouseX - relativeX);

      if (distance < magnificationDistance) {
        const normalizedDistance = distance / magnificationDistance;
        const calculatedScale =
          1 +
          (magnification - 1) *
            Math.cos((normalizedDistance * Math.PI) / 2) ** 2;
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    }
  }, [mouseX, magnification, magnificationDistance]);

  const scaledSize = baseSize * scale;
  const fontSize = scaledSize * 0.5;

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          ref={internalRef}
          className={cn(
            dockItemVariants({ size }),
            "origin-bottom transition-transform",
          )}
          style={{
            width: `${scaledSize}px`,
            height: `${scaledSize}px`,
            fontSize: `${fontSize}px`,
          }}
          onClick={item.onClick}
          onFocus={() => {
            setScale(magnification);
          }}
          onBlur={() => {
            setScale(1);
          }}
          tabIndex={isFocused ? 0 : -1}
          aria-label={item.label}
          aria-pressed={item.active ?? false}
        >
          {item.icon}
          {item.active && (
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(var(--la-primary))]"
              aria-hidden="true"
            />
          )}
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={tooltipSideOffset}
          className="z-50 overflow-hidden rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] px-3 py-1.5 text-xs text-[hsl(var(--la-popover-foreground))] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {item.label}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
DockItem.displayName = "DockItem";

export type DockVariants = VariantProps<typeof dockVariants>;
export type DockItemVariants = VariantProps<typeof dockItemVariants>;

export { Dock, dockItemVariants, dockVariants };
