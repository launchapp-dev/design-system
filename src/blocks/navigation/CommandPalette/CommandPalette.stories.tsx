
import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette, InlineCommandPalette, useCommandPalette } from "./CommandPalette";
import type { CommandPaletteAction } from "./CommandPalette";
import { Button } from "../../../components/Button";

const meta = {
  title: "Blocks/Navigation/CommandPalette",
  component: InlineCommandPalette,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InlineCommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Icon helpers for stories ──────────────────────────────────────────────────

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Sample data ───────────────────────────────────────────────────────────────

const groups = [
  { id: "navigation", label: "Navigation" },
  { id: "settings", label: "Settings" },
  { id: "team", label: "Team" },
  { id: "documents", label: "Recent Documents" },
  { id: "account", label: "Account" },
];

const actions: CommandPaletteAction[] = [
  {
    id: "go-home",
    label: "Go to Dashboard",
    group: "navigation",
    icon: <HomeIcon />,
    shortcut: "⌘H",
    keywords: ["home", "start", "main"],
    onSelect: () => console.log("→ Dashboard"),
  },
  {
    id: "go-settings",
    label: "Open Settings",
    group: "navigation",
    icon: <SettingsIcon />,
    shortcut: "⌘,",
    onSelect: () => console.log("→ Settings"),
  },
  {
    id: "settings-billing",
    label: "Billing & Plans",
    description: "Manage subscriptions and invoices",
    group: "settings",
    icon: <SettingsIcon />,
    onSelect: () => console.log("→ Billing"),
  },
  {
    id: "settings-notifications",
    label: "Notification Preferences",
    group: "settings",
    icon: <SettingsIcon />,
    onSelect: () => console.log("→ Notifications"),
  },
  {
    id: "invite-team",
    label: "Invite Team Member",
    group: "team",
    icon: <UsersIcon />,
    badge: "Pro",
    onSelect: () => console.log("→ Invite"),
  },
  {
    id: "view-team",
    label: "View Team",
    group: "team",
    icon: <UsersIcon />,
    onSelect: () => console.log("→ Team"),
  },
  {
    id: "doc-1",
    label: "Q4 2024 Roadmap",
    description: "Last edited 2 hours ago",
    group: "documents",
    icon: <FileIcon />,
    onSelect: () => console.log("→ Roadmap"),
  },
  {
    id: "doc-2",
    label: "Design System Audit",
    description: "Last edited yesterday",
    group: "documents",
    icon: <FileIcon />,
    onSelect: () => console.log("→ Audit"),
  },
  {
    id: "logout",
    label: "Log Out",
    group: "account",
    icon: <LogOutIcon />,
    shortcut: "⌘⇧Q",
    onSelect: () => console.log("→ Logout"),
  },
];

// ── Inline stories ────────────────────────────────────────────────────────────

export const Inline: Story = {
  args: {
    actions,
    groups,
    placeholder: "Search commands…",
    footer: (
      <span className="flex items-center gap-3">
        <span><kbd className="rounded bg-muted px-1 text-xs font-medium">↑↓</kbd> navigate</span>
        <span><kbd className="rounded bg-muted px-1 text-xs font-medium">↵</kbd> select</span>
        <span><kbd className="rounded bg-muted px-1 text-xs font-medium">esc</kbd> close</span>
      </span>
    ),
  },
  decorators: [(S) => <div className="w-[480px]"><S /></div>],
};

// ── Dialog story (interactive) ────────────────────────────────────────────────

export const Dialog: StoryObj = {
  render: function DialogStory() {
    const { open, setOpen } = useCommandPalette();
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">⌘K</kbd> or click the button below</p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          actions={actions}
          groups={groups}
          placeholder="Search commands…"
          footer={
            <span className="flex items-center gap-3">
              <span><kbd className="rounded bg-muted px-1 text-xs font-medium">↑↓</kbd> navigate</span>
              <span><kbd className="rounded bg-muted px-1 text-xs font-medium">↵</kbd> select</span>
              <span><kbd className="rounded bg-muted px-1 text-xs font-medium">esc</kbd> close</span>
            </span>
          }
        />
      </div>
    );
  },
};
