import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TestimonialCarousel } from "./index";
import type { Testimonial } from "./index";

const testimonials: Testimonial[] = [
  {
    quote:
      "This design system has completely transformed how our team builds products. We ship features twice as fast now.",
    name: "Sarah Chen",
    role: "VP of Engineering at Acme Corp",
    avatarFallback: "SC",
    badge: "Verified customer",
  },
  {
    quote:
      "The accessibility built into every component means we stopped worrying about compliance and started focusing on our users.",
    name: "Marcus Johnson",
    role: "Lead Designer at BuildCo",
    avatarFallback: "MJ",
  },
  {
    quote:
      "I evaluated five design systems and this one won on TypeScript support and documentation alone. The components are a bonus.",
    name: "Priya Patel",
    role: "Senior Frontend Engineer at StartupXYZ",
    avatarFallback: "PP",
    badge: "Top reviewer",
  },
  {
    quote:
      "Dark mode support out of the box. That sold our whole team. No more 2am CSS overrides.",
    name: "Alex Rivera",
    role: "CTO at DevShop",
    avatarFallback: "AR",
  },
];

const meta: Meta<typeof TestimonialCarousel> = {
  title: "Blocks/Marketing/TestimonialCarousel",
  component: TestimonialCarousel,
  argTypes: {
    autoAdvanceInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCarousel>;

export const Default: Story = {
  render: (args) => (
    <TestimonialCarousel
      {...args}
      headline="What our customers say"
      subheadline="Trusted by teams at companies of all sizes."
      testimonials={testimonials}
    />
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <TestimonialCarousel testimonials={testimonials} />
  ),
};

export const SingleTestimonial: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Customer spotlight"
      testimonials={[testimonials[0]]}
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Featured reviews"
      testimonials={testimonials.map((t, i) => ({
        ...t,
        badge: i % 2 === 0 ? "Verified" : undefined,
      }))}
    />
  ),
};

export const SlowAutoAdvance: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Testimonials"
      testimonials={testimonials}
      autoAdvanceInterval={8000}
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
    <TestimonialCarousel
      headline="What our customers say"
      subheadline="Trusted by thousands of developers worldwide."
      testimonials={testimonials}
    />
  ),
};
