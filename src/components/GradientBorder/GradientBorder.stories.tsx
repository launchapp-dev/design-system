import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { GradientBorder } from "./index";

const meta: Meta = {
  title: "Components/GradientBorder",
};
export default meta;

const cardContent = (
  <div style={{ padding: 24 }}>
    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Gradient Border Card</h3>
    <p style={{ fontSize: 14, opacity: 0.6 }}>A rotating gradient around the edge.</p>
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <GradientBorder style={{ width: 320 }}>
        {cardContent}
      </GradientBorder>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <GradientBorder key={size} size={size} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>Size: {size}</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>
              {size === "sm" ? "1px" : size === "md" ? "2px" : "3px"} border
            </p>
          </div>
        </GradientBorder>
      ))}
    </div>
  ),
};

export const ColorPairs: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      <GradientBorder borderColor="#8b5cf6" secondaryColor="#06b6d4" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#8b5cf6" }}>Purple Cyan</p>
        </div>
      </GradientBorder>
      <GradientBorder borderColor="#f59e0b" secondaryColor="#ef4444" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#f59e0b" }}>Amber Red</p>
        </div>
      </GradientBorder>
      <GradientBorder borderColor="#10b981" secondaryColor="#06b6d4" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#10b981" }}>Emerald Cyan</p>
        </div>
      </GradientBorder>
      <GradientBorder borderColor="#ec4899" secondaryColor="#8b5cf6" style={{ width: 200 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600, color: "#ec4899" }}>Pink Purple</p>
        </div>
      </GradientBorder>
    </div>
  ),
};

export const CustomDurations: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[2, 4, 8].map((duration) => (
        <GradientBorder key={duration} duration={duration} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{duration}s</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Rotation speed</p>
          </div>
        </GradientBorder>
      ))}
    </div>
  ),
};

export const GradientSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 24 }}>
      {[20, 45, 90].map((gradientSize) => (
        <GradientBorder key={gradientSize} gradientSize={gradientSize} style={{ width: 180 }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600 }}>{gradientSize}°</p>
            <p style={{ fontSize: 12, opacity: 0.6 }}>Gradient span</p>
          </div>
        </GradientBorder>
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
      <GradientBorder style={{ width: 280 }}>
        <div style={{ padding: 20 }}>
          <p style={{ fontWeight: 600 }}>Gradient (static)</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>No animation when reduced motion is preferred</p>
        </div>
      </GradientBorder>
    </div>
  ),
};

export const FeatureCard: StoryObj = {
  name: "Feature Card",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <GradientBorder borderColor="#8b5cf6" secondaryColor="#06b6d4" style={{ width: 360 }}>
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-4">
            <span className="text-white text-xl">⚡</span>
          </div>
          <h4 className="text-lg font-semibold mb-2">Lightning Fast</h4>
          <p className="text-sm text-muted-foreground">
            Experience blazing fast performance with our optimized components.
          </p>
        </div>
      </GradientBorder>
    </div>
  ),
};

export const PricingCard: StoryObj = {
  name: "Pricing Card",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <GradientBorder borderColor="#f59e0b" secondaryColor="#ef4444" duration={6} style={{ width: 320 }}>
        <div className="p-6 text-center">
          <div className="text-sm font-medium text-amber-500 mb-1">PRO PLAN</div>
          <div className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
          <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
            <li>✓ Unlimited projects</li>
            <li>✓ Advanced analytics</li>
            <li>✓ Priority support</li>
            <li>✓ Custom integrations</li>
          </ul>
          <button className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-[--la-radius] text-sm font-medium">
            Get Started
          </button>
        </div>
      </GradientBorder>
    </div>
  ),
};
