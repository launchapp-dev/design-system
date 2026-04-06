import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CommandPaletteShell, type CommandPaletteGroup } from "./CommandPaletteShell";

const meta: Meta<typeof CommandPaletteShell> = {
  title: "Blocks/Layout/CommandPaletteShell",
  component: CommandPaletteShell,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof CommandPaletteShell>;

const groups: CommandPaletteGroup[] = [
  {
    label: "Navigation",
    actions: [
      { id: "nav-dashboard", label: "Go to Dashboard", onSelect: () => {}, description: "Navigate to dashboard" },
      { id: "nav-projects", label: "Go to Projects", onSelect: () => {}, description: "Navigate to projects" },
      { id: "nav-settings", label: "Go to Settings", onSelect: () => {}, description: "Navigate to settings" },
    ],
  },
  {
    label: "Actions",
    actions: [
      { id: "act-new", label: "Create new project", onSelect: () => {}, badge: "N" },
      { id: "act-invite", label: "Invite team member", onSelect: () => {} },
      { id: "act-export", label: "Export data", onSelect: () => {}, disabled: true },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => { setOpen(true); }, []);
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          Open Command Palette
        </button>
        <CommandPaletteShell open={open} onOpenChange={setOpen} groups={groups} />
      </>
    );
  },
};

export const WithCustomCommands: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => { setOpen(true); }, []);
    return <CommandPaletteShell open={open} onOpenChange={setOpen} groups={groups} placeholder="Type a command..." emptyMessage="No commands match your search." />;
  },
};

export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => { setOpen(true); }, []);
    return (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh", padding: 24 }}>
        <button type="button" onClick={() => setOpen(true)} className="rounded-md border border-border px-4 py-2 text-sm text-white hover:bg-muted">Open</button>
        <CommandPaletteShell open={open} onOpenChange={setOpen} groups={groups} />
      </div>
    );
  },
};