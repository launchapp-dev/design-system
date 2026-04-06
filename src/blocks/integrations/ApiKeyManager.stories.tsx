import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ApiKeyManager } from "./ApiKeyManager";

const meta: Meta<typeof ApiKeyManager> = {
  title: "Blocks/Integrations/ApiKeyManager",
  component: ApiKeyManager,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultKeys = [
  {
    id: "key_1",
    name: "Production API",
    prefix: "sk_live_",
    createdAt: "2026-01-15",
    lastUsedAt: "2026-04-01",
    scopes: ["read:data", "write:data"],
  },
  {
    id: "key_2",
    name: "Development",
    prefix: "sk_test_",
    createdAt: "2026-02-20",
    lastUsedAt: "2026-03-28",
    expiresAt: "2027-02-20",
    scopes: ["read:data"],
  },
  {
    id: "key_3",
    name: "CI/CD Pipeline",
    prefix: "sk_live_",
    createdAt: "2026-03-01",
    scopes: ["read:data", "write:data", "admin:users"],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ApiKeyManager
        keys={defaultKeys}
        onCreate={() => console.log("Create key")}
        onRevoke={(k) => console.log("Revoke", k.name)}
        onRotate={(k) => console.log("Rotate", k.name)}
      />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ApiKeyManager keys={defaultKeys} canManage={false} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ApiKeyManager
        keys={[]}
        onCreate={() => console.log("Create key")}
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
    <div style={{ maxWidth: 640 }}>
      <ApiKeyManager
        keys={defaultKeys.slice(0, 2)}
        onCreate={() => console.log("Create key")}
        onRevoke={(k) => console.log("Revoke", k.name)}
      />
    </div>
  ),
};
