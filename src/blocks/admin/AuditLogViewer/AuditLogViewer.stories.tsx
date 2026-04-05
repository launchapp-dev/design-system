import type { Meta, StoryObj } from "@storybook/react";
import { AuditLogViewer, type AuditLogEntry } from "./AuditLogViewer";

const meta: Meta<typeof AuditLogViewer> = {
  title: "Blocks/Admin/AuditLogViewer",
  component: AuditLogViewer,
};
export default meta;
type Story = StoryObj<typeof AuditLogViewer>;

const sampleLogs: AuditLogEntry[] = [
  { id: "1", timestamp: "2024-04-05 14:32:11", level: "info", action: "login", description: "User alice@example.com logged in successfully", actor: "alice@example.com", ipAddress: "192.168.1.1" },
  { id: "2", timestamp: "2024-04-05 14:30:00", level: "info", action: "update", description: "Feature flag 'beta_features' enabled", actor: "admin@example.com", resource: "feature_flags.beta_features" },
  { id: "3", timestamp: "2024-04-05 13:22:05", level: "warning", action: "api_call", description: "Rate limit approaching for API key 'key_prod_...'", actor: "api_key", ipAddress: "10.0.0.5" },
  { id: "4", timestamp: "2024-04-05 12:10:33", level: "error", action: "delete", description: "Failed to delete user record - constraint violation", actor: "admin@example.com", resource: "users.42" },
  { id: "5", timestamp: "2024-04-05 11:05:00", level: "info", action: "create", description: "New API key 'key_dev_01' created", actor: "developer@example.com", resource: "api_keys.key_dev_01" },
  { id: "6", timestamp: "2024-04-05 10:00:00", level: "debug", action: "config_change", description: "Config reload triggered", actor: "system" },
  { id: "7", timestamp: "2024-04-04 18:00:00", level: "info", action: "logout", description: "User bob@example.com logged out", actor: "bob@example.com" },
  { id: "8", timestamp: "2024-04-04 17:30:00", level: "info", action: "user_action", description: "User changed their password", actor: "bob@example.com" },
];

export const Default: Story = {
  args: {
    logs: sampleLogs,
    onSearch: (q) => console.log("search", q),
    onFilterLevel: (l) => console.log("filter level", l),
    onFilterAction: (a) => console.log("filter action", a),
    onViewDetails: (entry) => console.log("view", entry),
  },
};

export const Empty: Story = {
  args: {
    logs: [],
  },
};

export const Loading: Story = {
  args: {
    logs: [],
    loading: true,
  },
};

export const Filtered: Story = {
  args: {
    logs: sampleLogs,
  },
};
