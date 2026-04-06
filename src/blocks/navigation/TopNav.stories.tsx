import type { Meta, StoryObj } from "@storybook/react";
import { TopNav } from "./TopNav";
import type { TopNavItem } from "./TopNav";

const navItems: TopNavItem[] = [
  { label: "Dashboard", href: "#", isActive: true },
  { label: "Analytics", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
];

const sampleUser = {
  name: "Jane Smith",
  email: "jane@example.com",
  avatarFallback: "JS",
  onProfileClick: () => {},
  onSettingsClick: () => {},
  onLogoutClick: () => {},
};

const LogoMark = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[hsl(var(--la-primary))]">
      <span className="text-xs font-bold text-[hsl(var(--la-primary-foreground))]">A</span>
    </div>
    <span className="text-sm font-semibold">Acme</span>
  </div>
);

const meta: Meta<typeof TopNav> = {
  title: "Blocks/Navigation/TopNav",
  component: TopNav,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { TopNav } from "@launchapp/design-system/blocks";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export default function Page() {
  return (
    <TopNav
      items={items}
      notificationCount={3}
      user={{
        name: "Alice Johnson",
        email: "alice@example.com",
        avatarFallback: "AJ",
      }}
    />
  );
}`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
        <main className="flex h-64 items-center justify-center bg-[hsl(var(--la-muted))]">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Page content</p>
        </main>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      user={sampleUser}
    />
  ),
};

export const WithNotificationBadge: Story = {
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={5}
      user={sampleUser}
    />
  ),
};

export const LogoOnly: Story = {
  render: () => (
    <TopNav logo={<LogoMark />} />
  ),
};

export const WithUserOnly: Story = {
  render: () => (
    <TopNav
      logo={<LogoMark />}
      user={sampleUser}
    />
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={12}
      user={sampleUser}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark w-full bg-[hsl(var(--la-background))]">
        <Story />
        <main className="flex h-64 items-center justify-center bg-[hsl(var(--la-muted))]">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">Page content</p>
        </main>
      </div>
    ),
  ],
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={3}
      user={sampleUser}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={5}
      user={sampleUser}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={5}
      user={sampleUser}
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <TopNav
      logo={<LogoMark />}
      items={navItems}
      onSearchClick={() => {}}
      onNotificationClick={() => {}}
      notificationCount={3}
      user={sampleUser}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNav is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Button, Badge,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@launchapp/design-system";

// TopNav assembles a responsive header using design system components:
// – Navigation links rendered as anchor elements with active state styling
// – Bell icon Button with a Badge overlay for notification count (capped at 99+)
// – Search icon Button for triggering a search UI
// – Avatar + DropdownMenu for the user menu (profile, settings, logout)
export function TopNav({ logo, items = [], notificationCount, onSearchClick, onNotificationClick, user }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-4">
        {logo}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.isActive ? "text-foreground font-medium px-3 py-1.5 rounded-md bg-muted text-sm" : "text-muted-foreground px-3 py-1.5 rounded-md text-sm hover:bg-muted"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {onSearchClick && (
            <Button variant="ghost" size="icon" onClick={onSearchClick} aria-label="Search">
              {/* SearchIcon */}
            </Button>
          )}
          {onNotificationClick && (
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={onNotificationClick} aria-label="Notifications">
                {/* BellIcon */}
              </Button>
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Badge>
              )}
            </div>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-7 w-7">
                    {user.avatarSrc && <AvatarImage src={user.avatarSrc} />}
                    <AvatarFallback>{user.avatarFallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={user.onProfileClick}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={user.onSettingsClick}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={user.onLogoutClick}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}`,
      },
    },
  },
};
