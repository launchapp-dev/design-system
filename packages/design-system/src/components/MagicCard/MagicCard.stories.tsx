import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  TiltCard,
  SpotlightCard,
  GlassCard,
  MagneticButton,
  ShimmerButton,
  AnimatedBorderCard,
  HolographicCard,
  NeonGlowCard,
  RippleButton,
  GlowPulseButton,
  MorphButton,
} from "./index";

const meta: Meta = {
  title: "Components/MagicCard",
};
export default meta;

const cardContent = (
  <>
    <div style={{ padding: "24px 24px 0" }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Card Title</h3>
      <p style={{ fontSize: 14, opacity: 0.6 }}>A description for this card component.</p>
    </div>
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 14 }}>Card body content goes here.</p>
    </div>
  </>
);

export const TiltCardStory: StoryObj = {
  name: "TiltCard",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <TiltCard style={{ width: 320 }}>{cardContent}</TiltCard>
    </div>
  ),
};

export const TiltCardMaxTilt: StoryObj = {
  name: "TiltCard — High Tilt",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <TiltCard maxTilt={25} style={{ width: 320 }}>{cardContent}</TiltCard>
    </div>
  ),
};

export const SpotlightCardStory: StoryObj = {
  name: "SpotlightCard",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <SpotlightCard style={{ width: 320 }}>{cardContent}</SpotlightCard>
    </div>
  ),
};

export const SpotlightCardCustomColor: StoryObj = {
  name: "SpotlightCard — Custom Color",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <SpotlightCard
        spotlightColor="rgba(139, 92, 246, 0.2)"
        spotlightSize={500}
        style={{ width: 320 }}
      >
        {cardContent}
      </SpotlightCard>
    </div>
  ),
};

export const GlassCardStory: StoryObj = {
  name: "GlassCard",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 48,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 8,
      }}
    >
      <GlassCard style={{ width: 320 }}>{cardContent}</GlassCard>
    </div>
  ),
};

export const GlassCardBlurVariants: StoryObj = {
  name: "GlassCard — Blur Variants",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: 48,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 8,
        flexWrap: "wrap",
      }}
    >
      {(["sm", "md", "lg", "xl"] as const).map((blur) => (
        <GlassCard key={blur} blur={blur} style={{ flex: "1 1 200px" }}>
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "white" }}>blur: {blur}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
};

export const HolographicCardStory: StoryObj = {
  name: "HolographicCard",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <HolographicCard style={{ width: 320 }}>{cardContent}</HolographicCard>
    </div>
  ),
};

export const HolographicCardHighIntensity: StoryObj = {
  name: "HolographicCard — High Intensity",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <HolographicCard intensity={1.5} style={{ width: 320 }}>{cardContent}</HolographicCard>
    </div>
  ),
};

export const NeonGlowCardStory: StoryObj = {
  name: "NeonGlowCard",
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 48, background: "#0a0a0a", flexWrap: "wrap" }}>
      <NeonGlowCard glowColor="#8b5cf6" style={{ width: 280 }}>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Purple Glow</p>
          <p style={{ fontSize: 12, opacity: 0.6, color: "white" }}>Hover to see effect</p>
        </div>
      </NeonGlowCard>
      <NeonGlowCard glowColor="#06b6d4" glowIntensity="lg" style={{ width: 280 }}>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Cyan Glow (Large)</p>
          <p style={{ fontSize: 12, opacity: 0.6, color: "white" }}>Hover to see effect</p>
        </div>
      </NeonGlowCard>
    </div>
  ),
};

export const AnimatedBorderCardStory: StoryObj = {
  name: "AnimatedBorderCard",
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <AnimatedBorderCard style={{ width: 320 }}>
        <div style={{ padding: 24 }}>
          {cardContent}
        </div>
      </AnimatedBorderCard>
    </div>
  ),
};

export const AnimatedBorderCardCustom: StoryObj = {
  name: "AnimatedBorderCard — Custom Border",
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 48, flexWrap: "wrap" }}>
      <AnimatedBorderCard borderColor="#8b5cf6" duration={2} style={{ width: 280 }}>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Purple Border</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>2s rotation speed</p>
        </div>
      </AnimatedBorderCard>
      <AnimatedBorderCard borderColor="#06b6d4" duration={5} style={{ width: 280 }}>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Cyan Border</p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>5s rotation speed</p>
        </div>
      </AnimatedBorderCard>
    </div>
  ),
};

