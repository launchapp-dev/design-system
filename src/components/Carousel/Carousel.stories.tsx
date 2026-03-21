import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./index";

const meta: Meta = {
  title: "Components/Carousel",
  argTypes: {
    autoPlay: { control: "boolean" },
    autoPlayInterval: { control: "number" },
    pauseOnHover: { control: "boolean" },
    loop: { control: "boolean" },
    showArrows: { control: "boolean" },
    showDots: { control: "boolean" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
  },
  args: {
    autoPlay: false,
    autoPlayInterval: 4000,
    pauseOnHover: true,
    loop: true,
    showArrows: true,
    showDots: true,
    orientation: "horizontal",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SlideContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[200px] md:h-[300px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-6 text-center">
    <span className="text-2xl font-semibold text-foreground">{children}</span>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <Carousel
      autoPlay={args.autoPlay as boolean}
      autoPlayInterval={args.autoPlayInterval as number}
      pauseOnHover={args.pauseOnHover as boolean}
      loop={args.loop as boolean}
      showArrows={args.showArrows as boolean}
      showDots={args.showDots as boolean}
      orientation={args.orientation as "horizontal" | "vertical"}
      size={args.size as "sm" | "md" | "lg" | "full"}
      className="mx-auto w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <SlideContent>Slide {index + 1}</SlideContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={3000} className="mx-auto w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <SlideContent>Auto-playing Slide {index + 1}</SlideContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <Carousel loop={false} className="mx-auto w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <SlideContent>Non-looping Slide {index + 1}</SlideContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Carousel showArrows={false} className="mx-auto w-full">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <SlideContent>Minimal Slide {index + 1}</SlideContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  ),
};

export const Images: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={5000} className="mx-auto w-full">
      <CarouselContent>
        {[
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=400&fit=crop",
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=400&fit=crop",
        ].map((src, index) => (
          <CarouselItem key={index}>
            <div className="h-[200px] md:h-[400px] w-full overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Nature scene ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel
      orientation="vertical"
      className="mx-auto h-[400px] w-full max-w-md"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="h-[300px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="flex h-[120px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-6">
              <span className="text-xl font-semibold">Vertical Slide {index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="absolute bottom-0 left-0 right-0" />
    </Carousel>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null);
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) return;

      const onSelect = () => {
        setCurrent(api.selectedScrollSnap());
      };

      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api]);

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Current slide: <strong>{current + 1}</strong>
        </p>
        <Carousel setApi={setApi} className="mx-auto w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <SlideContent>Controlled Slide {index + 1}</SlideContent>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    );
  },
};

export const Responsive: Story = {
  render: () => (
    <Carousel
      className="mx-auto w-full"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
            <SlideContent>Responsive {index + 1}</SlideContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

function useEmblaCarousel() {
  return [null, null] as const;
}
