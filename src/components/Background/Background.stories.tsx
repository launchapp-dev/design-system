import type { Meta, StoryObj } from "@storybook/react";
import { GradientMesh, Aurora, GridPattern, DotPattern } from "./index";

const meta: Meta = {
  title: "Components/Background",
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Design Pattern
- **Decorative Elements**: All background effects are purely decorative and hidden from screen readers
- **No Interactive Content**: Background components do not capture keyboard focus
- **Motion Preference**: Respects \`prefers-reduced-motion\` for animated effects

### Screen Reader Behavior
- Marked with \`aria-hidden="true"\` to exclude from accessibility tree
- No semantic meaning conveyed to assistive technologies
- Content overlaid on backgrounds remains fully accessible

### Keyboard Navigation
- No keyboard interaction
- Does not affect focus management of overlaid content
- All interactive elements above backgrounds are fully accessible

### Motion Sensitivity
- Animated backgrounds respect user motion preferences
- Static fallback patterns available
        `,
      },
    },
  },
};
export default meta;

export const GradientMeshStory: StoryObj = {
  name: "GradientMesh",
  parameters: {
    docs: {
      description: {
        story: `Decorative gradient mesh animation. Purely visual effect.`,
      },
    },
  },
  render: () => (
    <div style={{ width: "100%", height: 300, borderRadius: 8, overflow: "hidden" }}>
      <GradientMesh />
    </div>
  ),
};

export const GradientMeshCustomColors: StoryObj = {
  name: "GradientMesh — Custom Colors",
  parameters: {
    docs: {
      description: {
        story: `Gradient mesh with custom color palette.`,
      },
    },
  },
  render: () => (
    <div style={{ width: "100%", height: 300, borderRadius: 8, overflow: "hidden" }}>
      <GradientMesh colors={["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]} speed={5} />
    </div>
  ),
};

export const AuroraStory: StoryObj = {
  name: "Aurora",
  parameters: {
    docs: {
      description: {
        story: `Aurora-like animated background effect. Content overlay remains accessible.`,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: `Aurora effect with custom color scheme.`,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: `Static grid pattern background.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--la-background)",
      }}
    >
      <GridPattern />
    </div>
  ),
};

export const GridPatternDashed: StoryObj = {
  name: "GridPattern — Dashed",
  parameters: {
    docs: {
      description: {
        story: `Grid pattern with dashed lines.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--la-background)",
      }}
    >
      <GridPattern strokeDasharray="4 2" width={32} height={32} />
    </div>
  ),
};

export const GridPatternHighlighted: StoryObj = {
  name: "GridPattern — Highlighted Squares",
  parameters: {
    docs: {
      description: {
        story: `Grid pattern with highlighted square regions.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--la-background)",
      }}
    >
      <GridPattern
        squares={[
          [1, 1],
          [2, 3],
          [4, 2],
          [3, 5],
          [6, 1],
          [5, 4],
        ]}
        x={0}
        y={0}
      />
    </div>
  ),
};

export const DotPatternStory: StoryObj = {
  name: "DotPattern",
  parameters: {
    docs: {
      description: {
        story: `Static dot pattern background.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--la-background)",
      }}
    >
      <DotPattern />
    </div>
  ),
};

export const DotPatternDense: StoryObj = {
  name: "DotPattern — Dense",
  parameters: {
    docs: {
      description: {
        story: `Dot pattern with higher density.`,
      },
    },
  },
  render: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--la-background)",
      }}
    >
      <DotPattern width={8} height={8} cx={1} cy={1} cr={1} />
    </div>
  ),
};

export const AllBackgrounds: StoryObj = {
  name: "All Backgrounds",
  parameters: {
    docs: {
      description: {
        story: `Complete showcase of all background effects.`,
      },
    },
  },
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
        <div
          style={{
            position: "relative",
            height: 120,
            borderRadius: 8,
            overflow: "hidden",
            background: "var(--la-background)",
            border: "1px solid var(--la-border)",
          }}
        >
          <GridPattern />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, fontWeight: 500 }}>DotPattern</p>
        <div
          style={{
            position: "relative",
            height: 120,
            borderRadius: 8,
            overflow: "hidden",
            background: "var(--la-background)",
            border: "1px solid var(--la-border)",
          }}
        >
          <DotPattern />
        </div>
      </div>
    </div>
  ),
};
