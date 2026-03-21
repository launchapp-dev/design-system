import type { Meta, StoryObj } from "@storybook/react";
import { Lightbox, LightboxTrigger } from "./Lightbox";
import { Button } from "../Button";

const meta = {
  title: "Components/Rich Media/Lightbox",
  component: Lightbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    showThumbnails: {
      control: "boolean",
    },
    showCaption: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    alt: "Mountain landscape",
    caption: "Beautiful mountain landscape at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    alt: "Forest path",
    caption: "Serene forest path in autumn",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200",
    alt: "Nature valley",
    caption: "Lush green valley with river",
  },
];

export const Default: Story = {
  args: {
    images: sampleImages,
    open: true,
    showThumbnails: true,
    showCaption: true,
  },
};

export const WithTrigger: Story = {
  render: () => (
    <Lightbox images={sampleImages}>
      <div className="flex flex-col items-center gap-4">
        <img
          src={sampleImages[0].src}
          alt={sampleImages[0].alt}
          className="w-64 cursor-pointer rounded-lg transition-transform hover:scale-105"
        />
        <Button>Open Gallery</Button>
      </div>
    </Lightbox>
  ),
};

export const WithoutThumbnails: Story = {
  args: {
    images: sampleImages,
    open: true,
    showThumbnails: false,
    showCaption: true,
  },
};

export const WithoutCaptions: Story = {
  args: {
    images: sampleImages,
    open: true,
    showThumbnails: true,
    showCaption: false,
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    open: true,
    showThumbnails: false,
    showCaption: true,
  },
};
