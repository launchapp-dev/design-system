import type { Meta, StoryObj } from "@storybook/react";
import { HeroSectionBlock } from "./index";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";

const sampleMetrics = [
  { value: "10K+", label: "Active developers" },
  { value: "$2M", label: "ARR" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "App rating" },
];

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground font-medium">
    {name}
  </div>
);

const meta: Meta<typeof HeroSectionBlock> = {
  title: "blocks/landing/HeroSection",
  component: HeroSectionBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HeroSectionBlock>;

export const Centered: Story = {
  args: {
    eyebrow: "Now in public beta",
    headline: "Build SaaS faster with LaunchApp",
    subheadline:
      "The production-ready React monorepo stack with auth, billing, database, and email pre-configured. Ship your next idea in days, not months.",
    primaryAction: <Button size="lg">Start building free</Button>,
    secondaryAction: <Button size="lg" variant="outline">View demo</Button>,
    media: (
      <img
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=700&fit=crop"
        alt="Dashboard screenshot"
        className="w-full aspect-video object-cover"
      />
    ),
    socialProofMetrics: sampleMetrics,
    logoBar: [
      <LogoPlaceholder key="1" name="Vercel" />,
      <LogoPlaceholder key="2" name="Stripe" />,
      <LogoPlaceholder key="3" name="Linear" />,
      <LogoPlaceholder key="4" name="Raycast" />,
      <LogoPlaceholder key="5" name="PlanetScale" />,
    ],
    logoBarLabel: "Trusted by leading engineering teams",
  },
};

export const CenteredNoSocialProof: Story = {
  args: {
    eyebrow: "Now in public beta",
    headline: "Build SaaS faster with LaunchApp",
    subheadline:
      "The production-ready React monorepo stack with auth, billing, database, and email pre-configured.",
    primaryAction: <Button size="lg">Get started</Button>,
    secondaryAction: <Button size="lg" variant="outline">Learn more</Button>,
  },
};

export const Split: Story = {
  args: {
    eyebrow: "Now in public beta",
    headline: "Ship your next big idea",
    subheadline:
      "Everything you need to build and launch a SaaS product. Auth, payments, database, emails — all wired up and ready.",
    primaryAction: <Button size="lg">Start free trial</Button>,
    secondaryAction: <Button size="lg" variant="outline">Book a demo</Button>,
    media: (
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        alt="App screenshot"
        className="w-full rounded-xl"
      />
    ),
    socialProofMetrics: sampleMetrics,
  },
};

export const Gradient: Story = {
  args: {
    eyebrow: "Now in public beta",
    headline: "The fastest way to launch",
    subheadline:
      "A complete SaaS starter kit with everything you need to go from idea to production in record time.",
    primaryAction: <Button size="lg">Get started free</Button>,
    secondaryAction: <Button size="lg" variant="outline">See pricing</Button>,
    media: (
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop"
        alt="Dashboard screenshot"
        className="w-full aspect-video object-cover"
      />
    ),
    socialProofMetrics: sampleMetrics,
    logoBar: [
      <LogoPlaceholder key="1" name="Acme Corp" />,
      <LogoPlaceholder key="2" name="TechFlow" />,
      <LogoPlaceholder key="3" name="Devify" />,
      <LogoPlaceholder key="4" name="Cloudnine" />,
    ],
    logoBarLabel: "Powering teams at",
    gradientFrom: "var(--la-primary)",
    gradientTo: "var(--la-primary)",
  },
};

export const WithBadgeAsNode: Story = {
  args: {
    eyebrow: <Badge variant="default">New: AI Copilot out now</Badge>,
    headline: "LaunchApp + AI",
    subheadline:
      "Ship faster with AI-powered code generation, intelligent monitoring, and automated testing built into your stack.",
    primaryAction: <Button size="lg">Try AI features</Button>,
    secondaryAction: <Button size="lg" variant="ghost">Read the docs</Button>,
    media: (
      <img
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=700&fit=crop"
        alt="AI dashboard"
        className="w-full aspect-video object-cover"
      />
    ),
    socialProofMetrics: sampleMetrics,
  },
};
