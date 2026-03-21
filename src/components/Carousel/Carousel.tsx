import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const carouselVariants = cva(
  "relative overflow-hidden rounded-[--la-radius]",
  {
    variants: {
      size: {
        sm: "h-48 md:h-64",
        md: "h-64 md:h-96",
        lg: "h-96 md:h-[500px]",
        full: "h-full w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  size?: VariantProps<typeof carouselVariants>["size"];
  onSlideChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      autoPlay = false,
      autoPlayInterval = 3000,
      showArrows = true,
      showDots = true,
      size = "md",
      onSlideChange,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [translateX, setTranslateX] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;

    const goToSlide = (index: number) => {
      const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    };

    const goToPrevious = () => {
      goToSlide(currentIndex - 1);
    };

    const goToNext = () => {
      goToSlide(currentIndex + 1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      setTranslateX(diff);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      
      if (Math.abs(translateX) > 50) {
        if (translateX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }
      
      setTranslateX(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const diff = currentX - startX;
      setTranslateX(diff);
    };

    const handleMouseUp = () => {
      handleTouchEnd();
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
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
    }, [autoPlay, autoPlayInterval, currentIndex, isDragging]);

    React.useEffect(() => {
      if (containerRef.current) {
        const slideWidth = containerRef.current.offsetWidth;
        const offset = -currentIndex * slideWidth + (isDragging ? translateX : 0);
        containerRef.current.style.transform = `translateX(${offset}px)`;
      }
    }, [currentIndex, translateX, isDragging]);

    return (
      <div
        ref={ref}
        className={cn(carouselVariants({ size }), className)}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Image carousel"
        aria-roledescription="carousel"
        {...props}
      >
        <div
          className="h-full w-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={containerRef}
            className="flex h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${-currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="h-full w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Previous slide"
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
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Next slide"
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

        {showDots && totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}

        {autoPlay && (
          <div className="absolute top-4 right-4 z-10">
            <div className="h-1 w-24 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white"
                style={{
                  animation: `progress ${autoPlayInterval}ms linear infinite`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-full w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CarouselSlide.displayName = "CarouselSlide";

export { Carousel, CarouselSlide, carouselVariants };
