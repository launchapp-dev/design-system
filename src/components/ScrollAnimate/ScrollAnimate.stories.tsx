import type { Meta, StoryObj } from "@storybook/react";
import { FadeInOnScroll, CountUp, Parallax } from "./index";

const meta: Meta = {
  title: "Components/ScrollAnimate",
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Design Pattern
- Scroll-triggered animations are visual enhancements
- Content remains accessible regardless of animation state
- Respects \`prefers-reduced-motion\` for users sensitive to motion

### Screen Reader Behavior
- Content announced normally by screen readers
- Animations do not affect tab order or focus
- CountUp values announced at final state
- Parallax effects do not impair content readability

### Keyboard Navigation
- No keyboard interaction required
- Content in scroll animations remains tabbable
- Focus order not affected by animations

### Motion Sensitivity
- All scroll animations disabled for \`prefers-reduced-motion: reduce\`
- Static versions displayed immediately
- Content remains fully accessible without animation

### Visual Accessibility
- Sufficient contrast maintained during animations
- Text remains readable throughout animation
- Focus indicators visible when needed
        `,
      },
    },
  },
};

export default meta;

export const FadeInOnScrollStory: StoryObj = {
  name: "FadeInOnScroll",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Elements fade in as they enter the viewport. Scroll down to see the effect (in canvas mode).
      </p>
      {Array.from({ length: 5 }).map((_, i) => (
        <FadeInOnScroll key={i} delay={i * 100}>
          <div
            style={{
              padding: "24px",
              border: "1px solid var(--la-border)",
              borderRadius: "var(--la-radius)",
              background: "var(--la-card)",
            }}
          >
            <p style={{ fontWeight: "600" }}>Card {i + 1}</p>
            <p style={{ fontSize: "14px", color: "gray", marginTop: "4px" }}>
              This card fades in with a {i * 100}ms delay.
            </p>
          </div>
        </FadeInOnScroll>
      ))}
    </div>
  ),
};

export const CountUpStory: StoryObj = {
  name: "CountUp",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      {[
        { to: 1000, suffix: "+", label: "Users" },
        { to: 99.9, decimals: 1, suffix: "%", label: "Uptime" },
        { to: 42, prefix: "$", suffix: "M", label: "Revenue" },
      ].map(({ to, decimals, prefix, suffix, label }) => (
        <div key={label} style={{ textAlign: "center" }}>
          <CountUp
            to={to}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
            className="text-4xl font-bold"
          />
          <p style={{ fontSize: "14px", color: "gray", marginTop: "8px" }}>{label}</p>
        </div>
      ))}
    </div>
  ),
};

export const ParallaxStory: StoryObj = {
  name: "Parallax",
  render: () => (
    <div
      style={{
        height: "600px",
        overflow: "auto",
        position: "relative",
        border: "1px solid var(--la-border)",
        borderRadius: "var(--la-radius)",
      }}
    >
      <div style={{ height: "200px" }} />
      <div style={{ position: "relative", padding: "40px", textAlign: "center" }}>
        <Parallax speed={0.2}>
          <div
            style={{
              padding: "32px",
              background: "var(--la-primary)",
              color: "var(--la-primary-foreground)",
              borderRadius: "var(--la-radius)",
              display: "inline-block",
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>Parallax Element</p>
            <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.8 }}>
              Moves at 0.2x scroll speed
            </p>
          </div>
        </Parallax>
        <div style={{ marginTop: "32px" }}>
          <Parallax speed={0.5}>
            <div
              style={{
                padding: "32px",
                background: "var(--la-secondary)",
                borderRadius: "var(--la-radius)",
                display: "inline-block",
              }}
            >
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>Faster Parallax</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>Moves at 0.5x scroll speed</p>
            </div>
          </Parallax>
        </div>
      </div>
      <div style={{ height: "400px" }} />
    </div>
  ),
};

export const AllScrollAnimations: StoryObj = {
  name: "All Scroll Animations",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px", padding: "24px" }}>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>
          FadeInOnScroll
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <FadeInOnScroll>
            <p>First element fades in immediately on mount.</p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <p>Second element fades in with 200ms delay.</p>
          </FadeInOnScroll>
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>CountUp</h3>
        <div style={{ display: "flex", gap: "32px" }}>
          <CountUp to={500} suffix="+" className="text-3xl font-bold" />
          <CountUp to={98.5} decimals={1} suffix="%" className="text-3xl font-bold" />
          <CountUp to={10000} prefix="$" className="text-3xl font-bold" />
        </div>
      </section>
    </div>
  ),
};
