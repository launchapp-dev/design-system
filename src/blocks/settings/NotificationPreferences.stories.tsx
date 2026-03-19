import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationPreferences } from "./NotificationPreferences";

const meta: Meta<typeof NotificationPreferences> = {
  title: "Blocks/Settings/NotificationPreferences",
  component: NotificationPreferences,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <NotificationPreferences onChange={(id, checked) => console.log(id, checked)} />
    </div>
  ),
};

export const AllEnabled: Story = {
  render: () => {
    const allOn: Record<string, boolean> = {
      email_product_updates: true,
      email_account_activity: true,
      email_marketing: true,
      email_weekly_digest: true,
      push_mentions: true,
      push_replies: true,
      push_reminders: true,
      inapp_all_activity: true,
      inapp_direct_messages: true,
      inapp_system: true,
    };
    return (
      <div style={{ maxWidth: 640 }}>
        <NotificationPreferences values={allOn} />
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <NotificationPreferences />
    </div>
  ),
};
