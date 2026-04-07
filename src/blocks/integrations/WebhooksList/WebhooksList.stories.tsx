import type * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { WebhooksList } from "./WebhooksList";
import type { WebhookItem } from "./WebhooksList";

const generateWebhook = (overrides: Partial<WebhookItem> = {}): WebhookItem => ({
  id: `wh-${Math.random().toString(36).slice(2)}`,
  name: "Production",
  url: "https://api.example.com/webhooks",
  status: "active",
  events: ["user.created", "payment.succeeded"],
  createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
  ...overrides,
});

const sampleWebhooks: WebhookItem[] = [
  generateWebhook({ name: "Production", url: "https://api.launchapp.dev/webhooks", status: "active", events: ["user.created", "payment.succeeded", "subscription.cancelled"], successRate: 98, lastTriggeredAt: new Date(Date.now() - 3600000).toISOString() }),
  generateWebhook({ name: "Staging", url: "https://staging-api.launchapp.dev/webhooks", status: "inactive", events: ["user.created"] }),
  generateWebhook({ name: "Analytics", url: "https://analytics.example.com/hook", status: "failing", events: ["payment.failed", "user.deleted"], successRate: 45 }),
];

const meta: Meta<typeof WebhooksList> = {
  title: "Blocks/Integrations/WebhooksList",
  component: WebhooksList,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { WebhooksList } from "@launchapp/design-system/blocks/integrations";

export default function Page() {
  return (
    <WebhooksList
      webhooks={webhooks}
      onAdd={(data) => console.log("Add webhook", data)}
      onEdit={(wh) => console.log("Edit webhook", wh)}
      onDelete={(wh) => console.log("Delete webhook", wh)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WebhooksList>;

export const Default: Story = {
  args: {
    webhooks: sampleWebhooks,
    title: "Webhooks",
    description: "Manage webhook endpoints that receive event notifications.",
  },
};

export const Empty: Story = {
  args: {
    webhooks: [],
    title: "Webhooks",
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6 space-y-4">
      <WebhooksList {...args} />
    </div>
  ),
  args: {
    webhooks: sampleWebhooks,
    title: "Webhooks",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <WebhooksList {...args} />,
  args: {
    webhooks: sampleWebhooks,
    title: "Webhooks",
  },
};
