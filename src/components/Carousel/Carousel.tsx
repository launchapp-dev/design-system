import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const carouselVariants = cva("relative overflow-hidden", {
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
});

export interface CarouselSlide {
  id: string;
  content: React.ReactNode;
  ariaLabel?: string;
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof carouselVariants> {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showThumbnails?: boolean;
  thumbnails?: string[];
  loop?: boolean;
  onSlideChange?: (index: number) => void;
}

function Carousel({
  className,
  size,
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  showThumbnails = false,
  thumbnails,
  loop = true,
  onSlideChange,
  ref,
  ...props
}: CarouselProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const autoPlayRef = React.useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    let newIndex = index;
    if (loop) {
      if (index < 0) newIndex = slides.length - 1;
      else if (index >= slides.length) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(index, slides.length - 1));
    }
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToPrevious = () => goToSlide(currentIndex - 1);
  const goToNext = () => goToSlide(currentIndex + 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        goToPrevious();
        break;
      case "ArrowRight":
        goToNext();
        break;
      case "Home":
        goToSlide(0);
        break;
      case "End":
        goToSlide(slides.length - 1);
        break;
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart({ x: clientX, y: 0 });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStart.x);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setDragOffset(0);
  };

  React.useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, isDragging, loop]);

  return (
    <div
      ref={ref}
      className={cn(carouselVariants({ size }), "w-full", className)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
      {...props}
    >
      <div
        ref={containerRef}
        className="relative h-full w-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="h-full w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={slide.ariaLabel ?? `Slide ${index + 1} of ${slides.length}`}
              aria-hidden={index !== currentIndex}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={!loop && currentIndex === 0}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]",
                !loop && currentIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Previous slide"
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
              onClick={goToNext}
              disabled={!loop && currentIndex === slides.length - 1}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]",
                !loop && currentIndex === slides.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Next slide"
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

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]",
                index === currentIndex
                  ? "w-4 bg-white"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}

      {showThumbnails && thumbnails && thumbnails.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {thumbnails.map((thumbnail, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-12 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]",
                index === currentIndex
                  ? "border-[hsl(var(--la-primary))]"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <img
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.displayName = "Carousel";

export { Carousel, carouselVariants };
