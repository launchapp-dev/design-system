
import type { Meta, StoryObj } from "@storybook/react";
import { Dock, type DockItemData } from "./index";

const meta = {
  title: "Components/Dock",
  component: Dock,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Dock container has \`role="toolbar"\` or \`role="navigation"\`
- Each dock item is a button with clear \`aria-label\`
- Active/current item marked with \`aria-current="page"\` if applicable

### Keyboard Navigation
- **Tab**: Focus individual dock items
- **Arrow Keys**: Navigate between dock items
- **Enter/Space**: Activate dock item
- **Escape**: Deactivate focus if needed

### Screen Reader Behavior
- Dock announced as toolbar or navigation
- Each item announced with its label
- Tooltips announced on hover/focus
- Current selection status announced

### Focus Management
- Each dock item is individually focusable
- Clear visible focus indicator
- Magnification/hover effects announced via tooltip
- No focus trap - natural tab order
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    magnification: {
      control: { type: "range", min: 1, max: 2.5, step: 0.1 },
    },
    magnificationDistance: {
      control: { type: "range", min: 50, max: 300, step: 10 },
    },
    baseSize: {
      control: { type: "range", min: 32, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof Dock>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: DockItemData[] = [
  {
    id: "finder",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <circle cx="9" cy="10" r="1.5" />
        <circle cx="15" cy="10" r="1.5" />
        <path d="M12 18c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z" />
      </svg>
    ),
    label: "Finder",
    active: true,
  },
  {
    id: "safari",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12 6l-1.5 5.5L12 18l1.5-6.5L12 6z" />
        <path d="M6 12l5.5 1.5L18 12l-6.5-1.5L6 12z" />
      </svg>
    ),
    label: "Safari",
  },
  {
    id: "messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      </svg>
    ),
    label: "Messages",
  },
  {
    id: "mail",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
      </svg>
    ),
    label: "Mail",
    active: true,
  },
  {
    id: "photos",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-500">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
    label: "Photos",
  },
  {
    id: "music",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-500">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    label: "Music",
  },
  {
    id: "settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
    label: "Settings",
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    size: "md",
    magnification: 1.5,
    magnificationDistance: 140,
    baseSize: 48,
  },
};

export const Small: Story = {
  args: {
    items: defaultItems,
    size: "sm",
    magnification: 1.4,
    magnificationDistance: 120,
    baseSize: 40,
  },
};

export const Large: Story = {
  args: {
    items: defaultItems,
    size: "lg",
    magnification: 1.6,
    magnificationDistance: 160,
    baseSize: 56,
  },
};

export const MinimalMagnification: Story = {
  args: {
    items: defaultItems,
    size: "md",
    magnification: 1.15,
    magnificationDistance: 100,
    baseSize: 48,
  },
};

export const HighMagnification: Story = {
  args: {
    items: defaultItems,
    size: "md",
    magnification: 2,
    magnificationDistance: 200,
    baseSize: 48,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
          padding: "100px 50px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          minHeight: "200px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    items: defaultItems,
    size: "md",
    magnification: 1.5,
    magnificationDistance: 140,
    baseSize: 48,
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      onClick: () => alert(`Clicked ${item.label}`),
    })),
    size: "md",
    magnification: 1.5,
    magnificationDistance: 140,
    baseSize: 48,
  },
};

export const FewItems: Story = {
  args: {
    items: defaultItems.slice(0, 3),
    size: "md",
    magnification: 1.5,
    magnificationDistance: 140,
    baseSize: 48,
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...defaultItems,
      {
        id: "calendar",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
          </svg>
        ),
        label: "Calendar",
      },
      {
        id: "notes",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
            <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />
          </svg>
        ),
        label: "Notes",
      },
    ],
    size: "md",
    magnification: 1.5,
    magnificationDistance: 140,
    baseSize: 48,
  },
};
