import type * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import type { Meta, StoryObj } from "@storybook/react";
import { AuditLogViewer } from "./AuditLogViewer";
import type { AuditLogEntry, AuditLogFilter } from "./AuditLogViewer";

const generateLog = (overrides: Partial<AuditLogEntry> = {}): AuditLogEntry => ({
  id: `log-${Math.random().toString(36).slice(2)}`,
  timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
  action: "user.login",
  actor: "Alice Chen",
  actorEmail: "alice@example.com",
  resource: "Session",
  resourceId: "sess_abc123",
  level: "info",
  ...overrides,
});

const sampleLogs: AuditLogEntry[] = [
  generateLog({ action: "user.login", actor: "Alice Chen", actorEmail: "alice@example.com", level: "success", description: "Successful login via email" }),
  generateLog({ action: "user.login", actor: "Bob Kim", actorEmail: "bob@example.com", level: "warning", description: "Login attempt from new IP" }),
  generateLog({ action: "api_key.created", actor: "Alice Chen", actorEmail: "alice@example.com", level: "info", description: "New API key created: production-key" }),
  generateLog({ action: "billing.invoice.paid", actor: "Charlie Park", actorEmail: "charlie@example.com", level: "success", description: "Invoice INV-2024-001 paid" }),
  generateLog({ action: "user.password_changed", actor: "Bob Kim", actorEmail: "bob@example.com", level: "info" }),
  generateLog({ action: "file.upload", actor: "Alice Chen", actorEmail: "alice@example.com", level: "info", resource: "Project", resourceId: "proj_xyz", description: "assets/banner.png uploaded" }),
  generateLog({ action: "team.member_invited", actor: "Charlie Park", actorEmail: "charlie@example.com", level: "info", description: "Invited dana@example.com as Admin" }),
  generateLog({ action: "user.login", actor: "Unknown", level: "error", description: "Failed login: invalid credentials" }),
  generateLog({ action: "webhook.triggered", level: "warning", description: "Webhook delivery failed: connection timeout" }),
];

const meta: Meta<typeof AuditLogViewer> = {
  title: "Blocks/Activity/AuditLogViewer",
  component: AuditLogViewer,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { AuditLogViewer } from "@launchapp/design-system/blocks/activity";
import type { AuditLogEntry } from "@launchapp/design-system/blocks/activity";

const logs: AuditLogEntry[] = [/* ... */];

export default function Page() {
  const [filter, setFilter] = React.useState({ level: "all" as const, severity: "all" as const });
  return (
    <AuditLogViewer
      logs={logs}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuditLogViewer>;

export const Default: Story = {
  args: {
    logs: sampleLogs,
    title: "Audit Log",
    pageSize: 5,
  },
};

export const WithInitialFilter: Story = {
  args: {
    logs: sampleLogs,
    filter: { level: "error" as const, severity: "all" as const, search: "login" },
    title: "Security Events",
    pageSize: 10,
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6 space-y-4">
      <AuditLogViewer {...args} />
    </div>
  ),
  args: {
    logs: sampleLogs,
    title: "Audit Log",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <AuditLogViewer {...args} />,
  args: {
    logs: sampleLogs,
    title: "Audit Log",
    pageSize: 5,
  },
};
