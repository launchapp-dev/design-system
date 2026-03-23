import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AnimatedBorder } from "./index";

const meta: Meta = {
  title: "Components/AnimatedBorder",
};
export default meta;

const cardContent = (
  <div style={{ padding: 24 }}>
    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Animated Border Card</h3>
    <p style={{ fontSize: 14, opacity: 0.6 }}>This card has an animated border effect.</p>
  </div>
);

export const BeamBorder: StoryObj = {
  name: "Beam Border",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedBorder variant="beam" style={{ width: 320 }}>
        {cardContent}
      </AnimatedBorder>
    </div>
  ),
};

export const GradientSpinBorder: StoryObj = {
  name: "Gradient Spin Border",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedBorder variant="gradient-spin" style={{ width: 320 }}>
        {cardContent}
      </AnimatedBorder>
    </div>
  ),
};

export const DashedBorder: StoryObj = {
  name: "Dashed Border",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedBorder variant="dashed" style={{ width: 320 }}>
        {cardContent}
      </AnimatedBorder>
    </div>
  ),
};

export const AllVariants: StoryObj = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Beam</p>
        <AnimatedBorder variant="beam" style={{ width: 300 }}>
          <div style={{ padding: 24 }}>
            <p style={{ fontWeight: 600 }}>Beam Border</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>Light travels along the border</p>
          </div>
        </AnimatedBorder>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Gradient Spin</p>
        <AnimatedBorder variant="gradient-spin" style={{ width: 300 }}>
          <div style={{ padding: 24 }}>
            <p style={{ fontWeight: 600 }}>Gradient Spin</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>Rotating gradient around the edge</p>
          </div>
        </AnimatedBorder>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Dashed</p>
        <AnimatedBorder variant="dashed" style={{ width: 300 }}>
          <div style={{ padding: 24 }}>
            <p style={{ fontWeight: 600 }}>Dashed Border</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>Animated marching dashes</p>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  ),
};

export const CustomColors: StoryObj = {
  name: "Custom Colors",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      <AnimatedBorder variant="gradient-spin" borderColor="#8b5cf6" secondaryColor="#06b6d4" style={{ width: 240 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#8b5cf6" }}>Purple Cyan</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>Custom colors</p>
        </div>
      </AnimatedBorder>
      <AnimatedBorder variant="beam" borderColor="#10b981" style={{ width: 240 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#10b981" }}>Emerald Beam</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>Custom color</p>
        </div>
      </AnimatedBorder>
      <AnimatedBorder variant="dashed" borderColor="#f59e0b" style={{ width: 240 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#f59e0b" }}>Amber Dashes</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>Custom color</p>
        </div>
      </AnimatedBorder>
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: "Sizes",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <AnimatedBorder key={size} variant="gradient-spin" size={size} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>Size: {size}</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>{size === "sm" ? "1px" : size === "md" ? "2px" : "3px"} border</p>
          </div>
        </AnimatedBorder>
      ))}
    </div>
  ),
};

export const Durations: StoryObj = {
  name: "Durations",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[2, 4, 8].map((duration) => (
        <AnimatedBorder key={duration} variant="gradient-spin" duration={duration} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{duration}s</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Animation duration</p>
          </div>
        </AnimatedBorder>
      ))}
    </div>
  ),
};

export const ReducedMotion: StoryObj = {
  name: "Reduced Motion",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Enable &quot;prefers-reduced-motion&quot; in your OS settings to see animations disabled.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <AnimatedBorder variant="beam" style={{ width: 280 }}>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 600 }}>Beam (no animation)</p>
          </div>
        </AnimatedBorder>
        <AnimatedBorder variant="gradient-spin" style={{ width: 280 }}>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 600 }}>Gradient Spin (no animation)</p>
          </div>
        </AnimatedBorder>
        <AnimatedBorder variant="dashed" style={{ width: 280 }}>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 600 }}>Dashed (no animation)</p>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  ),
};
