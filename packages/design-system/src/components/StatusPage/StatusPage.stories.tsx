import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StatusPage } from "./index";
import type { StatusService } from "./index";

const meta: Meta<typeof StatusPage> = {
  title: "Components/StatusPage",
  component: StatusPage,
};

export default meta;
type Story = StoryObj<typeof StatusPage>;

const generateHistory = (days: number, degradedDays: number[] = []): StatusService["uptimeHistory"] => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - 1 - i) * 86400000)
      .toISOString()
      .split("T")[0],
    status: degradedDays.includes(i) ? "degraded" : "operational",
  }));
};

const SAMPLE_SERVICES: StatusService[] = [
  {
    id: "api",
    name: "API",
    description: "Core REST and GraphQL API endpoints",
    status: "operational",
    uptimeHistory: generateHistory(45, [10, 22]),
  },
  {
    id: "web",
    name: "Web Application",
    description: "Main dashboard and customer-facing app",
    status: "operational",
    uptimeHistory: generateHistory(45),
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Login, signup, and session management",
    status: "degraded",
    uptimeHistory: generateHistory(45, [40, 41, 42, 43, 44]),
  },
  {
    id: "storage",
    name: "File Storage",
    description: "Object storage and CDN",
    status: "operational",
    uptimeHistory: generateHistory(45, [5]),
  },
];

const INCIDENT_SERVICES: StatusService[] = [
  { ...SAMPLE_SERVICES[0], status: "major_outage" },
  { ...SAMPLE_SERVICES[1], status: "operational" },
  { ...SAMPLE_SERVICES[2], status: "partial_outage" },
  { ...SAMPLE_SERVICES[3], status: "maintenance" },
];

export const AllOperational: Story = {
  render: () => (
    <div style={{ maxWidth: "720px", padding: "24px" }}>
      <StatusPage
        title="System Status"
        description="Current status of all LaunchApp services."
        services={SAMPLE_SERVICES.map((s) => ({ ...s, status: "operational" }))}
        lastUpdated="March 21, 2026 at 12:00 UTC"
      />
    </div>
  ),
};

export const WithIncidents: Story = {
  render: () => (
    <div style={{ maxWidth: "720px", padding: "24px" }}>
      <StatusPage
        title="System Status"
        services={INCIDENT_SERVICES}
        lastUpdated="March 21, 2026 at 15:30 UTC"
      />
    </div>
  ),
};

export const NoHistory: Story = {
  render: () => (
    <div style={{ maxWidth: "720px", padding: "24px" }}>
      <StatusPage
        title="Service Status"
        services={SAMPLE_SERVICES.map(({ uptimeHistory: _, ...s }) => s)}
      />
    </div>
  ),
};
