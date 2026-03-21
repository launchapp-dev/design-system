import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoCard } from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [2, 3, 4, 5, 6],
    },
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    auto: {
      control: { type: "boolean" },
    },
    dense: {
      control: { type: "boolean" },
    },
  },
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

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>
);

const GradientBg = ({ from, to }: { from: string; to: string }) => (
  <div
    className="h-full w-full opacity-30"
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
    <BentoGrid cols={4} style={{ width: "960px" }}>
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
      <BentoCard
        hover="lift"
        icon={<HeartIcon />}
        name="Lift Hover"
        description="Lifts with shadow."
        style={{ minHeight: "140px" }}
      />
    </BentoGrid>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
        <div key={gap}>
          <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>gap={gap}</p>
          <BentoGrid cols={3} gap={gap} style={{ width: "720px" }}>
            {[1, 2, 3].map((i) => (
              <BentoCard key={i} style={{ minHeight: "80px", padding: "16px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Card {i}</span>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      ))}
    </div>
  ),
};

export const GradientVariants: Story = {
  render: () => (
    <BentoGrid cols={4} style={{ width: "960px" }}>
      <BentoCard gradient="primary" icon={<StarIcon />} name="Primary" description="Primary gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="secondary" icon={<ZapIcon />} name="Secondary" description="Secondary gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="accent" icon={<ShieldIcon />} name="Accent" description="Accent gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="blue" icon={<GlobeIcon />} name="Blue" description="Blue gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="purple" icon={<SparklesIcon />} name="Purple" description="Purple gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="pink" icon={<HeartIcon />} name="Pink" description="Pink gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="green" icon={<ZapIcon />} name="Green" description="Green gradient" style={{ minHeight: "140px" }} />
      <BentoCard gradient="orange" icon={<StarIcon />} name="Orange" description="Orange gradient" style={{ minHeight: "140px" }} />
    </BentoGrid>
  ),
};

export const DenseLayout: Story = {
  render: () => (
    <div style={{ width: "720px" }}>
      <p style={{ marginBottom: "16px", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        With dense layout, items fill available gaps automatically.
      </p>
      <BentoGrid cols={3} dense style={{ minHeight: "400px" }}>
        <BentoCard span={2} rowSpan={1} style={{ minHeight: "100px" }}>
          <span style={{ fontWeight: 600 }}>Span 2x1</span>
        </BentoCard>
        <BentoCard span={1} rowSpan={2} style={{ minHeight: "200px" }}>
          <span style={{ fontWeight: 600 }}>Span 1x2</span>
        </BentoCard>
        <BentoCard span={1} style={{ minHeight: "80px" }}>
          <span style={{ fontWeight: 600 }}>1x1</span>
        </BentoCard>
        <BentoCard span={1} style={{ minHeight: "80px" }}>
          <span style={{ fontWeight: 600 }}>1x1</span>
        </BentoCard>
        <BentoCard span={2} style={{ minHeight: "80px" }}>
          <span style={{ fontWeight: 600 }}>Span 2</span>
        </BentoCard>
      </BentoGrid>
    </div>
  ),
};

export const AutoRows: Story = {
  render: () => (
    <div style={{ width: "720px" }}>
      <p style={{ marginBottom: "16px", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        With auto rows, all cards have equal height regardless of content.
      </p>
      <BentoGrid cols={3} auto style={{ minHeight: "200px" }}>
        <BentoCard icon={<StarIcon />} name="Short" description="Brief text." />
        <BentoCard icon={<ZapIcon />} name="Medium" description="A bit more descriptive text here." />
        <BentoCard icon={<ShieldIcon />} name="Long" description="This card has a much longer description to show how auto rows create equal heights across all items in the grid." />
      </BentoGrid>
    </div>
  ),
};

export const RowSpan: Story = {
  render: () => (
    <BentoGrid cols={4} style={{ width: "960px", minHeight: "320px" }}>
      <BentoCard rowSpan={2} style={{ minHeight: "280px" }} icon={<StarIcon />} name="Tall Card" description="This card spans 2 rows" />
      <BentoCard span={2} style={{ minHeight: "130px" }}>Wide Card (span=2)</BentoCard>
      <BentoCard style={{ minHeight: "130px" }}>Regular</BentoCard>
      <BentoCard style={{ minHeight: "130px" }}>Regular</BentoCard>
      <BentoCard style={{ minHeight: "130px" }}>Regular</BentoCard>
    </BentoGrid>
  ),
};

export const FullWidthCard: Story = {
  render: () => (
    <BentoGrid cols={3} style={{ width: "720px" }}>
      <BentoCard span="full" style={{ minHeight: "100px" }} gradient="primary">
        <span style={{ fontWeight: 600 }}>Full Width Card (span=&quot;full&quot;)</span>
      </BentoCard>
      <BentoCard style={{ minHeight: "100px" }}>Card 1</BentoCard>
      <BentoCard style={{ minHeight: "100px" }}>Card 2</BentoCard>
      <BentoCard style={{ minHeight: "100px" }}>Card 3</BentoCard>
    </BentoGrid>
  ),
};

export const HeaderFooterSlots: Story = {
  render: () => (
    <BentoGrid cols={2} style={{ width: "480px" }}>
      <BentoCard
        style={{ minHeight: "180px" }}
        header={<div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Featured</div>}
        icon={<SparklesIcon />}
        name="Premium Feature"
        description="Access exclusive tools and capabilities."
        footer={<div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Updated 2 hours ago</div>}
      />
      <BentoCard
        style={{ minHeight: "180px" }}
        header={<div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "9999px", background: "var(--primary)", color: "white", fontSize: "0.75rem", fontWeight: 500 }}>New</div>}
        icon={<ZapIcon />}
        name="Quick Start"
        description="Get up and running in minutes."
      />
    </BentoGrid>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "var(--background)", padding: "24px", borderRadius: "8px" }}>
      <BentoGrid cols={3} style={{ width: "680px" }}>
        <BentoCard span={2} icon={<StarIcon />} name="Dark Mode" description="Cards look great in dark mode too" gradient="purple" />
        <BentoCard icon={<ZapIcon />} name="Automatic" description="Follows system preference" />
        <BentoCard icon={<ShieldIcon />} name="Accessible" description="High contrast colors" />
        <BentoCard icon={<GlobeIcon />} name="Responsive" description="Works on all devices" />
      </BentoGrid>
    </div>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "16px", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        Resize the viewport to see responsive column changes.
      </p>
      <BentoGrid cols={6}>
        {Array.from({ length: 12 }).map((_, i) => (
          <BentoCard key={i} style={{ minHeight: "80px" }}>
            <span style={{ fontWeight: 600 }}>Card {i + 1}</span>
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  ),
};
