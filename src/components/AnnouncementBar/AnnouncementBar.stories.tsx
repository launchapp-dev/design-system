import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AnnouncementBar } from "./index";

const meta: Meta<typeof AnnouncementBar> = {
  title: "Components/AnnouncementBar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AnnouncementBar>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar>
        Get 20% off all plans with code LAUNCH20
      </AnnouncementBar>
    </div>
  ),
};

export const WithCountdown: Story = {
  render: () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(endDate.getHours() + 14);
    endDate.setMinutes(endDate.getMinutes() + 32);

    return (
      <div className="min-h-screen">
        <AnnouncementBar countdown={{ endDate }}>
          Sale ends in
        </AnnouncementBar>
      </div>
    );
  },
};

export const WithCountdownComplete: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar countdown={{ endDate: new Date(Date.now() + 1000) }}>
        Sale ending soon!
      </AnnouncementBar>
    </div>
  ),
};

export const WithLink: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar link={{ label: "Learn more", href: "#" }}>
        Introducing our new design system
      </AnnouncementBar>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    return (
      <div className="min-h-screen">
        {visible && (
          <AnnouncementBar
            dismissible
            onDismiss={() => setVisible(false)}
          >
            This announcement can be dismissed
          </AnnouncementBar>
        )}
      </div>
    );
  },
};

export const Info: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar variant="info">
        New feature: Dark mode is now available
      </AnnouncementBar>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar variant="warning">
        Scheduled maintenance this weekend
      </AnnouncementBar>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="min-h-screen">
      <AnnouncementBar variant="success">
        Your subscription has been renewed successfully
      </AnnouncementBar>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col">
      <AnnouncementBar variant="default">Default variant</AnnouncementBar>
      <AnnouncementBar variant="info">Info variant</AnnouncementBar>
      <AnnouncementBar variant="warning">Warning variant</AnnouncementBar>
      <AnnouncementBar variant="success">Success variant</AnnouncementBar>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col">
      <AnnouncementBar variant="default">Default variant</AnnouncementBar>
      <AnnouncementBar variant="info">Info variant</AnnouncementBar>
      <AnnouncementBar variant="warning">Warning variant</AnnouncementBar>
      <AnnouncementBar variant="success">Success variant</AnnouncementBar>
    </div>
  ),
};
