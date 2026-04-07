import type { Meta, StoryObj } from "@storybook/react";
import { addDays, startOfToday } from "date-fns";
import { CalendarWidget, type CalendarWidgetEvent } from "./CalendarWidget";

const today = startOfToday();

const sampleEvents: CalendarWidgetEvent[] = [
  { id: "1", title: "Team standup", date: today, color: "primary" },
  { id: "2", title: "Design review", date: addDays(today, 1), color: "secondary" },
  { id: "3", title: "Sprint planning", date: addDays(today, 2), color: "primary" },
  { id: "4", title: "1:1 with manager", date: addDays(today, 3), color: "accent" },
  { id: "5", title: "Client call", date: addDays(today, 5), color: "destructive" },
  { id: "6", title: "Launch day", date: addDays(today, 7), color: "primary" },
  { id: "7", title: "Team dinner", date: addDays(today, 7), color: "accent" },
];

const meta: Meta<typeof CalendarWidget> = {
  title: "Blocks/Data/CalendarWidget",
  component: CalendarWidget,
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof CalendarWidget>;

export const Default: Story = {
  args: {
    events: sampleEvents,
  },
};

export const WithHandlers: Story = {
  args: {
    events: sampleEvents,
    onDateSelect: (date) => console.log("Selected date:", date),
    onEventClick: (event) => console.log("Clicked event:", event.title),
  },
};

export const Empty: Story = {
  args: {
    events: [],
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    events: sampleEvents,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    events: sampleEvents,
  },
};
