import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TestimonialCard, TestimonialCardGrid } from "./index";

const meta: Meta<typeof TestimonialCard> = {
  title: "Components/TestimonialCard",
  component: TestimonialCard,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "featured"],
    },
    showQuoteIcon: { control: "boolean" },
    rating: { control: "number", min: 0, max: 5, step: 0.5 },
  },
  args: {
    quote: "This design system has completely transformed how we build our products. The components are intuitive, well-documented, and incredibly flexible.",
    author: "Sarah Chen",
    role: "Senior Engineer",
    company: "TechCorp",
    avatarFallback: "SC",
    showQuoteIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
  render: (args) => <TestimonialCard {...args} />,
};

export const WithRating: Story = {
  render: (args) => (
    <TestimonialCard
      {...args}
      quote="Absolutely love working with this library. The attention to detail in every component is remarkable."
      rating={5}
    />
  ),
};

export const WithAvatar: Story = {
  render: (args) => (
    <TestimonialCard
      {...args}
      avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      avatarFallback="JD"
      author="James Davidson"
      role="Product Manager"
      company="StartupXYZ"
    />
  ),
};

export const Compact: Story = {
  render: (args) => (
    <TestimonialCard
      {...args}
      variant="compact"
      quote="Clean and minimal. Perfect for my use case."
      rating={4}
    />
  ),
};

export const Featured: Story = {
  render: (args) => (
    <TestimonialCard
      {...args}
      variant="featured"
      quote="The best design system I've ever worked with. Every component is thoughtfully crafted and the documentation is exceptional."
      author="Maria Garcia"
      role: "Design Lead"
      company: "Creative Studio"
      rating={5}
    />
  ),
};

export const WithoutQuoteIcon: Story = {
  render: (args) => (
    <TestimonialCard
      {...args}
      showQuoteIcon={false}
      quote="Clean design, easy to customize."
    />
  ),
};

const testimonials = [
  {
    quote: "This design system has completely transformed how we build our products.",
    author: "Sarah Chen",
    role: "Senior Engineer",
    company: "TechCorp",
    rating: 5,
    avatarFallback: "SC",
  },
  {
    quote: "The attention to detail in every component is remarkable.",
    author: "Michael Park",
    role: "Product Designer",
    company: "DesignCo",
    rating: 5,
    avatarFallback: "MP",
  },
  {
    quote: "Intuitive, well-documented, and incredibly flexible.",
    author: "Emily Johnson",
    role: "Frontend Developer",
    company: "WebWorks",
    rating: 4,
    avatarFallback: "EJ",
  },
];

const testimonialsWithAvatars = [
  {
    quote: "Best investment we made for our design team. Highly recommended!",
    author: "Alex Thompson",
    role: "CTO",
    company: "InnovateTech",
    rating: 5,
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    avatarFallback: "AT",
  },
  {
    quote: "The components are beautifully designed and easy to customize.",
    author: "Lisa Wang",
    role: "UI Designer",
    company: "PixelPerfect",
    rating: 5,
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    avatarFallback: "LW",
  },
  {
    quote: "Excellent documentation and community support.",
    author: "David Kim",
    role: "Full Stack Developer",
    company: "DevStudio",
    rating: 4,
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    avatarFallback: "DK",
  },
];

export const Grid: Story = {
  render: () => (
    <TestimonialCardGrid testimonials={testimonials} columns={3} />
  ),
};

export const GridWithAvatars: Story = {
  render: () => (
    <TestimonialCardGrid testimonials={testimonialsWithAvatars} columns={3} />
  ),
};

export const TwoColumnGrid: Story = {
  render: () => (
    <TestimonialCardGrid testimonials={testimonials.slice(0, 2)} columns={2} />
  ),
};

export const FourColumnGrid: Story = {
  render: () => (
    <TestimonialCardGrid testimonials={[...testimonials, ...testimonials].slice(0, 4)} columns={4} />
  ),
};
