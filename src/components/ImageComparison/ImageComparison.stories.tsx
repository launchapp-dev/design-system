import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ImageComparison } from "./index";

const meta: Meta<typeof ImageComparison> = {
  title: "Components/ImageComparison",
  component: ImageComparison,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    initialPosition: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
  args: {
    size: "md",
    initialPosition: 50,
  },
};

export default meta;
type Story = StoryObj<typeof ImageComparison>;

export const Default: Story = {
  render: (args) => (
    <ImageComparison
      {...args}
      beforeImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&auto=format"
      afterImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format"
      beforeLabel="Before"
      afterLabel="After"
    />
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
          <ImageComparison
            size={size}
            beforeImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&auto=format"
            afterImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format"
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      ))}
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <ImageComparison
      beforeImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&auto=format"
      afterImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format"
      beforeLabel="Original"
      afterLabel="Enhanced"
      size="md"
    />
  ),
};

export const WithPositionChange: Story = {
  render: () => {
    const [position, setPosition] = React.useState(50);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "14px" }}>Current position: {position.toFixed(1)}%</div>
        <ImageComparison
          beforeImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&auto=format"
          afterImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format"
          beforeLabel="Before"
          afterLabel="After"
          initialPosition={position}
          onPositionChange={setPosition}
        />
      </div>
    );
  },
};
