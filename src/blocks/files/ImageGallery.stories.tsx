import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ImageGallery } from "./ImageGallery";
import type { GalleryImage } from "./ImageGallery";

const mockImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", alt: "Mountain landscape", name: "mountain.jpg" },
  { id: "2", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop", alt: "Forest path", name: "forest.jpg" },
  { id: "3", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop", alt: "Sunlit forest", name: "sunlit-forest.jpg" },
  { id: "4", src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=400&fit=crop", alt: "Lake reflection", name: "lake.jpg" },
  { id: "5", src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop", alt: "Aerial view", name: "aerial.jpg" },
  { id: "6", src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=400&fit=crop", alt: "Sunset hills", name: "sunset.jpg" },
];

const meta: Meta<typeof ImageGallery> = {
  title: "Blocks/Files/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ImageGallery } from "@launchapp/design-system/blocks/files";

export default function Page() {
  return (
    <ImageGallery
      images={images}
      columns={3}
      onRemove={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const InteractiveTemplate = (args: React.ComponentProps<typeof ImageGallery>) => {
  const [images, setImages] = React.useState(args.images);
  return (
    <ImageGallery
      {...args}
      images={images}
      onRemove={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
    />
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    images: mockImages,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  render: (args) => <ImageGallery {...args} />,
  args: {
    images: mockImages.slice(0, 4),
    columns: 2,
  },
};

export const FourColumns: Story = {
  render: (args) => <ImageGallery {...args} />,
  args: {
    images: mockImages,
    columns: 4,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <ImageGallery {...args} />
    </div>
  ),
  args: {
    images: mockImages,
    columns: 3,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <ImageGallery {...args} />
    </div>
  ),
  args: {
    images: mockImages,
    columns: 2,
  },
};
