import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Carousel, CarouselSlide } from "./index";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    autoPlay: { control: "boolean" },
    autoPlayInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    showArrows: { control: "boolean" },
    showDots: { control: "boolean" },
  },
  args: {
    size: "md",
    autoPlay: false,
    autoPlayInterval: 3000,
    showArrows: true,
    showDots: true,
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const sampleSlides = [
  {
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=600&fit=crop&auto=format",
    title: "Ocean Waves",
    description: "Beautiful ocean scenery",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&auto=format",
    title: "Mountain Landscape",
    description: "Majestic mountain peaks",
  },
  {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop&auto=format",
    title: "Forest Path",
    description: "Serene forest trail",
  },
  {
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=600&fit=crop&auto=format",
    title: "Desert Dunes",
    description: "Golden sand dunes",
  },
  {
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=600&fit=crop&auto=format",
    title: "Waterfall",
    description: "Majestic waterfall",
  },
];

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {sampleSlides.map((slide, index) => (
        <CarouselSlide key={index}>
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
              <p className="text-white/80">{slide.description}</p>
            </div>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", textTransform: "capitalize", fontWeight: "bold" }}>
            {size}
          </span>
          <Carousel size={size}>
            {sampleSlides.slice(0, 3).map((slide, index) => (
              <CarouselSlide key={index}>
                <div className="relative h-full w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                  </div>
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={2000}>
      {sampleSlides.map((slide, index) => (
        <CarouselSlide key={index}>
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
              <p className="text-white/80">{slide.description}</p>
            </div>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const WithoutArrows: Story = {
  render: () => (
    <Carousel showArrows={false}>
      {sampleSlides.map((slide, index) => (
        <CarouselSlide key={index}>
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
            </div>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const WithoutDots: Story = {
  render: () => (
    <Carousel showDots={false}>
      {sampleSlides.map((slide, index) => (
        <CarouselSlide key={index}>
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
            </div>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Carousel showArrows={false} showDots={false} autoPlay autoPlayInterval={4000}>
      {sampleSlides.map((slide, index) => (
        <CarouselSlide key={index}>
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const WithSlideChangeCallback: Story = {
  render: () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "14px" }}>
          <strong>Current slide:</strong> {currentSlide + 1} / {sampleSlides.length}
        </div>
        <Carousel onSlideChange={setCurrentSlide}>
          {sampleSlides.map((slide, index) => (
            <CarouselSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
                  <p className="text-white/80">{slide.description}</p>
                </div>
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => (
    <Carousel>
      <CarouselSlide>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome</h2>
            <p className="text-xl">Slide 1 with custom content</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-xl">Slide 2 with custom content</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Get Started</h2>
            <p className="text-xl">Slide 3 with custom content</p>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  ),
};

export const SwipeSupport: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "14px" }}>
        This carousel supports swipe gestures on touch devices and mouse drag on desktop
      </p>
      <Carousel>
        {sampleSlides.map((slide, index) => (
          <CarouselSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "14px" }}>
        Use arrow keys to navigate between slides when the carousel is focused
      </p>
      <Carousel>
        {sampleSlides.map((slide, index) => (
          <CarouselSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};
