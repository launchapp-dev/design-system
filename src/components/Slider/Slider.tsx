import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbLabels?: string[];
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, orientation, value, defaultValue, thumbLabels, ...props }, ref) => {
  const values = value ?? defaultValue ?? [0];
  const thumbCount = Array.isArray(values) ? values.length : 1;

  const getThumbLabel = (index: number): string => {
    if (thumbLabels && thumbLabels[index] !== undefined) {
      return thumbLabels[index];
    }
    if (thumbCount === 2) {
      return index === 0 ? "Minimum value" : "Maximum value";
    }
    return `Value ${index + 1}`;
  };
  const isVertical = orientation === "vertical";

  return (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "h-full min-h-[100px] w-4 flex-col" : "w-full",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary",
          isVertical ? "w-1.5 flex-1" : "h-1.5 w-full"
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-primary",
            isVertical ? "w-full" : "h-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={getThumbLabel(i)}
          className="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
