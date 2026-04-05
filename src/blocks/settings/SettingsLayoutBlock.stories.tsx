import type { Meta, StoryObj } from "@storybook/react";
import { SettingsLayoutBlock, type SettingsSectionId } from "./SettingsLayoutBlock";

const defaultSections = [
  { id: "profile" as SettingsSectionId, label: "Profile" },
  { id: "billing" as SettingsSectionId, label: "Billing" },
  { id: "team" as SettingsSectionId, label: "Team" },
  { id: "notifications" as SettingsSectionId, label: "Notifications" },
  { id: "security" as SettingsSectionId, label: "Security" },
  { id: "privacy" as SettingsSectionId, label: "Privacy" },
];

const meta: Meta<typeof SettingsLayoutBlock> = {
  title: "Blocks/Settings/SettingsLayoutBlock",
  component: SettingsLayoutBlock,
  tags: ["autodocs"],
  argTypes: {
    defaultSection: {
      control: "select",
      options: ["profile", "billing", "team", "notifications", "security", "privacy"],
    },
  },
  render: (args) => (
    <SettingsLayoutBlock {...args}>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold capitalize">
          {args.activeSection ?? args.defaultSection ?? "profile"} Settings
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your {args.activeSection ?? args.defaultSection ?? "profile"} settings here.
        </p>
        <div className="mt-4 rounded-md bg-muted p-4 text-sm text-muted-foreground">
          Content for this section would go here.
        </div>
      </div>
    </SettingsLayoutBlock>
  ),
};

export default meta;
type Story = StoryObj<typeof SettingsLayoutBlock>;

export const Default: Story = {
  args: {
    sections: defaultSections,
    defaultSection: "profile",
  },
};

export const WithBadges: Story = {
  args: {
    sections: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing", badge: 2 },
      { id: "team", label: "Team", badge: 5 },
      { id: "notifications", label: "Notifications", badge: "3 new" },
      { id: "security", label: "Security" },
      { id: "privacy", label: "Privacy", badge: 1 },
    ],
    defaultSection: "profile",
  },
};

export const WithIcons: Story = {
  args: {
    sections: [
      { id: "profile", label: "Profile", icon: <UserIcon /> },
      { id: "billing", label: "Billing", icon: <CreditCardIcon /> },
      { id: "team", label: "Team", icon: <UsersIcon /> },
      { id: "notifications", label: "Notifications", icon: <BellIcon /> },
      { id: "security", label: "Security", icon: <ShieldIcon /> },
      { id: "privacy", label: "Privacy", icon: <LockIcon /> },
    ],
    defaultSection: "profile",
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    sections: defaultSections,
    defaultSection: "profile",
    header: (
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>
    ),
    footer: (
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          Last updated: April 4, 2026
        </p>
      </div>
    ),
  },
};

export const SomeDisabled: Story = {
  args: {
    sections: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing" },
      { id: "team", label: "Team", disabled: true },
      { id: "notifications", label: "Notifications" },
      { id: "security", label: "Security" },
      { id: "privacy", label: "Privacy" },
    ],
    defaultSection: "profile",
  },
};

export const BillingActive: Story = {
  args: {
    sections: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing", badge: 2 },
      { id: "team", label: "Team" },
      { id: "notifications", label: "Notifications" },
      { id: "security", label: "Security" },
      { id: "privacy", label: "Privacy" },
    ],
    activeSection: "billing",
    defaultSection: "profile",
  },
};

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}