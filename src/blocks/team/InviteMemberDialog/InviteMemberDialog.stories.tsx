import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import type { InviteRole } from "./InviteMemberDialog";
import { Button } from "@/components/Button";

const meta: Meta<typeof InviteMemberDialog> = {
  title: "Blocks/Team/InviteMemberDialog",
  component: InviteMemberDialog,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

function InviteDialogWrapper({
  ...args
}: Omit<React.ComponentProps<typeof InviteMemberDialog>, "open" | "onOpenChange">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Invite Dialog</Button>
      <InviteMemberDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export const Default: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
  },
};

export const WithRoleSelection: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
    defaultRole: "admin" as InviteRole,
  },
};

export const WithSeatLimit: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
    maxRecipients: 10,
    sentCount: 8,
  },
};

export const AtSeatLimit: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
    maxRecipients: 5,
    sentCount: 5,
  },
};

export const Loading: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
    isLoading: true,
  },
};

export const WithError: Story = {
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
    error: "Some email addresses are already members of this workspace.",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: (args) => <InviteDialogWrapper {...args} />,
  args: {
    onInvite: (recipients) => console.log("Invite", recipients),
  },
};
