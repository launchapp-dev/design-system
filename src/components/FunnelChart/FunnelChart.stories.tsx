import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FunnelChart } from "./index";
import type { FunnelStage } from "./FunnelChart";

const salesFunnelData: FunnelStage[] = [
  { id: "visitors", label: "Website Visitors", value: 10000 },
  { id: "leads", label: "Leads", value: 5000 },
  { id: "prospects", label: "Prospects", value: 2500 },
  { id: "opportunities", label: "Opportunities", value: 1000 },
  { id: "customers", label: "Customers", value: 250 },
];

const onboardingData: FunnelStage[] = [
  { id: "signup", label: "Sign Up", value: 8500 },
  { id: "email", label: "Email Verified", value: 7200 },
  { id: "profile", label: "Profile Complete", value: 5800 },
  { id: "first-action", label: "First Action", value: 4100 },
  { id: "subscription", label: "Subscribed", value: 1850 },
];

const checkoutData: FunnelStage[] = [
  { id: "cart", label: "Add to Cart", value: 3200 },
  { id: "checkout", label: "Start Checkout", value: 2400 },
  { id: "shipping", label: "Shipping Info", value: 1980 },
  { id: "payment", label: "Payment Info", value: 1650 },
  { id: "purchase", label: "Purchase Complete", value: 1420 },
];

const leadGenData: FunnelStage[] = [
  { id: "impressions", label: "Impressions", value: 150000 },
  { id: "clicks", label: "Clicks", value: 12000 },
  { id: "landing", label: "Landing Page Views", value: 8500 },
  { id: "form-start", label: "Form Started", value: 3200 },
  { id: "form-submit", label: "Form Submitted", value: 2100 },
  { id: "qualified", label: "Qualified Leads", value: 1450 },
];

const customColorsData: FunnelStage[] = [
  { id: "stage-1", label: "Awareness", value: 100, color: "#3b82f6" },
  { id: "stage-2", label: "Interest", value: 75, color: "#8b5cf6" },
  { id: "stage-3", label: "Desire", value: 50, color: "#d946ef" },
  { id: "stage-4", label: "Action", value: 25, color: "#ec4899" },
];

const meta: Meta<typeof FunnelChart> = {
  title: "Components/FunnelChart",
  component: FunnelChart,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    colorScale: {
      control: "select",
      options: ["sequential", "diverging", "gradient", "custom"],
    },
    showLabels: { control: "boolean" },
    showValues: { control: "boolean" },
    showPercentage: { control: "boolean" },
    showConversionRate: { control: "boolean" },
    showTooltip: { control: "boolean" },
    borderRadius: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    gap: {
      control: { type: "range", min: 0, max: 12, step: 1 },
    },
    animationDuration: {
      control: { type: "range", min: 0, max: 1000, step: 50 },
    },
  },
  args: {
    size: "md",
    orientation: "vertical",
    colorScale: "sequential",
    showLabels: true,
    showValues: true,
    showPercentage: true,
    showConversionRate: false,
    showTooltip: true,
    borderRadius: "md",
    gap: 4,
    animationDuration: 500,
    data: salesFunnelData,
  },
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

export const Default: Story = {
  render: (args) => <FunnelChart {...args} />,
};

export const SalesFunnel: Story = {
  name: "Sales Funnel",
  args: {
    data: salesFunnelData,
    formatValue: (v) => v.toLocaleString(),
  },
};

export const OnboardingFunnel: Story = {
  name: "User Onboarding Funnel",
  args: {
    data: onboardingData,
    colorScale: "gradient",
    formatValue: (v) => v.toLocaleString(),
  },
};

export const CheckoutFunnel: Story = {
  name: "E-commerce Checkout Funnel",
  args: {
    data: checkoutData,
    colorScale: "diverging",
    showConversionRate: true,
    formatValue: (v) => v.toLocaleString(),
  },
};

