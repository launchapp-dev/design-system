import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Globe, GlobeRing, GlobeLocation } from "./index";

const meta: Meta<typeof Globe> = {
  title: "Components/Globe",
  component: Globe,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the globe",
    },
    variant: {
      control: "select",
      options: ["default", "glass", "dark"],
      description: "Visual style variant",
    },
    autoRotate: {
      control: "boolean",
      description: "Enable automatic rotation",
    },
    rotationSpeed: {
      control: { type: "range", min: 10, max: 60, step: 5 },
      description: "Rotation speed in seconds",
    },
    showGrid: {
      control: "boolean",
      description: "Show latitude/longitude grid lines",
    },
    showAtmosphere: {
      control: "boolean",
      description: "Show atmospheric glow effect",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Globe>;

const sampleLocations: GlobeLocation[] = [
  { lat: 40.7128, lng: -74.006, label: "New York", color: "#ef4444" },
  { lat: 51.5074, lng: -0.1278, label: "London", color: "#3b82f6" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", color: "#22c55e" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", color: "#f59e0b" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", color: "#8b5cf6" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo", color: "#ec4899" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow", color: "#14b8a6" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", color: "#f97316" },
];

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe size="lg" />
    </div>
  ),
};

export const WithLocations: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe size="lg" locations={sampleLocations} />
    </div>
  ),
};

export const WithClickableLocations: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);
    return (
      <div className="flex flex-col items-center gap-8 p-8">
        <Globe
          size="lg"
          locations={sampleLocations}
          activeLocation={activeIndex}
          onLocationClick={(_, index) => setActiveIndex(activeIndex === index ? undefined : index)}
        />
        <div className="text-center">
          {activeIndex !== undefined ? (
            <p className="text-sm text-[hsl(var(--la-foreground))]">
              Selected: <strong>{sampleLocations[activeIndex]?.label}</strong>
            </p>
          ) : (
            <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
              Click a location marker to select it
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Globe size="sm" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Globe size="md" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Globe size="lg" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Globe size="xl" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">xl</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Globe size="md" variant="default" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Globe size="md" variant="glass" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">glass</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Globe size="md" variant="dark" />
        <span className="text-xs text-[hsl(var(--la-muted-foreground))]">dark</span>
      </div>
    </div>
  ),
};

export const NoRotation: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe size="lg" autoRotate={false} locations={sampleLocations} />
    </div>
  ),
};

export const WithGrid: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe size="lg" showGrid locations={sampleLocations} />
    </div>
  ),
};

export const WithoutAtmosphere: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe size="lg" showAtmosphere={false} locations={sampleLocations} />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    size: "lg",
    variant: "default",
    autoRotate: true,
    showGrid: false,
    showAtmosphere: true,
  },
  render: (args) => (
    <div className="flex items-center justify-center p-8">
      <Globe {...args} locations={sampleLocations} />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark min-h-[500px] bg-slate-950 p-8">
      <div className="flex items-center justify-center">
        <Globe size="lg" variant="dark" locations={sampleLocations} />
      </div>
    </div>
  ),
};

export const GlobeWithRings: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <GlobeRing orbit="inner" color="primary" />
        <GlobeRing orbit="middle" color="accent" />
        <GlobeRing orbit="outer" color="muted" />
        <div className="relative">
          <Globe size="lg" locations={sampleLocations} />
        </div>
      </div>
    </div>
  ),
};

export const CustomLocationColors: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Globe
        size="lg"
        locations={[
          { lat: 40.7128, lng: -74.006, label: "North America", color: "#3b82f6", size: "lg" },
          { lat: 51.5074, lng: -0.1278, label: "Europe", color: "#22c55e", size: "md" },
          { lat: 35.6762, lng: 139.6503, label: "Asia", color: "#ef4444", size: "lg" },
          { lat: -33.8688, lng: 151.2093, label: "Oceania", color: "#f59e0b", size: "sm" },
          { lat: -23.5505, lng: -46.6333, label: "South America", color: "#8b5cf6", size: "sm" },
          { lat: 37.7749, lng: -122.4194, label: "West Coast", color: "#ec4899", size: "sm" },
        ]}
      />
    </div>
  ),
};
