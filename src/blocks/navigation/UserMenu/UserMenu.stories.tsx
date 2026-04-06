import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
  title: "Blocks/Navigation/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

const sampleUser = {
  name: "Jane Smith",
  email: "jane@example.com",
  avatarFallback: "JS",
};

export const Default: Story = {
  args: {
    user: sampleUser,
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatarSrc: "https://i.pravatar.cc/150?img=47",
      avatarFallback: "JS",
    },
  },
};

export const WithRole: Story = {
  args: {
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatarFallback: "JS",
      role: "Admin",
    },
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-6 rounded-lg bg-[hsl(var(--la-background))]">
        <Story />
      </div>
    ),
  ],
  args: {
    user: sampleUser,
  },
};

export const Interactive: Story = {
  render: () => {
    const [logs, setLogs] = React.useState<string[]>([]);
    const addLog = (action: string) =>
      setLogs((prev) => [`${new Date().toLocaleTimeString()}: ${action}`, ...prev.slice(0, 4)]);
    return (
      <div className="flex gap-8">
        <UserMenu
          user={sampleUser}
          sections={[
            {
              items: [
                { label: "Profile", onClick: () => addLog("Profile clicked") },
                { label: "Settings", onClick: () => addLog("Settings clicked") },
              ],
            },
            {
              items: [{ label: "Log out", danger: true, onClick: () => addLog("Logout clicked") }],
            },
          ]}
        />
        <div className="text-xs space-y-1 text-muted-foreground min-w-[200px]">
          <p className="font-semibold text-foreground">Actions:</p>
          {logs.length === 0 ? <p>Click menu items…</p> : logs.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </div>
    );
  },
};

export const CustomTrigger: Story = {
  args: {
    user: sampleUser,
    trigger: (
      <button className="flex items-center gap-2 rounded-full border p-2 hover:bg-accent transition-colors">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          JS
        </div>
        <span className="text-sm font-medium">Jane Smith</span>
      </button>
    ),
  },
};
