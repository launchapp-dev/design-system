import type { Meta, StoryObj } from "@storybook/react";
import { TeamInviteFlow } from "./TeamInviteFlow";

const meta: Meta<typeof TeamInviteFlow> = {
  title: "Blocks/Onboarding/TeamInviteFlow",
  component: TeamInviteFlow,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TeamInviteFlow>;

export const Default: Story = {
  args: {},
};

export const WithEntries: Story = {
  render: (args) => (
    <TeamInviteFlow
      {...args}
      entries={[
        { id: "1", email: "alice@company.com", role: "admin", status: "sent" },
        { id: "2", email: "bob@company.com", role: "member", status: "pending" },
        { id: "3", email: "invalid-email", role: "member", status: "error" },
      ]}
      onSendInvites={(emails) => console.log("Invites:", emails)}
      onSkip={() => {}}
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: 24 }}>
      <TeamInviteFlow />
    </div>
  ),
};