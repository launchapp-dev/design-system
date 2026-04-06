import type { Meta, StoryObj } from "@storybook/react";
import { TeamMemberList } from "./TeamMemberList";

const meta: Meta<typeof TeamMemberList> = {
  title: "Blocks/Team/TeamMemberList",
  component: TeamMemberList,
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
  },
  {
    id: "u2",
    name: "Jordan Chen",
    email: "jordan@company.com",
    role: "admin" as const,
    status: "active" as const,
  },
  {
    id: "u3",
    name: "Sam Patel",
    email: "sam@company.com",
    role: "member" as const,
    status: "active" as const,
  },
  {
    id: "u4",
    name: "Taylor Kim",
    email: "taylor@company.com",
    role: "billing" as const,
    status: "active" as const,
  },
  {
    id: "u5",
    name: "Morgan Lee",
    email: "morgan@company.com",
    role: "member" as const,
    status: "pending" as const,
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <TeamMemberList
        members={defaultMembers}
        currentUserId="u2"
        onRemove={(m) => console.log("Remove", m.name)}
        onChangeRole={(m, r) => console.log("Change role", m.name, r)}
        onResendInvite={(m) => console.log("Resend", m.name)}
      />
    </div>
  ),
};

export const OwnersOnly: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <TeamMemberList members={defaultMembers.filter((m) => m.role === "owner")} />
    </div>
  ),
};

export const WithPending: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <TeamMemberList
        members={defaultMembers}
        onResendInvite={(m) => console.log("Resend", m.name)}
        onRemove={(m) => console.log("Remove", m.name)}
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
    <div style={{ maxWidth: 600 }}>
      <TeamMemberList
        members={defaultMembers.slice(0, 3)}
        currentUserId="u2"
        onRemove={(m) => console.log("Remove", m.name)}
      />
    </div>
  ),
};
