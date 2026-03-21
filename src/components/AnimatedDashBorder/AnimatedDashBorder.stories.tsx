import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AnimatedDashBorder } from "./index";

const meta: Meta = {
  title: "Components/AnimatedDashBorder",
};
export default meta;

const cardContent = (
  <div style={{ padding: 24 }}>
    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Animated Dash Border</h3>
    <p style={{ fontSize: 14, opacity: 0.6 }}>Marching ants effect on the border.</p>
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedDashBorder style={{ width: 320 }}>
        {cardContent}
      </AnimatedDashBorder>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <AnimatedDashBorder key={size} size={size} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>Size: {size}</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>
              {size === "sm" ? "1px" : size === "md" ? "2px" : "3px"} border
            </p>
          </div>
        </AnimatedDashBorder>
      ))}
    </div>
  ),
};

export const CustomColors: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      <AnimatedDashBorder borderColor="#8b5cf6" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#8b5cf6" }}>Purple Dashes</p>
        </div>
      </AnimatedDashBorder>
      <AnimatedDashBorder borderColor="#06b6d4" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#06b6d4" }}>Cyan Dashes</p>
        </div>
      </AnimatedDashBorder>
      <AnimatedDashBorder borderColor="#10b981" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#10b981" }}>Emerald Dashes</p>
        </div>
      </AnimatedDashBorder>
      <AnimatedDashBorder borderColor="#f59e0b" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#f59e0b" }}>Amber Dashes</p>
        </div>
      </AnimatedDashBorder>
    </div>
  ),
};

export const DashPatterns: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      <AnimatedDashBorder dashWidth={4} dashGap={8} style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Short Dashes</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>4px dash, 8px gap</p>
        </div>
      </AnimatedDashBorder>
      <AnimatedDashBorder dashWidth={12} dashGap={4} style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Long Dashes</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>12px dash, 4px gap</p>
        </div>
      </AnimatedDashBorder>
      <AnimatedDashBorder dashWidth={20} dashGap={20} style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Equal Pattern</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>20px dash, 20px gap</p>
        </div>
      </AnimatedDashBorder>
    </div>
  ),
};

export const CustomDurations: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[1, 2, 4].map((duration) => (
        <AnimatedDashBorder key={duration} duration={duration} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{duration}s</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Animation speed</p>
          </div>
        </AnimatedDashBorder>
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
      <AnimatedDashBorder style={{ width: 280 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Dashes (static)</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>No animation when reduced motion is preferred</p>
        </div>
      </AnimatedDashBorder>
    </div>
  ),
};

export const SelectionBox: StoryObj = {
  name: "Selection Box",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedDashBorder borderColor="#f59e0b" dashWidth={6} dashGap={4} style={{ width: 280 }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600">📋</span>
            </div>
            <div>
              <p className="font-medium">Select Item</p>
              <p className="text-xs text-muted-foreground">Click to select</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Use the marching ants border to indicate selectable or draggable items.
          </p>
        </div>
      </AnimatedDashBorder>
    </div>
  ),
};

export const ImageWithCaption: StoryObj = {
  name: "Image with Caption",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedDashBorder borderColor="#8b5cf6" dashWidth={8} dashGap={6} style={{ width: 320 }}>
        <div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 h-48 flex items-center justify-center">
            <span className="text-6xl">🖼️</span>
          </div>
          <div className="p-4">
            <p className="font-medium mb-1">Mountain Sunrise</p>
            <p className="text-xs text-muted-foreground">A beautiful view at dawn</p>
          </div>
        </div>
      </AnimatedDashBorder>
    </div>
  ),
};
