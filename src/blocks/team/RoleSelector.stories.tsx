import type { Meta, StoryObj } from "@storybook/react";
import { RoleSelector } from "./RoleSelector";

const meta: Meta<typeof RoleSelector> = {
  title: "Blocks/Team/RoleSelector",
  component: RoleSelector,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <RoleSelector onChange={(r) => console.log("Role changed to", r)} />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <RoleSelector
        description="Choose the appropriate role for this team member."
        onChange={(r) => console.log("Role changed to", r)}
      />
    </div>
  ),
};

export const Preselected: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <RoleSelector value="admin" onChange={(r) => console.log("Role changed to", r)} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <RoleSelector value="member" disabled />
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
      <RoleSelector value="admin" onChange={(r) => console.log("Role changed to", r)} />
    </div>
  ),
};
