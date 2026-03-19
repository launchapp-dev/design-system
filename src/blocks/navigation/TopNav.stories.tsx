import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
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
