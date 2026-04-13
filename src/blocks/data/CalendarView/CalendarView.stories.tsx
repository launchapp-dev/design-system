import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { addDays, addHours, setHours, setMinutes, startOfToday } from "date-fns";
import { CalendarView, type CalendarEvent, type CalendarViewMode } from "./CalendarView";

const today = startOfToday();

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Product launch meeting",
    date: setMinutes(setHours(today, 9), 0),
    endDate: setMinutes(setHours(today, 10), 0),
    description: "Final review of launch checklist and go/no-go decision",
    color: "primary",
  },
  {
    id: "2",
    title: "Design review",
    date: setMinutes(setHours(addDays(today, 1), 11), 0),
    endDate: addHours(setMinutes(setHours(addDays(today, 1), 11), 0), 1),
    description: "Review new dashboard designs with the team",
    color: "secondary",
  },
  {
    id: "3",
    title: "Sprint planning",
    date: addDays(today, 2),
    description: "Plan next two-week sprint",
    color: "default",
    allDay: true,
  },
  {
    id: "4",
    title: "1:1 with Sarah",
    date: setMinutes(setHours(addDays(today, 3), 14), 30),
    endDate: setMinutes(setHours(addDays(today, 3), 15), 0),
    description: "Weekly check-in",
    color: "outline",
  },
  {
    id: "5",
    title: "Bug triage",
    date: setMinutes(setHours(addDays(today, 5), 16), 0),
    description: "Review critical bugs from last release",
    color: "destructive",
  },
  {
    id: "6",
    title: "All-hands meeting",
    date: addDays(today, 7),
    description: "Monthly company-wide update",
    color: "default",
    allDay: true,
  },
  {
    id: "7",
    title: "Tech deep-dive",
    date: addDays(today, -2),
    description: "Architecture review for new feature",
    color: "secondary",
  },
];

const meta: Meta<typeof CalendarView> = {
  title: "Blocks/Data/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { CalendarView, CalendarEvent } from "@launchapp/design-system/blocks";

const events: CalendarEvent[] = [
  { id: "1", title: "Team standup", date: new Date(), allDay: true },
  { id: "2", title: "Design review", date: addDays(new Date(), 1), color: "secondary" },
];

export default function Page() {
  return (
    <CalendarView
      events={events}
      title="Team Calendar"
      defaultView="week"
      onEventClick={(event) => console.log(event)}
      onEventCreate={(event) => console.log("created", event)}
      onEventReschedule={(event) => console.log("rescheduled", event)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} />
    </div>
  ),
};

export const WeekView: Story = {
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} defaultView="week" selectedDate={today} />
    </div>
  ),
};

export const DayView: Story = {
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} defaultView="day" selectedDate={today} />
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveCalendarView() {
    const [events, setEvents] = React.useState(sampleEvents);
    const [view, setView] = React.useState<CalendarViewMode>("week");

    return (
      <div className="min-h-[700px]">
        <CalendarView
          events={events}
          view={view}
          onViewChange={setView}
          selectedDate={today}
          onDateSelect={(date) => console.log("Selected:", date)}
          onEventCreate={(event) =>
            setEvents((current) => [
              ...current,
              {
                ...event,
                id: `story-event-${current.length + 1}`,
              },
            ])
          }
          onEventReschedule={(event) =>
            setEvents((current) => current.map((item) => (item.id === event.id ? event : item)))
          }
        />
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView />
    </div>
  ),
};

export const WithCustomTitle: Story = {
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView
        events={sampleEvents}
        title="Team Schedule"
        description="Q2 planning calendar"
      />
    </div>
  ),
};

export const EventListHidden: Story = {
  name: "Without Event List",
  render: () => (
    <div className="min-h-[600px]">
      <CalendarView events={sampleEvents} showEventList={false} />
    </div>
  ),
};

export const ManyEvents: Story = {
  name: "Many Events on One Day",
  render: () => {
    const manyEvents: CalendarEvent[] = [
      {
        id: "a",
        title: "Morning standup",
        date: today,
        color: "default",
        allDay: true,
      },
      {
        id: "b",
        title: "Design critique",
        date: today,
        color: "secondary",
      },
      {
        id: "c",
        title: "Sprint retro",
        date: today,
        color: "primary",
      },
      {
        id: "d",
        title: "Code review",
        date: today,
        color: "outline",
      },
      {
        id: "e",
        title: "All-hands prep",
        date: today,
        color: "secondary",
      },
      {
        id: "f",
        title: "Stakeholder update",
        date: today,
        color: "destructive",
      },
    ];
    return (
      <div className="min-h-[700px]">
        <CalendarView events={manyEvents} selectedDate={today} />
      </div>
    );
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
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} />
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div className="min-h-[700px]">
      <CalendarView events={sampleEvents} />
    </div>
  ),
};
