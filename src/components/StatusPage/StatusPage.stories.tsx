import type { Meta, StoryObj } from "@storybook/react";
import { StatusPage } from "./index";
import type { Service, UptimeHistoryEntry } from "./index";

const meta: Meta<typeof StatusPage> = {
  title: "Components/StatusPage",
  component: StatusPage,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof StatusPage>;

const mockServices: Service[] = [
  {
    id: "1",
    name: "API Services",
    status: "operational",
    uptime: 99.98,
    latency: 45,
    category: "Core",
    description: "REST and GraphQL API endpoints",
  },
  {
    id: "2",
    name: "Authentication",
    status: "operational",
    uptime: 99.99,
    latency: 32,
    category: "Core",
    description: "OAuth and JWT token services",
  },
  {
    id: "3",
    name: "Database",
    status: "operational",
    uptime: 99.95,
    latency: 12,
    category: "Core",
    description: "Primary database cluster",
  },
  {
    id: "4",
    name: "CDN",
    status: "operational",
    uptime: 99.99,
    latency: 8,
    category: "Infrastructure",
    description: "Content delivery network",
  },
  {
    id: "5",
    name: "Email",
    status: "degraded",
    uptime: 99.5,
    latency: 120,
    category: "Communication",
    description: "Transactional email service",
  },
  {
    id: "6",
    name: "File Storage",
    status: "operational",
    uptime: 99.97,
    latency: 65,
    category: "Storage",
    description: "Object storage service",
  },
];

const generateUptimeHistory = (days: number): UptimeHistoryEntry[] => {
  const data: UptimeHistoryEntry[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const uptime = 99.5 + Math.random() * 0.5;
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      uptime,
    });
  }
  return data;
};

export const Default: Story = {
  render: () => (
    <StatusPage
      services={mockServices}
      title="System Status"
      description="Current status of all our services"
    />
  ),
};

export const AllOperational: Story = {
  render: () => (
    <StatusPage
      services={mockServices.map(s => ({ ...s, status: "operational" as const }))}
      title="System Status"
      description="All systems operational"
    />
  ),
};

export const WithIncidents: Story = {
  render: () => {
    const servicesWithIncident = mockServices.map(s =>
      s.name === "Email" ? { ...s, status: "degraded" as const } : s
    );
    return (
      <StatusPage
        services={servicesWithIncident}
        title="System Status"
        description="We are investigating issues with email delivery"
      />
    );
  },
};

export const WithOutage: Story = {
  render: () => {
    const servicesWithOutage = mockServices.map(s =>
      s.name === "Database" ? { ...s, status: "outage" as const } : s
    );
    return (
      <StatusPage
        services={servicesWithOutage}
        title="System Status"
        description="Critical incident in progress"
      />
    );
  },
};

export const WithMaintenance: Story = {
  render: () => {
    const servicesWithMaintenance = mockServices.map(s =>
      s.name === "CDN" ? { ...s, status: "maintenance" as const } : s
    );
    return (
      <StatusPage
        services={servicesWithMaintenance}
        title="System Status"
        description="Scheduled maintenance in progress"
      />
    );
  },
};

export const WithUptimeHistory: Story = {
  render: () => (
    <StatusPage
      services={mockServices}
      title="System Status"
      description="Current status and uptime history"
      uptimeHistory={generateUptimeHistory(30)}
    />
  ),
};

export const WithoutUptime: Story = {
  render: () => (
    <StatusPage
      services={mockServices}
      title="System Status"
      showUptime={false}
      showLatency={false}
    />
  ),
};

export const WithoutLatency: Story = {
  render: () => (
    <StatusPage
      services={mockServices}
      title="System Status"
      showLatency={false}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <StatusPage
      services={mockServices}
      title="System Status"
      description="Current status of all our services"
    />
  ),
};
