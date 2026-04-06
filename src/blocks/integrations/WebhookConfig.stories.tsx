import type { Meta, StoryObj } from "@storybook/react";
import { WebhookConfig } from "./WebhookConfig";

const meta: Meta<typeof WebhookConfig> = {
  title: "Blocks/Integrations/WebhookConfig",
  component: WebhookConfig,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultEvents = [
  { id: "user.created", name: "User created", description: "Triggered when a new user signs up.", enabled: true },
  { id: "user.updated", name: "User updated", description: "Triggered when user profile changes.", enabled: true },
  { id: "subscription.created", name: "Subscription created", enabled: true },
  { id: "subscription.canceled", name: "Subscription canceled", enabled: false },
  { id: "payment.succeeded", name: "Payment succeeded", enabled: true },
  { id: "payment.failed", name: "Payment failed", description: "Triggered when a payment attempt fails.", enabled: false },
  { id: "team.member_added", name: "Team member added", enabled: false },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <WebhookConfig
        url="https://myapp.com/webhooks/launchapp"
        secret="whsec_••••••••••••••••"
        events={defaultEvents}
        onUrlChange={(url) => console.log("URL changed to", url)}
        onToggleEvent={(e) => console.log("Toggle", e.id, e.enabled)}
        onSave={() => console.log("Save")}
        onTest={() => console.log("Test")}
        onDisconnect={() => console.log("Disconnect")}
        onAddSecret={() => console.log("Regenerate secret")}
      />
    </div>
  ),
};

export const NoUrl: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <WebhookConfig
        events={defaultEvents}
        onSave={() => console.log("Save")}
        onTest={() => console.log("Test")}
      />
    </div>
  ),
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
    <div style={{ maxWidth: 560 }}>
      <WebhookConfig
        url="https://myapp.com/webhooks/launchapp"
        secret="whsec_••••••••••••••••"
        events={defaultEvents.slice(0, 4)}
        onToggleEvent={(e) => console.log("Toggle", e.id, e.enabled)}
        onSave={() => console.log("Save")}
        onTest={() => console.log("Test")}
      />
    </div>
  ),
};
