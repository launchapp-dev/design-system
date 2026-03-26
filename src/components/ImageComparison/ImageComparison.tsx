import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const imageComparisonVariants = cva(
  "relative overflow-hidden select-none",
  {
    variants: {
      size: {
        sm: "h-48 md:h-40",
        md: "h-64 md:h-56",
        lg: "h-80 md:h-72",
        full: "h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const imageComparisonSliderVariants = cva(
  "absolute top-0 bottom-0 w-1 bg-white/90 cursor-ew-resize z-10 touch-none",
  {
    variants: {
      variant: {
        default: "shadow-lg",
        minimal: "bg-white/60",
        prominent: "w-1.5 bg-white shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const imageComparisonHandleVariants = cva(
  "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "w-10 h-10 md:w-8 md:h-8 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
        md: "w-12 h-12 md:w-10 md:h-10 min-h-[44px] min-w-[44px]",
        lg: "w-14 h-14 md:w-12 md:h-12 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ImageComparisonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof imageComparisonVariants> {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  initialPosition?: number;
  position?: number;
  onPositionChange?: (position: number) => void;
  showLabels?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
  sliderVariant?: "default" | "minimal" | "prominent";
  handleSize?: "sm" | "md" | "lg";
}

const ImageComparison = React.forwardRef<HTMLDivElement, ImageComparisonProps>(
  ({ beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  initialPosition = 50,
  position: controlledPosition,
  onPositionChange,
  showLabels = true,
  beforeLabel = "Before",
  afterLabel = "After",
  sliderVariant = "default",
  handleSize = "md",
  size,
  className,
  ...props }, ref) => {
  const [internalPosition, setInternalPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const keyboardStep = 1;
  const keyboardStepLarge = 10;

  const position = controlledPosition !== undefined ? controlledPosition : internalPosition;

  const clampedPosition = Math.max(0, Math.min(100, position));

  const updatePosition = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newPosition = Math.max(0, Math.min(100, percentage));

      if (controlledPosition === undefined) {
        setInternalPosition(newPosition);
      }
      onPositionChange?.(newPosition);
    },
    [controlledPosition, onPositionChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    },
    [isDragging, updatePosition]
  );

  const handleTouchEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let delta = 0;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        delta = e.shiftKey ? -keyboardStepLarge : -keyboardStep;
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        delta = e.shiftKey ? keyboardStepLarge : keyboardStep;
        break;
      case "Home":
        e.preventDefault();
        delta = -position;
        break;
      case "End":
        e.preventDefault();
        delta = 100 - position;
        break;
      default:
        return;
    }

    const newPosition = Math.max(0, Math.min(100, position + delta));
    
    if (controlledPosition === undefined) {
      setInternalPosition(newPosition);
    }
    onPositionChange?.(newPosition);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={cn(imageComparisonVariants({ size }), className)}
      {...props}
    >
      <div
        className="absolute inset-0"
        role="img"
        aria-label={afterAlt}
      >
        <img
          src={afterSrc}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
        {showLabels && (
          <div
            className="absolute right-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
            aria-hidden="true"
          >
            {afterLabel}
          </div>
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - clampedPosition}% 0 0)`,
        }}
        role="img"
        aria-label={beforeAlt}
      >
        <img
          src={beforeSrc}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
        {showLabels && (
          <div
            className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
            aria-hidden="true"
          >
            {beforeLabel}
          </div>
        )}
      </div>

      <div
        className={cn(
          imageComparisonSliderVariants({ variant: sliderVariant }),
          "transition-[left] duration-75",
          isDragging && "transition-none"
        )}
        style={{ left: `${clampedPosition}%` }}
        role="slider"
        aria-label="Image comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clampedPosition)}
        aria-valuetext={`${Math.round(clampedPosition)}% before visible`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <button
          type="button"
          className={cn(
            imageComparisonHandleVariants({ size: handleSize }),
            "left-0"
          )}
          tabIndex={-1}
          aria-hidden="true"
        >
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
            className="text-gray-700"
          >
            <path d="m15 18-6-6 6-6" />
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {Math.round(clampedPosition)}% {beforeLabel.toLowerCase()} visible
      </div>
    </div>
  );
}

ImageComparison.displayName = "ImageComparison";

export {
  ImageComparison,
  imageComparisonVariants,
  imageComparisonSliderVariants,
  imageComparisonHandleVariants,
};
