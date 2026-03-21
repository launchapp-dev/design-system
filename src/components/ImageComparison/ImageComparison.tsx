import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const imageComparisonVariants = cva(
  "relative overflow-hidden rounded-[--la-radius]",
  {
    variants: {
      size: {
        sm: "h-48",
        md: "h-64",
        lg: "h-96",
        full: "h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ImageComparisonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof imageComparisonVariants> {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  onPositionChange?: (position: number) => void;
}

function ImageComparison({
  className,
  size,
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  onPositionChange,
  ref,
  ...props
}: ImageComparisonProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [position, setPosition] = React.useState([initialPosition]);

  const handlePositionChange = (value: number[]) => {
    setPosition(value);
    onPositionChange?.(value[0]);
  };

  return (
    <div
      ref={ref}
      className={cn(imageComparisonVariants({ size }), "w-full", className)}
      {...props}
    >
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="h-full w-full object-cover"
        />
        {afterLabel && (
          <span className="absolute bottom-4 right-4 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {afterLabel}
          </span>
        )}
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position[0]}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
        />
        {beforeLabel && (
          <span className="absolute bottom-4 left-4 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {beforeLabel}
          </span>
        )}
      </div>

      <SliderPrimitive.Root
        value={position}
        onValueChange={handlePositionChange}
        max={100}
        step={1}
        className="absolute inset-0 z-10 flex w-full items-center"
        aria-label="Image comparison slider"
      >
        <SliderPrimitive.Track className="relative h-full w-full grow bg-transparent">
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-full w-1 cursor-ew-resize bg-white shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2"
          aria-label="Drag to compare images"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[hsl(var(--la-foreground))]"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
            </svg>
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
}

ImageComparison.displayName = "ImageComparison";

export { ImageComparison, imageComparisonVariants };
