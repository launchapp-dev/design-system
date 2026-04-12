import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrev,
  CarouselNext,
  CarouselDots,
  CarouselAutoplay,
} from "./index";

const meta: Meta = {
  title: "Components/Carousel",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "slide", "fade"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    autoPlay: {
      control: "boolean",
    },
    autoPlayInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    loop: {
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    orientation: "horizontal",
    autoPlay: false,
    autoPlayInterval: 4000,
    loop: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
  {
    id: 1,
    title: "First Slide",
    description: "This is the first slide in the carousel.",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    title: "Second Slide",
    description: "This is the second slide with different content.",
    bgColor: "bg-secondary/20",
  },
  {
    id: 3,
    title: "Third Slide",
    description: "The third slide demonstrates more options.",
    bgColor: "bg-accent/15",
  },
  {
    id: 4,
    title: "Fourth Slide",
    description: "Final slide to showcase the carousel navigation.",
    bgColor: "bg-muted",
  },
];

export const Default: Story = {
  render: (args) => (
    <Carousel
      variant={args.variant as "default" | "slide" | "fade"}
      orientation={args.orientation as "horizontal" | "vertical"}
      autoPlay={args.autoPlay}
      autoPlayInterval={args.autoPlayInterval}
      loop={args.loop}
      className="w-full max-w-xl mx-auto"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: args.orientation === "vertical" ? "200px" : "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const WithLoop: Story = {
  render: () => (
    <Carousel loop className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const WithAutoplay: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={3000} loop className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
      <CarouselDots />
      <CarouselAutoplay className="mt-2" />
    </Carousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xl mx-auto h-80">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const WithoutButtons: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={4000} loop className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [index, setIndex] = React.useState(0);

    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Current slide: <strong>{index + 1}</strong> of {slides.length}
        </p>
        <Carousel index={index} onIndexChange={setIndex} className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div
                  className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
                  style={{ minHeight: "280px" }}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {slide.title}
                    </h3>
                    <p className="text-muted-foreground">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrev />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`px-3 py-1 rounded text-sm ${
                i === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              Slide {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const ImageGallery: Story = {
  render: () => (
    <Carousel loop className="w-full max-w-2xl mx-auto">
      <CarouselContent>
        {[1, 2, 3, 4].map((num) => (
          <CarouselItem key={num}>
            <div className="flex items-center justify-center p-4">
              <div className="w-full h-64 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground">
                  Image {num}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-background p-8 rounded-lg">
      <Carousel autoPlay autoPlayInterval={4000} loop className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`flex items-center justify-center p-12 rounded-lg border border-border ${slide.bgColor}`}
                style={{ minHeight: "280px" }}
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {slide.title}
                  </h3>
                  <p className="text-muted-foreground">{slide.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrev />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
};

export const CustomNavigation: Story = {
  render: () => (
    <Carousel loop className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`flex items-center justify-center p-12 rounded-lg ${slide.bgColor}`}
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {slide.title}
                </h3>
                <p className="text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrev className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">
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
          aria-hidden="true"
        >
          <path d="m11 17-5-5 5-5" />
          <path d="m18 17-5-5 5-5" />
        </svg>
      </CarouselPrev>
      <CarouselNext className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">
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
          aria-hidden="true"
        >
          <path d="m13 17 5-5-5-5" />
          <path d="m6 17 5-5-5-5" />
        </svg>
      </CarouselNext>
      <CarouselDots className="gap-3" />
    </Carousel>
  ),
};
