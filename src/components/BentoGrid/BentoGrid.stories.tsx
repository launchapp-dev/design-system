import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoCard } from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GradientBg = ({ from, to }: { from: string; to: string }) => (
  <div
    className="h-full w-full opacity-20"
    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
  />
);

export const Default: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard span={2} style={{ minHeight: "160px" }}>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Featured</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Spans two columns.
          </p>
        </div>
      </BentoCard>
      <BentoCard span={1} style={{ minHeight: "160px" }}>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Side</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Single column.
          </p>
        </div>
      </BentoCard>
      <BentoCard span={1} style={{ minHeight: "120px" }}>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card A</h3>
        </div>
      </BentoCard>
      <BentoCard span={1} style={{ minHeight: "120px" }}>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card B</h3>
        </div>
      </BentoCard>
      <BentoCard span={1} style={{ minHeight: "120px" }}>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Card C</h3>
        </div>
      </BentoCard>
    </BentoGrid>
  ),
};

export const WithContentSlots: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard
        span={2}
        style={{ minHeight: "180px" }}
        icon={<StarIcon />}
        name="Analytics Dashboard"
        description="Track your key metrics in real time with beautiful, interactive charts and reports."
        cta={
          <button
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--primary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            View Reports →
          </button>
        }
        background={<GradientBg from="#6366f1" to="#8b5cf6" />}
      />
      <BentoCard
        span={1}
        style={{ minHeight: "180px" }}
        icon={<ZapIcon />}
        name="Fast Deploy"
        description="Ship to production in seconds with our optimized CI/CD pipeline."
      />
      <BentoCard
        span={1}
        style={{ minHeight: "160px" }}
        icon={<ShieldIcon />}
        name="Secure by Default"
        description="Enterprise-grade security built in from day one."
        background={<GradientBg from="#10b981" to="#059669" />}
      />
      <BentoCard
        span={1}
        style={{ minHeight: "160px" }}
        icon={<GlobeIcon />}
        name="Global CDN"
        description="Deliver content to users worldwide with low latency."
      />
      <BentoCard
        span={1}
        style={{ minHeight: "160px" }}
        icon={<StarIcon />}
        name="5-Star Support"
        description="Our team is available 24/7 to help you succeed."
        background={<GradientBg from="#f59e0b" to="#ef4444" />}
      />
    </BentoGrid>
  ),
};

export const HoverVariants: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard
        hover="default"
        icon={<StarIcon />}
        name="Default Hover"
        description="Lifts on hover."
        style={{ minHeight: "140px" }}
      />
      <BentoCard
        hover="glow"
        icon={<ZapIcon />}
        name="Glow Hover"
        description="Glows on hover."
        style={{ minHeight: "140px" }}
        background={<GradientBg from="#6366f1" to="#8b5cf6" />}
      />
      <BentoCard
        hover="scale"
        icon={<ShieldIcon />}
        name="Scale Hover"
        description="Scales on hover."
        style={{ minHeight: "140px" }}
      />
    </BentoGrid>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>gap=sm</p>
        <BentoGrid cols={3} gap="sm" style={{ width: "720px" }}>
          {[1, 2, 3].map((i) => (
            <BentoCard key={i} style={{ minHeight: "80px", padding: "16px" }}>
              <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Card {i}</span>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>gap=md</p>
        <BentoGrid cols={3} gap="md" style={{ width: "720px" }}>
          {[1, 2, 3].map((i) => (
            <BentoCard key={i} style={{ minHeight: "80px", padding: "16px" }}>
              <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Card {i}</span>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>gap=lg</p>
        <BentoGrid cols={3} gap="lg" style={{ width: "720px" }}>
          {[1, 2, 3].map((i) => (
            <BentoCard key={i} style={{ minHeight: "80px", padding: "16px" }}>
              <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Card {i}</span>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </div>
  ),
};
