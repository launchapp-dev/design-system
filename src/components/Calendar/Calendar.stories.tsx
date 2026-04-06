import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "./index";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- Date buttons use \`role="button"\` with semantic \`aria-pressed\` for selection state
- Month/year navigation buttons are properly labeled
- Calendar grid uses semantic table structure for screen readers
- Selected dates announced with \`aria-selected="true"\`

### Keyboard Navigation
- **Tab**: Navigate through calendar buttons
- **Arrow Keys**: Move between days within the calendar grid
- **Enter/Space**: Select/deselect a date
- **Escape**: Close date picker if within a date input

### Screen Reader Behavior
- Announces current month and year
- Day buttons announce their date and selection status
- Navigation buttons announce "Previous month" / "Next month"
- Disabled dates announced as unavailable

### Focus Management
- Initial focus on current day or today's date
- Focus visible indicator on all interactive elements
- Focus traps within modal if used as popup
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {
  parameters: {
    docs: {
      description: {
        story: `Single date selection mode. Use arrow keys to navigate dates and Enter/Space to select. Screen readers announce each date's selection state.`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            background: "hsl(var(--background))",
          }}
        >
          <Calendar mode="single" selected={selected} onSelect={setSelected} />
          {selected && (
            <p
              style={{
                padding: "0 12px 12px",
                fontSize: "13px",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Selected: {selected.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const RangeMode: Story = {
  parameters: {
    docs: {
      description: {
        story: `Range selection mode. Select a start date, then an end date. Screen readers announce range boundaries.`,
      },
    },
  },
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            background: "hsl(var(--background))",
          }}
        >
          <Calendar mode="range" selected={range} onSelect={setRange} />
          {range?.from && (
            <p
              style={{
                padding: "0 12px 12px",
                fontSize: "13px",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {range.from.toLocaleDateString()} – {range.to ? range.to.toLocaleDateString() : "…"}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const MultipleMode: Story = {
  parameters: {
    docs: {
      description: {
        story: `Multiple date selection mode. Select multiple dates independently. Screen readers announce count of selected dates.`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            background: "hsl(var(--background))",
          }}
        >
          <Calendar mode="multiple" selected={selected} onSelect={setSelected} />
          <p
            style={{
              padding: "0 12px 12px",
              fontSize: "13px",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            {selected && selected.length > 0
              ? `Selected ${selected.length} date(s)`
              : "No dates selected"}
          </p>
        </div>
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story: `Disabled dates are announced as unavailable to screen readers. These dates cannot be selected via keyboard or mouse.`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            background: "hsl(var(--background))",
          }}
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            disabled={{ before: today }}
          />
          <p
            style={{
              padding: "0 12px 12px",
              fontSize: "13px",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Past dates are disabled
          </p>
        </div>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
          background: "hsl(var(--background))",
        }}
      >
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            background: "hsl(var(--background))",
          }}
        >
          <Calendar mode="single" selected={selected} onSelect={setSelected} />
        </div>
      </div>
    );
  },
};
