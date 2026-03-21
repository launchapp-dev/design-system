import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

const carouselVariants = cva("relative", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-2xl",
      lg: "max-w-5xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const carouselContentVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const carouselItemVariants = cva(
  "min-w-0 shrink-0 grow-0 basis-full",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  opts?: CarouselOptions;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
  orientation: "horizontal" | "vertical";
  showArrows: boolean;
  showDots: boolean;
} & VariantProps<typeof carouselVariants>;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

function Carousel({
  ref,
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  size,
  autoPlay = false,
  autoPlayInterval = 4000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
  ...props
}: CarouselProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      loop,
    },
    [
      ...(autoPlay
        ? [
            Autoplay({
              delay: autoPlayInterval,
              stopOnMouseEnter: pauseOnHover,
              stopOnInteraction: false,
            }),
          ]
        : []),
      ...(plugins || []),
    ]
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    setScrollSnaps(api.scrollSnapList());
    api.on("reInit", onSelect);
    api.on("reInit", () => setScrollSnaps(api.scrollSnapList()));
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo,
        size,
        showArrows,
        showDots,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn(carouselVariants({ size, className }))}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
Carousel.displayName = "Carousel";

function CarouselContent({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(carouselContentVariants({ orientation, className }))}
        {...props}
      />
    </div>
  );
}
CarouselContent.displayName = "CarouselContent";

function CarouselItem({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(carouselItemVariants({ orientation, className }))}
      {...props}
    />
  );
}
CarouselItem.displayName = "CarouselItem";

const carouselButtonVariants = cva(
  "absolute z-10 h-11 w-11 md:h-10 md:w-10 rounded-full inline-flex items-center justify-center bg-background/80 border border-border text-foreground shadow-sm transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
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
  }
);

function CarouselPrevious({
  ref,
  className,
  variant,
  size: buttonSize,
  ...props
}: React.ComponentProps<"button"> & {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: string;
  size?: string;
}) {
  const { orientation, scrollPrev, canScrollPrev, showArrows } = useCarousel();

  if (!showArrows) return null;

  return (
    <button
      ref={ref}
      type="button"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        carouselButtonVariants({ orientation }),
        orientation === "horizontal"
          ? "left-2 md:-left-12"
          : "top-2 md:-top-12 rotate-90",
        className
      )}
      aria-label="Previous slide"
      {...props}
    >
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
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
}
CarouselPrevious.displayName = "CarouselPrevious";

function CarouselNext({
  ref,
  className,
  variant,
  size: buttonSize,
  ...props
}: React.ComponentProps<"button"> & {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: string;
  size?: string;
}) {
  const { orientation, scrollNext, canScrollNext, showArrows } = useCarousel();

  if (!showArrows) return null;

  return (
    <button
      ref={ref}
      type="button"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        carouselButtonVariants({ orientation }),
        orientation === "horizontal"
          ? "right-2 md:-right-12"
          : "bottom-2 md:-bottom-12 rotate-90",
        className
      )}
      aria-label="Next slide"
      {...props}
    >
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
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}
CarouselNext.displayName = "CarouselNext";

function CarouselDots({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  const { scrollSnaps, selectedIndex, scrollTo, showDots } = useCarousel();

  if (!showDots || scrollSnaps.length <= 1) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full justify-center gap-2 py-4",
        className
      )}
      role="tablist"
      aria-label="Carousel navigation"
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => scrollTo(index)}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center",
            index === selectedIndex
              ? "bg-primary w-6"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
        >
          <span className="sr-only">Slide {index + 1}</span>
        </button>
      ))}
    </div>
  );
}
CarouselDots.displayName = "CarouselDots";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  carouselVariants,
  carouselContentVariants,
  carouselItemVariants,
  carouselButtonVariants,
};

export type {
  CarouselProps,
  CarouselApi,
};
