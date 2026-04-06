import type { Meta, StoryObj } from "@storybook/react";
import { Marquee, MarqueeItem } from "./index";

const meta: Meta<typeof Marquee> = {
  title: "Components/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["left", "right", "up", "down"],
      description: "Direction of the marquee animation",
    },
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
      description: "Speed of the marquee animation",
    },
    pauseOnHover: {
      control: "boolean",
      description: "Pause animation on hover",
    },
    showGradient: {
      control: "boolean",
      description: "Show gradient fade at edges",
    },
    gradientWidth: {
      control: "number",
      description: "Width of the gradient fade (in pixels)",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Design Pattern
- Content continuously scrolls for visual effect (decorative)
- Content must be available elsewhere for accessibility
- Marquee respects \`prefers-reduced-motion\` setting

### Keyboard Navigation
- No keyboard interaction (decorative animation)
- Pause on hover allows reading of static content
- Content must be accessible in alternative form

### Screen Reader Behavior
- Marquee marked with \`aria-hidden="true"\` if purely decorative
- If content is important, provide static version or full content separately
- Animation does not affect tab order or focus

### Motion Sensitivity
- Animation disabled for users with \`prefers-reduced-motion: reduce\`
- Static content display available
- Pause on hover for manual reading

### Alternative Content
- Provide full text content separately for screen readers
- If marquee displays important information, duplicate it accessibly
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Marquee>;

const LogoItem = ({ name }: { name: string }) => (
  <MarqueeItem className="flex items-center justify-center px-6">
    <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))] font-medium">
      {name}
    </div>
  </MarqueeItem>
);

export const Default: Story = {
  render: () => (
    <Marquee className="w-full py-4">
      <LogoItem name="React" />
      <LogoItem name="TypeScript" />
      <LogoItem name="Tailwind" />
      <LogoItem name="Radix UI" />
      <LogoItem name="Next.js" />
      <LogoItem name="Vite" />
    </Marquee>
  ),
};

export const Directions: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Left (default)</p>
        <Marquee direction="left" speed="fast" className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]">
          <LogoItem name="Left 1" />
          <LogoItem name="Left 2" />
          <LogoItem name="Left 3" />
          <LogoItem name="Left 4" />
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Right</p>
        <Marquee direction="right" speed="fast" className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]">
          <LogoItem name="Right 1" />
          <LogoItem name="Right 2" />
          <LogoItem name="Right 3" />
          <LogoItem name="Right 4" />
        </Marquee>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Up</p>
          <Marquee direction="up" speed="fast" className="h-48 rounded-lg bg-[hsl(var(--la-card))]">
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Up 1</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Up 2</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Up 3</div>
            </MarqueeItem>
          </Marquee>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Down</p>
          <Marquee direction="down" speed="fast" className="h-48 rounded-lg bg-[hsl(var(--la-card))]">
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Down 1</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Down 2</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Down 3</div>
            </MarqueeItem>
          </Marquee>
        </div>
      </div>
    </div>
  ),
};

export const Speeds: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Slow (60s)</p>
        <Marquee direction="left" speed="slow" className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]">
          <LogoItem name="Slow" />
          <LogoItem name="Steady" />
          <LogoItem name="Calm" />
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Normal (30s)</p>
        <Marquee direction="left" speed="normal" className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]">
          <LogoItem name="Normal" />
          <LogoItem name="Standard" />
          <LogoItem name="Default" />
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">Fast (15s)</p>
        <Marquee direction="left" speed="fast" className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]">
          <LogoItem name="Fast" />
          <LogoItem name="Quick" />
          <LogoItem name="Rapid" />
        </Marquee>
      </div>
    </div>
  ),
};

export const PauseOnHover: Story = {
  render: () => (
    <div>
      <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
        Hover over the marquee to pause the animation
      </p>
      <Marquee
        direction="left"
        speed="normal"
        pauseOnHover
        className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]"
      >
        <LogoItem name="Hover Me" />
        <LogoItem name="I'll Pause" />
        <LogoItem name="Try It" />
        <LogoItem name="Mouse Over" />
        <LogoItem name="Stop Here" />
      </Marquee>
    </div>
  ),
};

export const GradientFade: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
          Horizontal marquee with gradient fade
        </p>
        <Marquee
          direction="left"
          speed="normal"
          showGradient
          gradientWidth={80}
          className="w-full py-4 rounded-lg bg-[hsl(var(--la-card))]"
        >
          <LogoItem name="React" />
          <LogoItem name="TypeScript" />
          <LogoItem name="Tailwind" />
          <LogoItem name="Radix UI" />
          <LogoItem name="Next.js" />
          <LogoItem name="Vite" />
          <LogoItem name="GraphQL" />
          <LogoItem name="Prisma" />
        </Marquee>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
            Vertical with gradient
          </p>
          <Marquee
            direction="up"
            speed="normal"
            showGradient
            gradientWidth={40}
            className="h-48 rounded-lg bg-[hsl(var(--la-card))]"
          >
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Item 1</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Item 2</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Item 3</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-muted))] flex items-center justify-center">Item 4</div>
            </MarqueeItem>
          </Marquee>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
            Custom gradient color
          </p>
          <Marquee
            direction="up"
            speed="normal"
            showGradient
            gradientColor="white"
            gradientWidth={40}
            className="h-48 rounded-lg bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]"
          >
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-primary)/0.3)] flex items-center justify-center">Item 1</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-primary)/0.3)] flex items-center justify-center">Item 2</div>
            </MarqueeItem>
            <MarqueeItem className="flex items-center justify-center py-4">
              <div className="h-12 w-24 rounded bg-[hsl(var(--la-primary)/0.3)] flex items-center justify-center">Item 3</div>
            </MarqueeItem>
          </Marquee>
        </div>
      </div>
    </div>
  ),
};

export const LogoCarousel: Story = {
  render: () => (
    <div className="rounded-lg border border-[hsl(var(--la-border))] p-6">
      <h3 className="mb-4 text-center text-lg font-semibold">
        Trusted by leading companies
      </h3>
      <Marquee
        direction="left"
        speed="slow"
        pauseOnHover
        showGradient
        gradientWidth={100}
        className="py-4"
      >
        {[
          "Vercel",
          "Stripe",
          "Linear",
          "Notion",
          "Figma",
          "GitHub",
          "Slack",
          "Discord",
          "Airbnb",
          "Spotify",
        ].map((company) => (
          <MarqueeItem key={company} className="flex items-center justify-center px-8">
            <div className="flex h-14 w-32 items-center justify-center rounded-lg bg-[hsl(var(--la-muted))] font-medium text-[hsl(var(--la-foreground))]">
              {company}
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <Marquee
      direction="left"
      speed="slow"
      pauseOnHover
      showGradient
      className="w-full py-4"
    >
      {[
        { quote: "Amazing product!", author: "John D." },
        { quote: "Changed our workflow", author: "Sarah M." },
        { quote: "Highly recommended", author: "Alex K." },
        { quote: "Best in class", author: "Emma L." },
        { quote: "Love the simplicity", author: "Mike R." },
      ].map((testimonial, i) => (
        <MarqueeItem key={i} className="flex items-center px-4">
          <div className="w-64 rounded-lg bg-[hsl(var(--la-card))] border border-[hsl(var(--la-border))] p-4">
            <p className="text-sm font-medium">"{testimonial.quote}"</p>
            <p className="mt-2 text-xs text-[hsl(var(--la-muted-foreground))]">
              — {testimonial.author}
            </p>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <section>
        <h3 className="mb-3 text-sm font-semibold">All Features Combined</h3>
        <Marquee
          direction="left"
          speed="normal"
          pauseOnHover
          showGradient
          gradientWidth={64}
          className="w-full rounded-lg bg-[hsl(var(--la-muted))] py-4"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <MarqueeItem key={i} className="flex items-center justify-center px-6">
              <div className="h-12 w-28 rounded-md bg-[hsl(var(--la-background))] flex items-center justify-center text-sm font-medium">
                Item {i + 1}
              </div>
            </MarqueeItem>
          ))}
        </Marquee>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold text-[hsl(var(--la-muted-foreground))]">
          Reduced Motion Support
        </h3>
        <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
          Enable "prefers-reduced-motion: reduce" in your browser/OS settings to see static content instead.
        </p>
      </section>
    </div>
  ),
};
