import type { Meta, StoryObj } from "@storybook/react";
import { Spotlight } from "./index";

const meta: Meta = {
  title: "Components/Spotlight",
};
export default meta;

export const Default: StoryObj = {
  name: "Default",
  render: () => (
    <div
      style={{
        height: 400,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--la-background))",
      }}
    >
      <Spotlight className="absolute inset-0" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 16,
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Spotlight Effect</h2>
        <p style={{ fontSize: 14, color: "hsl(var(--la-muted-foreground))", textAlign: "center", maxWidth: 300 }}>
          Move your mouse around to see the spotlight follow your cursor.
        </p>
      </div>
    </div>
  ),
};

export const LargeSpotlight: StoryObj = {
  name: "Large Spotlight",
  render: () => (
    <div
      style={{
        height: 400,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--la-background))",
      }}
    >
      <Spotlight className="absolute inset-0" size={800} />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Large Spotlight (800px)</h2>
      </div>
    </div>
  ),
};

export const SmallSpotlight: StoryObj = {
  name: "Small Spotlight",
  render: () => (
    <div
      style={{
        height: 400,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--la-background))",
      }}
    >
      <Spotlight className="absolute inset-0" size={200} />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Small Spotlight (200px)</h2>
      </div>
    </div>
  ),
};

export const SpringSpotlight: StoryObj = {
  name: "Spring Animation",
  render: () => (
    <div
      style={{
        height: 400,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--la-background))",
      }}
    >
      <Spotlight className="absolute inset-0" spring />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 16,
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Spring Spotlight</h2>
        <p style={{ fontSize: 14, color: "hsl(var(--la-muted-foreground))", textAlign: "center", maxWidth: 300 }}>
          The spotlight follows with a spring-like easing animation.
        </p>
      </div>
    </div>
  ),
};

export const StaticSpotlight: StoryObj = {
  name: "Static (No Mouse Follow)",
  render: () => (
    <div
      style={{
        height: 400,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--la-background))",
      }}
    >
      <Spotlight className="absolute inset-0" followsMouse={false} />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Static Spotlight</h2>
      </div>
    </div>
  ),
};

export const AllSpotlights: StoryObj = {
  name: "All Spotlight Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Default (600px)</p>
        <div
          style={{
            height: 200,
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            background: "hsl(var(--la-background))",
          }}
        >
          <Spotlight className="absolute inset-0" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Large (800px)</p>
        <div
          style={{
            height: 200,
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            background: "hsl(var(--la-background))",
          }}
        >
          <Spotlight className="absolute inset-0" size={800} />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Small (200px)</p>
        <div
          style={{
            height: 200,
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            background: "hsl(var(--la-background))",
          }}
        >
          <Spotlight className="absolute inset-0" size={200} />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>Spring Animation</p>
        <div
          style={{
            height: 200,
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            background: "hsl(var(--la-background))",
          }}
        >
          <Spotlight className="absolute inset-0" spring />
        </div>
      </div>
    </div>
  ),
};
