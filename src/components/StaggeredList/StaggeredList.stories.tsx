import type { Meta, StoryObj } from "@storybook/react";
import { StaggeredList } from "./index";

const meta: Meta<typeof StaggeredList> = {
  title: "Components/StaggeredList",
  component: StaggeredList,
  argTypes: {
    staggerDelay: { control: { type: "number", min: 0, max: 500 } },
    duration: { control: { type: "number", min: 100, max: 1000 } },
    initialDelay: { control: { type: "number", min: 0, max: 1000 } },
  },
};

export default meta;
type Story = StoryObj<typeof StaggeredList>;

const items = [
  { title: "Design tokens", description: "Colors, typography, spacing" },
  { title: "Core components", description: "Buttons, inputs, badges" },
  { title: "Layout components", description: "Grid, stack, container" },
  { title: "Navigation", description: "Sidebar, tabs, breadcrumbs" },
  { title: "Data display", description: "Tables, charts, cards" },
];

export const Default: Story = {
  args: {
    staggerDelay: 80,
    duration: 400,
    initialDelay: 0,
  },
  render: (args) => (
    <StaggeredList {...args} style={{ gap: "12px" }}>
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            padding: "16px",
            border: "1px solid hsl(var(--la-border))",
            borderRadius: "var(--la-radius)",
            background: "hsl(var(--la-card))",
          }}
        >
          <p style={{ fontWeight: "600", fontSize: "14px" }}>{item.title}</p>
          <p
            style={{
              fontSize: "13px",
              color: "hsl(var(--la-muted-foreground))",
              marginTop: "4px",
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </StaggeredList>
  ),
};

export const FastStagger: Story = {
  args: {
    staggerDelay: 40,
    duration: 300,
  },
  render: (args) => (
    <StaggeredList {...args} style={{ gap: "8px" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: "12px 16px",
            background: "hsl(var(--la-muted))",
            borderRadius: "var(--la-radius)",
            fontSize: "14px",
          }}
        >
          Item {i + 1}
        </div>
      ))}
    </StaggeredList>
  ),
};

export const SlowStagger: Story = {
  args: {
    staggerDelay: 150,
    duration: 600,
    initialDelay: 200,
  },
  render: (args) => (
    <StaggeredList {...args} style={{ gap: "16px" }}>
      {items.slice(0, 3).map((item) => (
        <div
          key={item.title}
          style={{
            padding: "20px",
            border: "1px solid hsl(var(--la-border))",
            borderRadius: "var(--la-radius)",
            background: "hsl(var(--la-card))",
          }}
        >
          <p style={{ fontWeight: "600" }}>{item.title}</p>
          <p
            style={{
              fontSize: "14px",
              color: "hsl(var(--la-muted-foreground))",
              marginTop: "4px",
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </StaggeredList>
  ),
};
