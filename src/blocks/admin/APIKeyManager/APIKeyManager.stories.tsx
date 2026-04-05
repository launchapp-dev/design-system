import type { Meta, StoryObj } from "@storybook/react";
import { APIKeyManager, type APIKey } from "./APIKeyManager";

const meta: Meta<typeof APIKeyManager> = {
  title: "Blocks/Admin/APIKeyManager",
  component: APIKeyManager,
};
export default meta;
type Story = StoryObj<typeof APIKeyManager>;

const sampleKeys: APIKey[] = [
  { id: "1", name: "Production Key", key: "sk_live_abc123def456ghi789", createdAt: "2024-01-15", lastUsedAt: "2 min ago", permissions: ["read", "write"], active: true },
  { id: "2", name: "Development Key", key: "sk_test_xyz987wvu654tsr321", createdAt: "2024-02-20", lastUsedAt: "1 hour ago", permissions: ["read"], active: true },
  { id: "3", name: "Admin Key", key: "sk_live_xxxxYYYY", createdAt: "2023-11-05", expiresAt: "2024-06-30", permissions: ["read", "write", "admin"], active: false },
];

export const Default: Story = {
  args: {
    keys: sampleKeys,
    onCreateKey: (data) => console.log("create key", data),
    onRevokeKey: (id) => console.log("revoke", id),
    onCopyKey: (key) => console.log("copy", key),
  },
};

export const Empty: Story = {
  args: {
    keys: [],
    onCreateKey: (data) => console.log("create key", data),
    onRevokeKey: (id) => console.log("revoke", id),
    onCopyKey: (key) => console.log("copy", key),
  },
};

export const Creating: Story = {
  args: {
    keys: sampleKeys,
    onCreateKey: async () => { await new Promise((r) => setTimeout(r, 2000)); },
    onRevokeKey: (id) => console.log("revoke", id),
    creating: true,
  },
};
