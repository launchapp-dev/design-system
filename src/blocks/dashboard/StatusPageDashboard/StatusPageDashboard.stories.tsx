import type { Meta, StoryObj } from "@storybook/react";
import { StatusPageDashboard } from "./StatusPageDashboard";
import type {
  ServiceComponent,
  StatusIncident,
  UptimeRecord,
} from "./StatusPageDashboard";

const components: ServiceComponent[] = [
  {
    id: "api",
    name: "API",
    description: "REST and GraphQL endpoints",
    status: "operational",
    group: "Core",
  },
  {
    id: "web",
    name: "Web App",
    description: "Dashboard and user interface",
    status: "operational",
    group: "Core",
  },
  {
    id: "db",
    name: "Database",
    description: "Primary PostgreSQL cluster",
    status: "operational",
    group: "Core",
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Login, SSO, and session management",
    status: "degraded",
    group: "Core",
  },
  {
    id: "cdn",
    name: "CDN",
    description: "Static asset delivery",
    status: "operational",
    group: "Infrastructure",
  },
  {
    id: "email",
    name: "Email Delivery",
    description: "Transactional emails via Resend",
    status: "operational",
    group: "Infrastructure",
  },
  {
    id: "webhook",
    name: "Webhooks",
    description: "Outbound webhook delivery",
    status: "operational",
    group: "Infrastructure",
  },
  {
    id: "billing",
    name: "Billing",
    description: "Stripe subscription management",
    status: "operational",
    group: "Integrations",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Event tracking and reporting",
    status: "operational",
    group: "Integrations",
  },
];

const incidents: StatusIncident[] = [
  {
    id: "inc-1",
    title: "Elevated authentication latency",
    status: "monitoring",
    severity: "medium",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    affectedComponents: ["Authentication"],
    updates: [
      {
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        message: "Investigating reports of slow login times.",
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        message: "Root cause identified: token validation cache miss. Fix deployed.",
      },
      {
        timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
        message: "Monitoring — latency returning to normal.",
      },
    ],
  },
  {
    id: "inc-2",
    title: "Brief API downtime",
    status: "resolved",
    severity: "high",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3 + 3600000).toISOString(),
    resolvedAt: new Date(Date.now() - 86400000 * 3 + 3600000).toISOString(),
    affectedComponents: ["API", "Web App"],
  },
  {
    id: "inc-3",
    title: "Email delivery delays",
    status: "resolved",
    severity: "low",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7 + 1800000).toISOString(),
    resolvedAt: new Date(Date.now() - 86400000 * 7 + 1800000).toISOString(),
    affectedComponents: ["Email Delivery"],
  },
];

function generateUptimeHistory(): UptimeRecord[] {
  const records: UptimeRecord[] = [];
  for (let i = 89; i >= 0; i--) {
    const date = new Date(Date.now() - 86400000 * i);
    const rand = Math.random();
    let status: ServiceComponent["status"] = "operational";
    if (rand < 0.02) status = "major_outage";
    else if (rand < 0.05) status = "partial_outage";
    else if (rand < 0.08) status = "degraded";
    records.push({ date: date.toISOString().slice(0, 10), status });
  }
  return records;
}

const uptimeHistory = generateUptimeHistory();

const meta: Meta<typeof StatusPageDashboard> = {
  title: "Blocks/Dashboard/StatusPageDashboard",
  component: StatusPageDashboard,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { StatusPageDashboard } from "@launchapp/design-system/blocks/dashboard";

export default function StatusPage() {
  return (
    <StatusPageDashboard
      organizationName="LaunchApp"
      title="System Status"
      components={components}
      incidents={incidents}
      uptimeHistory={uptimeHistory}
      lastChecked={new Date().toISOString()}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusPageDashboard>;

export const Default: Story = {
  args: {
    organizationName: "LaunchApp",
    title: "System Status",
    components,
    incidents,
    uptimeHistory,
    lastChecked: new Date().toISOString(),
  },
};

export const AllOperational: Story = {
  args: {
    organizationName: "LaunchApp",
    title: "System Status",
    components: components.map((c) => ({ ...c, status: "operational" as const })),
    incidents: [],
    uptimeHistory,
    lastChecked: new Date().toISOString(),
  },
};

export const MajorOutage: Story = {
  args: {
    organizationName: "LaunchApp",
    title: "System Status",
    components: components.map((c, i) => (i < 3 ? { ...c, status: "major_outage" as const } : c)),
    incidents: [
      {
        id: "inc-major",
        title: "Database cluster failure — all services impacted",
        status: "investigating",
        severity: "critical",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date(Date.now() - 300000).toISOString(),
        affectedComponents: ["API", "Web App", "Database"],
        updates: [
          {
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            message: "Investigating widespread service disruption.",
          },
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            message: "Database cluster failover in progress.",
          },
        ],
      },
    ],
    lastChecked: new Date().toISOString(),
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6">
      <StatusPageDashboard {...args} />
    </div>
  ),
  args: {
    organizationName: "LaunchApp",
    title: "System Status",
    components,
    incidents,
    uptimeHistory,
    lastChecked: new Date().toISOString(),
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    organizationName: "LaunchApp",
    title: "System Status",
    components: components.slice(0, 5),
    incidents: incidents.slice(0, 1),
    lastChecked: new Date().toISOString(),
  },
};
