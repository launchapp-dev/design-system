import type { Meta, StoryObj } from "@storybook/react";
import { DualPanelSidebarShell } from "./DualPanelSidebarShell";
import type { DualPanelNavItem } from "./DualPanelSidebarShell";

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const primaryNav: DualPanelNavItem[] = [
  { label: "Inbox", href: "#", icon: <InboxIcon />, isActive: true, badge: 3 },
  { label: "Documents", href: "#", icon: <FileIcon /> },
  { label: "Calendar", href: "#", icon: <CalendarIcon /> },
  { label: "Settings", href: "#", icon: <SettingsIcon /> },
];

const InboxSecondaryPanel = () => (
  <div className="flex flex-col gap-1 p-3">
    {["All Mail", "Unread", "Sent", "Drafts", "Starred", "Archive", "Spam", "Trash"].map((label, i) => (
      <button
        key={label}
        type="button"
        className={`flex w-full items-center justify-between rounded-[--la-radius] px-3 py-2 text-sm transition-colors hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] ${i === 0 ? "bg-[hsl(var(--la-accent))] font-medium" : "text-[hsl(var(--la-foreground))]"}`}
      >
        <span>{label}</span>
        {i === 0 && <span className="text-xs text-[hsl(var(--la-muted-foreground))]">128</span>}
        {i === 1 && <span className="text-xs font-medium text-[hsl(var(--la-primary))]">3</span>}
      </button>
    ))}
  </div>
);

const Logo = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--la-primary))]">
    <span className="text-xs font-bold text-[hsl(var(--la-primary-foreground))]">M</span>
  </div>
);

const meta: Meta<typeof DualPanelSidebarShell> = {
  title: "Blocks/Layout/DualPanelSidebarShell",
  component: DualPanelSidebarShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full overflow-hidden rounded-lg border border-[hsl(var(--la-border))]">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <DualPanelSidebarShell {...args}>
      <div className="flex h-full items-center justify-center bg-[hsl(var(--la-muted))]">
        <div className="text-center">
          <p className="text-sm font-medium">Main Content</p>
          <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">Dual-panel sidebar shell</p>
        </div>
      </div>
    </DualPanelSidebarShell>
  ),
};

export default meta;
type Story = StoryObj<typeof DualPanelSidebarShell>;

export const Default: Story = {
  args: {
    primaryNavItems: primaryNav,
    secondaryPanel: <InboxSecondaryPanel />,
    secondaryPanelTitle: "Inbox",
    logo: <Logo />,
    user: { name: "Jane Smith", email: "jane@example.com", avatarFallback: "JS" },
  },
};

export const SecondaryPanelClosed: Story = {
  args: {
    primaryNavItems: primaryNav,
    secondaryPanel: <InboxSecondaryPanel />,
    secondaryPanelTitle: "Inbox",
    secondaryPanelOpen: false,
    logo: <Logo />,
    user: { name: "Jane Smith", email: "jane@example.com", avatarFallback: "JS" },
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark h-[600px] w-full overflow-hidden rounded-lg border border-[hsl(var(--la-border))]">
        <Story />
      </div>
    ),
  ],
  args: {
    primaryNavItems: primaryNav,
    secondaryPanel: <InboxSecondaryPanel />,
    secondaryPanelTitle: "Inbox",
    logo: <Logo />,
    user: { name: "Jane Smith", email: "jane@example.com", avatarFallback: "JS" },
  },
};
