import type { Meta, StoryObj } from "@storybook/react";
import { IntegrationCardGrid } from "./IntegrationCardGrid";
import type { IntegrationCard } from "./IntegrationCardGrid";

const sampleIntegrations: IntegrationCard[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments online. Subscriptions, one-time charges, and more.",
    logoInitial: "St",
    category: "payments",
    status: "connected",
    connectedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    isPopular: true,
  },
  {
    id: "ga4",
    name: "Google Analytics",
    description: "Track website traffic, user behavior, and conversion funnels.",
    logoInitial: "GA",
    category: "analytics",
    status: "connected",
    isPopular: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, marketing automation, and sales pipeline management.",
    logoInitial: "Hs",
    category: "crm",
    status: "disconnected",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and alerts to your team channels.",
    logoInitial: "Sl",
    category: "communication",
    status: "disconnected",
    isPopular: true,
  },
  {
    id: "s3",
    name: "Amazon S3",
    description: "Store and retrieve files, backups, and media assets.",
    logoInitial: "S3",
    category: "storage",
    status: "error",
  },
  {
    id: "github-oauth",
    name: "GitHub OAuth",
    description: "Allow users to sign in with their GitHub accounts.",
    logoInitial: "GH",
    category: "auth",
    status: "connected",
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics to understand user behavior and engagement.",
    logoInitial: "Mx",
    category: "analytics",
    status: "disconnected",
    isPremium: true,
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Send SMS and WhatsApp messages to your users.",
    logoInitial: "Tw",
    category: "communication",
    status: "pending",
  },
];

const meta: Meta<typeof IntegrationCardGrid> = {
  title: "Blocks/Integrations/IntegrationCardGrid",
  component: IntegrationCardGrid,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { IntegrationCardGrid } from "@launchapp/design-system/blocks/integrations";

export default function Page() {
  return (
    <IntegrationCardGrid
      integrations={integrations}
      onConnect={(i) => console.log("connect", i.id)}
      onDisconnect={(i) => console.log("disconnect", i.id)}
      onConfigure={(i) => console.log("configure", i.id)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IntegrationCardGrid>;

export const Default: Story = {
  args: {
    integrations: sampleIntegrations,
    title: "Integrations",
    description: "Connect your favorite tools to extend functionality.",
  },
};

export const FilteredByCategory: Story = {
  args: {
    integrations: sampleIntegrations,
    filterByCategory: "analytics",
    title: "Analytics Integrations",
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6">
      <IntegrationCardGrid {...args} />
    </div>
  ),
  args: {
    integrations: sampleIntegrations,
    title: "Integrations",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    integrations: sampleIntegrations,
    title: "Integrations",
  },
};
