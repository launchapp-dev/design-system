import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TestimonialsSection } from "./index";
import type { TestimonialItem } from "./index";

const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "This design system has completely transformed how our team builds products. We ship features twice as fast now.",
    author: {
      name: "Sarah Chen",
      role: "VP of Engineering",
      company: "Acme Corp",
      avatarFallback: "SC",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=Acme",
      logoAlt: "Acme Corp",
    },
    badge: "Verified customer",
  },
  {
    quote: "The accessibility built into every component means we stopped worrying about compliance and started focusing on our users.",
    author: {
      name: "Marcus Johnson",
      role: "Lead Designer",
      company: "BuildCo",
      avatarFallback: "MJ",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=BuildCo",
      logoAlt: "BuildCo",
    },
  },
  {
    quote: "I evaluated five design systems and this one won on TypeScript support and documentation alone. The components are a bonus.",
    author: {
      name: "Priya Patel",
      role: "Senior Frontend Engineer",
      company: "StartupXYZ",
      avatarFallback: "PP",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=StartupXYZ",
      logoAlt: "StartupXYZ",
    },
    badge: "Top reviewer",
  },
  {
    quote: "Dark mode support out of the box. That sold our whole team. No more 2am CSS overrides.",
    author: {
      name: "Alex Rivera",
      role: "CTO",
      company: "DevShop",
      avatarFallback: "AR",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=DevShop",
      logoAlt: "DevShop",
    },
  },
  {
    quote: "The component API is so intuitive. New engineers are productive on day one instead of week two.",
    author: {
      name: "Emma Wilson",
      role: "Engineering Manager",
      company: "CloudFirst",
      avatarFallback: "EW",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=CloudFirst",
      logoAlt: "CloudFirst",
    },
  },
  {
    quote: "Finally, a design system that takes accessibility seriously. Our audit scores jumped 40 points in a single sprint.",
    author: {
      name: "James Lee",
      role: "Product Manager",
      company: "FinTech Inc",
      avatarFallback: "JL",
      logoSrc: "https://placehold.co/80x24/64748b/ffffff?text=FinTech",
      logoAlt: "FinTech Inc",
    },
    badge: "Featured",
  },
];

const meta: Meta<typeof TestimonialsSection> = {
  title: "Blocks/Landing/TestimonialsSection",
  component: TestimonialsSection,
  tags: ["autodocs"],
  argTypes: {
    displayMode: {
      control: { type: "select" },
      options: ["grid", "carousel", "masonry"],
    },
    autoAdvanceInterval: {
      control: { type: "number", min: 1000, max: 15000, step: 500 },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "minimal", "rich"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {
  args: {
    eyebrow: "Testimonials",
    headline: "Loved by builders everywhere",
    subheadline: "Join thousands of teams shipping faster with LaunchApp.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};

export const GridMode: Story = {
  args: {
    eyebrow: "Customer stories",
    headline: "What our customers say",
    subheadline: "Trusted by teams at companies of all sizes.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};

export const CarouselMode: Story = {
  args: {
    eyebrow: "Featured review",
    headline: "What our customers say",
    subheadline: "Trusted by teams at companies of all sizes.",
    testimonials: defaultTestimonials,
    displayMode: "carousel",
    autoAdvanceInterval: 5000,
    variant: "default",
  },
};

export const MasonryMode: Story = {
  args: {
    eyebrow: "Reviews",
    headline: "From the community",
    subheadline: "Real stories from real teams.",
    testimonials: defaultTestimonials,
    displayMode: "masonry",
    variant: "default",
  },
};

export const Minimal: Story = {
  args: {
    headline: "What our customers say",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "minimal",
  },
};

export const Rich: Story = {
  args: {
    eyebrow: "Reviews",
    headline: "Our customers speak",
    subheadline: "Don't just take our word for it — hear from the teams using LaunchApp every day.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "rich",
  },
};

export const WithoutHeader: Story = {
  args: {
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};

export const LeftAligned: Story = {
  args: {
    eyebrow: "Reviews",
    headline: "What our customers say",
    subheadline: "Trusted by teams at companies of all sizes.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    align: "left",
    variant: "default",
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
    eyebrow: "Reviews",
    headline: "What our customers say",
    subheadline: "Trusted by thousands of developers worldwide.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    eyebrow: "Reviews",
    headline: "What our customers say",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    eyebrow: "Reviews",
    headline: "What our customers say",
    subheadline: "Trusted by teams at companies of all sizes.",
    testimonials: defaultTestimonials,
    displayMode: "grid",
    variant: "default",
  },
};
