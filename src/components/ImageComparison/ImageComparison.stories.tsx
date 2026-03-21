import type { Meta, StoryObj } from "@storybook/react";
import { ImageComparison } from "./ImageComparison";

const meta = {
  title: "Components/Rich Media/ImageComparison",
  component: ImageComparison,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    beforeLabel: {
      control: "text",
    },
    afterLabel: {
      control: "text",
    },
    initialPosition: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
} satisfies Meta<typeof ImageComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    beforeImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=600&fit=crop&sat=-100",
    afterImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=600&fit=crop",
    beforeLabel: "Before",
    afterLabel: "After",
    initialPosition: 50,
    className: "w-[600px]",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    className: "w-[400px]",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
    className: "w-[800px]",
  },
};

export const CustomLabels: Story = {
  args: {
    beforeImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-100",
    afterImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    beforeLabel: "Original",
    afterLabel: "Enhanced",
    className: "w-[600px]",
  },
};

export const NoLabels: Story = {
  args: {
    beforeImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&sat=-100",
    afterImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    beforeLabel: "",
    afterLabel: "",
    className: "w-[600px]",
  },
};
