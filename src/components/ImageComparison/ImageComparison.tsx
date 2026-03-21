import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const imageComparisonVariants = {
  size: {
    sm: "h-48 md:h-64",
    md: "h-64 md:h-96",
    lg: "h-96 md:h-[500px]",
  },
};

export interface ImageComparisonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  size?: keyof typeof imageComparisonVariants.size;
  onPositionChange?: (position: number) => void;
}

const ImageComparison = React.forwardRef<HTMLDivElement, ImageComparisonProps>(
  (
    {
      className,
      beforeImage,
      afterImage,
      beforeLabel = "Before",
      afterLabel = "After",
      initialPosition = 50,
      size = "md",
      onPositionChange,
      ...props
    },
    ref
  ) => {
    const [position, setPosition] = React.useState([initialPosition]);

    const handlePositionChange = (value: number[]) => {
      setPosition(value);
      onPositionChange?.(value[0]);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[--la-radius] bg-muted",
          imageComparisonVariants.size[size],
          className
        )}
        {...props}
      >
        <div className="relative h-full w-full">
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position[0]}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 h-full"
            style={{ left: `${position[0]}%` }}
          >
            <div className="absolute inset-y-0 left-0 w-0.5 bg-white shadow-lg" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M6 8L2 12L6 16" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {beforeLabel}
          </div>
          <div className="absolute bottom-4 right-4 rounded-md bg-black/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {afterLabel}
          </div>
          <SliderPrimitive.Root
            className="absolute inset-0 z-10 flex w-full cursor-ew-resize touch-none select-none items-center"
            value={position}
            onValueChange={handlePositionChange}
            max={100}
            step={0.1}
            aria-label="Image comparison slider"
          >
            <SliderPrimitive.Track className="relative h-full w-full grow bg-transparent">
              <SliderPrimitive.Range className="absolute h-full bg-transparent" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-full w-1 cursor-ew-resize touch-manipulation bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2" />
          </SliderPrimitive.Root>
        </div>
      </div>
    );
  }
);

ImageComparison.displayName = "ImageComparison";

export { ImageComparison, imageComparisonVariants };
