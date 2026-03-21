import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";

const meta = {
  title: "Components/Rich Media/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    showControls: {
      control: "boolean",
    },
    autoPlay: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

export const Default: Story = {
  args: {
    src: sampleVideo,
    poster: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
    size: "md",
    showControls: true,
    className: "w-full max-w-2xl",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    className: "w-full max-w-md",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
    className: "w-full max-w-4xl",
  },
};

export const WithoutControls: Story = {
  args: {
    src: sampleVideo,
    size: "md",
    showControls: false,
    className: "w-full max-w-2xl",
  },
};

export const WithPoster: Story = {
  args: {
    src: sampleVideo,
    poster: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
    size: "md",
    showControls: true,
    className: "w-full max-w-2xl",
  },
};
