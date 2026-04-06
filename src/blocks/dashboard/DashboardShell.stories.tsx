import type { Meta, StoryObj } from "@storybook/react";
import { DashboardShell } from "./DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { StatDisplay } from "@/components/StatDisplay";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";

const meta: Meta<typeof DashboardShell> = {
  title: "Blocks/Dashboard/DashboardShell",
  component: DashboardShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DashboardShell>;

const sampleNavigation = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
    ),
    active: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
    ),
  },
  {
    id: "customers",
    label: "Customers",
    href: "/customers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
    ),
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
    ),
  },
];

const sampleUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  fallbackInitials: "JD",
};

const sampleNotifications = [
  {
    id: "1",
    title: "New customer signed up",
    description: "Acme Corp just created an account",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment received",
    description: "$2,500 from TechStart Inc",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "New feature released",
    description: "Check out the new analytics dashboard",
    timestamp: "3 hours ago",
    read: true,
  },
];

const stats = [
  { label: "Revenue", value: "$45,231.89", change: "+20.1%", trend: "up" as const },
  { label: "Customers", value: "2,350", change: "+180", trend: "up" as const },
  { label: "Sales", value: "+12,234", change: "+19%", trend: "up" as const },
  { label: "Active Now", value: "+573", change: "+201", trend: "up" as const },
];

const SampleContent = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-[hsl(var(--la-muted-foreground))]">
        Welcome back! Here&apos;s an overview of your business.
      </p>
    </div>

    <StatDisplay items={stats} cols={4} />

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-[hsl(var(--la-muted))]" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Customer {i}</p>
                  <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
                    customer{i}@example.com
                  </p>
                </div>
                <div className="font-medium">+${(i * 100).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your monthly performance metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-[hsl(var(--la-border))] rounded-[--la-radius]">
            <p className="text-[hsl(var(--la-muted-foreground))]">Chart placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Dashboard" }],
    children: <SampleContent />,
  },
};

export const Collapsed: Story = {
  args: {
    sidebarCollapsed: true,
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Dashboard" }],
    children: <SampleContent />,
  },
};

export const WithCustomLogo: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Dashboard" }],
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-[hsl(var(--la-primary))] flex items-center justify-center text-[hsl(var(--la-primary-foreground))] font-bold">
          A
        </div>
        <span className="font-semibold text-lg">Acme Inc</span>
      </div>
    ),
    logoCollapsed: (
      <div className="h-8 w-8 rounded-lg bg-[hsl(var(--la-primary))] flex items-center justify-center text-[hsl(var(--la-primary-foreground))] font-bold">
        A
      </div>
    ),
    children: <SampleContent />,
  },
};

export const WithNestedNavigation: Story = {
  args: {
    navigation: [
      ...sampleNavigation.slice(0, 2),
      {
        id: "commerce",
        label: "Commerce",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        ),
        items: [
          { id: "orders", label: "Orders", href: "/orders" },
          { id: "products-nested", label: "Products", href: "/products" },
          { id: "inventory", label: "Inventory", href: "/inventory" },
        ],
      },
      ...sampleNavigation.slice(2),
    ],
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Commerce", href: "/commerce" }, { label: "Orders" }],
    children: (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-[hsl(var(--la-muted-foreground))]">
            Manage your orders and track shipments.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[hsl(var(--la-muted-foreground))]">Order list would appear here.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const WithHeaderActions: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Products" }],
    headerActions: (
      <>
        <Button variant="outline">Import</Button>
        <Button>Add Product</Button>
      </>
    ),
    children: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-[hsl(var(--la-muted-foreground))]">Manage your product catalog.</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-[hsl(var(--la-muted-foreground))]">
              Product grid would appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const NoNotifications: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: [],
    breadcrumbs: [{ label: "Dashboard" }],
    children: <SampleContent />,
  },
};

export const ManyNotifications: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: [
      ...sampleNotifications,
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `extra-${i}`,
        title: `Notification ${i + 4}`,
        description: "This is an additional notification for testing overflow",
        timestamp: `${i + 4} hours ago`,
        read: i > 5,
      })),
    ],
    breadcrumbs: [{ label: "Dashboard" }],
    children: <SampleContent />,
  },
};

export const WithTabs: Story = {
  args: {
    navigation: sampleNavigation,
    user: sampleUser,
    notifications: sampleNotifications,
    breadcrumbs: [{ label: "Settings" }],
    children: (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-[hsl(var(--la-muted-foreground))]">
            Manage your account settings and preferences.
          </p>
        </div>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--la-primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--la-primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--la-primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--la-primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              Billing
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure your general account preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[hsl(var(--la-muted-foreground))]">
              Settings form would appear here. This demonstrates the DashboardShell with tabs
              integrated into the main content area.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};
