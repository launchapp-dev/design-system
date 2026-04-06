import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationPreferences } from "./NotificationPreferences";

const meta: Meta<typeof NotificationPreferences> = {
  title: "Blocks/Notifications/NotificationPreferences",
  component: NotificationPreferences,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveTemplate = (args: React.ComponentProps<typeof NotificationPreferences>) => {
  const [values, setValues] = React.useState<Record<string, boolean>>({});

  return (
    <NotificationPreferences
      {...args}
      values={values}
      onChange={(categoryId, channelId, enabled) => {
        const key = `${categoryId}_${channelId}`;
        setValues((prev) => ({ ...prev, [key]: enabled }));
        console.log(`Changed ${categoryId}.${channelId}: ${enabled}`);
      }}
    />
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
};

export const WithCustomCategories: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, boolean>>({
      team_email: true,
      team_push: false,
      team_inapp: true,
      mentions_email: true,
      mentions_push: true,
      mentions_inapp: true,
    });

    const categories = [
      {
        id: "team",
        title: "Team activity",
        description: "Updates from your team and workspace.",
        channels: [
          { id: "email", label: "Email", description: "Daily digest of team activity" },
          { id: "push", label: "Push", description: "Real-time push notifications" },
          { id: "inapp", label: "In-app", description: "In-app notifications" },
        ],
      },
      {
        id: "mentions",
        title: "Mentions & replies",
        description: "When someone mentions or replies to you.",
        channels: [
          { id: "email", label: "Email", description: "Email notifications for mentions" },
          { id: "push", label: "Push", description: "Push notifications for mentions" },
          { id: "inapp", label: "In-app", description: "In-app notification badges" },
        ],
      },
    ];

    return (
      <NotificationPreferences
        categories={categories}
        values={values}
        onChange={(categoryId, channelId, enabled) => {
          const key = `${categoryId}_${channelId}`;
          setValues((prev) => ({ ...prev, [key]: enabled }));
        }}
        onSave={(vals) => {
          console.log("Saving:", vals);
          alert("Preferences saved! (check console)");
        }}
      />
    );
  },
};

export const AllEnabled: Story = {
  render: () => (
    <NotificationPreferences
      values={{
        product_email: true,
        product_push: true,
        product_inapp: true,
        account_email: true,
        account_push: true,
        account_sms: true,
        social_email: true,
        social_push: true,
        social_inapp: true,
        marketing_email: true,
        marketing_push: true,
      }}
    />
  ),
};

export const MinimalEnabled: Story = {
  render: () => (
    <NotificationPreferences
      values={{
        product_email: false,
        product_push: false,
        product_inapp: true,
        account_email: true,
        account_push: true,
        account_sms: true,
        social_email: false,
        social_push: true,
        social_inapp: true,
        marketing_email: false,
        marketing_push: false,
      }}
    />
  ),
};

export const WithSaveAction: Story = {
  render: () => {
    const [saving, setSaving] = React.useState(false);

    return (
      <NotificationPreferences
        onSave={async (values) => {
          setSaving(true);
          console.log("Saving values:", values);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setSaving(false);
          alert("Preferences saved!");
        }}
        saving={saving}
      />
    );
  },
};

export const DarkMode: Story = {
  render: InteractiveTemplate,
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  render: InteractiveTemplate,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const Tablet: Story = {
  render: InteractiveTemplate,
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};
