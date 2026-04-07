import type { Meta, StoryObj } from "@storybook/react";
import { IntegrationMarketplace } from "./IntegrationMarketplace";

const meta: Meta<typeof IntegrationMarketplace> = {
  title: "Blocks/Integrations/IntegrationMarketplace",
  component: IntegrationMarketplace,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultIntegrations = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments, send payouts, and manage your business online.",
    category: "payment" as const,
    status: "installed" as const,
    version: "2.1.0",
    isEnabled: true,
    installedAt: "2024-01-15",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Connect your workspace and get notifications in real-time.",
    category: "communication" as const,
    status: "installed" as const,
    version: "1.5.2",
    isEnabled: false,
    installedAt: "2024-02-20",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Sync repositories and track commits automatically.",
    category: "developer" as const,
    status: "update_available" as const,
    version: "1.2.0",
    latestVersion: "1.3.0",
    isEnabled: true,
    installedAt: "2024-01-10",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect your CRM and sync customer data seamlessly.",
    category: "crm" as const,
    status: "not_installed" as const,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track user behavior and analyze your traffic.",
    category: "analytics" as const,
    status: "installed" as const,
    version: "3.0.1",
    isEnabled: true,
    installedAt: "2024-03-01",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing automation and campaign management.",
    category: "marketing" as const,
    status: "not_installed" as const,
  },
  {
    id: "s3",
    name: "AWS S3",
    description: "Cloud storage for files, backups, and media.",
    category: "storage" as const,
    status: "error" as const,
    version: "1.0.5",
    isEnabled: false,
    installedAt: "2024-01-05",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Marketing, sales, and service software.",
    category: "crm" as const,
    status: "not_installed" as const,
  },
];

export const Default: Story = {
  render: () => (
    <IntegrationMarketplace
      integrations={defaultIntegrations}
      onInstall={(i) => console.log("Install", i.name)}
      onConfigure={(i) => console.log("Configure", i.name)}
      onUninstall={(i) => console.log("Uninstall", i.name)}
      onToggle={(i, enabled) => console.log("Toggle", i.name, enabled)}
      onUpdate={(i) => console.log("Update", i.name)}
    />
  ),
};

export const NoSearch: Story = {
  render: () => (
    <IntegrationMarketplace
      integrations={defaultIntegrations}
      showSearch={false}
      onInstall={(i) => console.log("Install", i.name)}
      onConfigure={(i) => console.log("Configure", i.name)}
    />
  ),
};

export const NoCategories: Story = {
  render: () => (
    <IntegrationMarketplace
      integrations={defaultIntegrations}
      showCategories={false}
      onInstall={(i) => console.log("Install", i.name)}
      onConfigure={(i) => console.log("Configure", i.name)}
    />
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
    <IntegrationMarketplace
      integrations={defaultIntegrations}
      onInstall={(i) => console.log("Install", i.name)}
      onConfigure={(i) => console.log("Configure", i.name)}
      onToggle={(i, enabled) => console.log("Toggle", i.name, enabled)}
    />
  ),
};
