import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoCard } from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4],
      description: "Number of columns in the grid",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between grid items",
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoCard = ({
  title,
  description,
  colSpan,
  rowSpan,
}: {
  title: string;
  description: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
}) => (
  <BentoCard colSpan={colSpan} rowSpan={rowSpan} className="p-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </BentoCard>
);

export const Default: Story = {
  render: (args) => (
    <BentoGrid {...args}>
      <DemoCard
        title="Card 1"
        description="A standard bento card with default sizing"
      />
      <DemoCard
        title="Card 2"
        description="Another standard card in the grid"
      />
      <DemoCard
        title="Card 3"
        description="Third card in the default layout"
      />
      <DemoCard
        title="Card 4"
        description="Fourth card completes the grid"
      />
    </BentoGrid>
  ),
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: "md",
  },
  render: (args) => (
    <BentoGrid {...args}>
      <DemoCard title="Left Card" description="First column" />
      <DemoCard title="Right Card" description="Second column" />
      <DemoCard title="Bottom Left" description="Back to first column" />
      <DemoCard title="Bottom Right" description="Back to second column" />
    </BentoGrid>
  ),
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: "md",
  },
  render: (args) => (
    <BentoGrid {...args}>
      <DemoCard title="Card 1" description="Column 1" />
      <DemoCard title="Card 2" description="Column 2" />
      <DemoCard title="Card 3" description="Column 3" />
      <DemoCard title="Card 4" description="Column 1 again" />
      <DemoCard title="Card 5" description="Column 2 again" />
      <DemoCard title="Card 6" description="Column 3 again" />
    </BentoGrid>
  ),
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: "md",
  },
  render: (args) => (
    <BentoGrid {...args}>
      {Array.from({ length: 8 }).map((_, i) => (
        <DemoCard
          key={i}
          title={`Card ${i + 1}`}
          description={`Item ${i + 1} in the grid`}
        />
      ))}
    </BentoGrid>
  ),
};

export const WithSpans: Story = {
  args: {
    columns: 3,
    gap: "md",
  },
  render: (args) => (
    <BentoGrid {...args}>
      <DemoCard
        title="Wide Card"
        description="This card spans 2 columns"
        colSpan={2}
      />
      <DemoCard title="Normal" description="Single column" />
      <DemoCard title="Normal" description="Single column" />
      <DemoCard
        title="Tall Card"
        description="This card spans 2 rows"
        rowSpan={2}
      />
      <DemoCard title="Normal" description="Single row" />
      <DemoCard title="Normal" description="Single row" />
    </BentoGrid>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">No Gap</h3>
        <BentoGrid columns={3} gap="none">
          <DemoCard title="1" description="No spacing" />
          <DemoCard title="2" description="No spacing" />
          <DemoCard title="3" description="No spacing" />
        </BentoGrid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Gap</h3>
        <BentoGrid columns={3} gap="sm">
          <DemoCard title="1" description="Small spacing" />
          <DemoCard title="2" description="Small spacing" />
          <DemoCard title="3" description="Small spacing" />
        </BentoGrid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Medium Gap</h3>
        <BentoGrid columns={3} gap="md">
          <DemoCard title="1" description="Medium spacing" />
          <DemoCard title="2" description="Medium spacing" />
          <DemoCard title="3" description="Medium spacing" />
        </BentoGrid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large Gap</h3>
        <BentoGrid columns={3} gap="lg">
          <DemoCard title="1" description="Large spacing" />
          <DemoCard title="2" description="Large spacing" />
          <DemoCard title="3" description="Large spacing" />
        </BentoGrid>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <BentoGrid columns={3} gap="md">
      <DemoCard
        title="Dark Mode"
        description="Card adapts to dark theme automatically"
      />
      <DemoCard
        title="Theme Aware"
        description="Colors use CSS custom properties"
        colSpan={2}
      />
      <DemoCard title="Responsive" description="Works on all screen sizes" />
    </BentoGrid>
  ),
};

export const DashboardExample: Story = {
  args: {
    columns: 4,
    gap: "md",
  },
  render: (args) => (
    <BentoGrid {...args}>
      <DemoCard
        title="Total Revenue"
        description="$124,500"
        colSpan={2}
      />
      <DemoCard title="Active Users" description="2,453" />
      <DemoCard title="Conversion Rate" description="3.2%" />
      <DemoCard
        title="Recent Activity"
        description="Chart or activity feed would go here"
        colSpan={2}
        rowSpan={2}
      />
      <DemoCard title="Notifications" description="5 new alerts" />
      <DemoCard title="Tasks" description="12 pending" />
    </BentoGrid>
  ),
};
