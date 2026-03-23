import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Lightbox } from "./index";

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    alt: "Mountain landscape at sunset with golden light",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
    alt: "Forest path with sunlight filtering through trees",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop",
    alt: "Ocean waves crashing on rocky shore",
    thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100&h=100&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=800&fit=crop",
    alt: "Waterfall in lush green forest",
    thumbnail: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=100&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
    alt: "Rolling hills covered in mist at dawn",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop",
  },
];

const meta: Meta<typeof Lightbox> = {
  title: "Components/Lightbox",
  component: Lightbox,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "light"],
    },
    thumbnailSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showThumbnails: { control: "boolean" },
    showCounter: { control: "boolean" },
    showNavigation: { control: "boolean" },
    enableZoom: { control: "boolean" },
    enablePan: { control: "boolean" },
    enableSwipe: { control: "boolean" },
  },
  args: {
    variant: "default",
    thumbnailSize: "md",
    showThumbnails: true,
    showCounter: true,
    showNavigation: true,
    enableZoom: true,
    enablePan: true,
    enableSwipe: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

const LightboxDemo = (args: Partial<React.ComponentProps<typeof Lightbox>>) => {
  const [open, setOpen] = React.useState(false);
  const [initialIndex, setInitialIndex] = React.useState(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-8">
        {sampleImages.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setInitialIndex(index);
              setOpen(true);
            }}
            className="relative overflow-hidden rounded-lg aspect-square hover:ring-2 hover:ring-[hsl(var(--la-ring))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2"
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Lightbox
        images={sampleImages}
        open={open}
        onOpenChange={setOpen}
        initialIndex={initialIndex}
        {...args}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <LightboxDemo {...args} />,
};

export const DarkBackground: Story = {
  args: {
    variant: "dark",
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const LightBackground: Story = {
  args: {
    variant: "light",
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const WithoutThumbnails: Story = {
  args: {
    showThumbnails: false,
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const WithoutCounter: Story = {
  args: {
    showCounter: false,
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const WithoutNavigation: Story = {
  args: {
    showNavigation: false,
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const ZoomDisabled: Story = {
  args: {
    enableZoom: false,
    enablePan: false,
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const SmallThumbnails: Story = {
  args: {
    thumbnailSize: "sm",
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const LargeThumbnails: Story = {
  args: {
    thumbnailSize: "lg",
  },
  render: (args) => <LightboxDemo {...args} />,
};

export const SingleImage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] rounded-lg hover:bg-[hsl(var(--la-primary)/0.9)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2"
        >
          Open Single Image Lightbox
        </button>
        <Lightbox
          images={[sampleImages[0]]}
          open={open}
          onOpenChange={setOpen}
          showThumbnails={false}
        />
      </div>
    );
  },
};
