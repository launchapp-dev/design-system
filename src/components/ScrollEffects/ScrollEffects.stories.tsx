import type { Meta, StoryObj } from "@storybook/react";
import {
  StickySection,
  StickyHeader,
  HorizontalScroll,
  ScrollProgress,
  RevealOnScroll,
  ScrollSnapContainer,
  ScrollSnapItem,
  ParallaxSection,
  ProgressIndicator,
} from "./index";

const meta: Meta = {
  title: "Components/ScrollEffects",
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Design Pattern
- Scroll effects are visual enhancements
- Content remains accessible and navigable
- Effects respect \`prefers-reduced-motion\` setting

### Screen Reader Behavior
- Content read normally in document order
- Progress indicators announced with current percentage
- Fixed/sticky elements not removed from focus order
- All text readable regardless of scroll effects

### Keyboard Navigation
- Tab navigation unaffected by scroll effects
- Sticky elements remain keyboard accessible
- Focus visible even when element is sticky
- Scroll snap does not trap focus

### Motion Sensitivity
- All effects disabled for \`prefers-reduced-motion: reduce\`
- Static layout displayed immediately
- Content hierarchy and flow preserved

### Visual Accessibility
- Progress bars have numeric value announced
- Sticky headers announce their state
- Text contrast maintained through scroll effects
- Focus indicators clearly visible
        `,
      },
    },
  },
};
export default meta;

