import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import type { NavSection } from "./AppSidebar";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const sampleSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "#", icon: <HomeIcon />, isActive: true },
      { label: "Analytics", href: "#", icon: <ChartIcon /> },
      {
        label: "Users",
        icon: <UsersIcon />,
        children: [
          { label: "All Users", href: "#" },
          { label: "Roles", href: "#" },
          { label: "Permissions", href: "#" },
        ],
      },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "#", icon: <SettingsIcon /> },
    ],
  },
];

const sampleUser = {
  name: "Jane Smith",
  email: "jane@example.com",
  avatarFallback: "JS",
};

const LogoMark = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[hsl(var(--ag-primary))]">
      <span className="text-xs font-bold text-[hsl(var(--ag-primary-foreground))]">A</span>
    </div>
    <span className="text-sm font-semibold">Acme</span>
  </div>
);

const meta: Meta<typeof MobileNavDrawer> = {
  title: "Blocks/Navigation/MobileNavDrawer",
  component: MobileNavDrawer,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MobileNavDrawer>;

export const Default: Story = {
  render: () => (
    <MobileNavDrawer
      sections={sampleSections}
      logo={<LogoMark />}
      user={sampleUser}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <MobileNavDrawer
          sections={sampleSections}
          logo={<LogoMark />}
          user={sampleUser}
          open={open}
          onOpenChange={setOpen}
        />
        <p className="text-sm text-[hsl(var(--ag-muted-foreground))]">
          Drawer is {open ? "open" : "closed"}
        </p>
      </div>
    );
  },
};

export const NoUser: Story = {
  render: () => (
    <MobileNavDrawer
      sections={sampleSections}
      logo={<LogoMark />}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark flex h-32 w-64 items-center justify-center rounded-lg bg-[hsl(var(--ag-background))] p-4">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <MobileNavDrawer
      sections={sampleSections}
      logo={<LogoMark />}
      user={sampleUser}
    />
  ),
};
