import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CommandPalette, type CommandGroup, type CommandItem } from "./CommandPalette";

const settingsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const dashboardIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const userIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const billingIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const helpIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const groups: CommandGroup[] = [
  {
    id: "navigation",
    label: "Navigation",
    items: [
      { id: "nav-dashboard", label: "Dashboard", description: "View your dashboard", icon: dashboardIcon, shortcut: "G D", action: () => {} },
      { id: "nav-users", label: "Users", description: "Manage users", icon: userIcon, shortcut: "G U", action: () => {} },
      { id: "nav-settings", label: "Settings", description: "App settings", icon: settingsIcon, shortcut: "G S", action: () => {} },
      { id: "nav-billing", label: "Billing", description: "Manage billing", icon: billingIcon, shortcut: "G B", action: () => {} },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "act-search", label: "Search", description: "Search anything", icon: searchIcon, shortcut: "/", action: () => {} },
      { id: "act-help", label: "Help & Support", description: "Get help", icon: helpIcon, action: () => {} },
    ],
  },
];

const recentItems: CommandItem[] = [
  { id: "rec-1", label: "Dashboard", icon: dashboardIcon, shortcut: "G D", action: () => {} },
  { id: "rec-2", label: "User Profile", icon: userIcon, action: () => {} },
];

const meta: Meta<typeof CommandPalette> = {
  title: "Blocks/Search/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  argTypes: { open: { control: false } },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

function CommandPaletteDemo({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      groups={groups}
      recentItems={recentItems}
      placeholder="Search commands, pages, users..."
    />
  );
}

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex items-center justify-center p-8">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
        >
          <span>Search...</span>
          <kbd className="ml-4 rounded bg-muted px-1.5 py-0.5 text-xs font-mono">⌘K</kbd>
        </button>
        <CommandPaletteDemo open={open} setOpen={setOpen} />
      </div>
    );
  },
};