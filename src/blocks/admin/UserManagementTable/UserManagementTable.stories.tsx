import type { Meta, StoryObj } from "@storybook/react";
import { UserManagementTable, type User } from "./UserManagementTable";

const meta: Meta<typeof UserManagementTable> = {
  title: "Blocks/Admin/UserManagementTable",
  component: UserManagementTable,
};
export default meta;
type Story = StoryObj<typeof UserManagementTable>;

const sampleUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-15", lastActiveAt: "2 min ago" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", createdAt: "2024-02-20", lastActiveAt: "1 hour ago" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "viewer", status: "pending", createdAt: "2024-03-10", lastActiveAt: "Never" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "editor", status: "banned", createdAt: "2023-11-05", lastActiveAt: "3 days ago" },
  { id: "5", name: "Eva Martinez", email: "eva@example.com", role: "viewer", status: "active", createdAt: "2024-04-01", lastActiveAt: "30 min ago" },
];

export const Default: Story = {
  args: {
    users: sampleUsers,
    onBanUser: (id) => console.log("ban", id),
    onUnbanUser: (id) => console.log("unban", id),
    onDeleteUser: (id) => console.log("delete", id),
    onEditUser: (user) => console.log("edit", user),
    onAddUser: () => console.log("add user"),
  },
};

export const Empty: Story = {
  args: {
    users: [],
    onBanUser: (id) => console.log("ban", id),
    onUnbanUser: (id) => console.log("unban", id),
    onDeleteUser: (id) => console.log("delete", id),
    onEditUser: (user) => console.log("edit", user),
    onAddUser: () => console.log("add user"),
  },
};

export const AllBanned: Story = {
  args: {
    users: sampleUsers.map((u) => ({ ...u, status: "banned" as const })),
    onBanUser: (id) => console.log("ban", id),
    onUnbanUser: (id) => console.log("unban", id),
    onDeleteUser: (id) => console.log("delete", id),
    onEditUser: (user) => console.log("edit", user),
    onAddUser: () => console.log("add user"),
  },
};
