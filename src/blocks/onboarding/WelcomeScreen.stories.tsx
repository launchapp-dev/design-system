import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { WelcomeScreen } from "./WelcomeScreen";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: "Flexible dashboards",
    description: "Build and customize dashboards that adapt to your workflow.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Team collaboration",
    description: "Invite your team and work together in real time.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "100+ integrations",
    description: "Connect the tools you already use in just a few clicks.",
  },
];

const meta: Meta<typeof WelcomeScreen> = {
  title: "Blocks/Onboarding/WelcomeScreen",
  component: WelcomeScreen,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { WelcomeScreen } from "@launchapp/design-system/blocks/onboarding";

export default function Page() {
  return (
    <WelcomeScreen
      title="Welcome aboard!"
      description="Get started in minutes."
      features={features}
      ctaLabel="Get started"
      onCta={() => router.push("/onboarding")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeScreen>;

export const Default: Story = {
  args: {
    title: "Welcome to Launchapp!",
    description: "Everything you need to build, ship, and scale — all in one place.",
    features,
    ctaLabel: "Get started",
    secondaryCtaLabel: "Watch a demo",
  },
};

export const NoFeatures: Story = {
  args: {
    title: "Welcome aboard!",
    description: "Your account has been created. Let's get you set up.",
    ctaLabel: "Continue setup",
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)" }}>
      <WelcomeScreen {...args} />
    </div>
  ),
  args: {
    title: "Welcome to Launchapp!",
    description: "Everything you need to build, ship, and scale — all in one place.",
    features,
    ctaLabel: "Get started",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    title: "Welcome aboard!",
    description: "Get started in minutes.",
    features,
    ctaLabel: "Get started",
  },
};
