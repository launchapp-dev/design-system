import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ToolbarButton,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./index";

const meta: Meta<typeof ToolbarRoot> = {
  title: "Components/Toolbar",
  component: ToolbarRoot,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <ToolbarRoot>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
        <ToolbarButton>Underline</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton variant="outline">Save</ToolbarButton>
        <ToolbarLink href="#">Help</ToolbarLink>
      </ToolbarRoot>
    </div>
  ),
};

export const WithToggleGroup: Story = {
  render: () => {
    const [alignment, setAlignment] = React.useState("center");
    return (
      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <ToolbarRoot>
          <ToolbarButton>Cut</ToolbarButton>
          <ToolbarButton>Copy</ToolbarButton>
          <ToolbarButton>Paste</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup
            type="single"
            value={alignment}
            onValueChange={(v) => v && setAlignment(v)}
          >
            <ToolbarToggleItem value="left">Left</ToolbarToggleItem>
            <ToolbarToggleItem value="center">Center</ToolbarToggleItem>
            <ToolbarToggleItem value="right">Right</ToolbarToggleItem>
          </ToolbarToggleGroup>
        </ToolbarRoot>
        <p style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
          Alignment: {alignment}
        </p>
      </div>
    );
  },
};

export const MultipleToggle: Story = {
  render: () => {
    const [formatting, setFormatting] = React.useState<string[]>([]);
    return (
      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <ToolbarRoot>
          <ToolbarToggleGroup
            type="multiple"
            value={formatting}
            onValueChange={setFormatting}
          >
            <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
            <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
            <ToolbarToggleItem value="underline">Underline</ToolbarToggleItem>
            <ToolbarToggleItem value="strikethrough">Strike</ToolbarToggleItem>
          </ToolbarToggleGroup>
          <ToolbarSeparator />
          <ToolbarButton>Clear</ToolbarButton>
        </ToolbarRoot>
        <p style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
          Active: {formatting.length > 0 ? formatting.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Small
        </p>
        <ToolbarRoot>
          <ToolbarButton size="sm">Bold</ToolbarButton>
          <ToolbarButton size="sm">Italic</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup type="single" defaultValue="left">
            <ToolbarToggleItem size="sm" value="left">
              Left
            </ToolbarToggleItem>
            <ToolbarToggleItem size="sm" value="center">
              Center
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
        </ToolbarRoot>
      </div>
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Medium (default)
        </p>
        <ToolbarRoot>
          <ToolbarButton size="md">Bold</ToolbarButton>
          <ToolbarButton size="md">Italic</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup type="single" defaultValue="left">
            <ToolbarToggleItem size="md" value="left">
              Left
            </ToolbarToggleItem>
            <ToolbarToggleItem size="md" value="center">
              Center
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
        </ToolbarRoot>
      </div>
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Large
        </p>
        <ToolbarRoot>
          <ToolbarButton size="lg">Bold</ToolbarButton>
          <ToolbarButton size="lg">Italic</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup type="single" defaultValue="left">
            <ToolbarToggleItem size="lg" value="left">
              Left
            </ToolbarToggleItem>
            <ToolbarToggleItem size="lg" value="center">
              Center
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
        </ToolbarRoot>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Default variant
        </p>
        <ToolbarRoot>
          <ToolbarButton variant="default">Action</ToolbarButton>
          <ToolbarButton variant="default" disabled>
            Disabled
          </ToolbarButton>
        </ToolbarRoot>
      </div>
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Outline variant
        </p>
        <ToolbarRoot>
          <ToolbarButton variant="outline">Action</ToolbarButton>
          <ToolbarButton variant="outline" disabled>
            Disabled
          </ToolbarButton>
        </ToolbarRoot>
      </div>
      <div>
        <p
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Ghost variant
        </p>
        <ToolbarRoot>
          <ToolbarButton variant="ghost">Action</ToolbarButton>
          <ToolbarButton variant="ghost" disabled>
            Disabled
          </ToolbarButton>
        </ToolbarRoot>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div style={{ padding: "32px", background: "hsl(var(--background))" }}>
      <ToolbarRoot>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="single" defaultValue="left">
          <ToolbarToggleItem value="left">Left</ToolbarToggleItem>
          <ToolbarToggleItem value="center">Center</ToolbarToggleItem>
          <ToolbarToggleItem value="right">Right</ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarButton disabled>Disabled</ToolbarButton>
      </ToolbarRoot>
    </div>
  ),
};
