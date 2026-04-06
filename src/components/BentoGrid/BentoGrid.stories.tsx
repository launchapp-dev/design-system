import type { Meta, StoryObj } from "@storybook/react";
import {
  BentoGrid,
  BentoCard,
  BentoCardHeader,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardBody,
  BentoCardFooter,
} from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4, "auto"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <BentoGrid columns={3} gap="md">
      <BentoCard icon={<SampleIcon />}>
        <BentoCardHeader>
          <BentoCardTitle>Analytics</BentoCardTitle>
          <BentoCardDescription>Track your performance metrics</BentoCardDescription>
        </BentoCardHeader>
      </BentoCard>
      <BentoCard icon={<ChartIcon />}>
        <BentoCardHeader>
          <BentoCardTitle>Reports</BentoCardTitle>
          <BentoCardDescription>Generate detailed insights</BentoCardDescription>
        </BentoCardHeader>
      </BentoCard>
      <BentoCard icon={<UsersIcon />}>
        <BentoCardHeader>
          <BentoCardTitle>Team</BentoCardTitle>
          <BentoCardDescription>Manage your team members</BentoCardDescription>
        </BentoCardHeader>
      </BentoCard>
    </BentoGrid>
  ),
};

export const AllGapVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Small</h3>
        <BentoGrid columns={3} gap="sm">
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 1</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 2</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 3</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
        </BentoGrid>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Medium</h3>
        <BentoGrid columns={3} gap="md">
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 1</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 2</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 3</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
        </BentoGrid>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Large</h3>
        <BentoGrid columns={3} gap="lg">
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 1</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 2</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
          <BentoCard>
            <BentoCardBody>
              <BentoCardTitle>Card 3</BentoCardTitle>
            </BentoCardBody>
          </BentoCard>
        </BentoGrid>
      </div>
    </div>
  ),
};