export const StickySectionStory: StoryObj = {
  name: "StickySection",
  render: () => (
    <div style={{ height: 400, overflow: "auto", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
      <div style={{ height: 100, background: "hsl(var(--la-muted))", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Scroll content
      </div>
      <StickySection offset={0}>
        <div style={{ padding: 16, background: "hsl(var(--la-primary))", color: "hsl(var(--la-primary-foreground))", textAlign: "center" }}>
          Sticky Header - Stays at top while scrolling
        </div>
      </StickySection>
      <div style={{ height: 200, padding: 16 }}>
        <p>Content that scrolls under the sticky header.</p>
        <p>Notice how the sticky section stays visible.</p>
      </div>
      <StickySection offset={48}>
        <div style={{ padding: 16, background: "hsl(var(--la-secondary))", textAlign: "center" }}>
          Another Sticky Section
        </div>
      </StickySection>
      <div style={{ height: 200, padding: 16 }}>
        <p>More scrolling content...</p>
      </div>
    </div>
  ),
};

export const StickyHeaderStory: StoryObj = {
  name: "StickyHeader",
  render: () => (
    <div style={{ height: 400, overflow: "auto", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
      <StickyHeader>
        <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600 }}>Sticky Header</span>
          <button style={{ padding: "4px 12px", background: "hsl(var(--la-primary))", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Action
          </button>
        </div>
      </StickyHeader>
      <div style={{ padding: 24 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ padding: 24, borderBottom: "1px solid hsl(var(--la-border))" }}>
            <p style={{ fontWeight: 600 }}>Section {i + 1}</p>
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>Content for section {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const HorizontalScrollStory: StoryObj = {
  name: "HorizontalScroll",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Drag to scroll horizontally. Click and drag on the container below.
      </p>
      <HorizontalScroll style={{ height: 200 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 180,
              height: 160,
              marginRight: 16,
              flexShrink: 0,
              background: "hsl(var(--la-card))",
              border: "1px solid hsl(var(--la-border))",
              borderRadius: "var(--la-radius)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ fontWeight: 600 }}>Card {i + 1}</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Horizontal scroll item</p>
            </div>
            <button style={{ padding: "6px 12px", background: "hsl(var(--la-primary))", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
              View
            </button>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  ),
};

export const ScrollProgressStory: StoryObj = {
  name: "ScrollProgress",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Scroll to see the progress indicator at the top.
      </p>
      <ScrollProgress position="top" style={{ height: 300, border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
        <div style={{ padding: 24 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{ padding: 16, borderBottom: "1px solid hsl(var(--la-border))" }}>
              <p style={{ fontWeight: 500 }}>Item {i + 1}</p>
              <p style={{ fontSize: 12, opacity: 0.5 }}>Scroll to see progress</p>
            </div>
          ))}
        </div>
      </ScrollProgress>
    </div>
  ),
};

export const ScrollProgressBottom: StoryObj = {
  name: "ScrollProgress — Bottom",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Progress indicator at the bottom.
      </p>
      <ScrollProgress position="bottom" color="hsl(var(--la-accent))" style={{ height: 300, border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
        <div style={{ padding: 24 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{ padding: 16, borderBottom: "1px solid hsl(var(--la-border))" }}>
              <p style={{ fontWeight: 500 }}>Item {i + 1}</p>
              <p style={{ fontSize: 12, opacity: 0.5 }}>Scroll to see progress</p>
            </div>
          ))}
        </div>
      </ScrollProgress>
    </div>
  ),
};

export const RevealOnScrollStory: StoryObj = {
  name: "RevealOnScroll",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Elements reveal as they enter the viewport. Scroll down (in canvas mode).
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {["up", "down", "left", "right"].map((direction) => (
          <div key={direction}>
            <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, textTransform: "capitalize" }}>Direction: {direction}</p>
            <RevealOnScroll direction={direction as "up" | "down" | "left" | "right"}>
              <div style={{ padding: 20, background: "hsl(var(--la-card))", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
                <p style={{ fontWeight: 600 }}>Revealed from {direction}</p>
                <p style={{ fontSize: 14, opacity: 0.6 }}>This element animates when scrolling into view</p>
              </div>
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ScrollSnapStory: StoryObj = {
  name: "ScrollSnap",
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
        Scroll horizontally to snap between cards.
      </p>
      <ScrollSnapContainer style={{ height: 220 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ScrollSnapItem
            key={i}
            style={{
              width: 280,
              marginRight: 16,
              flexShrink: 0,
              background: "hsl(var(--la-card))",
              border: "1px solid hsl(var(--la-border))",
              borderRadius: "var(--la-radius)",
              padding: 20,
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700, color: "hsl(var(--la-primary))" }}>0{i + 1}</p>
            <p style={{ fontWeight: 600, marginTop: 8 }}>Snap Section {i + 1}</p>
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>
              Scroll horizontally to see snapping behavior
            </p>
          </ScrollSnapItem>
        ))}
      </ScrollSnapContainer>
    </div>
  ),
};

export const AllScrollEffects: StoryObj = {
  name: "All Scroll Effects",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <section>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>RevealOnScroll</h3>
        <RevealOnScroll>
          <div style={{ padding: 20, background: "hsl(var(--la-card))", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
            <p style={{ fontWeight: 600 }}>Revealed Content</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>Animates into view on scroll</p>
          </div>
        </RevealOnScroll>
      </section>
      <section>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>HorizontalScroll</h3>
        <HorizontalScroll style={{ height: 120 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 80,
                marginRight: 12,
                flexShrink: 0,
                background: "hsl(var(--la-secondary))",
                borderRadius: "var(--la-radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </HorizontalScroll>
      </section>
      <section>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>ScrollProgress</h3>
        <ScrollProgress style={{ height: 100, border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
          <div style={{ padding: 16 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ padding: 8 }}>Scroll item {i + 1}</div>
            ))}
          </div>
        </ScrollProgress>
      </section>
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
        <RevealOnScroll>
          <div style={{ padding: 20, background: "hsl(var(--la-card))", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
            <p style={{ fontWeight: 600 }}>RevealOnScroll (instant)</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>No animation when reduced motion is preferred</p>
          </div>
        </RevealOnScroll>
        <HorizontalScroll style={{ height: 100 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 120,
                height: 60,
                marginRight: 12,
                flexShrink: 0,
                background: "hsl(var(--la-secondary))",
                borderRadius: "var(--la-radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </div>
  ),
};

export const ParallaxSectionStory: StoryObj = {
  name: "ParallaxSection",
  render: () => (
    <div style={{ height: 500, overflow: "auto", border: "1px solid hsl(var(--la-border))", borderRadius: "var(--la-radius)" }}>
      <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--la-muted))" }}>
        <p>Scroll down to see parallax effect</p>
      </div>
      <ParallaxSection speed={0.3} style={{ height: 300 }}>
        <div style={{ 
          height: "100%", 
          background: "linear-gradient(135deg, hsl(var(--la-primary)) 0%, hsl(var(--la-accent)) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "hsl(var(--la-primary-foreground))",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24, fontWeight: 700 }}>Parallax Background</p>
            <p style={{ fontSize: 14, opacity: 0.8 }}>Moving at 0.3x scroll speed</p>
          </div>
        </div>
      </ParallaxSection>
      <div style={{ height: 200, padding: 24 }}>
        <p>Content between parallax sections</p>
      </div>
      <ParallaxSection speed={0.5} direction="down" style={{ height: 250 }}>
        <div style={{ 
          height: "100%", 
          background: "linear-gradient(135deg, hsl(var(--la-secondary)) 0%, hsl(var(--la-muted)) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24, fontWeight: 700 }}>Reverse Parallax</p>
            <p style={{ fontSize: 14, opacity: 0.6 }}>Moving at 0.5x speed, opposite direction</p>
          </div>
        </div>
      </ParallaxSection>
      <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>End of scroll content</p>
      </div>
    </div>
  ),
};

export const ProgressIndicatorStory: StoryObj = {
  name: "ProgressIndicator (Page-Level)",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div>
      <ProgressIndicator color="hsl(var(--la-primary))" height={4} />
      <div style={{ padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 16 }}>
          Scroll the page to see the progress bar at the top.
        </p>
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ padding: 24, borderBottom: "1px solid hsl(var(--la-border))" }}>
          <p style={{ fontWeight: 500 }}>Section {i + 1}</p>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Scroll to see the progress indicator</p>
        </div>
      ))}
    </div>
  ),
};
