import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "./index";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", background: "hsl(var(--background))" }}>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
          />
          {selected && (
            <p style={{ padding: "0 12px 12px", fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
              Selected: {selected.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const RangeMode: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", background: "hsl(var(--background))" }}>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
          />
          {range?.from && (
            <p style={{ padding: "0 12px 12px", fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
              {range.from.toLocaleDateString()} – {range.to ? range.to.toLocaleDateString() : "…"}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const MultipleMode: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>(undefined);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", background: "hsl(var(--background))" }}>
          <Calendar
            mode="multiple"
            selected={selected}
            onSelect={setSelected}
          />
          <p style={{ padding: "0 12px 12px", fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
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
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <div style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", background: "hsl(var(--background))" }}>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            disabled={{ before: today }}
          />
          <p style={{ padding: "0 12px 12px", fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
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
      <div style={{ display: "flex", justifyContent: "center", padding: "40px", background: "hsl(var(--background))" }}>
        <div style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", background: "hsl(var(--background))" }}>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>
    );
  },
};
