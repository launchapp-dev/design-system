import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CTASection } from "./index";
import { Button } from "../../../components/Button";

const meta: Meta<typeof CTASection> = {
  title: "blocks/landing/CTASection",
  component: CTASection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    headline: "Ready to ship faster?",
    subtext: "Join thousands of teams building with LaunchApp. Get started in minutes.",
    primaryAction: <Button size="lg">Get started free</Button>,
    secondaryAction: <Button size="lg" variant="outline">View demo</Button>,
  },
};

export const WithSingleAction: Story = {
  args: {
    headline: "Start building today",
    subtext: "No credit card required. Free forever for small teams.",
    primaryAction: <Button size="lg">Get started</Button>,
  },
};

export const Minimal: Story = {
  args: {
    headline: "Simple CTA",
    variant: "minimal",
    primaryAction: <Button>Sign up</Button>,
  },
};

export const Hero: Story = {
  args: {
    headline: "Launch your SaaS in record time",
    subtext: "Everything you need to go from idea to production in one weekend.",
    primaryAction: <Button size="lg">Start building free</Button>,
    secondaryAction: <Button size="lg" variant="outline">Watch demo</Button>,
    variant: "hero",
  },
};

export const WithMutedBackground: Story = {
  args: {
    headline: "Join the community",
    subtext: "Thousands of developers are already building with LaunchApp.",
    primaryAction: <Button size="lg">Join now</Button>,
    background: "muted",
  },
};

export const WithPrimaryBackground: Story = {
  args: {
    headline: "Ready to get started?",
    subtext: "Ship your first feature today with our production-ready template.",
    primaryAction: <Button size="lg" variant="secondary">Get started</Button>,
    secondaryAction: <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">Learn more</Button>,
    background: "primary",
  },
};

export const WithGradientBackground: Story = {
  args: {
    headline: "Build something amazing",
    subtext: "A complete toolkit for modern SaaS applications.",
    primaryAction: <Button size="lg">Start building</Button>,
    secondaryAction: <Button size="lg" variant="outline">See pricing</Button>,
    background: "gradient",
  },
};

export const LeftAligned: Story = {
  args: {
    headline: "Take control of your infrastructure",
    subtext: "Deploy to Railway, Vercel, or Fly.io with zero configuration. Self-host or use our managed cloud.",
    primaryAction: <Button size="lg">Get started</Button>,
    secondaryAction: <Button size="lg" variant="outline">Read the docs</Button>,
    align: "left",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    headline: "Dark mode ready",
    subtext: "First-class dark mode support with no extra configuration.",
    primaryAction: <Button size="lg">Get started</Button>,
    secondaryAction: <Button size="lg" variant="outline">Learn more</Button>,
    background: "muted",
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    headline: "Mobile CTA",
    subtext: "Responsive layout for all devices.",
    primaryAction: <Button className="w-full">Get started</Button>,
    secondaryAction: <Button variant="outline" className="w-full">Learn more</Button>,
  },
};

export const NoSubtext: Story = {
  args: {
    headline: "Just do it",
    primaryAction: <Button size="lg">Get started</Button>,
  },
};

export const Compact: Story = {
  args: {
    headline: "Limited time offer",
    subtext: "50% off for the first 100 customers.",
    primaryAction: <Button>Claim offer</Button>,
    variant: "minimal",
    background: "primary",
  },
};