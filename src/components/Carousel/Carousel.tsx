import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const carouselVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "",
      slide: "",
      fade: "",
    },
    orientation: {
      horizontal: "",
      vertical: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

const carouselItemVariants = cva("min-w-0 shrink-0 grow-0 basis-full", {
  variants: {
    variant: {
      default: "",
      slide: "transition-transform duration-300",
      fade: "transition-opacity duration-300",
    },
    orientation: {
      horizontal: "",
      vertical: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

const carouselButtonVariants = cva(
  "absolute z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-border bg-background p-2 text-foreground shadow-md transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px] dark:bg-background/80 dark:backdrop-blur-sm",
  {
    variants: {
      orientation: {
        horizontal: "top-1/2 -translate-y-1/2",
        vertical: "left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

const carouselDotVariants = cva(
  "h-2 w-2 rounded-full transition-all min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2.5 md:p-0",
  {
    variants: {
      active: {
        true: "w-6 bg-primary",
        false:
          "bg-muted-foreground/30 hover:bg-muted-foreground/50",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  variant: "default" | "slide" | "fade";
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  scrollSnaps: number[];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  autoplay: boolean;
  autoplayInterval: number;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel component");
  }
  return context;
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "orientation">,
    VariantProps<typeof carouselVariants> {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  index?: number;
  onIndexChange?: (index: number) => void;
}

function Carousel({
  className,
  children,
  variant = "default",
  orientation = "horizontal",
  autoPlay = false,
  autoPlayInterval = 4000,
  loop = false,
  index,
  onIndexChange,
  ref,
  ...props
}: CarouselProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const plugins = React.useMemo(() => {
    const pluginList: ReturnType<typeof Autoplay>[] = [];
    if (autoPlay) {
      pluginList.push(Autoplay({ delay: autoPlayInterval, stopOnInteraction: false }));
    }
    return pluginList;
  }, [autoPlay, autoPlayInterval]);

  const [carouselRef, api] = useEmblaCarousel(
    {
      loop,
      axis: orientation === "vertical" ? "y" : "x",
      startIndex: index,
    },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (idx: number) => {
      api?.scrollTo(idx);
    },
    [api],
  );

  const onSelect = React.useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    onIndexChange?.(api.selectedScrollSnap());
  }, [api, onIndexChange]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    setScrollSnaps(api.scrollSnapList());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (index !== undefined && api) {
      api.scrollTo(index);
    }
  }, [index, api]);

  const contextValue = React.useMemo(
    () => ({
      carouselRef,
      api,
      orientation: orientation || "horizontal",
      variant: variant || "default",
      scrollPrev,
      scrollNext,
      scrollTo,
      selectedIndex,
      scrollSnaps,
      canScrollPrev,
      canScrollNext,
      autoplay: autoPlay,
      autoplayInterval: autoPlayInterval,
    }),
    [
      carouselRef,
      api,
      orientation,
      variant,
      scrollPrev,
      scrollNext,
      scrollTo,
      selectedIndex,
      scrollSnaps,
      canScrollPrev,
      canScrollNext,
      autoPlay,
      autoPlayInterval,
    ],
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        className={cn(carouselVariants({ variant, orientation }), className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
Carousel.displayName = "Carousel";

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function CarouselItem({
  className,
  children,
  ref,
  ...props
}: CarouselItemProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { variant, orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(carouselItemVariants({ variant, orientation }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
CarouselItem.displayName = "CarouselItem";

export interface CarouselPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function CarouselPrev({
  className,
  children,
  ref,
  ...props
}: CarouselPrevProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      className={cn(
        carouselButtonVariants({ orientation }),
        orientation === "horizontal" ? "left-4" : "top-4 rotate-90",
        className,
      )}
      {...props}
    >
      {children || (
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
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </button>
  );
}
CarouselPrev.displayName = "CarouselPrev";

export interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function CarouselNext({
  className,
  children,
  ref,
  ...props
}: CarouselNextProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next slide"
      className={cn(
        carouselButtonVariants({ orientation }),
        orientation === "horizontal" ? "right-4" : "bottom-4 rotate-90",
        className,
      )}
      {...props}
    >
      {children || (
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
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </button>
  );
}
CarouselNext.displayName = "CarouselNext";

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

function CarouselDots({
  className,
  ref,
  ...props
}: CarouselDotsProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Carousel navigation"
      className={cn("flex justify-center gap-2 py-4", className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          role="tab"
          type="button"
          aria-selected={index === selectedIndex}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => scrollTo(index)}
          className={cn(carouselDotVariants({ active: index === selectedIndex }))}
        />
      ))}
    </div>
  );
}
CarouselDots.displayName = "CarouselDots";

export interface CarouselAutoplayProps extends React.HTMLAttributes<HTMLDivElement> {
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
}

function CarouselAutoplay({
  className,
  playIcon,
  pauseIcon,
  ref,
  ...props
}: CarouselAutoplayProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { api, autoplay } = useCarousel();
  const [isPlaying, setIsPlaying] = React.useState(autoplay);

  const toggleAutoplay = React.useCallback(() => {
    if (!api) return;
    const autoplayPlugin = api.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    if (isPlaying) {
      autoplayPlugin.stop();
    } else {
      autoplayPlugin.play();
    }
    setIsPlaying(!isPlaying);
  }, [api, isPlaying]);

  if (!autoplay) return null;

  return (
    <div ref={ref} className={cn("flex justify-center", className)} {...props}>
      <button
        type="button"
        onClick={toggleAutoplay}
        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        className="inline-flex items-center justify-center rounded-full border border-border bg-background p-2 text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 dark:bg-background/80 dark:backdrop-blur-sm"
      >
        {isPlaying
          ? pauseIcon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )
          : playIcon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
      </button>
    </div>
  );
}
CarouselAutoplay.displayName = "CarouselAutoplay";

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function CarouselContent({
  className,
  children,
  ref,
  ...props
}: CarouselContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="h-full overflow-hidden">
      <div
        ref={ref}
        className={cn("flex", orientation === "vertical" ? "flex-col h-full" : "", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
CarouselContent.displayName = "CarouselContent";

export type CarouselVariants = VariantProps<typeof carouselVariants>;
export type CarouselItemVariants = VariantProps<typeof carouselItemVariants>;
export type CarouselButtonVariants = VariantProps<typeof carouselButtonVariants>;
export type CarouselDotVariants = VariantProps<typeof carouselDotVariants>;

export {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrev,
  CarouselNext,
  CarouselDots,
  CarouselAutoplay,
  carouselVariants,
  carouselItemVariants,
  carouselButtonVariants,
  carouselDotVariants,
  useCarousel,
};