export const MagneticButtonStory: StoryObj = {
  name: "MagneticButton",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 48 }}>
      <MagneticButton>Magnetic</MagneticButton>
      <MagneticButton strength={0.5}>Strong Pull</MagneticButton>
      <MagneticButton strength={0.1}>Subtle Pull</MagneticButton>
      <MagneticButton disabled>Disabled</MagneticButton>
    </div>
  ),
};

export const ShimmerButtonStory: StoryObj = {
  name: "ShimmerButton",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <ShimmerButton>Shimmer</ShimmerButton>
      <ShimmerButton shimmerColor="rgba(255,255,255,0.6)">Bright Shimmer</ShimmerButton>
      <ShimmerButton disabled>Disabled</ShimmerButton>
    </div>
  ),
};

export const RippleButtonStory: StoryObj = {
  name: "RippleButton",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <RippleButton>Click Me</RippleButton>
      <RippleButton rippleColor="rgba(139, 92, 246, 0.5)">Purple Ripple</RippleButton>
      <RippleButton disabled>Disabled</RippleButton>
    </div>
  ),
};

export const GlowPulseButtonStory: StoryObj = {
  name: "GlowPulseButton",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24, background: "#0a0a0a" }}>
      <GlowPulseButton>Hover Me</GlowPulseButton>
      <GlowPulseButton glowColor="#8b5cf6" pulseIntensity="lg">Large Pulse</GlowPulseButton>
      <GlowPulseButton glowColor="#06b6d4" pulseIntensity="sm">Small Pulse</GlowPulseButton>
    </div>
  ),
};

export const MorphButtonStory: StoryObj = {
  name: "MorphButton",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24, flexWrap: "wrap" }}>
      <MorphButton morphStyle="blob">Blob Morph</MorphButton>
      <MorphButton morphStyle="pill">Pill Morph</MorphButton>
      <MorphButton morphStyle="rounded">Rounded Morph</MorphButton>
    </div>
  ),
};

export const AllMagicCards: StoryObj = {
  name: "All Magic Cards",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>TiltCard</p>
        <TiltCard style={{ maxWidth: 320 }}>{cardContent}</TiltCard>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>SpotlightCard</p>
        <SpotlightCard style={{ maxWidth: 320 }}>{cardContent}</SpotlightCard>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>GlassCard</p>
        <div style={{ padding: 24, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 8 }}>
          <GlassCard style={{ maxWidth: 320 }}>{cardContent}</GlassCard>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>HolographicCard</p>
        <HolographicCard style={{ maxWidth: 320 }}>{cardContent}</HolographicCard>
      </div>
      <div style={{ background: "#0a0a0a", padding: 24, borderRadius: 8 }}>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500, color: "white" }}>NeonGlowCard</p>
        <NeonGlowCard style={{ maxWidth: 320 }}>{cardContent}</NeonGlowCard>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>AnimatedBorderCard</p>
        <AnimatedBorderCard style={{ maxWidth: 320 }}>
          <div style={{ padding: 24 }}>{cardContent}</div>
        </AnimatedBorderCard>
      </div>
    </div>
  ),
};

export const AllMagicButtons: StoryObj = {
  name: "All Magic Buttons",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>MagneticButton</p>
        <MagneticButton>Magnetic Button</MagneticButton>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>ShimmerButton</p>
        <ShimmerButton>Shimmer Button</ShimmerButton>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>RippleButton</p>
        <RippleButton>Click for Ripple</RippleButton>
      </div>
      <div style={{ background: "#0a0a0a", padding: 16, borderRadius: 8 }}>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500, color: "white" }}>GlowPulseButton</p>
        <GlowPulseButton>Hover for Glow</GlowPulseButton>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>MorphButton</p>
        <div style={{ display: "flex", gap: 8 }}>
          <MorphButton morphStyle="blob">Blob</MorphButton>
          <MorphButton morphStyle="pill">Pill</MorphButton>
          <MorphButton morphStyle="rounded">Rounded</MorphButton>
        </div>
      </div>
    </div>
  ),
};

export const ReducedMotionTest: StoryObj = {
  name: "Reduced Motion — All Components",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, fontWeight: 500 }}>
        Enable &quot;prefers-reduced-motion&quot; in your OS settings to see animations disabled.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TiltCard style={{ width: 200 }}>
          <div style={{ padding: 16 }}>TiltCard (respects reduced motion)</div>
        </TiltCard>
        <MagneticButton>Magnetic (respects reduced motion)</MagneticButton>
        <ShimmerButton>Shimmer (respects reduced motion)</ShimmerButton>
        <RippleButton>Ripple (respects reduced motion)</RippleButton>
        <MorphButton>Morph (respects reduced motion)</MorphButton>
      </div>
    </div>
  ),
};
