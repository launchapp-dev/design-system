import type { Meta, StoryObj } from "@storybook/react";
import {
  AnimatedGradient,
  AnimatedGrid,
  GradientBackground,
  MatrixRain,
  NoiseTexture,
  Particles,
  ShimmerBackground,
  Stars,
} from "./index";

const meta: Meta = {
  title: "Components/AnimatedBackground",
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Design Pattern
- **Decorative Elements**: Animated backgrounds are purely decorative and marked with \`aria-hidden="true"\`
- **No Interactive Content**: These components do not interfere with keyboard navigation or screen reader order
- **Animation Control**: Respects \`prefers-reduced-motion\` media query for users sensitive to motion

### Screen Reader Behavior
- Completely hidden from screen readers via \`aria-hidden\` attribute
- No semantic meaning conveyed to assistive technologies
- Focus management unaffected

### Keyboard Navigation
- No keyboard interaction required or provided
- These components do not receive focus
- Content layered on top of animations remains fully accessible

### Motion Sensitivity
- Animations are disabled for users with \`prefers-reduced-motion: reduce\` preference
- Alternative static versions available for all animated components
        `,
      },
    },
  },
};

export default meta;

export const ParticlesStory: StoryObj = {
  name: "Particles",
  parameters: {
    docs: {
      description: {
        story: `Decorative particle animation with configurable count, size, and speed. Respects motion preferences.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default particles
        </p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            border: "1px solid hsl(var(--la-border))",
          }}
        >
          <Particles />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Custom color (blue)
        </p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            border: "1px solid hsl(var(--la-border))",
          }}
        >
          <Particles color="#3b82f6" count={30} size={3} maxSize={6} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Slow particles</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            border: "1px solid hsl(var(--la-border))",
          }}
        >
          <Particles speed={0.5} count={20} />
        </div>
      </div>
    </div>
  ),
};

export const StarsStory: StoryObj = {
  name: "Stars",
  parameters: {
    docs: {
      description: {
        story: `Decorative starfield animation with configurable star count and size.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default stars</p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <Stars />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Many stars</p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <Stars count={200} minSize={1} maxSize={2} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large stars</p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <Stars count={50} minSize={2} maxSize={5} />
        </div>
      </div>
    </div>
  ),
};

export const MatrixRainStory: StoryObj = {
  name: "MatrixRain",
  parameters: {
    docs: {
      description: {
        story: `Decorative Matrix-style character rain animation. Characters are decorative only.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default Matrix rain
        </p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <MatrixRain />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Custom characters
        </p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <MatrixRain characters="01アイウエオ" fontSize={16} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Few columns, slow
        </p>
        <div
          style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}
        >
          <MatrixRain columns={15} speed={200} />
        </div>
      </div>
    </div>
  ),
};

export const NoiseTextureStory: StoryObj = {
  name: "NoiseTexture",
  parameters: {
    docs: {
      description: {
        story: `Decorative noise texture overlay with adjustable opacity.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default noise</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.3} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Low opacity</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.15} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>High opacity</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.6} />
        </div>
      </div>
    </div>
  ),
};

export const AnimatedGridStory: StoryObj = {
  name: "AnimatedGrid",
  parameters: {
    docs: {
      description: {
        story: `Decorative grid animation with configurable cell size and animation speed. Static option available.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default animated grid
        </p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large cells</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid cellSize={80} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Slow animation</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid animationSpeed={6} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Static grid</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid animated={false} />
        </div>
      </div>
    </div>
  ),
};

export const GradientBackgroundStory: StoryObj = {
  name: "GradientBackground",
  parameters: {
    docs: {
      description: {
        story: `Animated gradient background with smooth color transitions. Supports linear, radial, and conic gradients.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Linear gradient</p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <GradientBackground
            colors={["#ff006e", "#8338ec", "#3a86ff"]}
            speed={8}
          />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Radial gradient</p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <GradientBackground
            colors={["#f093fb", "#f5576c", "#4facfe"]}
            speed={6}
            direction="radial"
          />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Conic gradient</p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <GradientBackground
            colors={["#06b6d4", "#0891b2", "#0e7490"]}
            speed={10}
            direction="conic"
          />
        </div>
      </div>
    </div>
  ),
};

export const AnimatedGradientStory: StoryObj = {
  name: "AnimatedGradient",
  parameters: {
    docs: {
      description: {
        story: `Complex animated gradient with multi-step color transitions for dynamic backgrounds.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default animated gradient
        </p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <AnimatedGradient />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Blue-to-cyan gradient
        </p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <AnimatedGradient
            colors={["#3b82f6", "#06b6d4", "#14b8a6"]}
            speed={5}
          />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Warm gradient</p>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <AnimatedGradient
            colors={["#fbbf24", "#f97316", "#dc2626"]}
            speed={7}
          />
        </div>
      </div>
    </div>
  ),
};

export const ShimmerBackgroundStory: StoryObj = {
  name: "ShimmerBackground",
  parameters: {
    docs: {
      description: {
        story: `Shimmer effect for loading states and highlight animations. Configurable speed and intensity.`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default shimmer</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#e5e7eb",
          }}
        >
          <ShimmerBackground />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Fast shimmer</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#f3f4f6",
          }}
        >
          <ShimmerBackground speed={1} intensity={0.6} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Slow shimmer with custom color
        </p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#1f2937",
          }}
        >
          <ShimmerBackground color="#60a5fa" speed={3} intensity={0.4} />
        </div>
      </div>
    </div>
  ),
};

export const AllAnimatedBackgrounds: StoryObj = {
  name: "All Animated Backgrounds",
  parameters: {
    docs: {
      description: {
        story: `Complete showcase of all animated background effects. All animations are decorative.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "24px",
      }}
    >
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Particles
        </h3>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid hsl(var(--la-border))",
          }}
        >
          <Particles count={40} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Stars
        </h3>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <Stars count={100} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Matrix Rain
        </h3>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <MatrixRain columns={20} speed={150} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Noise Texture
        </h3>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.3} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Animated Grid
        </h3>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <AnimatedGrid />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Gradient Background
        </h3>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <GradientBackground colors={["#ff006e", "#8338ec", "#3a86ff"]} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Animated Gradient
        </h3>
        <div
          style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
        >
          <AnimatedGradient colors={["#ff006e", "#8338ec", "#3a86ff"]} />
        </div>
      </section>
      <section>
        <h3
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}
        >
          Shimmer Background
        </h3>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#e5e7eb",
          }}
        >
          <ShimmerBackground />
        </div>
      </section>
    </div>
  ),
};
