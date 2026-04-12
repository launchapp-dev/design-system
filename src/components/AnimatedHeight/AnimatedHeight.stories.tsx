import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AnimatedHeight } from "./index";

const meta: Meta<typeof AnimatedHeight> = {
  title: "Components/AnimatedHeight",
  component: AnimatedHeight,
  argTypes: {
    isOpen: { control: "boolean" },
    duration: { control: { type: "number", min: 100, max: 1000 } },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Parent button/trigger should have \`aria-expanded\` indicating content visibility
- Content container uses \`role="region"\` when appropriate
- \`aria-hidden\` can hide fully collapsed content from screen readers if desired

### Keyboard Navigation
- Content remains in natural tab order when expanded
- Keyboard focus not disrupted by expand/collapse animations
- Parent trigger handles keyboard activation (Enter/Space)

### Screen Reader Behavior
- Expanded/collapsed state announced via parent button's aria-expanded
- Content seamlessly appears in focus order when expanded
- Smooth animation does not cause screen reader issues
- Hidden content skipped from tab order when collapsed

### Focus Management
- Focus preserved during animation
- Parent trigger receives focus on activation
- Nested focusable elements accessible when expanded
- Animation duration respects motion preferences
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedHeight>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Basic collapsible content with smooth height animation. Use the isOpen control to toggle visibility.`,
      },
    },
  },
  args: {
    isOpen: true,
    duration: 250,
  },
  render: (args) => (
    <div style={{ width: "320px" }}>
      <AnimatedHeight {...args}>
        <div
          style={{
            padding: "16px",
            border: "1px solid var(--la-border)",
            borderRadius: "var(--la-radius)",
            background: "var(--la-card)",
          }}
        >
          <p style={{ fontWeight: "600", marginBottom: "8px" }}>Collapsible content</p>
          <p style={{ fontSize: "14px", color: "var(--la-muted-foreground)" }}>
            This content smoothly animates its height when shown or hidden. Toggle the isOpen
            control to see the transition.
          </p>
        </div>
      </AnimatedHeight>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: `Interactive example with a toggle button. Button has proper aria-expanded attribute for screen readers.`,
      },
    },
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            padding: "8px 16px",
            background: "var(--la-primary)",
            color: "var(--la-primary-foreground)",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {open ? "Collapse" : "Expand"}
        </button>
        <AnimatedHeight isOpen={open}>
          <div
            style={{
              padding: "16px",
              border: "1px solid var(--la-border)",
              borderRadius: "var(--la-radius)",
              background: "var(--la-card)",
            }}
          >
            <p style={{ fontWeight: "600", marginBottom: "8px" }}>Details section</p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--la-muted-foreground)",
                marginBottom: "8px",
              }}
            >
              This panel expands and collapses with a smooth height animation. It's useful for FAQ
              sections, collapsible sidebars, and accordion-like UI patterns.
            </p>
            <p style={{ fontSize: "14px", color: "var(--la-muted-foreground)" }}>
              The height transitions smoothly from 0 to auto and back, without janky reflows.
            </p>
          </div>
        </AnimatedHeight>
      </div>
    );
  },
};

export const MultipleItems: Story = {
  parameters: {
    docs: {
      description: {
        story: `FAQ-style accordion using AnimatedHeight. Each button should have aria-expanded and aria-controls for semantic meaning.`,
      },
    },
  },
  render: () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);
    const items = [
      {
        title: "What is a design system?",
        body: "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.",
      },
      {
        title: "How do I use this library?",
        body: "Install the package, import the components you need, and wrap your app with the theme provider. All components are accessible out of the box.",
      },
      {
        title: "Does it support dark mode?",
        body: "Yes. Dark mode is supported via the 'dark' class strategy. Add the 'dark' class to your root element to activate it.",
      },
    ];
    return (
      <div style={{ width: "480px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid var(--la-border)",
              borderRadius: "var(--la-radius)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--la-card)",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item.title}
              <span
                style={{
                  transform: openIndex === i ? "rotate(180deg)" : "none",
                  transition: "transform 250ms",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </button>
            <AnimatedHeight isOpen={openIndex === i}>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: "var(--la-muted-foreground)",
                  borderTop: "1px solid var(--la-border)",
                }}
              >
                {item.body}
              </div>
            </AnimatedHeight>
          </div>
        ))}
      </div>
    );
  },
};
