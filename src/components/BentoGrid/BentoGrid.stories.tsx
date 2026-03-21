import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoCard } from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard span={2} style={{ padding: "24px", minHeight: "160px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Featured</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Spans two columns.</p>
      </BentoCard>
      <BentoCard span={1} style={{ padding: "24px", minHeight: "160px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Side</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Single column.</p>
      </BentoCard>
      <BentoCard span={1} style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card A</h3>
      </BentoCard>
      <BentoCard span={1} style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card B</h3>
      </BentoCard>
      <BentoCard span={1} style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card C</h3>
      </BentoCard>
    </BentoGrid>
  ),
};

export const HoverVariants: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard hover="default" style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Default Hover</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Lifts on hover.</p>
      </BentoCard>
      <BentoCard hover="glow" style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Glow Hover</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Glows on hover.</p>
      </BentoCard>
      <BentoCard hover="scale" style={{ padding: "24px", minHeight: "120px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Scale Hover</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Scales on hover.</p>
      </BentoCard>
    </BentoGrid>
  ),
};
