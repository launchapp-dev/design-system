import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Startup } from "./index";

const sampleMetrics = [
  { metric: "10K+", label: "Active users" },
  { metric: "$2M", label: "ARR" },
  { metric: "99.9%", label: "Uptime" },
  { metric: "4.9★", label: "App rating" },
];

const sampleTestimonials = [
  {
    quote:
      "This product completely changed how our team collaborates. We ship 3× faster now.",
    author: "Sarah Chen",
    role: "CTO at Luma",
    avatarFallback: "SC",
  },
  {
    quote:
      "We evaluated 12 tools before choosing this one. Hasn't let us down once.",
    author: "Marcus Oliveira",
    role: "Founder at Petal",
    avatarFallback: "MO",
  },
  {
    quote:
      "The DX is exceptional. Our engineers actually look forward to using it.",
    author: "Aisha Nwosu",
    role: "VP Engineering at Bloom",
    avatarFallback: "AN",
  },
  {
    quote: "Onboarded our entire team in under an hour. The ROI was immediate.",
    author: "Tom Bergström",
    role: "Product Lead at Stride",
    avatarFallback: "TB",
  },
  {
    quote: "Support is incredible. Problems get solved, not ticketed.",
    author: "Yuki Tanaka",
    role: "Founder at Orbit",
    avatarFallback: "YT",
  },
  {
    quote: "Best investment we made this year. Period.",
    author: "Priya Kapoor",
    role: "CEO at Flux",
    avatarFallback: "PK",
  },
];

const sampleLogoBar = [
  <div
    key="1"
    className="text-muted-foreground font-bold text-sm tracking-widest"
  >
    ACME
  </div>,
  <div
    key="2"
    className="text-muted-foreground font-bold text-sm tracking-widest"
  >
    LUMA
  </div>,
  <div
    key="3"
    className="text-muted-foreground font-bold text-sm tracking-widest"
  >
    PETAL
  </div>,
  <div
    key="4"
    className="text-muted-foreground font-bold text-sm tracking-widest"
  >
    BLOOM
  </div>,
  <div
    key="5"
    className="text-muted-foreground font-bold text-sm tracking-widest"
  >
    STRIDE
  </div>,
];

const meta: Meta<typeof Startup> = {
  title: "Blocks/Landing/Startup",
  component: Startup,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { Startup } from "@launchapp/design-system";
import { Button, Badge } from "@launchapp/design-system";

export default function Page() {
  return (
    <Startup
      badge={<Badge variant="secondary">Now in beta</Badge>}
      headline="Build, launch, grow"
      subheadline="The startup platform that gets out of your way."
      primaryAction={<Button size="lg">Get early access</Button>}
      socialProof={metrics}
      testimonials={testimonials}
      ctaTitle="Join the waitlist"
      ctaAction={<Button size="lg">Request access</Button>}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Startup>;

export const Default: Story = {
  render: () => (
    <Startup
      badge={<Badge variant="secondary">Now in beta · 10K+ waitlist</Badge>}
      headline="Ship your startup idea in days, not months"
      subheadline="The all-in-one platform that removes friction from product development. Focus on what matters: your users."
      primaryAction={<Button size="lg">Get early access</Button>}
      secondaryAction={
        <Button size="lg" variant="outline">
          See how it works
        </Button>
      }
      socialProof={sampleMetrics}
      logoBar={sampleLogoBar}
      logoBarLabel="Trusted by leading companies"
      testimonials={sampleTestimonials}
      ctaTitle="Ready to move fast?"
      ctaSubtitle="Join 10,000+ founders and engineers already on the platform."
      ctaAction={<Button size="lg">Start building for free</Button>}
    />
  ),
};

export const MinimalHero: Story = {
  render: () => (
    <Startup
      headline="The fastest way to ship"
      subheadline="Stop building infrastructure. Start building products."
      primaryAction={<Button size="lg">Get started</Button>}
    />
  ),
};

export const WithSocialProof: Story = {
  render: () => (
    <Startup
      headline="Join thousands of builders"
      subheadline="The platform top teams trust to ship faster."
      primaryAction={<Button size="lg">Join the waitlist</Button>}
      socialProof={sampleMetrics}
      logoBar={sampleLogoBar}
      testimonials={sampleTestimonials.slice(0, 3)}
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
    <Startup
      badge={<Badge>Dark mode</Badge>}
      headline="Beautiful in every theme"
      subheadline="Light mode, dark mode — always pixel perfect."
      primaryAction={<Button size="lg">Get started</Button>}
      socialProof={sampleMetrics}
      testimonials={sampleTestimonials.slice(0, 3)}
      ctaTitle="Start today"
      ctaAction={<Button size="lg">Create account</Button>}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Startup
      badge={<Badge variant="secondary">Beta</Badge>}
      headline="Ship faster on mobile too"
      subheadline="Responsive from day one."
      primaryAction={<Button size="lg">Get early access</Button>}
      socialProof={sampleMetrics}
      testimonials={sampleTestimonials.slice(0, 3)}
    />
  ),
};
