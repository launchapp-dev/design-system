import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BeamBorder } from "./index";

const meta: Meta = {
  title: "Components/BeamBorder",
};
export default meta;

const cardContent = (
  <div style={{ padding: 24 }}>
    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Beam Border Card</h3>
    <p style={{ fontSize: 14, opacity: 0.6 }}>A light beam travels along the border.</p>
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <BeamBorder style={{ width: 320 }}>
        {cardContent}
      </BeamBorder>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <BeamBorder key={size} size={size} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>Size: {size}</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>
              {size === "sm" ? "1px" : size === "md" ? "2px" : "3px"} border
            </p>
          </div>
        </BeamBorder>
      ))}
    </div>
  ),
};

export const CustomColors: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      <BeamBorder borderColor="#8b5cf6" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#8b5cf6" }}>Purple Beam</p>
        </div>
      </BeamBorder>
      <BeamBorder borderColor="#06b6d4" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#06b6d4" }}>Cyan Beam</p>
        </div>
      </BeamBorder>
      <BeamBorder borderColor="#10b981" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#10b981" }}>Emerald Beam</p>
        </div>
      </BeamBorder>
      <BeamBorder borderColor="#f59e0b" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#f59e0b" }}>Amber Beam</p>
        </div>
      </BeamBorder>
    </div>
  ),
};

export const CustomDurations: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[1.5, 3, 5].map((duration) => (
        <BeamBorder key={duration} duration={duration} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{duration}s</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Animation speed</p>
          </div>
        </BeamBorder>
      ))}
    </div>
  ),
};

export const CustomBeamWidth: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[30, 60, 100].map((beamWidth) => (
        <BeamBorder key={beamWidth} beamWidth={beamWidth} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{beamWidth}px</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Beam width</p>
          </div>
        </BeamBorder>
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
      <BeamBorder style={{ width: 280 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Beam (static)</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>No animation when reduced motion is preferred</p>
        </div>
      </BeamBorder>
    </div>
  ),
};

export const CardExample: StoryObj = {
  name: "Card Example",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <BeamBorder borderColor="hsl(var(--la-primary))" style={{ width: 360 }}>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-2">Welcome Back</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Sign in to your account to continue accessing your personalized dashboard and features.
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-[--la-radius] text-sm font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 border border-border rounded-[--la-radius] text-sm font-medium">
              Learn More
            </button>
          </div>
        </div>
      </BeamBorder>
    </div>
  ),
};
