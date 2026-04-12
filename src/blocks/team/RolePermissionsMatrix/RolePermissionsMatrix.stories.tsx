import type { Meta, StoryObj } from "@storybook/react";
import { RolePermissionsMatrix } from "./RolePermissionsMatrix";
import type { RoleSummary, PermissionEntry } from "./RolePermissionsMatrix";

const meta: Meta<typeof RolePermissionsMatrix> = {
  title: "Blocks/Team/RolePermissionsMatrix",
  component: RolePermissionsMatrix,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const mockRoles: RoleSummary[] = [
  {
    id: "owner",
    name: "Owner",
    permissionCount: 16,
    categoryBreakdown: { Content: 4, Users: 4, Billing: 2, Integrations: 3, Settings: 2 },
    highestPermission: "full",
  },
  {
    id: "admin",
    name: "Admin",
    permissionCount: 12,
    categoryBreakdown: { Content: 4, Users: 4, Billing: 0, Integrations: 2, Settings: 2 },
    highestPermission: "full",
  },
  {
    id: "member",
    name: "Member",
    permissionCount: 6,
    categoryBreakdown: { Content: 4, Users: 0, Billing: 0, Integrations: 0, Settings: 2 },
    highestPermission: "limited",
  },
  {
    id: "guest",
    name: "Guest",
    permissionCount: 2,
    categoryBreakdown: { Content: 1, Users: 0, Billing: 0, Integrations: 0, Settings: 1 },
    highestPermission: "limited",
  },
];

const mockPermissions: PermissionEntry[] = [
  { permissionId: "content.view", label: "View Content", category: "Content", level: "full" },
  { permissionId: "content.create", label: "Create Content", category: "Content", level: "full" },
  { permissionId: "content.edit", label: "Edit Content", category: "Content", level: "full" },
  { permissionId: "content.delete", label: "Delete Content", category: "Content", level: "full" },
  { permissionId: "users.view", label: "View Users", category: "Users", level: "full" },
  { permissionId: "users.invite", label: "Invite Users", category: "Users", level: "full" },
  { permissionId: "users.manage", label: "Manage Users", category: "Users", level: "limited" },
  { permissionId: "users.remove", label: "Remove Users", category: "Users", level: "limited" },
  { permissionId: "billing.view", label: "View Billing", category: "Billing", level: "full" },
  { permissionId: "billing.manage", label: "Manage Billing", category: "Billing", level: "limited" },
  { permissionId: "integrations.view", label: "View Integrations", category: "Integrations", level: "full" },
  { permissionId: "integrations.connect", label: "Connect Integrations", category: "Integrations", level: "limited" },
  { permissionId: "integrations.manage", label: "Manage Integrations", category: "Integrations", level: "limited" },
  { permissionId: "settings.view", label: "View Settings", category: "Settings", level: "full" },
  { permissionId: "settings.manage", label: "Manage Settings", category: "Settings", level: "limited" },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-5xl">
      <RolePermissionsMatrix
        roles={mockRoles}
        permissions={mockPermissions}
        onRoleClick={(id) => console.log("Role clicked", id)}
        onExport={(format) => console.log("Export", format)}
      />
    </div>
  ),
};

export const CategoryFiltered: Story = {
  render: () => (
    <div className="max-w-5xl">
      <RolePermissionsMatrix
        roles={mockRoles}
        permissions={mockPermissions}
        onRoleClick={(id) => console.log("Role clicked", id)}
      />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="max-w-5xl">
      <RolePermissionsMatrix
        roles={mockRoles.slice(0, 2)}
        permissions={mockPermissions}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="max-w-5xl">
      <RolePermissionsMatrix
        roles={mockRoles}
        permissions={mockPermissions}
        onRoleClick={(id) => console.log("Role clicked", id)}
      />
    </div>
  ),
};
