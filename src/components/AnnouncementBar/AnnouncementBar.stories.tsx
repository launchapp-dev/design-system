import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBar } from "./index";

const meta = {
  title: "Components/AnnouncementBar",
  component: AnnouncementBar,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "warning", "success", "promotional"],
    },
    dismissible: { control: "boolean" },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Free shipping on all orders over $50.",
  },
};

export const WithAction: Story = {
  args: {
    variant: "promotional",
    children: "🎉 Summer sale — up to 40% off.",
    action: { label: "Shop now", href: "#" },
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    return visible ? (
      <AnnouncementBar variant="info" dismissible onDismiss={() => setVisible(false)}>
        New feature available: Dark mode is now live!
      </AnnouncementBar>
    ) : (
      <button onClick={() => setVisible(true)} className="text-sm underline">
        Show bar again
      </button>
    );
  },
};

export const WithCountdown: Story = {
  render: () => {
    const target = new Date(Date.now() + 2 * 60 * 60 * 1000);
    return (
      <AnnouncementBar
        variant="warning"
        countdownTarget={target}
        countdownLabel="Sale ends in"
        action={{ label: "Claim offer", href: "#" }}
      >
        Flash sale ends in
      </AnnouncementBar>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <AnnouncementBar variant="default">Default: Welcome to our platform.</AnnouncementBar>
      <AnnouncementBar variant="info">Info: Scheduled maintenance on Sunday 2am–4am UTC.</AnnouncementBar>
      <AnnouncementBar variant="warning">Warning: Your trial expires tomorrow.</AnnouncementBar>
      <AnnouncementBar variant="success">Success: We've upgraded your plan.</AnnouncementBar>
      <AnnouncementBar variant="promotional">🎉 Promotional: Black Friday sale — 50% off everything!</AnnouncementBar>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "0", borderRadius: "8px", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "promotional",
    children: "🚀 Launch week — all plans 30% off. Use code LAUNCH30.",
    action: { label: "Get the deal", href: "#" },
    dismissible: true,
  },
};
