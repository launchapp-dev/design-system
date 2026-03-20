import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { HeroSection } from "./index";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";

const meta: Meta<typeof HeroSection> = {
  title: "Blocks/Marketing/HeroSection",
  component: HeroSection,
  parameters: {
    docs: {
      source: {
        code: `import { HeroSection } from "@launchapp/design-system/blocks";
import { Button } from "@launchapp/design-system";

export default function Page() {
  return (
    <HeroSection
      badge="New — v2.0 released"
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS. Ship production-ready UIs in hours, not weeks."
      primaryAction={<Button size="lg">Get started</Button>}
      secondaryAction={<Button size="lg" variant="outline">View docs</Button>}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["centered", "split", "minimal"],
    },
  },
  args: {
    variant: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Centered: Story = {
  render: (args) => (
    <HeroSection
      {...args}
      variant="centered"
      badge={<Badge variant="secondary">New Release</Badge>}
      headline="Build faster with our design system"
      subheadline="A comprehensive library of accessible, composable components built for modern web applications."
      primaryAction={<Button size="lg">Get started</Button>}
      secondaryAction={<Button size="lg" variant="outline">Learn more</Button>}
    />
  ),
};

export const Split: Story = {
  render: (args) => (
    <HeroSection
      {...args}
      variant="split"
      badge={<Badge>v2.0 is here</Badge>}
      headline="Ship products your users love"
      subheadline="Composable, accessible, and beautifully designed components that scale with your team."
      primaryAction={<Button>Start building</Button>}
      secondaryAction={<Button variant="ghost">View docs</Button>}
      media={
        <div className="h-64 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
          Product preview
        </div>
      }
    />
  ),
};

export const Minimal: Story = {
  render: (args) => (
    <HeroSection
      {...args}
      variant="minimal"
      headline="Design. Build. Ship."
      subheadline="Everything you need to create world-class products."
      primaryAction={<Button size="lg">Start free trial</Button>}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col divide-y divide-border">
      <HeroSection
        variant="centered"
        badge={<Badge variant="secondary">New Release</Badge>}
        headline="Centered hero variant"
        subheadline="Great for landing pages with a single focus."
        primaryAction={<Button>Primary action</Button>}
        secondaryAction={<Button variant="outline">Secondary</Button>}
      />
      <HeroSection
        variant="split"
        headline="Split hero variant"
        subheadline="Text and media side by side."
        primaryAction={<Button>Primary action</Button>}
        media={
          <div className="h-48 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
            Media
          </div>
        }
      />
      <HeroSection
        variant="minimal"
        headline="Minimal hero variant"
        primaryAction={<Button>Single CTA</Button>}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <HeroSection
      variant="centered"
      badge={<Badge>Dark mode</Badge>}
      headline="Looks great in dark mode too"
      subheadline="Every component supports both light and dark themes out of the box."
      primaryAction={<Button>Get started</Button>}
      secondaryAction={<Button variant="outline">Learn more</Button>}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <HeroSection
      variant="centered"
      badge={<Badge variant="secondary">New Release</Badge>}
      headline="Build faster with our design system"
      subheadline="A comprehensive library of accessible, composable components."
      primaryAction={<Button size="lg">Get started</Button>}
      secondaryAction={<Button size="lg" variant="outline">Learn more</Button>}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <HeroSection
      variant="split"
      badge={<Badge>v2.0 is here</Badge>}
      headline="Ship products your users love"
      subheadline="Composable, accessible, and beautifully designed components."
      primaryAction={<Button>Start building</Button>}
      secondaryAction={<Button variant="ghost">View docs</Button>}
      media={
        <div className="h-64 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
          Product preview
        </div>
      }
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <HeroSection
      variant="centered"
      badge={<Badge>New</Badge>}
      headline="Build something great"
      subheadline="Start shipping with confidence."
      primaryAction={<Button>Get started</Button>}
      secondaryAction={<Button variant="ghost">Learn more</Button>}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "HeroSection is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import { HeroSection } from "@launchapp/design-system/blocks";
import { Badge, Button } from "@launchapp/design-system";
import { cva } from "class-variance-authority";
import { cn } from "@launchapp/design-system/utils";

// HeroSection uses CVA to switch between layout variants:
// "centered"  – text and actions centred, optional media below
// "split"     – text left, media right (md:flex-row)
// "minimal"   – compact text-only layout
// "imageBackground" – full-bleed background image with overlay
// All slot props (badge, headline, primaryAction, secondaryAction, media)
// accept any React node, so consumers pass Button, Badge, or custom elements.
const heroVariants = cva("w-full py-16 px-4", {
  variants: {
    variant: {
      centered: "flex flex-col items-center text-center gap-6",
      split: "flex flex-col gap-8 md:flex-row md:items-center",
      minimal: "flex flex-col gap-4",
      imageBackground: "relative flex flex-col items-center text-center gap-6 text-white",
    },
  },
  defaultVariants: { variant: "centered" },
});

export function HeroSection({ variant, badge, headline, subheadline, primaryAction, secondaryAction, media, className }) {
  return (
    <section className={cn(heroVariants({ variant }), className)}>
      <div className="flex flex-col gap-4 max-w-2xl">
        {badge}
        <h1 className="text-4xl font-bold tracking-tight">{headline}</h1>
        {subheadline && <p className="text-lg text-muted-foreground">{subheadline}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
      {media && <div className="flex-1">{media}</div>}
    </section>
  );
}`,
      },
    },
  },
};
