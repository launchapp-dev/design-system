import type { Meta, StoryObj } from "@storybook/react";
import { FAQSection } from "./index";

const defaultItems = [
  {
    question: "How do I get started with LaunchApp?",
    answer: "Getting started is easy. Clone the repository, install dependencies with pnpm install, and run pnpm dev. You'll have a fully functional SaaS template up and running in under 5 minutes.",
  },
  {
    question: "Is the template production-ready?",
    answer: "Yes. LaunchApp includes authentication, database, payments, email, and deployment configuration out of the box. It's been battle-tested across dozens of production applications.",
  },
  {
    question: "What frameworks are supported?",
    answer: "We support React Router 7 (flagship), Next.js 14+, Nuxt 4, and SvelteKit 2. All variants share the same design system, API contracts, and feature set.",
  },
  {
    question: "Can I customize the design?",
    answer: "Absolutely. The design system uses CSS variables with --la-* prefix, making it easy to theme. You can also swap out individual components or use the full ThemeGenerator for comprehensive customization.",
  },
  {
    question: "How does billing work?",
    answer: "We integrate with Stripe and Polar.sh for subscription management. The billing package handles checkout sessions, webhooks, customer portals, and usage-based pricing out of the box.",
  },
  {
    question: "What about GDPR and data privacy?",
    answer: "All templates include GDPR endpoints for data export and deletion. Cookie consent is built-in, and the auth system supports data residency requirements.",
  },
];

const meta: Meta<typeof FAQSection> = {
  title: "blocks/landing/FAQSection",
  component: FAQSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FAQSection>;

export const Default: Story = {
  args: {
    eyebrow: "FAQ",
    headline: "Frequently asked questions",
    subheadline: "Everything you need to know about LaunchApp. Can't find what you're looking for? Reach out to our team.",
    items: defaultItems,
  },
};

export const WithSearch: Story = {
  args: {
    eyebrow: "Knowledge Base",
    headline: "Find answers instantly",
    subheadline: "Search through our comprehensive FAQ database to find what you need.",
    items: defaultItems,
    enableSearch: true,
  },
};

export const Minimal: Story = {
  args: {
    headline: "Common questions",
    items: defaultItems.slice(0, 4),
    variant: "minimal",
  },
};

export const Bordered: Story = {
  args: {
    eyebrow: "Support",
    headline: "Have more questions?",
    subheadline: "Our team is here to help you succeed.",
    items: defaultItems,
    variant: "bordered",
  },
};

export const MultipleOpen: Story = {
  args: {
    eyebrow: "Details",
    headline: "Everything you need to know",
    items: defaultItems,
    accordionType: "multiple",
  },
};

export const LeftAligned: Story = {
  args: {
    headline: "Left-aligned FAQ",
    subheadline: "This layout works great for documentation pages.",
    items: defaultItems,
    align: "left",
    enableSearch: true,
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
    eyebrow: "FAQ",
    headline: "Dark mode support",
    subheadline: "Looks great in any theme.",
    items: defaultItems,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    eyebrow: "FAQ",
    headline: "Mobile optimized",
    subheadline: "Responsive accordion for all screen sizes.",
    items: defaultItems.slice(0, 3),
    enableSearch: true,
  },
};

export const EmptySearch: Story = {
  args: {
    eyebrow: "Search",
    headline: "No results example",
    subheadline: "When search yields nothing.",
    items: defaultItems,
    enableSearch: true,
  },
};
