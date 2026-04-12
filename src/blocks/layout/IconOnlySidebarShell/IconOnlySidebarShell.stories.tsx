import type { Meta, StoryObj } from "@storybook/react";
import { IconOnlySidebarShell } from "./IconOnlySidebarShell";
import type { IconOnlyNavSection } from "./IconOnlySidebarShell";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const sections: IconOnlyNavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "#", icon: <HomeIcon />, isActive: true },
      { label: "Analytics", href: "#", icon: <ChartIcon /> },
      { label: "Users", href: "#", icon: <UsersIcon /> },
      { label: "Inbox", href: "#", icon: <InboxIcon />, badge: 5 },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Notifications", href: "#", icon: <BellIcon />, badge: 2 },
      { label: "Settings", href: "#", icon: <SettingsIcon /> },
    ],
  },
];

const Logo = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
    <span className="text-xs font-bold text-primary-foreground">A</span>
  </div>
);

const meta: Meta<typeof IconOnlySidebarShell> = {
  title: "Blocks/Layout/IconOnlySidebarShell",
  component: IconOnlySidebarShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <IconOnlySidebarShell {...args}>
      <div className="flex h-full items-center justify-center bg-muted">
        <div className="text-center">
          <p className="text-sm font-medium">App Content</p>
          <p className="mt-1 text-sm text-muted-foreground">Icon-only sidebar shell</p>
        </div>
      </div>
    </IconOnlySidebarShell>
  ),
};

export default meta;
type Story = StoryObj<typeof IconOnlySidebarShell>;

export const Default: Story = {
  args: {
    navSections: sections,
    logo: <Logo />,
    user: { name: "Jane Smith", email: "jane@example.com", avatarFallback: "JS" },
  },
};

export const NoUser: Story = {
  args: {
    navSections: sections,
    logo: <Logo />,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark h-[600px] w-full overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    navSections: sections,
    logo: <Logo />,
    user: { name: "Jane Smith", email: "jane@example.com", avatarFallback: "JS" },
  },
};
