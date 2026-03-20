import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { GradientMesh, Aurora, GridPattern, DotPattern } from "./index";

const meta: Meta = {
  title: "Components/Background",
};
export default meta;

export const GradientMeshStory: StoryObj = {
  name: "GradientMesh",
  render: () => (
    <div style={{ width: "100%", height: 300, borderRadius: 8, overflow: "hidden" }}>
      <GradientMesh />
    </div>
  ),
};

export const GradientMeshCustomColors: StoryObj = {
  name: "GradientMesh — Custom Colors",
  render: () => (
    <div style={{ width: "100%", height: 300, borderRadius: 8, overflow: "hidden" }}>
      <GradientMesh colors={["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]} speed={5} />
    </div>
  ),
};

export const AuroraStory: StoryObj = {
  name: "Aurora",
  render: () => (
    <Aurora style={{ width: "100%", height: 300, borderRadius: 8 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          fontSize: 24,
          zIndex: 1,
        }}
      >
        Aurora Effect
      </div>
    </Aurora>
  ),
};

export const AuroraCustom: StoryObj = {
  name: "Aurora — Custom Colors",
  render: () => (
    <Aurora
      colors={["#10b981", "#3b82f6", "#6366f1"]}
      speed={6}
      style={{ width: "100%", height: 300, borderRadius: 8 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          fontSize: 24,
          zIndex: 1,
        }}
      >
        Green Aurora
      </div>
    </Aurora>
  ),
};

export const GridPatternStory: StoryObj = {
  name: "GridPattern",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))" }}>
      <GridPattern />
    </div>
  ),
};

export const GridPatternDashed: StoryObj = {
  name: "GridPattern — Dashed",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))" }}>
      <GridPattern strokeDasharray="4 2" width={32} height={32} />
    </div>
  ),
};

export const GridPatternHighlighted: StoryObj = {
  name: "GridPattern — Highlighted Squares",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))" }}>
      <GridPattern
        squares={[
          [1, 1], [2, 3], [4, 2], [3, 5], [6, 1], [5, 4],
        ]}
        x={0}
        y={0}
      />
    </div>
  ),
};

export const DotPatternStory: StoryObj = {
  name: "DotPattern",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))" }}>
      <DotPattern />
    </div>
  ),
};

export const DotPatternDense: StoryObj = {
  name: "DotPattern — Dense",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))" }}>
      <DotPattern width={8} height={8} cx={1} cy={1} cr={1} />
    </div>
  ),
};

export const AllBackgrounds: StoryObj = {
  name: "All Backgrounds",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>GradientMesh</p>
        <div style={{ height: 120, borderRadius: 8, overflow: "hidden" }}>
          <GradientMesh />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Aurora</p>
        <Aurora style={{ height: 120, borderRadius: 8 }} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>GridPattern</p>
        <div style={{ position: "relative", height: 120, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))", border: "1px solid hsl(var(--la-border))" }}>
          <GridPattern />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>DotPattern</p>
        <div style={{ position: "relative", height: 120, borderRadius: 8, overflow: "hidden", background: "hsl(var(--la-background))", border: "1px solid hsl(var(--la-border))" }}>
          <DotPattern />
        </div>
      </div>
    </div>
  ),
};
