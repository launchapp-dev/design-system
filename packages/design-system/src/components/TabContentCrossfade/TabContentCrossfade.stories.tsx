import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TabContentCrossfade, TabPanel } from "./index";

const meta: Meta<typeof TabContentCrossfade> = {
  title: "Components/TabContentCrossfade",
  component: TabContentCrossfade,
  argTypes: {
    duration: { control: { type: "number", min: 50, max: 1000 } },
  },
};

export default meta;
type Story = StoryObj<typeof TabContentCrossfade>;

const tabs = [
  { key: "overview", label: "Overview", content: "The overview panel shows a summary of your account activity, recent transactions, and key metrics at a glance." },
  { key: "analytics", label: "Analytics", content: "The analytics panel provides detailed charts and graphs showing your performance trends over time." },
  { key: "settings", label: "Settings", content: "The settings panel allows you to configure your preferences, notifications, and account details." },
];

function TabBar({ active, onChange }: { active: string; onChange: (key: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        padding: "4px",
        background: "hsl(var(--la-muted))",
        borderRadius: "var(--la-radius)",
        marginBottom: "16px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            padding: "6px 16px",
            borderRadius: "calc(var(--la-radius) - 2px)",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: active === tab.key ? "600" : "400",
            background: active === tab.key ? "hsl(var(--la-background))" : "transparent",
            color: active === tab.key ? "hsl(var(--la-foreground))" : "hsl(var(--la-muted-foreground))",
            boxShadow: active === tab.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 150ms",
          }}
          aria-selected={active === tab.key}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export const Default: Story = {
  args: {
    duration: 200,
  },
  render: (args) => {
    const [active, setActive] = React.useState("overview");
    return (
      <div style={{ width: "480px" }}>
        <TabBar active={active} onChange={setActive} />
        <TabContentCrossfade activeKey={active} {...args}>
          {tabs.map((tab) => (
            <TabPanel key={tab.key} tabKey={tab.key}>
              <div
                style={{
                  padding: "20px",
                  border: "1px solid hsl(var(--la-border))",
                  borderRadius: "var(--la-radius)",
                  background: "hsl(var(--la-card))",
                }}
              >
                <p style={{ fontWeight: "600", marginBottom: "8px" }}>{tab.label}</p>
                <p style={{ fontSize: "14px", color: "hsl(var(--la-muted-foreground))" }}>{tab.content}</p>
              </div>
            </TabPanel>
          ))}
        </TabContentCrossfade>
      </div>
    );
  },
};

export const SlowCrossfade: Story = {
  args: {
    duration: 500,
  },
  render: (args) => {
    const [active, setActive] = React.useState("overview");
    return (
      <div style={{ width: "480px" }}>
        <TabBar active={active} onChange={setActive} />
        <TabContentCrossfade activeKey={active} {...args}>
          {tabs.map((tab) => (
            <TabPanel key={tab.key} tabKey={tab.key}>
              <div
                style={{
                  padding: "20px",
                  border: "1px solid hsl(var(--la-border))",
                  borderRadius: "var(--la-radius)",
                  background: "hsl(var(--la-card))",
                  minHeight: "100px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "14px", color: "hsl(var(--la-muted-foreground))" }}>{tab.content}</p>
              </div>
            </TabPanel>
          ))}
        </TabContentCrossfade>
      </div>
    );
  },
};

export const WithStaggeredContent: Story = {
  render: () => {
    const [active, setActive] = React.useState("team");
    const panels = [
      { key: "team", label: "Team", items: ["Alice Johnson", "Bob Smith", "Carol White", "David Lee"] },
      { key: "projects", label: "Projects", items: ["Design System", "Mobile App", "API Gateway", "Dashboard"] },
      { key: "reports", label: "Reports", items: ["Q1 Summary", "Q2 Summary", "Annual Review", "Budget Report"] },
    ];
    return (
      <div style={{ width: "360px" }}>
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
          {panels.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              style={{
                padding: "6px 14px",
                border: "1px solid hsl(var(--la-border))",
                borderRadius: "var(--la-radius)",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: active === p.key ? "600" : "400",
                background: active === p.key ? "hsl(var(--la-primary))" : "hsl(var(--la-background))",
                color: active === p.key ? "hsl(var(--la-primary-foreground))" : "hsl(var(--la-foreground))",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <TabContentCrossfade activeKey={active} duration={200}>
          {panels.map((p) => (
            <TabPanel key={p.key} tabKey={p.key}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {p.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "12px 16px",
                      border: "1px solid hsl(var(--la-border))",
                      borderRadius: "var(--la-radius)",
                      background: "hsl(var(--la-card))",
                      fontSize: "14px",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </TabContentCrossfade>
      </div>
    );
  },
};
