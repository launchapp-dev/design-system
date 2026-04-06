import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BreadcrumbNav } from "./BreadcrumbNav";

const meta: Meta<typeof BreadcrumbNav> = {
  title: "Blocks/Navigation/BreadcrumbNav",
  component: BreadcrumbNav,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbNav>;

export const Default: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Analytics", href: "/analytics" },
      { label: "Reports" },
    ],
  },
};

export const NoHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Smartphones" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      {
        label: "Settings",
        href: "/settings",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
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
      { label: "Account" },
    ],
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: "Root", href: "/" },
      { label: "Level 1", href: "/l1" },
      { label: "Level 2", href: "/l1/l2" },
      { label: "Level 3", href: "/l1/l2/l3" },
      { label: "Level 4", href: "/l1/l2/l3/l4" },
      { label: "Current Page" },
    ],
    maxItems: 3,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-6 rounded-lg bg-[hsl(var(--la-background))]">
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [path, setPath] = React.useState(["Dashboard", "Analytics", "Q1 2024"]);
    return (
      <div className="space-y-4">
        <BreadcrumbNav
          items={path.map((label, i) => ({
            label,
            href: i < path.length - 1 ? `/${path.slice(0, i + 1).join("/")}` : undefined,
          }))}
          onNavigate={(href) => {
            const segments = href.split("/").filter(Boolean);
            setPath(segments.length ? segments : ["Dashboard"]);
          }}
        />
        <p className="text-xs text-muted-foreground">Click any breadcrumb to navigate</p>
      </div>
    );
  },
};
