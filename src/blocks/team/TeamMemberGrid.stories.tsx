import type { Meta, StoryObj } from "@storybook/react";
import { TeamMemberGrid } from "./TeamMemberGrid";

const meta: Meta<typeof TeamMemberGrid> = {
  title: "Blocks/Team/TeamMemberGrid",
  component: TeamMemberGrid,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultMembers = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@company.com",
    role: "owner" as const,
    status: "active" as const,
    department: "Engineering",
    joinedAt: "2023-01-15",
  },
  {
    id: "u2",
    name: "Jordan Chen",
    email: "jordan@company.com",
    role: "admin" as const,
    status: "active" as const,
    department: "Product",
    joinedAt: "2023-03-20",
  },
  {
    id: "u3",
    name: "Sam Patel",
    email: "sam@company.com",
    role: "member" as const,
    status: "active" as const,
    department: "Design",
    joinedAt: "2023-06-10",
  },
  {
    id: "u4",
    name: "Taylor Kim",
    email: "taylor@company.com",
    role: "billing" as const,
    status: "active" as const,
    department: "Finance",
    joinedAt: "2023-08-05",
  },
  {
    id: "u5",
    name: "Morgan Lee",
    email: "morgan@company.com",
    role: "member" as const,
    status: "pending" as const,
    department: "Marketing",
  },
  {
    id: "u6",
    name: "Casey Brown",
    email: "casey@company.com",
    role: "member" as const,
    status: "inactive" as const,
    department: "Sales",
    joinedAt: "2023-02-14",
  },
];

export const Default: Story = {
  render: () => (
    <TeamMemberGrid
      members={defaultMembers}
      currentUserId="u2"
      onRemove={(m) => console.log("Remove", m.name)}
      onChangeRole={(m, r) => console.log("Change role", m.name, r)}
      onResendInvite={(m) => console.log("Resend", m.name)}
      onInvite={() => console.log("Invite clicked")}
    />
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <TeamMemberGrid
      members={defaultMembers.slice(0, 4)}
      columns={2}
      currentUserId="u1"
      onRemove={(m) => console.log("Remove", m.name)}
    />
  ),
};

export const FourColumns: Story = {
  render: () => (
    <TeamMemberGrid
      members={defaultMembers}
      columns={4}
      onRemove={(m) => console.log("Remove", m.name)}
    />
  ),
};

export const NoInviteButton: Story = {
  render: () => (
    <TeamMemberGrid
      members={defaultMembers}
      showInviteButton={false}
      onRemove={(m) => console.log("Remove", m.name)}
    />
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
    <TeamMemberGrid
      members={defaultMembers.slice(0, 4)}
      currentUserId="u2"
      onRemove={(m) => console.log("Remove", m.name)}
      onInvite={() => console.log("Invite clicked")}
    />
  ),
};
