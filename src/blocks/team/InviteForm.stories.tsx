import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { InviteForm } from "./InviteForm";

const meta: Meta<typeof InviteForm> = {
  title: "Blocks/Team/InviteForm",
  component: InviteForm,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <InviteForm
        onSubmit={(v) => console.log("Invite", v)}
        onCancel={() => console.log("Cancel")}
      />
    </div>
  ),
};

export const WithLimits: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <InviteForm
        onSubmit={(v) => console.log("Invite", v)}
        maxRecipients={5}
        sentCount={3}
      />
    </div>
  ),
};

export const AtLimit: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <InviteForm
        onSubmit={(v) => console.log("Invite", v)}
        maxRecipients={5}
        sentCount={5}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <InviteForm
        onSubmit={(v) => console.log("Invite", v)}
        error="This email is already a member of the workspace."
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <InviteForm
        onSubmit={(v) => console.log("Invite", v)}
        isLoading
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
    <div style={{ maxWidth: 400 }}>
      <InviteForm onSubmit={(v) => console.log("Invite", v)} onCancel={() => console.log("Cancel")} />
    </div>
  ),
};
