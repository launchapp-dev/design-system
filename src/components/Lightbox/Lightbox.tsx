import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const lightboxVariants = cva(
  "fixed inset-0 z-50 flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-black/95",
        dark: "bg-black",
        light: "bg-white/95",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const lightboxContentVariants = cva(
  "relative flex-1 flex items-center justify-center overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        dark: "",
        light: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const lightboxImageVariants = cva(
  "select-none transition-transform duration-200 ease-out cursor-zoom-in max-h-full max-w-full object-contain",
  {
    variants: {
      isZoomed: {
        true: "cursor-zoom-out",
        false: "cursor-zoom-in",
      },
    },
    defaultVariants: {
      isZoomed: false,
    },
  }
);

const lightboxThumbnailVariants = cva(
  "relative shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 cursor-pointer opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2 focus:ring-offset-black",
  {
    variants: {
      size: {
        sm: "h-12 w-12",
        md: "h-16 w-16",
        lg: "h-20 w-20",
      },
      isActive: {
        true: "opacity-100 border-[hsl(var(--la-primary))]",
        false: "border-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      isActive: false,
    },
  }
);

export interface LightboxImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface LightboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "onOpenChange">,
    VariantProps<typeof lightboxVariants> {
  images: LightboxImage[];
  initialIndex?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showThumbnails?: boolean;
  showCounter?: boolean;
  showNavigation?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableSwipe?: boolean;
  thumbnailSize?: "sm" | "md" | "lg";
  onIndexChange?: (index: number) => void;
}

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

function Lightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
  showThumbnails = true,
  showCounter = true,
  showNavigation = true,
  enableZoom = true,
  enablePan = true,
  enableSwipe = true,
  thumbnailSize = "md",
  variant,
  onIndexChange,
  className,
  children,
  ref,
  ...props
}: LightboxProps & { ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>> }) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = React.useState<TouchState | null>(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const panStartRef = React.useRef({ x: 0, y: 0 });

  const currentImage = images[currentIndex];
  const isLightVariant = variant === "light";

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  React.useEffect(() => {
    if (open) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [open, currentIndex]);

  React.useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          if (isZoomed) {
            e.preventDefault();
            setIsZoomed(false);
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
          }
          break;
        case "+":
        case "=":
          if (enableZoom && !isZoomed) {
            setIsZoomed(true);
            setZoomLevel(2);
          }
          break;
        case "-":
          if (isZoomed) {
            setIsZoomed(false);
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
          }
          break;
      }
    },
    [open, isZoomed, enableZoom, goToPrevious, goToNext]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleImageClick = () => {
    if (!enableZoom) return;
    
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enablePan || !isZoomed) return;
    
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !isZoomed) return;
    
    setPanOffset({
      x: e.clientX - panStartRef.current.x,
      y: e.clientY - panStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe && !enablePan) return;
    
    const touch = e.touches[0];
    setTouchStart({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    setTouchStart({
      ...touchStart,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });

    if (enablePan && isZoomed) {
      const deltaX = touch.clientX - touchStart.startX;
      const deltaY = touch.clientY - touchStart.startY;
      setPanOffset({ x: deltaX, y: deltaY });
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !enableSwipe || isZoomed) {
      setTouchStart(null);
      return;
    }

    const deltaX = touchStart.currentX - touchStart.startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setTouchStart(null);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(lightboxVariants({ variant }), className)}
          {...props}
        >
          <DialogPrimitive.Close
            className={cn(
              "absolute end-4 top-4 z-10 rounded-full p-2 transition-colors",
              "bg-black/50 text-white hover:bg-black/70",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2 focus:ring-offset-black",
              "min-h-[44px] min-w-[44px] flex items-center justify-center"
            )}
            aria-label="Close lightbox"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DialogPrimitive.Close>

          {showCounter && images.length > 1 && (
            <div
              className={cn(
                "absolute start-4 top-4 z-10 rounded-full px-4 py-2 text-sm font-medium",
                isLightVariant ? "bg-black/10 text-foreground" : "bg-black/50 text-white"
              )}
              aria-live="polite"
            >
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {showNavigation && images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={cn(
                  "absolute start-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 transition-colors",
                  isLightVariant
                    ? "bg-black/10 text-foreground hover:bg-black/20"
                    : "bg-black/50 text-white hover:bg-black/70",
                  "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2 focus:ring-offset-black",
                  "min-h-[44px] min-w-[44px] flex items-center justify-center"
                )}
                aria-label="Previous image"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className={cn(
                  "absolute end-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 transition-colors",
                  isLightVariant
                    ? "bg-black/10 text-foreground hover:bg-black/20"
                    : "bg-black/50 text-white hover:bg-black/70",
                  "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2 focus:ring-offset-black",
                  "min-h-[44px] min-w-[44px] flex items-center justify-center"
                )}
                aria-label="Next image"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div
            ref={containerRef}
            className={lightboxContentVariants({ variant })}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <DialogPrimitive.Title className="sr-only">
              Image {currentIndex + 1} of {images.length}: {currentImage?.alt}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Lightbox image viewer. Use arrow keys to navigate, Escape to close.
            </DialogPrimitive.Description>
            {currentImage && (
              <img
                ref={imageRef}
                src={currentImage.src}
                alt={currentImage.alt}
                className={lightboxImageVariants({ isZoomed })}
                onClick={handleImageClick}
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  transition: isPanning ? "none" : "transform 0.2s ease-out",
                }}
                draggable={false}
              />
            )}
          </div>

          {showThumbnails && images.length > 1 && (
            <div
              className={cn(
                "flex items-center justify-center gap-2 overflow-x-auto p-4",
                isLightVariant ? "bg-white/90" : "bg-black/90"
              )}
              role="tablist"
              aria-label="Image thumbnails"
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={lightboxThumbnailVariants({
                    size: thumbnailSize,
                    isActive: index === currentIndex,
                  })}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                  tabIndex={index === currentIndex ? 0 : -1}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

Lightbox.displayName = "Lightbox";

export {
  Lightbox,
  lightboxVariants,
  lightboxContentVariants,
  lightboxImageVariants,
  lightboxThumbnailVariants,
};
