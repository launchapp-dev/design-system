import type { Meta, StoryObj } from "@storybook/react";
import { FeatureGridBlock } from "./index";
import { Button } from "../../../components/Button";

const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLayers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconRocket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const defaultFeatures = [
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

const meta: Meta<typeof FeatureGridBlock> = {
  title: "blocks/landing/FeatureGridBlock",
  component: FeatureGridBlock,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeatureGridBlock>;

export const Default: Story = {
  args: {
    eyebrow: "Why LaunchApp",
    headline: "Everything you need to ship faster",
    subheadline: "A complete toolkit for building modern SaaS applications. Production-ready from day one.",
    features: defaultFeatures,
    cols: "3",
    variant: "default",
  },
};

export const WithBadges: Story = {
  args: {
    eyebrow: "Core features",
    headline: "Built for modern teams",
    subheadline: "Everything you need to build, ship, and scale your SaaS product.",
    features: [
      { icon: <IconRocket />, badge: "New", title: "One-click Deploy", description: "Deploy to Railway, Vercel, or Fly.io with a single command. Zero configuration required." },
      { icon: <IconShield />, badge: "Enterprise", title: "SOC 2 Ready", description: "Built with compliance in mind. Audit logs, RBAC, and data residency all included." },
      { icon: <IconCode />, badge: "DX", title: "TypeScript Native", description: "Fully typed APIs with excellent editor support. No more runtime surprises." },
      { icon: <IconLayers />, badge: "API", title: "REST + GraphQL", description: "Auto-generated API docs, rate limiting, and request validation out of the box." },
      { icon: <IconGlobe />, badge: "i18n", title: "Internationalized", description: "Built-in i18n with RTL support. Launch in any market with minimal effort." },
      { icon: <IconHeart />, badge: "OSS", title: "Open Core", description: "MIT licensed core. Pay for what you need with transparent, usage-based pricing." },
    ],
    cols: "3",
    variant: "default",
  },
};

export const TwoColumns: Story = {
  args: {
    eyebrow: "Platform",
    headline: "A platform built to scale",
    subheadline: "From prototype to millions of users, LaunchApp grows with your business.",
    features: [
      { icon: <IconRocket />, title: "Auto-scaling infrastructure", description: "Your application automatically scales from zero to millions of users without any configuration changes or capacity planning." },
      { icon: <IconShield />, title: "Enterprise security", description: "SOC 2 Type II compliant infrastructure with end-to-end encryption, SSO, and advanced audit logging built in." },
      { icon: <IconLayers />, title: "Microservices ready", description: "Monolith that splits cleanly into microservices when you need it. Start simple, scale when required." },
      { icon: <IconCode />, title: "Preview environments", description: "Every PR gets its own preview environment. Share and test before merging. No manual setup needed." },
    ],
    cols: "2",
    variant: "default",
  },
};

export const FourColumns: Story = {
  args: {
    headline: "Modern stack, zero compromises",
    features: [
      { icon: <IconZap />, title: "React 19", description: "The latest React with Server Components." },
      { icon: <IconCode />, title: "TypeScript", description: "Full type safety across your codebase." },
      { icon: <IconLayers />, title: "Turborepo", description: "Smart monorepo with remote caching." },
      { icon: <IconGlobe />, title: "Tailwind v4", description: "Utility-first CSS with excellent DX." },
    ],
    cols: "4",
    variant: "minimal",
  },
};

export const WithFeaturedCard: Story = {
  args: {
    eyebrow: "Highlighted",
    headline: "One to rule them all",
    features: [
      { icon: <IconRocket />, title: "Fastest deployment", description: "Push to deploy in under 30 seconds.", action: <Button size="sm" variant="outline">Learn more</Button> },
      { icon: <IconShield />, title: "Bank-grade security", description: "SOC 2 Type II certified infrastructure." },
      { icon: <IconLayers />, title: "Modular by design", description: "Use only what you need, replace anything." },
    ],
    featuredIndex: 0,
    cols: "3",
    variant: "default",
  },
};

export const WithCTAs: Story = {
  args: {
    eyebrow: "Get started",
    headline: "Ship your first feature today",
    subheadline: "Join thousands of teams shipping faster with LaunchApp.",
    features: [
      { icon: <IconRocket />, title: "Start in minutes", description: "Clone, install, deploy. Be live in under 10 minutes.", action: <Button size="sm">Get started free</Button> },
      { icon: <IconCode />, title: "Bring your team", description: "Invite collaborators with role-based access control.", action: <Button size="sm" variant="outline">Invite team</Button> },
      { icon: <IconGlobe />, title: "Go global", description: "CDN-backed infrastructure in 20+ regions worldwide.", action: <Button size="sm" variant="ghost">View regions</Button> },
    ],
    cols: "3",
    variant: "default",
  },
};

export const RichVariant: Story = {
  args: {
    eyebrow: "Capabilities",
    headline: "Everything your team needs",
    subheadline: "A thoughtfully designed system that grows with your product.",
    features: [
      { icon: <IconZap />, title: "Real-time updates", description: "WebSocket-powered live data. Keep your UI in sync without polling or manual refreshes." },
      { icon: <IconShield />, title: "SOC 2 compliance", description: "Enterprise-grade security with audit logs, SSO, and advanced permission controls." },
      { icon: <IconLayers />, title: "Modular architecture", description: "Start with a monolith, split into microservices when your team and scale demand it." },
      { icon: <IconCode />, title: "API-first design", description: "Auto-generated REST and GraphQL APIs. Built-in rate limiting, validation, and versioning." },
      { icon: <IconGlobe />, title: "Global CDN", description: "Serve assets from 200+ edge locations. Sub-50ms response times worldwide." },
      { icon: <IconHeart />, title: "Delightful developer experience", description: "TypeScript-first with excellent editor support and comprehensive documentation." },
    ],
    cols: "3",
    variant: "rich",
  },
};

export const LeftAligned: Story = {
  args: {
    eyebrow: "Our approach",
    headline: "Built for developers, by developers",
    subheadline: "We obsess over the details so you can focus on shipping.",
    features: defaultFeatures,
    cols: "3",
    align: "left",
    variant: "default",
  },
};

export const Minimal: Story = {
  args: {
    headline: "Key features",
    features: defaultFeatures,
    cols: "3",
    variant: "minimal",
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
    eyebrow: "Dark mode",
    headline: "Beautiful in any theme",
    subheadline: "First-class dark mode support with no extra configuration.",
    features: defaultFeatures,
    cols: "3",
    variant: "default",
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    eyebrow: "Mobile",
    headline: "Responsive by default",
    subheadline: "Every block adapts beautifully to any screen size.",
    features: defaultFeatures.slice(0, 3),
    cols: "3",
    variant: "default",
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    eyebrow: "Tablet",
    headline: "Optimized for tablets",
    subheadline: "A great experience on medium-sized screens too.",
    features: defaultFeatures.slice(0, 3),
    cols: "3",
    variant: "default",
  },
};
