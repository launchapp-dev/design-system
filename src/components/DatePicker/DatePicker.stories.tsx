import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    dateFormat: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Input has \`aria-label\` and associated label
- Popup has \`role="dialog"\` with \`aria-labelledby\`
- Calendar days have \`aria-label\` with full date
- Selected date marked with \`aria-selected="true"\`

### Keyboard Navigation
- **Tab**: Focus input and calendar controls
- **Arrow Keys**: Navigate calendar days
- **Enter**: Select date
- **Escape**: Close popup
- **Ctrl+Shift+T**: Jump to today

### Screen Reader Behavior
- Input purpose announced
- Calendar popup announced as dialog
- Current month/year announced
- Each day announced with its full date
- Selection state announced

### Focus Management
- Focus on input initially
- Focus moves to calendar when open
- Return focus to input after selection
- Clear visible focus indicator
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
        <div style={{ width: "240px" }}>
          <DatePicker selected={date} onSelect={setDate} />
          {date && (
            <p
              style={{ marginTop: "12px", fontSize: "13px", color: "hsl(var(--muted-foreground))" }}
            >
              Selected: {date.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
        <div style={{ width: "240px" }}>
          <DatePicker selected={date} onSelect={setDate} />
        </div>
      </div>
    );
  },
};

export const CustomDateFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "80px",
        }}
      >
        <div style={{ width: "240px" }}>
          <p
            style={{ marginBottom: "8px", fontSize: "12px", color: "hsl(var(--muted-foreground))" }}
          >
            Format: yyyy-MM-dd
          </p>
          <DatePicker selected={date} onSelect={setDate} dateFormat="yyyy-MM-dd" />
        </div>
        <div style={{ width: "240px" }}>
          <p
            style={{ marginBottom: "8px", fontSize: "12px", color: "hsl(var(--muted-foreground))" }}
          >
            Format: MM/dd/yyyy
          </p>
          <DatePicker selected={date} onSelect={setDate} dateFormat="MM/dd/yyyy" />
        </div>
        <div style={{ width: "240px" }}>
          <p
            style={{ marginBottom: "8px", fontSize: "12px", color: "hsl(var(--muted-foreground))" }}
          >
            Format: MMMM d, yyyy
          </p>
          <DatePicker selected={date} onSelect={setDate} dateFormat="MMMM d, yyyy" />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
      <div style={{ width: "240px" }}>
        <DatePicker disabled placeholder="Pick a date" />
      </div>
    </div>
  ),
};

export const WithFutureDatesOnly: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
        <div style={{ width: "240px" }}>
          <DatePicker
            selected={date}
            onSelect={setDate}
            placeholder="Select a future date"
            calendarProps={{ disabled: { before: today } }}
          />
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
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px",
          background: "hsl(var(--background))",
        }}
      >
        <div style={{ width: "240px" }}>
          <DatePicker selected={date} onSelect={setDate} />
        </div>
      </div>
    );
  },
};
