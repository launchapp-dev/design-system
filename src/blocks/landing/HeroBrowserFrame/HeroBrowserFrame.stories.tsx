import type { Meta, StoryObj } from "@storybook/react";
import { HeroBrowserFrame } from "./HeroBrowserFrame";

const meta: Meta<typeof HeroBrowserFrame> = {
  title: "blocks/landing/HeroBrowserFrame",
  component: HeroBrowserFrame,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HeroBrowserFrame>;

export const Default: Story = {
  args: {},
};

export const WithCustomUrl: Story = {
  args: {
    url: "dashboard.acme.com",
  },
};

export const WithCustomStats: Story = {
  args: {
    stats: [
      { label: "Total Users", value: "10.2k", trend: "up" },
      { label: "Revenue", value: "$84.3k", trend: "up" },
      { label: "Churn", value: "1.2%", trend: "down" },
      { label: "NPS", value: "72", trend: "up" },
    ],
  },
};