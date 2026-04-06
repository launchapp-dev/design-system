import type { Meta, StoryObj } from "@storybook/react";
import { SaaSLanding } from "./index";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";

const sampleFeatures = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Lightning fast",
    description: "Built for performance from the ground up. Deploy in seconds, not minutes.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Enterprise-grade security",
    description: "SOC 2 compliant with end-to-end encryption and role-based access control.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    title: "Modular by design",
    description: "Pick only what you need. Every feature is independently deployable.",
  },
  {
    title: "Global CDN",
    description: "Serve your users from 200+ edge locations worldwide with sub-50ms latency.",
  },
  {
    title: "Developer-first APIs",
    description: "Clean REST and GraphQL APIs with SDKs for every major language.",
  },
  {
    title: "99.9% uptime SLA",
    description: "Backed by our industry-leading reliability commitment and 24/7 support.",
  },
];

const sampleTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for side projects and early-stage startups.",
    features: ["5 projects", "1 team member", "1 GB storage", "Community support"],
    action: (
      <Button variant="outline" className="w-full">
        Get started free
      </Button>
    ),
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams shipping production apps.",
    features: [
      "Unlimited projects",
      "10 team members",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
    ],
    action: <Button className="w-full">Start free trial</Button>,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom requirements.",
    features: [
      "Unlimited everything",
      "SSO & SAML",
      "Dedicated support",
      "Custom contracts",
      "SLA guarantees",
    ],
    action: (
      <Button variant="outline" className="w-full">
        Contact sales
      </Button>
    ),
  },
];

const meta: Meta<typeof SaaSLanding> = {
  title: "Blocks/Landing/SaaSLanding",
  component: SaaSLanding,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { SaaSLanding } from "@launchapp/design-system";
import { Button, Badge } from "@launchapp/design-system";

export default function Page() {
  return (
    <SaaSLanding
      badge={<Badge variant="secondary">Now in beta</Badge>}
      headline="The modern platform for shipping faster"
      subheadline="Everything your team needs to build, deploy, and scale production apps."
      primaryAction={<Button size="lg">Start for free</Button>}
      secondaryAction={<Button size="lg" variant="outline">View demo</Button>}
      features={features}
      pricingTiers={tiers}
      ctaTitle="Ready to get started?"
      ctaAction={<Button size="lg" variant="secondary">Create your account</Button>}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SaaSLanding>;

export const Default: Story = {
  render: () => (
    <SaaSLanding
      badge={<Badge variant="secondary">Now in beta</Badge>}
      headline="The modern platform for shipping faster"
      subheadline="Everything your team needs to build, deploy, and scale production apps. No infrastructure headaches."
      primaryAction={<Button size="lg">Start for free</Button>}
      secondaryAction={
        <Button size="lg" variant="outline">
          View demo
        </Button>
      }
      heroMedia={
        <div className="h-64 md:h-96 w-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
          Product screenshot
        </div>
      }
      features={sampleFeatures}
      featuresSubtitle="Everything you need to ship faster without compromising quality or security."
      pricingTiers={sampleTiers}
      pricingSubtitle="Start free. No credit card required."
      ctaTitle="Ready to ship faster?"
      ctaSubtitle="Join thousands of teams already using our platform."
      ctaAction={
        <Button size="lg" variant="secondary">
          Create your account
        </Button>
      }
    />
  ),
};

export const HeroOnly: Story = {
  render: () => (
    <SaaSLanding
      badge={<Badge>New: AI-powered features</Badge>}
      headline="Build smarter, ship faster"
      subheadline="The all-in-one platform for modern development teams."
      primaryAction={<Button size="lg">Get started</Button>}
      secondaryAction={
        <Button size="lg" variant="outline">
          Watch demo
        </Button>
      }
    />
  ),
};

export const WithPricingOnly: Story = {
  render: () => (
    <SaaSLanding
      headline="Simple pricing for every team"
      subheadline="No hidden fees. Cancel anytime."
      pricingTiers={sampleTiers}
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
    <SaaSLanding
      badge={<Badge variant="secondary">Dark mode ready</Badge>}
      headline="Beautiful in dark mode too"
      subheadline="Every component supports both light and dark themes out of the box."
      primaryAction={<Button size="lg">Get started</Button>}
      features={sampleFeatures.slice(0, 3)}
      pricingTiers={sampleTiers}
      ctaTitle="Start building today"
      ctaAction={
        <Button size="lg" variant="secondary">
          Sign up free
        </Button>
      }
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <SaaSLanding
      badge={<Badge variant="secondary">Mobile-first</Badge>}
      headline="Looks great on mobile"
      subheadline="Fully responsive design that works on any device."
      primaryAction={<Button size="lg">Get started</Button>}
      features={sampleFeatures.slice(0, 3)}
      pricingTiers={sampleTiers}
    />
  ),
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => (
    <SaaSLanding
      badge={<Badge>Tablet optimized</Badge>}
      headline="Perfect on every screen size"
      subheadline="Responsive layouts that adapt to any viewport."
      primaryAction={<Button size="lg">Get started</Button>}
      features={sampleFeatures}
      pricingTiers={sampleTiers}
    />
  ),
};
