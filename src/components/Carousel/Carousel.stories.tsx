import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta = {
  title: "Components/Rich Media/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    autoPlay: {
      control: "boolean",
    },
    autoPlayInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    showArrows: {
      control: "boolean",
    },
    showDots: {
      control: "boolean",
    },
    showThumbnails: {
      control: "boolean",
    },
    loop: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSlides = [
  {
    id: "1",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Slide 1</h2>
          <p className="mt-2">Welcome to the carousel</p>
        </div>
      </div>
    ),
    ariaLabel: "Welcome slide",
  },
  {
    id: "2",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Slide 2</h2>
          <p className="mt-2">Explore our features</p>
        </div>
      </div>
    ),
    ariaLabel: "Features slide",
  },
  {
    id: "3",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Slide 3</h2>
          <p className="mt-2">Get started today</p>
        </div>
      </div>
    ),
    ariaLabel: "Call to action slide",
  },
  {
    id: "4",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Slide 4</h2>
          <p className="mt-2">Thank you for visiting</p>
        </div>
      </div>
    ),
    ariaLabel: "Thank you slide",
  },
];

const imageThumbnails = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=75&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=75&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=100&h=75&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=75&fit=crop",
];

export const Default: Story = {
  args: {
    slides: imageSlides,
    size: "md",
    autoPlay: false,
    showArrows: true,
    showDots: true,
    showThumbnails: false,
    loop: true,
    className: "w-full max-w-2xl",
  },
};

export const AutoPlay: Story = {
  args: {
    slides: imageSlides,
    size: "md",
    autoPlay: true,
    autoPlayInterval: 3000,
    showArrows: true,
    showDots: true,
    loop: true,
    className: "w-full max-w-2xl",
  },
};

export const WithThumbnails: Story = {
  args: {
    slides: imageSlides.map((slide, i) => ({
      ...slide,
      content: (
        <img
          src={imageThumbnails[i].replace("w=100&h=75", "w=800&h=600")}
          alt={slide.ariaLabel}
          className="h-full w-full object-cover"
        />
      ),
    })),
    size: "md",
    autoPlay: false,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    thumbnails: imageThumbnails,
    loop: true,
    className: "w-full max-w-2xl",
  },
};

export const Small: Story = {
  args: {
    slides: imageSlides,
    size: "sm",
    showArrows: true,
    showDots: true,
    className: "w-full max-w-md",
  },
};

export const Large: Story = {
  args: {
    slides: imageSlides,
    size: "lg",
    showArrows: true,
    showDots: true,
    className: "w-full max-w-4xl",
  },
};

export const WithoutArrows: Story = {
  args: {
    slides: imageSlides,
    size: "md",
    showArrows: false,
    showDots: true,
    className: "w-full max-w-2xl",
  },
};

export const WithoutDots: Story = {
  args: {
    slides: imageSlides,
    size: "md",
    showArrows: true,
    showDots: false,
    className: "w-full max-w-2xl",
  },
};

export const NoLoop: Story = {
  args: {
    slides: imageSlides,
    size: "md",
    showArrows: true,
    showDots: true,
    loop: false,
    className: "w-full max-w-2xl",
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [imageSlides[0]],
    size: "md",
    showArrows: true,
    showDots: true,
    className: "w-full max-w-2xl",
  },
};
