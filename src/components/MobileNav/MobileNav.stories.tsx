import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MobileNav } from "./index";
import type { MobileNavItem } from "./MobileNav";

const meta: Meta<typeof MobileNav> = {
  title: "Components/MobileNav",
  component: MobileNav,
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

const basicItems: MobileNavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const nestedItems: MobileNavItem[] = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    children: [
      { label: "Electronics", href: "#" },
      { label: "Clothing", href: "#" },
      { label: "Books", href: "#" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Consulting", href: "#" },
      { label: "Support", href: "#" },
      {
        label: "Premium Support",
        children: [
          { label: "24/7 Chat", href: "#" },
          { label: "Phone Support", href: "#" },
        ],
      },
    ],
  },
  { label: "Contact", href: "#" },
];

const interactiveItems: MobileNavItem[] = [
  {
    label: "Dashboard",
    onClick: () => console.log("Dashboard clicked"),
  },
  {
    label: "Settings",
    children: [
      {
        label: "Profile",
        onClick: () => console.log("Profile clicked"),
      },
      {
        label: "Preferences",
        onClick: () => console.log("Preferences clicked"),
      },
      {
        label: "Privacy",
        onClick: () => console.log("Privacy clicked"),
      },
    ],
  },
  {
    label: "Help",
    children: [
      { label: "Documentation", href: "#" },
      { label: "FAQ", href: "#" },
      {
        label: "Contact Support",
        onClick: () => console.log("Contact support clicked"),
      },
    ],
  },
  {
    label: "Logout",
    onClick: () => console.log("Logout clicked"),
  },
];

export const Basic: Story = {
  render: () => <MobileNav items={basicItems} />,
};

export const WithNestedItems: Story = {
  render: () => <MobileNav items={nestedItems} />,
};

export const Interactive: Story = {
  render: () => <MobileNav items={interactiveItems} />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive navigation with onClick callbacks. Open the browser console to see action logs when items are clicked.",
      },
    },
  },
};

export const MobileOnly: Story = {
  render: () => (
    <div className="w-full">
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <h1 className="text-lg font-bold">My App</h1>
        <MobileNav items={basicItems} />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          The menu button is only visible on mobile screens (md:hidden breakpoint).
          Resize your browser to see it appear and disappear.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the mobile-only visibility. The hamburger menu button is hidden on medium screens and larger (md:hidden), showing how it integrates into a typical app header.",
      },
    },
  },
};

export const TouchTargets: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Touch-Friendly Navigation</h3>
        <p className="mb-4 text-sm text-gray-600">
          All interactive elements have a minimum height of 44px for comfortable touch targets.
        </p>
        <MobileNav items={basicItems} />
      </div>
      <div className="rounded-lg bg-blue-50 p-4">
        <p className="text-xs text-blue-900">
          <strong>Accessibility:</strong> Each menu item has a minimum height of 44px × 44px,
          meeting WCAG guidelines for touch targets. Navigation items also support keyboard
          navigation (arrow keys, Enter) and screen readers.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the 44px minimum touch target size on all menu items for improved mobile accessibility.",
      },
    },
  },
};

export const ExpandableMenus: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Expandable Menu Items</h3>
      <p className="text-sm text-gray-600">
        Click on menu items with nested content to expand/collapse them. The chevron icon
        rotates to indicate the expanded state.
      </p>
      <MobileNav items={nestedItems} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates expandable nested menu items. Items with children show a chevron icon that rotates when the menu expands, with smooth transitions.",
      },
    },
  },
};

export const LongMenuList: Story = {
  render: () => {
    const longItems: MobileNavItem[] = [
      { label: "Dashboard", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Teams", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Billing", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Logout", href: "#" },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Extended Menu</h3>
        <p className="text-sm text-gray-600">
          A longer menu list that scrolls vertically within the sheet drawer.
        </p>
        <MobileNav items={longItems} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates how the mobile nav handles a larger list of menu items with scrolling.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => <MobileNav items={basicItems} />,
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Mobile navigation with dark mode theming support.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-slate-950 p-4">
        <Story />
      </div>
    ),
  ],
};
