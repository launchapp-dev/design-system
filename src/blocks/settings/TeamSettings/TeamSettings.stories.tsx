import type { Meta, StoryObj } from "@storybook/react";
import { TeamSettings, type TeamMember } from "./TeamSettings";

const meta: Meta<typeof TeamSettings> = {
  title: "Blocks/Settings/TeamSettings",
  component: TeamSettings,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TeamSettings>;

const members: TeamMember[] = [
  { id: "1", name: "Alice Chen", email: "alice@company.com", role: "owner", status: "active" },
  { id: "2", name: "Bob Smith", email: "bob@company.com", role: "admin", status: "active" },
  { id: "3", name: "Carol Davis", email: "carol@company.com", role: "member", status: "active" },
  { id: "4", name: "Dan Lee", email: "dan@company.com", role: "member", status: "pending" },
  { id: "5", name: "Eve Johnson", email: "eve@company.com", role: "viewer", status: "invited" },
];

export const Default: Story = {
  render: (args) => <TeamSettings {...args} members={members} />,
  args: {},
};

export const Empty: Story = {
  render: (args) => <TeamSettings {...args} members={[members[0]]} />,
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: 24 }}>
      <TeamSettings members={members} />
    </div>
  ),
};