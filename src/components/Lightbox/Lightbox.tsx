import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const lightboxVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-black/90",
        light: "bg-white/95",
        dark: "bg-black/95",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LightboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, "children"> {
  className?: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  initialIndex?: number;
  variant?: VariantProps<typeof lightboxVariants>["variant"];
  showNavigation?: boolean;
  showThumbnails?: boolean;
  onClose?: () => void;
}

const Lightbox = React.forwardRef<HTMLDivElement, LightboxProps>(
  (
    {
      className,
      images,
      initialIndex = 0,
      variant = "default",
      showNavigation = true,
      showThumbnails = false,
      open: controlledOpen,
      onOpenChange,
      onClose,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const [open, setOpen] = React.useState(controlledOpen ?? true);

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
      if (!newOpen) {
        onClose?.();
      }
    };

    const handlePrevious = () => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsZoomed(false);
    };

    const handleNext = () => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsZoomed(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!showNavigation) return;
      
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "+" || event.key === "=") {
        setIsZoomed(true);
      } else if (event.key === "-" || event.key === "_") {
        setIsZoomed(false);
      }
    };

    const currentImage = images[currentIndex];

    if (!currentImage) return null;

    return (
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(lightboxVariants({ variant }), "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0")}
            ref={ref}
            onKeyDown={handleKeyDown}
          >
            <div className="relative flex h-full w-full flex-col">
              <DialogPrimitive.Close className="absolute right-4 top-4 z-50 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                <svg
                  width="24"
                  height="24"
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
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>

              <div className="flex flex-1 items-center justify-center p-4 md:p-16">
                <div
                  className={cn(
                    "relative h-full w-full max-w-6xl transition-transform duration-300",
                    isZoomed && "scale-150"
                  )}
                >
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {showNavigation && images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label="Previous image"
                  >
                    <svg
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
                    className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label="Next image"
                  >
                    <svg
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

              <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
                <button
                  onClick={() => setIsZoomed(false)}
                  className="rounded p-1 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Zoom out"
                  disabled={!isZoomed}
                >
                  <svg
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
                <button
                  onClick={() => setIsZoomed(true)}
                  className="rounded p-1 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Zoom in"
                  disabled={isZoomed}
                >
                  <svg
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
                <span className="px-2 text-sm font-medium text-white">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>

              {showThumbnails && images.length > 1 && (
                <div className="absolute bottom-20 left-1/2 z-50 flex -translate-x-1/2 gap-2 overflow-x-auto px-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                        index === currentIndex
                          ? "border-white opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                      aria-label={`View image ${index + 1}`}
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
            </div>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

Lightbox.displayName = "Lightbox";

export { Lightbox, lightboxVariants };
