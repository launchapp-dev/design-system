import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Dock, DockItem, DockDivider, DockLabel } from "./index";

const meta: Meta<typeof Dock> = {
  title: "Components/Dock",
  component: Dock,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "glass", "dark", "minimal"],
      description: "Visual style of the dock",
    },
    position: {
      control: "select",
      options: ["bottom", "left", "right"],
      description: "Position of the dock",
    },
    magnification: {
      control: { type: "range", min: 1, max: 2, step: 0.1 },
      description: "Scale factor when hovering",
    },
    range: {
      control: { type: "range", min: 50, max: 200, step: 10 },
      description: "Pixel range for magnification effect",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dock>;

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock position="bottom" magnification={1.5} range={100}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={3} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
        <DockItem icon={<BellIcon />} label="Notifications" badge={12} />
      </Dock>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["default", "glass", "dark", "minimal"] as const).map((variant) => (
        <div key={variant}>
          <p className="mb-2 text-sm font-medium capitalize text-[hsl(var(--la-muted-foreground))]">
            {variant}
          </p>
          <div className="min-h-[120px] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
            <Dock position="bottom" variant={variant} magnification={1.3} range={80}>
              <DockItem icon={<HomeIcon />} label="Home" />
              <DockItem icon={<FolderIcon />} label="Files" />
              <DockItem icon={<MailIcon />} label="Mail" badge={3} />
              <DockDivider />
              <DockItem icon={<SettingsIcon />} label="Settings" />
            </Dock>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock position="left" magnification={1.5} range={100}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={3} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
        <DockItem icon={<BellIcon />} label="Notifications" badge={12} />
      </Dock>
    </div>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock position="right" magnification={1.5} range={100}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={3} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
        <DockItem icon={<BellIcon />} label="Notifications" badge={12} />
      </Dock>
    </div>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock position="bottom" magnification={1.4} range={90}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockDivider />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={5} />
        <DockItem icon={<BellIcon />} label="Alerts" />
        <DockDivider />
        <DockItem icon={<SettingsIcon />} label="Settings" />
      </Dock>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock position="bottom" magnification={1.5} range={100}>
        <DockItem icon={<MailIcon />} label="Mail" badge={12} />
        <DockItem icon={<BellIcon />} label="Notifications" badge={3} />
        <DockItem icon={<FolderIcon />} label="Downloads" badge={99} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Messages" badge={1} />
        <DockItem icon={<HomeIcon />} label="Tasks" />
      </Dock>
    </div>
  ),
};

export const MagnificationSettings: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
          Low Magnification (1.2)
        </p>
        <div className="min-h-[100px] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
          <Dock position="bottom" magnification={1.2} range={120}>
            <DockItem icon={<HomeIcon />} label="Home" />
            <DockItem icon={<FolderIcon />} label="Files" />
            <DockItem icon={<MailIcon />} label="Mail" />
            <DockItem icon={<SettingsIcon />} label="Settings" />
          </Dock>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
          High Magnification (1.8)
        </p>
        <div className="min-h-[100px] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
          <Dock position="bottom" magnification={1.8} range={80}>
            <DockItem icon={<HomeIcon />} label="Home" />
            <DockItem icon={<FolderIcon />} label="Files" />
            <DockItem icon={<MailIcon />} label="Mail" />
            <DockItem icon={<SettingsIcon />} label="Settings" />
          </Dock>
        </div>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark min-h-[400px] bg-slate-950 p-8">
      <Dock position="bottom" variant="glass" magnification={1.5} range={100}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={3} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
        <DockItem icon={<BellIcon />} label="Notifications" badge={12} />
      </Dock>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: "default",
    position: "bottom",
    magnification: 1.5,
    range: 100,
  },
  render: (args) => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <Dock {...args}>
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<MailIcon />} label="Mail" badge={3} />
        <DockDivider />
        <DockItem icon={<UserIcon />} label="Profile" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
        <DockItem icon={<BellIcon />} label="Notifications" badge={12} />
      </Dock>
    </div>
  ),
};