export const SpanControls: Story = {
  render: () => (
    <BentoGrid columns={4} gap="md">
      <BentoCard colSpan={2} rowSpan={2} variant="gradient">
        <BentoCardBody style={{ padding: "24px" }}>
          <BentoCardTitle>Featured Content</BentoCardTitle>
          <BentoCardDescription>
            This card spans 2 columns and 2 rows, perfect for hero content or featured items.
          </BentoCardDescription>
          <div
            style={{
              marginTop: "16px",
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Additional content area for the larger card layout.
          </div>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={1} rowSpan={1}>
        <BentoCardBody>
          <BentoCardTitle>Stats</BentoCardTitle>
          <BentoCardDescription>Quick metrics</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={1} rowSpan={1}>
        <BentoCardBody>
          <BentoCardTitle>Alerts</BentoCardTitle>
          <BentoCardDescription>3 new alerts</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={2} rowSpan={1} variant="accent">
        <BentoCardBody>
          <BentoCardTitle>Wide Card</BentoCardTitle>
          <BentoCardDescription>This card spans 2 columns in a single row</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={1} rowSpan={1}>
        <BentoCardBody>
          <BentoCardTitle>Item</BentoCardTitle>
          <BentoCardDescription>Regular size</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={1} rowSpan={1}>
        <BentoCardBody>
          <BentoCardTitle>Item</BentoCardTitle>
          <BentoCardDescription>Regular size</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <BentoGrid columns={4} gap="md">
      <BentoCard variant="default">
        <BentoCardBody>
          <BentoCardTitle>Default</BentoCardTitle>
          <BentoCardDescription>Standard card styling</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard variant="gradient">
        <BentoCardBody>
          <BentoCardTitle>Gradient</BentoCardTitle>
          <BentoCardDescription>Gradient background effect</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard variant="accent">
        <BentoCardBody>
          <BentoCardTitle>Accent</BentoCardTitle>
          <BentoCardDescription>Accent color highlight</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard variant="outlined">
        <BentoCardBody>
          <BentoCardTitle>Outlined</BentoCardTitle>
          <BentoCardDescription>Border-only styling</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};

export const HoverEffects: Story = {
  render: () => (
    <BentoGrid columns={4} gap="md">
      <BentoCard hover="none">
        <BentoCardBody>
          <BentoCardTitle>No Hover</BentoCardTitle>
          <BentoCardDescription>Static card</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard hover="lift">
        <BentoCardBody>
          <BentoCardTitle>Lift</BentoCardTitle>
          <BentoCardDescription>Rises on hover</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard hover="glow">
        <BentoCardBody>
          <BentoCardTitle>Glow</BentoCardTitle>
          <BentoCardDescription>Glow effect on hover</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard hover="scale">
        <BentoCardBody>
          <BentoCardTitle>Scale</BentoCardTitle>
          <BentoCardDescription>Scales up on hover</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};

export const WithContentSlots: Story = {
  render: () => (
    <BentoGrid columns={3} gap="md">
      <BentoCard
        icon={<SampleIcon />}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
            <span>Last updated: 2h ago</span>
            <span style={{ color: "hsl(var(--primary))" }}>View details →</span>
          </div>
        }
      >
        <BentoCardBody>
          <BentoCardTitle>Complete Card</BentoCardTitle>
          <BentoCardDescription>
            This card demonstrates all content slots: icon, body, and footer.
          </BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard>
        <BentoCardBody>
          <BentoCardTitle>Body Only</BentoCardTitle>
          <BentoCardDescription>
            Minimal card with just body content and no extra slots.
          </BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard
        header={
          <div style={{ padding: "16px 16px 0" }}>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "hsl(var(--primary))",
              }}
            >
              Featured
            </span>
          </div>
        }
      >
        <BentoCardBody>
          <BentoCardTitle>Custom Header</BentoCardTitle>
          <BentoCardDescription>
            Card with a custom header slot above the body content.
          </BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "16px", color: "hsl(var(--muted-foreground))" }}>
        Resize the viewport to see responsive column changes (1 → 2 → 3 columns)
      </p>
      <BentoGrid columns={3} gap="md">
        {Array.from({ length: 6 }).map((_, i) => (
          <BentoCard key={i}>
            <BentoCardBody>
              <BentoCardTitle>Card {i + 1}</BentoCardTitle>
              <BentoCardDescription>Responsive grid item</BentoCardDescription>
            </BentoCardBody>
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <BentoGrid columns={3} gap="md">
      <BentoCard variant="default" icon={<SampleIcon />}>
        <BentoCardBody>
          <BentoCardTitle>Dark Mode Card</BentoCardTitle>
          <BentoCardDescription>Card styled for dark theme</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard variant="gradient">
        <BentoCardBody>
          <BentoCardTitle>Gradient Dark</BentoCardTitle>
          <BentoCardDescription>Gradient in dark mode</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
      <BentoCard variant="outlined">
        <BentoCardBody>
          <BentoCardTitle>Outlined Dark</BentoCardTitle>
          <BentoCardDescription>Border styling in dark theme</BentoCardDescription>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};

export const DashboardExample: Story = {
  render: () => (
    <BentoGrid columns={4} gap="md">
      <BentoCard colSpan={2} rowSpan={2} variant="gradient" icon={<ChartIcon />}>
        <BentoCardBody style={{ padding: "24px" }}>
          <BentoCardTitle>Revenue Overview</BentoCardTitle>
          <BentoCardDescription>Monthly performance metrics</BentoCardDescription>
          <div style={{ marginTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}>$48,352</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "hsl(var(--muted-foreground))",
                marginTop: "4px",
              }}
            >
              +12.5% from last month
            </div>
          </div>
        </BentoCardBody>
        <BentoCardFooter>
          <span style={{ fontSize: "0.75rem" }}>Updated 5 minutes ago</span>
        </BentoCardFooter>
      </BentoCard>
      <BentoCard>
        <BentoCardBody>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <UsersIcon />
            <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
              Users
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "8px" }}>2,451</div>
        </BentoCardBody>
      </BentoCard>
      <BentoCard>
        <BentoCardBody>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <SampleIcon />
            <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
              Projects
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "8px" }}>128</div>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={2} variant="accent">
        <BentoCardBody>
          <BentoCardTitle>Recent Activity</BentoCardTitle>
          <BentoCardDescription>Latest team updates</BentoCardDescription>
          <div style={{ marginTop: "12px", fontSize: "0.875rem" }}>
            <div style={{ padding: "8px 0", borderBottom: "1px solid hsl(var(--border))" }}>
              New user signup: john@example.com
            </div>
            <div style={{ padding: "8px 0", borderBottom: "1px solid hsl(var(--border))" }}>
              Project "Dashboard" completed
            </div>
            <div style={{ padding: "8px 0" }}>Payment received: $2,400</div>
          </div>
        </BentoCardBody>
      </BentoCard>
      <BentoCard colSpan={2}>
        <BentoCardBody>
          <BentoCardTitle>Quick Actions</BentoCardTitle>
          <BentoCardDescription>Common tasks</BentoCardDescription>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "var(--la-radius)",
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              New Project
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "var(--la-radius)",
                background: "hsl(var(--secondary))",
                color: "hsl(var(--secondary-foreground))",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Invite Team
            </button>
          </div>
        </BentoCardBody>
      </BentoCard>
    </BentoGrid>
  ),
};
