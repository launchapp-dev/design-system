import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Lightbox } from "./index";

const meta: Meta<typeof Lightbox> = {
  title: "Components/Lightbox",
  component: Lightbox,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light", "dark"],
    },
    showNavigation: { control: "boolean" },
    showThumbnails: { control: "boolean" },
    initialIndex: {
      control: { type: "number", min: 0, max: 4 },
    },
  },
  args: {
    variant: "default",
    showNavigation: true,
    showThumbnails: false,
    initialIndex: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop&auto=format",
    alt: "Ocean waves",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&auto=format",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&auto=format",
    alt: "Forest path",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=800&fit=crop&auto=format",
    alt: "Desert dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=800&fit=crop&auto=format",
    alt: "Waterfall",
  },
];

export const Default: Story = {
  render: (args) => <Lightbox {...args} images={sampleImages} />,
};

export const SingleImage: Story = {
  render: () => (
    <Lightbox
      images={[sampleImages[0]]}
      showNavigation={false}
    />
  ),
};

export const WithThumbnails: Story = {
  render: () => (
    <Lightbox
      images={sampleImages}
      showThumbnails={true}
      showNavigation={true}
    />
  ),
};

export const DarkVariant: Story = {
  render: () => (
    <Lightbox
      images={sampleImages}
      variant="dark"
    />
  ),
};

export const LightVariant: Story = {
  render: () => (
    <Lightbox
      images={sampleImages}
      variant="light"
    />
  ),
};

export const ControlledOpen: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Lightbox
        </button>
        {open && (
          <Lightbox
            images={sampleImages}
            open={open}
            onOpenChange={setOpen}
          />
        )}
      </div>
    );
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <p style={{ marginBottom: "8px", fontSize: "14px" }}>
        Use arrow keys to navigate, +/- to zoom, Escape to close
      </p>
      <Lightbox
        images={sampleImages}
        showNavigation={true}
      />
    </div>
  ),
};
