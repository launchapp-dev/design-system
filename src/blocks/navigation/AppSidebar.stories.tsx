import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppSidebar } from "./AppSidebar";
import type { NavSection } from "./AppSidebar";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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
    title: "Content",
    items: [{ label: "Documents", href: "#", icon: <FileIcon /> }],
  },
  {
    title: "System",
    items: [{ label: "Settings", href: "#", icon: <SettingsIcon /> }],
  },
];

const sampleUser = {
  name: "Jane Smith",
  email: "jane@example.com",
  avatarFallback: "JS",
};

const LogoMark = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[hsl(var(--la-primary))]">
      <span className="text-xs font-bold text-[hsl(var(--la-primary-foreground))]">A</span>
    </div>
    <span className="text-sm font-semibold">Acme</span>
  </div>
);

const meta: Meta<typeof AppSidebar> = {
  title: "Blocks/Navigation/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { AppSidebar } from "@launchapp/design-system/blocks";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/", isActive: true },
      { label: "Analytics", href: "/analytics" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/profile" },
      { label: "Billing", href: "/billing" },
    ],
  },
];

export default function Page() {
  return (
    <AppSidebar
      sections={sections}
      user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
    />
  );
}`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-[600px] w-full overflow-hidden border border-[hsl(var(--la-border))] rounded-lg">
        <Story />
        <main className="flex flex-1 items-center justify-center bg-[hsl(var(--la-muted))]">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Main content area</p>
        </main>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  render: () => <AppSidebar sections={sampleSections} logo={<LogoMark />} user={sampleUser} />,
};

export const DefaultCollapsed: Story = {
  render: () => (
    <AppSidebar sections={sampleSections} logo={<LogoMark />} user={sampleUser} defaultCollapsed />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <AppSidebar
        sections={sampleSections}
        logo={<LogoMark />}
        user={sampleUser}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
    );
  },
};

export const NoUser: Story = {
  render: () => <AppSidebar sections={sampleSections} logo={<LogoMark />} />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark flex h-[600px] w-full overflow-hidden rounded-lg border border-[hsl(var(--la-border))]">
        <Story />
        <main className="flex flex-1 items-center justify-center bg-[hsl(var(--la-muted))]">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Main content area</p>
        </main>
      </div>
    ),
  ],
  render: () => <AppSidebar sections={sampleSections} logo={<LogoMark />} user={sampleUser} />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div className="flex h-[600px] w-full overflow-hidden border border-[hsl(var(--la-border))] rounded-lg">
      <AppSidebar
        sections={sampleSections}
        logo={<LogoMark />}
        user={sampleUser}
        defaultCollapsed
      />
      <main className="flex flex-1 items-center justify-center bg-[hsl(var(--la-muted))]">
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Main content area</p>
      </main>
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div className="flex h-[600px] w-full overflow-hidden border border-[hsl(var(--la-border))] rounded-lg">
      <AppSidebar sections={sampleSections} logo={<LogoMark />} user={sampleUser} />
      <main className="flex flex-1 items-center justify-center bg-[hsl(var(--la-muted))]">
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Main content area</p>
      </main>
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div className="flex h-[600px] w-full overflow-hidden border border-[hsl(var(--la-border))] rounded-lg">
      <AppSidebar sections={sampleSections} logo={<LogoMark />} user={sampleUser} />
      <main className="flex flex-1 items-center justify-center bg-[hsl(var(--la-muted))]">
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Main content area</p>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "AppSidebar is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Button,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  ScrollArea,
  Separator,
  Tooltip, TooltipContent, TooltipTrigger,
} from "@launchapp/design-system";

// AppSidebar builds a collapsible navigation sidebar from design system primitives:
// – ScrollArea wraps the nav so it scrolls independently of the page
// – Collapsible from Radix handles nested nav sections (expand/collapse with animation)
// – Button (ghost, icon) for the collapse toggle with Tooltip for collapsed labels
// – Avatar for the user info footer
// Collapsed width: 60px (icon only). Expanded width: 240px.
export function AppSidebar({ sections = [], logo, user, collapsed, defaultCollapsed, onCollapsedChange }) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed ?? false);
  const controlled = collapsed !== undefined;
  const open = controlled ? !collapsed : !isCollapsed;

  const handleToggle = () => {
    if (!controlled) setIsCollapsed((c) => !c);
    onCollapsedChange?.(!open);
  };

  return (
    <aside className={open ? "w-60" : "w-[60px]"} style={{ transition: "width 200ms" }}>
      <div className="flex h-full flex-col border-r bg-background">
        <div className="flex h-14 items-center justify-between px-3 border-b">
          {open && logo}
          <Button variant="ghost" size="icon" onClick={handleToggle}>
            {/* ChevronLeft / ChevronRight icon */}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
            {sections.map((section) => (
              <div key={section.title}>
                {open && section.title && (
                  <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">{section.title}</p>
                )}
                {section.items.map((item) =>
                  item.children ? (
                    <Collapsible key={item.label}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          {item.icon}
                          {open && item.label}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.children.map((child) => (
                          <a key={child.label} href={child.href} className="block pl-8 py-1 text-sm text-muted-foreground hover:text-foreground">
                            {child.label}
                          </a>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <a key={item.label} href={item.href} className={item.isActive ? "flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted font-medium text-sm" : "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted"}>
                      {item.icon}
                      {open && item.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
        {user && (
          <>
            <Separator />
            <div className="flex items-center gap-2 p-3">
              <Avatar className="h-7 w-7">
                <AvatarFallback>{user.avatarFallback}</AvatarFallback>
              </Avatar>
              {open && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}`,
      },
    },
  },
};
