import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ImageComparison } from "./index";

const meta: Meta<typeof ImageComparison> = {
  title: "Components/ImageComparison",
  component: ImageComparison,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    sliderVariant: {
      control: "select",
      options: ["default", "minimal", "prominent"],
    },
    handleSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    initialPosition: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    showLabels: { control: "boolean" },
    beforeLabel: { control: "text" },
    afterLabel: { control: "text" },
  },
  args: {
    size: "md",
    sliderVariant: "default",
    handleSize: "md",
    initialPosition: 50,
    showLabels: true,
    beforeLabel: "Before",
    afterLabel: "After",
    beforeSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    beforeAlt: "Mountain landscape before editing",
    afterSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80&sat=-100",
    afterAlt: "Mountain landscape after editing",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ImageComparison>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [position, setPosition] = React.useState(50);
    
    return (
      <div className="w-full max-w-2xl space-y-4">
        <ImageComparison
          {...args}
          position={position}
          onPositionChange={setPosition}
        />
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-12">{Math.round(position)}%</span>
        </div>
      </div>
    );
  },
};

export const PhotoEditing: Story = {
  args: {
    beforeSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80&sat=-100",
    beforeAlt: "Original forest photo",
    afterSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80",
    afterAlt: "Enhanced forest photo",
    beforeLabel: "Original",
    afterLabel: "Enhanced",
    initialPosition: 50,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const Renovation: Story = {
  args: {
    beforeSrc: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80&con=-50",
    beforeAlt: "Room before renovation",
    afterSrc: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80",
    afterAlt: "Room after renovation",
    beforeLabel: "Before",
    afterLabel: "After",
    initialPosition: 50,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const MinimalSlider: Story = {
  args: {
    sliderVariant: "minimal",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const ProminentSlider: Story = {
  args: {
    sliderVariant: "prominent",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ImageComparison {...args} />
    </div>
  ),
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    beforeLabel: "Day",
    afterLabel: "Night",
    beforeSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&q=80",
    beforeAlt: "Landscape during day",
    afterSrc: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop&q=80",
    afterAlt: "Landscape at night",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const FullHeight: Story = {
  args: {
    size: "full",
  },
  render: (args) => (
    <div className="h-96 w-full max-w-2xl">
      <ImageComparison {...args} className="h-full" />
    </div>
  ),
};

export const SmallHandle: Story = {
  args: {
    handleSize: "sm",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const LargeHandle: Story = {
  args: {
    handleSize: "lg",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const InitialPosition25: Story = {
  args: {
    initialPosition: 25,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};

export const InitialPosition75: Story = {
  args: {
    initialPosition: 75,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ImageComparison {...args} />
    </div>
  ),
};