export const LeadGeneration: Story = {
  name: "Lead Generation Funnel",
  args: {
    data: leadGenData,
    colorScale: "sequential",
    size: "lg",
    formatValue: (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
};

export const HorizontalOrientation: Story = {
  name: "Horizontal Orientation",
  args: {
    data: salesFunnelData,
    orientation: "horizontal",
    formatValue: (v) => v.toLocaleString(),
  },
};

export const CustomColors: Story = {
  name: "Custom Colors",
  args: {
    data: customColorsData,
    colorScale: "custom",
  },
};

export const CustomColorPalette: Story = {
  name: "Custom Color Palette",
  args: {
    data: salesFunnelData,
    colorScale: "custom",
    customColors: ["#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6"],
  },
};

export const GradientScale: Story = {
  name: "Gradient Color Scale",
  args: {
    data: onboardingData,
    colorScale: "gradient",
  },
};

export const DivergingScale: Story = {
  name: "Diverging Color Scale",
  args: {
    data: checkoutData,
    colorScale: "diverging",
  },
};

export const SmallSize: Story = {
  name: "Small Size",
  args: {
    size: "sm",
    data: salesFunnelData,
  },
};

export const LargeSize: Story = {
  name: "Large Size",
  args: {
    size: "lg",
    data: salesFunnelData,
    formatValue: (v) => v.toLocaleString(),
  },
};

export const NoLabels: Story = {
  name: "Without Labels",
  args: {
    data: salesFunnelData,
    showLabels: false,
    showValues: true,
  },
};

export const ValuesOnly: Story = {
  name: "Values Only (No Labels)",
  args: {
    data: salesFunnelData,
    showLabels: false,
    showValues: true,
    showPercentage: false,
  },
};

export const PercentageOnly: Story = {
  name: "Percentage Only",
  args: {
    data: salesFunnelData,
    showLabels: true,
    showValues: false,
    showPercentage: true,
  },
};

export const WithConversionRate: Story = {
  name: "With Conversion Rate in Tooltip",
  args: {
    data: salesFunnelData,
    showConversionRate: true,
    formatValue: (v) => v.toLocaleString(),
  },
};

export const NoTooltip: Story = {
  name: "Without Tooltip",
  args: {
    data: salesFunnelData,
    showTooltip: false,
  },
};

export const NoAnimation: Story = {
  name: "No Animation",
  args: {
    data: salesFunnelData,
    animationDuration: 0,
  },
};

export const SlowAnimation: Story = {
  name: "Slow Animation",
  args: {
    data: salesFunnelData,
    animationDuration: 1000,
  },
};

export const DifferentBorderRadius: Story = {
  name: "Different Border Radius",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">None</h4>
        <FunnelChart
          data={salesFunnelData}
          borderRadius="none"
          aria-label="Funnel chart with no border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <FunnelChart
          data={salesFunnelData}
          borderRadius="sm"
          aria-label="Funnel chart with small border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <FunnelChart
          data={salesFunnelData}
          borderRadius="md"
          aria-label="Funnel chart with medium border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <FunnelChart
          data={salesFunnelData}
          borderRadius="lg"
          aria-label="Funnel chart with large border radius"
        />
      </div>
    </div>
  ),
};

export const DifferentGaps: Story = {
  name: "Different Gaps",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">No Gap</h4>
        <FunnelChart data={salesFunnelData} gap={0} aria-label="Funnel chart with no gap" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Small Gap (4px)</h4>
        <FunnelChart data={salesFunnelData} gap={4} aria-label="Funnel chart with small gap" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium Gap (8px)</h4>
        <FunnelChart data={salesFunnelData} gap={8} aria-label="Funnel chart with medium gap" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large Gap (16px)</h4>
        <FunnelChart data={salesFunnelData} gap={16} aria-label="Funnel chart with large gap" />
      </div>
    </div>
  ),
};

export const ColorScaleComparison: Story = {
  name: "Color Scale Comparison",
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sequential", "diverging", "gradient"] as const).map((scale) => (
        <div key={scale}>
          <h4 className="text-sm font-medium mb-2 capitalize">{scale}</h4>
          <FunnelChart
            data={salesFunnelData}
            colorScale={scale}
            aria-label={`Funnel chart with ${scale} color scale`}
          />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  name: "Interactive (Click Handler)",
  render: (args) => {
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
      <div>
        <FunnelChart
          {...args}
          onStageClick={(stage) => setSelected(`${stage.label}: ${stage.value.toLocaleString()}`)}
        />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected: <strong>{selected}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: salesFunnelData,
  },
};

export const HoverCallback: Story = {
  name: "Hover Callback",
  render: (args) => {
    const [hovered, setHovered] = React.useState<string | null>(null);

    return (
      <div>
        <FunnelChart
          {...args}
          onStageHover={(stage) =>
            setHovered(stage ? `${stage.label}: ${stage.value.toLocaleString()}` : null)
          }
        />
        <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm min-h-[2.5rem]">
          {hovered ? (
            <>
              Hovering: <strong>{hovered}</strong>
            </>
          ) : (
            <span className="text-muted-foreground">Hover over a stage</span>
          )}
        </div>
      </div>
    );
  },
  args: {
    data: salesFunnelData,
  },
};

export const CustomTooltip: Story = {
  name: "Custom Tooltip Content",
  render: (args) => {
    const customTooltip = (
      stage: FunnelStage,
      index: number,
      percentage: number,
      conversionRate: number,
    ) => (
      <div className="text-xs p-1">
        <div className="font-bold text-primary mb-1">{stage.label}</div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Value:</span>
          <span className="font-semibold">{stage.value.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Of total:</span>
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
        {index > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Conversion:</span>
            <span className="text-green-500 font-medium">{conversionRate.toFixed(1)}%</span>
          </div>
        )}
      </div>
    );

    return <FunnelChart {...args} tooltipContent={customTooltip} showConversionRate />;
  },
  args: {
    data: salesFunnelData,
  },
};

export const AnimatedDataChange: Story = {
  name: "Animated Data Change",
  render: function AnimatedDataChange(args) {
    const [dataIndex, setDataIndex] = React.useState(0);
    const datasets = [salesFunnelData, onboardingData, checkoutData];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setDataIndex((prev) => (prev + 1) % datasets.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [datasets.length]);

    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-medium">
            Dataset: {["Sales", "Onboarding", "Checkout"][dataIndex]}
          </h4>
          <button
            onClick={() => setDataIndex((prev) => (prev + 1) % datasets.length)}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md"
          >
            Next Dataset
          </button>
        </div>
        <FunnelChart {...args} data={datasets[dataIndex]} key={dataIndex} />
      </div>
    );
  },
  args: {
    animationDuration: 500,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <FunnelChart
        data={salesFunnelData}
        colorScale="gradient"
        showValues
        showConversionRate
        formatValue={(v) => v.toLocaleString()}
        aria-label="Sales funnel chart"
      />
    </div>
  ),
};

export const HorizontalDarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <FunnelChart
        data={onboardingData}
        orientation="horizontal"
        colorScale="diverging"
        formatValue={(v) => v.toLocaleString()}
        aria-label="Onboarding funnel chart"
      />
    </div>
  ),
};
