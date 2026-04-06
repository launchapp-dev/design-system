import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SettingsLayout } from "./SettingsLayout";
import type { SettingsNavSection } from "./SettingsLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Switch } from "../../components/Switch";

// Inline SVG icons
function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.01 17.461 2 12 2z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const meta: Meta<typeof SettingsLayout> = {
  title: "Blocks/App/SettingsLayout",
  component: SettingsLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { SettingsLayout } from "@launchapp/design-system/blocks";

const sections = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "notifications", label: "Notifications" },
      { id: "security", label: "Security" },
    ],
  },
];

export default function Page() {
  const [active, setActive] = React.useState("profile");

  return (
    <SettingsLayout
      sections={sections}
      activeItemId={active}
      onItemClick={(item) => setActive(item.id)}
    >
      {/* Content for the active section */}
    </SettingsLayout>
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SECTIONS: SettingsNavSection[] = [
  {
    title: "Account",
    items: [
      {
        id: "profile",
        label: "Profile",
        icon: <UserIcon className="h-4 w-4" />,
        description: "Manage your personal information",
      },
      {
        id: "billing",
        label: "Billing",
        icon: <CreditCardIcon className="h-4 w-4" />,
        description: "Manage your subscription and payments",
      },
      {
        id: "team",
        label: "Team",
        icon: <UsersIcon className="h-4 w-4" />,
        badge: 3,
        description: "Invite and manage team members",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        icon: <BellIcon className="h-4 w-4" />,
        description: "Choose what notifications you receive",
      },
      {
        id: "security",
        label: "Security",
        icon: <ShieldIcon className="h-4 w-4" />,
        description: "Password and security settings",
      },
      {
        id: "appearance",
        label: "Appearance",
        icon: <PaletteIcon className="h-4 w-4" />,
        description: "Customize the look and feel",
      },
      {
        id: "language",
        label: "Language",
        icon: <GlobeIcon className="h-4 w-4" />,
        disabled: true,
        description: "Coming soon",
      },
    ],
  },
];

function ProfileContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john@example.com" />
        </div>
        <Button>Save changes</Button>
      </CardContent>
    </Card>
  );
}

function BillingContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your subscription and payment methods.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-muted-foreground">$29/month</p>
            </div>
            <Button variant="outline">Change plan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what notifications you receive.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {["Email notifications", "Push notifications", "Marketing emails"].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm">{label}</span>
            <Switch defaultChecked={label !== "Marketing emails"} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SecurityContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your password and 2FA settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
        <Button>Update password</Button>
      </CardContent>
    </Card>
  );
}

function DefaultContent({ activeId }: { activeId: string }) {
  const item = SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item?.label}</CardTitle>
        <CardDescription>{item?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for {item?.label} goes here.</p>
      </CardContent>
    </Card>
  );
}

function ContentForActiveId({ activeId }: { activeId: string }) {
  switch (activeId) {
    case "profile":
      return <ProfileContent />;
    case "billing":
      return <BillingContent />;
    case "notifications":
      return <NotificationsContent />;
    case "security":
      return <SecurityContent />;
    default:
      return <DefaultContent activeId={activeId} />;
  }
}

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
        title="Account Settings"
        description="Manage your account preferences and settings"
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const FlatStructure: Story = {
  render: () => {
    const [active, setActive] = React.useState("profile");
    const flatSections = [
      {
        items: SECTIONS.flatMap((s) => s.items),
      },
    ];
    return (
      <SettingsLayout
        sections={flatSections}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const NoIcons: Story = {
  render: () => {
    const [active, setActive] = React.useState("profile");
    const sectionsNoIcons = SECTIONS.map((section) => ({
      ...section,
      items: section.items.map(({ icon, ...item }) => item),
    }));
    return (
      <SettingsLayout
        sections={sectionsNoIcons}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const WithSidebarFooter: Story = {
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
        sidebarFooter={
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">john@example.com</span>
            </p>
          </div>
        }
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => {
    const [active, setActive] = React.useState("profile");
    return (
      <SettingsLayout
        sections={SECTIONS}
        activeItemId={active}
        onItemClick={(item) => setActive(item.id)}
      >
        <ContentForActiveId activeId={active} />
      </SettingsLayout>
    );
  },
};
