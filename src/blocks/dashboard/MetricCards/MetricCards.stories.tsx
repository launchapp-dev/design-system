import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetricCards } from "./MetricCards";

const meta: Meta<typeof MetricCards> = {
  title: "Blocks/Dashboard/MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MetricCards>;

const defaultItems = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    changeType: "up" as const,
    changeLabel: "from last month",
  },
  {
    id: "2",
    label: "Active Users",
    value: "2,345",
    change: "+180",
    changeType: "up" as const,
    changeLabel: "from last week",
  },
  {
    id: "3",
    label: "Conversion Rate",
    value: "3.2%",
    change: "-0.3%",
    changeType: "down" as const,
    changeLabel: "from last week",
  },
  {
    id: "4",
    label: "Avg Session",
    value: "4m 32s",
    change: "+5%",
    changeType: "neutral" as const,
    changeLabel: "no change",
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    columns: 4,
  },
};

export const TwoColumns: Story = {
  args: {
    items: defaultItems.slice(0, 2),
    columns: 2,
  },
};

export const ThreeColumns: Story = {
  args: {
    items: defaultItems.slice(0, 3),
    columns: 3,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Revenue",
        value: "$45,231",
        icon: (
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        ),
      },
      {
        id: "2",
        label: "Users",
        value: "2,345",
        icon: (
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
          </svg>
        ),
      },
      {
        id: "3",
        label: "Orders",
        value: "1,204",
        icon: (
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        ),
      },
      {
        id: "4",
        label: "Tickets",
        value: "89",
        icon: (
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
        ),
      },
    ],
    columns: 4,
  },
};

export const WithoutChanges: Story = {
  args: {
    items: [
      { id: "1", label: "Total Projects", value: "42" },
      { id: "2", label: "Team Members", value: "18" },
      { id: "3", label: "Storage Used", value: "750 GB" },
      { id: "4", label: "API Calls", value: "1.2M" },
    ],
    showChange: false,
    columns: 4,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-6 rounded-lg bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    items: defaultItems.slice(0, 2),
    columns: 2,
  },
};

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <MetricCards items={defaultItems} columns={2} onClick={(item) => setClicked(item.label)} />
        {clicked && <p className="text-xs text-muted-foreground">Clicked: {clicked}</p>}
      </div>
    );
  },
};
