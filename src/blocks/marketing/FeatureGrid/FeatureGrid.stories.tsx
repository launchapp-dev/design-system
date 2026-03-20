import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeatureGrid } from "./index";

const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLayers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const sampleFeatures = [
  {
    icon: <IconZap />,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal bundle size and zero runtime overhead.",
  },
  {
    icon: <IconShield />,
    title: "Secure by Default",
    description: "Built with security best practices. Every component is safe to use in production.",
  },
  {
    icon: <IconLayers />,
    title: "Composable",
    description: "Mix and match components to build complex interfaces without writing custom code.",
  },
  {
    icon: <IconCode />,
    title: "Developer First",
    description: "Fully typed TypeScript API with excellent editor support and autocompletion.",
  },
  {
    icon: <IconGlobe />,
    title: "Accessible",
    description: "WCAG 2.1 compliant with keyboard navigation and screen reader support.",
  },
  {
    icon: <IconHeart />,
    title: "Delightful UX",
    description: "Carefully crafted interactions and animations that users will love.",
  },
];

const meta: Meta<typeof FeatureGrid> = {
  title: "Blocks/Marketing/FeatureGrid",
  component: FeatureGrid,
  parameters: {
    docs: {
      source: {
        code: `import { FeatureGrid } from "@launchapp/design-system/blocks/marketing";

const features = [
  {
    title: "Accessible",
    description: "Built on Radix UI primitives for full keyboard and screen reader support.",
    icon: "♿",
  },
  {
    title: "Customizable",
    description: "CSS custom properties and Tailwind for effortless theming.",
    icon: "🎨",
  },
  {
    title: "TypeScript",
    description: "Fully typed APIs with IntelliSense for a great DX.",
    icon: "📘",
  },
  {
    title: "Dark Mode",
    description: "First-class dark mode support out of the box.",
    icon: "🌙",
  },
];

export default function Page() {
  return <FeatureGrid features={features} title="Why LaunchApp?" />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureGrid>;

export const Default: Story = {
  render: () => (
    <FeatureGrid
      headline="Everything you need"
      subheadline="A complete toolkit for building modern applications."
      features={sampleFeatures}
    />
  ),
};

export const WithoutHeader: Story = {
  render: () => <FeatureGrid features={sampleFeatures} />,
};

export const ThreeFeatures: Story = {
  render: () => (
    <FeatureGrid
      headline="Core capabilities"
      features={sampleFeatures.slice(0, 3)}
    />
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <FeatureGrid
      headline="Feature highlights"
      features={sampleFeatures.map(({ title, description }) => ({ title, description }))}
    />
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
    <FeatureGrid
      headline="Works in dark mode"
      subheadline="All components adapt to your theme automatically."
      features={sampleFeatures}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <FeatureGrid
      headline="Everything you need"
      subheadline="A complete toolkit for building modern applications."
      features={sampleFeatures}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <FeatureGrid
      headline="Everything you need"
      subheadline="A complete toolkit for building modern applications."
      features={sampleFeatures}
    />
  ),
};
