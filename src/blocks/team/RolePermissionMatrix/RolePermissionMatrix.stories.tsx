import type { Meta, StoryObj } from "@storybook/react";
import { RolePermissionMatrix } from "./RolePermissionMatrix";
import type { Role } from "./RolePermissionMatrix";

const meta: Meta<typeof RolePermissionMatrix> = {
  title: "Blocks/Team/RolePermissionMatrix",
  component: RolePermissionMatrix,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultRoles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full access to everything.",
    isSystem: true,
    permissions: {
      "content.view": ["read"],
      "content.create": ["write"],
      "content.edit": ["write"],
      "content.delete": ["delete"],
      "users.view": ["read"],
      "users.invite": ["admin"],
      "users.manage": ["admin"],
      "users.remove": ["admin"],
      "billing.view": ["read"],
      "billing.manage": ["admin"],
      "integrations.view": ["read"],
      "integrations.connect": ["admin"],
      "integrations.manage": ["admin"],
      "security.view": ["read"],
      "security.export": ["admin"],
      "settings.view": ["read"],
      "settings.manage": ["admin"],
    },
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage team and settings.",
    isSystem: true,
    permissions: {
      "content.view": ["read"],
      "content.create": ["write"],
      "content.edit": ["write"],
      "content.delete": ["delete"],
      "users.view": ["read"],
      "users.invite": ["admin"],
      "users.manage": ["admin"],
      "users.remove": [],
      "billing.view": ["read"],
      "billing.manage": [],
      "integrations.view": ["read"],
      "integrations.connect": ["admin"],
      "integrations.manage": [],
      "security.view": ["read"],
      "security.export": [],
      "settings.view": ["read"],
      "settings.manage": ["admin"],
    },
  },
  {
    id: "member",
    name: "Member",
    description: "Standard team member.",
    isSystem: true,
    permissions: {
      "content.view": ["read"],
      "content.create": ["write"],
      "content.edit": ["write"],
      "content.delete": [],
      "users.view": ["read"],
      "users.invite": [],
      "users.manage": [],
      "users.remove": [],
      "billing.view": [],
      "billing.manage": [],
      "integrations.view": [],
      "integrations.connect": [],
      "integrations.manage": [],
      "security.view": [],
      "security.export": [],
      "settings.view": [],
      "settings.manage": [],
    },
  },
  {
    id: "guest",
    name: "Guest",
    description: "Limited read-only access.",
    isSystem: false,
    permissions: {
      "content.view": ["read"],
      "content.create": [],
      "content.edit": [],
      "content.delete": [],
      "users.view": [],
      "users.invite": [],
      "users.manage": [],
      "users.remove": [],
      "billing.view": [],
      "billing.manage": [],
      "integrations.view": [],
      "integrations.connect": [],
      "integrations.manage": [],
      "security.view": [],
      "security.export": [],
      "settings.view": [],
      "settings.manage": [],
    },
  },
];

const permissionMap: Record<string, string[]> = {
  Content: ["content.view", "content.create", "content.edit", "content.delete"],
  Users: ["users.view", "users.invite", "users.manage", "users.remove"],
  Billing: ["billing.view", "billing.manage"],
  Integrations: ["integrations.view", "integrations.connect", "integrations.manage"],
  Security: ["security.view", "security.export"],
  Settings: ["settings.view", "settings.manage"],
};

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl">
      <RolePermissionMatrix
        roles={defaultRoles}
        permissionCategories={["Content", "Users", "Billing", "Integrations", "Security", "Settings"]}
        permissionMap={permissionMap}
        onPermissionChange={(roleId, perm, granted) =>
          console.log(`Permission change: ${roleId} / ${perm} → ${granted}`)
        }
        onRoleAdd={() => console.log("Add role")}
      />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="max-w-4xl">
      <RolePermissionMatrix
        roles={defaultRoles.slice(0, 3)}
        permissionCategories={["Content", "Users", "Billing", "Settings"]}
        permissionMap={permissionMap}
        canManage={false}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-8 rounded-xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="max-w-4xl">
      <RolePermissionMatrix
        roles={defaultRoles.slice(0, 2)}
        permissionCategories={["Content", "Users", "Billing"]}
        permissionMap={permissionMap}
        onPermissionChange={(roleId, perm, granted) =>
          console.log(`Permission change: ${roleId} / ${perm} → ${granted}`)
        }
      />
    </div>
  ),
};
