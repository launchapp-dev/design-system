import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { LogoCloud } from "./index";

const sampleLogos = [
  { name: "Acme Corp", icon: <span className="text-lg font-bold">Acme</span> },
  { name: "Globex", icon: <span className="text-lg font-bold">Globex</span> },
  { name: "Initech", icon: <span className="text-lg font-bold">Initech</span> },
  { name: "Umbrella", icon: <span className="text-lg font-bold">Umbrella</span> },
  { name: "Stark Ind", icon: <span className="text-lg font-bold">Stark</span> },
  { name: "Wayne Ent", icon: <span className="text-lg font-bold">Wayne</span> },
  { name: "Cyberdyne", icon: <span className="text-lg font-bold">Cyberdyne</span> },
  { name: "Soylent", icon: <span className="text-lg font-bold">Soylent</span> },
];

const meta: Meta<typeof LogoCloud> = {
  title: "Blocks/Marketing/LogoCloud",
  component: LogoCloud,
  parameters: {
    docs: {
      source: {
        code: `import { LogoCloud } from "@launchapp/design-system/blocks";

const logos = [
  { name: "Acme Corp" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Umbrella" },
  { name: "Stark Ind" },
  { name: "Wayne Ent" },
];

export default function Page() {
  return (
    <LogoCloud
      headline="Trusted by industry leaders"
      subheadline="Join thousands of companies building with LaunchApp."
      logos={logos}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoCloud>;

export const Default: Story = {
  render: () => (
    <LogoCloud
      headline="Trusted by industry leaders"
      subheadline="Join thousands of companies building with LaunchApp."
      logos={sampleLogos}
    />
  ),
};

export const Simple: Story = {
  args: { variant: "simple" },
  render: () => (
    <LogoCloud
      headline="Our partners"
      logos={sampleLogos}
    />
  ),
};

export const Grid: Story = {
  args: { variant: "grid" },
  render: () => (
    <LogoCloud
      headline="Grid layout"
      logos={sampleLogos}
    />
  ),
};

export const Stacked: Story = {
  args: { variant: "stacked" },
  render: () => (
    <LogoCloud
      headline="Stacked layout"
      logos={sampleLogos.slice(0, 4)}
    />
  ),
};

export const Marquee: Story = {
  args: { variant: "marquee" },
  render: () => (
    <LogoCloud
      headline="Scrolling marquee"
      logos={sampleLogos}
      marqueeSpeed={30}
      fadeEdges={true}
    />
  ),
};

export const MarqueeWithoutFade: Story = {
  name: "Marquee (without fade)",
  args: { variant: "marquee" },
  render: () => (
    <LogoCloud
      headline="Scrolling marquee"
      logos={sampleLogos}
      marqueeSpeed={20}
      fadeEdges={false}
    />
  ),
};

export const WithoutHeader: Story = {
  render: () => <LogoCloud logos={sampleLogos} />,
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
    <LogoCloud
      headline="Trusted by industry leaders"
      subheadline="Works beautifully in dark mode."
      logos={sampleLogos}
    />
  ),
};

export const DarkModeMarquee: Story = {
  name: "Dark Mode Marquee",
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <LogoCloud
      headline="Scrolling marquee"
      logos={sampleLogos}
      variant="marquee"
      fadeEdges={true}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <LogoCloud
      headline="Trusted by industry leaders"
      logos={sampleLogos}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <LogoCloud
      headline="Trusted by industry leaders"
      logos={sampleLogos}
    />
  ),
};

export const WithLinks: Story = {
  name: "With Links",
  render: () => (
    <LogoCloud
      headline="Our investors"
      logos={[
        { name: "Sequoia", icon: <span className="text-lg font-bold">Sequoia</span>, href: "#" },
        { name: "a16z", icon: <span className="text-lg font-bold">a16z</span>, href: "#" },
        { name: "Accel", icon: <span className="text-lg font-bold">Accel</span>, href: "#" },
        { name: "Y Combinator", icon: <span className="text-lg font-bold">YC</span>, href: "#" },
      ]}
    />
  ),
};

export const SixLogos: Story = {
  render: () => (
    <LogoCloud
      headline="Fewer logos"
      logos={sampleLogos.slice(0, 6)}
    />
  ),
};
