import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

const meta: Meta<typeof WorkspaceSwitcher> = {
  title: "Blocks/Team/WorkspaceSwitcher",
  component: WorkspaceSwitcher,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultWorkspaces = [
  { id: "w1", name: "Acme Corp", role: "Owner" },
  { id: "w2", name: "Personal", role: "Member" },
  { id: "w3", name: "Client Alpha", role: "Admin" },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <WorkspaceSwitcher
        workspaces={defaultWorkspaces}
        currentId="w1"
        onChange={(w) => console.log("Switch to", w.name)}
        onCreate={() => console.log("Create workspace")}
        onSettings={(w) => console.log("Settings for", w.name)}
      />
    </div>
  ),
};

export const WithSlug: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <WorkspaceSwitcher
        workspaces={[
          { id: "w1", name: "Acme Corp", slug: "acme" },
          { id: "w2", name: "Personal", slug: "personal" },
        ]}
        currentId="w1"
        onChange={(w) => console.log("Switch to", w.name)}
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
    <div style={{ maxWidth: 320 }}>
      <WorkspaceSwitcher
        workspaces={defaultWorkspaces}
        currentId="w1"
        onChange={(w) => console.log("Switch to", w.name)}
        onCreate={() => console.log("Create workspace")}
      />
    </div>
  ),
};
