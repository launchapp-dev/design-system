import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const lightboxVariants = cva("relative", {
  variants: {
    size: {
      sm: "max-w-md",
      md: "max-w-2xl",
      lg: "max-w-5xl",
      full: "max-w-[95vw]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof lightboxVariants> {
  images: LightboxImage[];
  initialIndex?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showThumbnails?: boolean;
  showCaption?: boolean;
}

function Lightbox({
  className,
  size,
  images,
  initialIndex = 0,
  open: controlledOpen,
  onOpenChange,
  showThumbnails = true,
  showCaption = true,
  ref,
  ...props
}: LightboxProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [scale, setScale] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const dragStart = React.useRef({ x: 0, y: 0 });

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    setUncontrolledOpen(open);
    if (!open) {
      setScale(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        setPan({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case "+":
      case "=":
        handleZoomIn();
        break;
      case "-":
        handleZoomOut();
        break;
      case "0":
        setScale(1);
        setPan({ x: 0, y: 0 });
        break;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && scale > 1) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  const currentImage = images[currentIndex];

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            lightboxVariants({ size }),
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                aria-label="Zoom out"
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <span className="min-w-[3rem] text-center text-sm text-white/70">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                aria-label="Zoom in"
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>
            <span className="text-sm text-white/70">
              {currentIndex + 1} / {images.length}
            </span>
            <DialogPrimitive.Close
              className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
              aria-label="Close"
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
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </DialogPrimitive.Close>
          </div>

          <div
            ref={containerRef}
            className="relative flex aspect-video items-center justify-center overflow-hidden bg-black"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: scale > 1 ? "grab" : "default" }}
          >
            <img
              src={currentImage?.src}
              alt={currentImage?.alt}
              className="h-full w-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
              }}
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                  aria-label="Previous image"
                >
                  <svg
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
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                  aria-label="Next image"
                >
                  <svg
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
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {showCaption && currentImage?.caption && (
            <div className="p-4 text-center text-white">
              <p className="text-sm">{currentImage.caption}</p>
            </div>
          )}

          {showThumbnails && images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setScale(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className={cn(
                    "h-16 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]",
                    index === currentIndex
                      ? "border-[hsl(var(--la-primary))]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === currentIndex}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

Lightbox.displayName = "Lightbox";

function LightboxTrigger({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <DialogPrimitive.Trigger asChild onClick={onClick}>
      {children}
    </DialogPrimitive.Trigger>
  );
}

LightboxTrigger.displayName = "LightboxTrigger";

export { Lightbox, LightboxTrigger, lightboxVariants };
