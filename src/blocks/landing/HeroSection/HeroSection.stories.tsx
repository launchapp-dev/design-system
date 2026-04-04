import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { HeroSectionBlock } from "./index";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";

const meta: Meta<typeof HeroSectionBlock> = {
  title: "Blocks/Landing/HeroSection",
  component: HeroSectionBlock,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { HeroSectionBlock } from "@launchapp/design-system/blocks";
import { Button, Badge } from "@launchapp/design-system";

export default function HeroPage() {
  return (
    <HeroSectionBlock
      variant="centered"
      eyebrow={<Badge variant="secondary">New — v2.0 released</Badge>}
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
      options: ["centered", "split", "gradient"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSectionBlock>;

export const Centered: Story = {
  render: () => (
    <HeroSectionBlock
      variant="centered"
      eyebrow={<Badge variant="secondary">New Release</Badge>}
      headline="Build products your customers love"
      subheadline="Everything you need to ship a modern SaaS product. Auth, billing, email, and 100+ UI components out of the box."
      primaryAction={<Button size="lg">Start building</Button>}
      secondaryAction={<Button size="lg" variant="outline">View demo</Button>}
      media={
        <div className="w-full aspect-[16/9] bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          App screenshot
        </div>
      }
    />
  ),
};

export const SplitWithImage: Story = {
  render: () => (
    <HeroSectionBlock
      variant="split"
      eyebrow="Trusted by 10,000+ teams"
      headline="The design system that ships with you"
      subheadline="104 production-ready components built on Radix UI primitives. Accessible, themeable, and built to last."
      primaryAction={<Button size="lg">Get started for free</Button>}
      secondaryAction={<Button size="lg" variant="ghost">Watch demo</Button>}
      media={
        <div className="w-full aspect-[4/3] bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          Product image
        </div>
      }
    />
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <HeroSectionBlock
      variant="gradient"
      eyebrow={<Badge variant="outline">Now in beta</Badge>}
      headline="The last design system you'll ever need"
      subheadline="LaunchApp ships with everything: authentication, billing, email, analytics, and a full component library. Go from zero to launch in days."
      primaryAction={<Button size="lg">Start free trial</Button>}
      secondaryAction={<Button size="lg" variant="outline">Read docs</Button>}
      media={
        <div className="w-full aspect-[16/9] bg-muted flex items-center justify-center text-muted-foreground text-sm">
          App screenshot
        </div>
      }
    />
  ),
};
