import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Beam, BeamDot, BeamPoint, BeamConnection } from "./index";

const meta: Meta<typeof Beam> = {
  title: "Components/Beam",
  component: Beam,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "gradient", "glow", "dashed"],
      description: "Visual style of the beam lines",
    },
    showPoints: {
      control: "boolean",
      description: "Show connection point markers",
    },
    pointSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of connection points",
    },
    lineWidth: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Width of beam lines",
    },
    animationSpeed: {
      control: { type: "range", min: 1, max: 10, step: 0.5 },
      description: "Animation speed in seconds",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Beam>;

const networkPoints: BeamPoint[] = [
  { id: "center", x: 300, y: 200, label: "Center", color: "#3b82f6" },
  { id: "top", x: 300, y: 50, label: "Top", color: "#22c55e" },
  { id: "bottom", x: 300, y: 350, label: "Bottom", color: "#ef4444" },
  { id: "left", x: 100, y: 200, label: "Left", color: "#f59e0b" },
  { id: "right", x: 500, y: 200, label: "Right", color: "#8b5cf6" },
];

const networkConnections: BeamConnection[] = [
  { from: "center", to: "top", animated: true },
  { from: "center", to: "bottom", animated: true },
  { from: "center", to: "left", animated: true },
  { from: "center", to: "right", animated: true },
  { from: "top", to: "right", animated: false },
  { from: "bottom", to: "left", animated: false },
];

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={networkPoints}
        connections={networkConnections}
        width={600}
        height={400}
      />
    </div>
  ),
};

export const TreeLayout: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={[
          { id: "root", x: 300, y: 50, label: "Root", color: "#3b82f6" },
          { id: "a1", x: 150, y: 150, label: "A1", color: "#22c55e" },
          { id: "a2", x: 300, y: 150, label: "A2", color: "#22c55e" },
          { id: "a3", x: 450, y: 150, label: "A3", color: "#22c55e" },
          { id: "b1", x: 100, y: 280, label: "B1", color: "#f59e0b" },
          { id: "b2", x: 200, y: 280, label: "B2", color: "#f59e0b" },
          { id: "b3", x: 300, y: 280, label: "B3", color: "#f59e0b" },
          { id: "b4", x: 400, y: 280, label: "B4", color: "#f59e0b" },
          { id: "b5", x: 500, y: 280, label: "B5", color: "#f59e0b" },
        ]}
        connections={[
          { from: "root", to: "a1", animated: true },
          { from: "root", to: "a2", animated: true },
          { from: "root", to: "a3", animated: true },
          { from: "a1", to: "b1", animated: true },
          { from: "a1", to: "b2", animated: true },
          { from: "a2", to: "b3", animated: true },
          { from: "a3", to: "b4", animated: true },
          { from: "a3", to: "b5", animated: true },
        ]}
        width={600}
        height={350}
      />
    </div>
  ),
};

export const MeshNetwork: Story = {
  render: () => {
    const meshPoints: BeamPoint[] = [
      { id: "n1", x: 100, y: 100, label: "Node 1", color: "#3b82f6" },
      { id: "n2", x: 250, y: 50, label: "Node 2", color: "#22c55e" },
      { id: "n3", x: 400, y: 100, label: "Node 3", color: "#f59e0b" },
      { id: "n4", x: 500, y: 200, label: "Node 4", color: "#ef4444" },
      { id: "n5", x: 400, y: 300, label: "Node 5", color: "#8b5cf6" },
      { id: "n6", x: 250, y: 350, label: "Node 6", color: "#ec4899" },
      { id: "n7", x: 100, y: 300, label: "Node 7", color: "#14b8a6" },
      { id: "n8", x: 50, y: 200, label: "Node 8", color: "#f97316" },
    ];

    const meshConnections: BeamConnection[] = [
      { from: "n1", to: "n2", animated: true },
      { from: "n2", to: "n3", animated: true },
      { from: "n3", to: "n4", animated: true },
      { from: "n4", to: "n5", animated: false },
      { from: "n5", to: "n6", animated: false },
      { from: "n6", to: "n7", animated: false },
      { from: "n7", to: "n8", animated: false },
      { from: "n8", to: "n1", animated: false },
      { from: "n1", to: "n5", animated: true },
      { from: "n2", to: "n7", animated: true },
      { from: "n3", to: "n6", animated: false },
      { from: "n4", to: "n8", animated: false },
    ];

    return (
      <div className="flex items-center justify-center p-8">
        <Beam
          points={meshPoints}
          connections={meshConnections}
          width={600}
          height={400}
          variant="glow"
        />
      </div>
    );
  },
};

export const AnimatedConnections: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={networkPoints}
        connections={[
          { from: "center", to: "top", animated: true },
          { from: "center", to: "bottom", animated: true },
          { from: "center", to: "left", animated: true },
          { from: "center", to: "right", animated: true },
        ]}
        width={600}
        height={400}
        variant="gradient"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["default", "gradient", "glow", "dashed"] as const).map((variant) => (
        <div key={variant}>
          <p className="mb-2 text-sm font-medium capitalize text-[hsl(var(--la-muted-foreground))]">
            {variant}
          </p>
          <div className="rounded-lg border border-[hsl(var(--la-border))] p-4">
            <Beam
              points={[
                { id: "a", x: 100, y: 100, color: "#3b82f6" },
                { id: "b", x: 250, y: 50, color: "#22c55e" },
                { id: "c", x: 400, y: 100, color: "#f59e0b" },
              ]}
              connections={[
                { from: "a", to: "b", animated: true },
                { from: "b", to: "c", animated: true },
              ]}
              variant={variant}
              width={500}
              height={200}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithoutPoints: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={networkPoints}
        connections={networkConnections}
        showPoints={false}
        width={600}
        height={400}
        variant="glow"
      />
    </div>
  ),
};

export const PointSizes: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={[
          { id: "sm", x: 150, y: 200, label: "Small", color: "#3b82f6" },
          { id: "md", x: 300, y: 200, label: "Medium", color: "#22c55e" },
          { id: "lg", x: 450, y: 200, label: "Large", color: "#f59e0b" },
        ]}
        connections={[
          { from: "sm", to: "md", animated: true },
          { from: "md", to: "lg", animated: true },
        ]}
        pointSize="md"
        width={600}
        height={400}
      />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: "default",
    showPoints: true,
    pointSize: "md",
    lineWidth: 2,
    animationSpeed: 3,
  },
  render: (args) => (
    <div className="flex items-center justify-center p-8">
      <Beam
        {...args}
        points={networkPoints}
        connections={networkConnections}
        width={600}
        height={400}
      />
    </div>
  ),
};

export const WithClickHandler: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <Beam
          points={networkPoints}
          connections={networkConnections}
          onPointClick={(point) => setSelected(point.id)}
          width={600}
          height={400}
        />
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          {selected ? (
            <>Selected: <strong>{selected}</strong></>
          ) : (
            "Click a point to select it"
          )}
        </p>
      </div>
    );
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Beam
        points={[
          { id: "a", x: 150, y: 100, label: "Sales", color: "#22c55e" },
          { id: "b", x: 300, y: 50, label: "Marketing", color: "#3b82f6" },
          { id: "c", x: 450, y: 100, label: "Engineering", color: "#8b5cf6" },
          { id: "d", x: 500, y: 250, label: "Support", color: "#f59e0b" },
          { id: "e", x: 300, y: 350, label: "HR", color: "#ec4899" },
          { id: "f", x: 100, y: 250, label: "Finance", color: "#14b8a6" },
        ]}
        connections={[
          { from: "a", to: "b", animated: true },
          { from: "b", to: "c", animated: true },
          { from: "c", to: "d", animated: true },
          { from: "d", to: "e", animated: false },
          { from: "e", to: "f", animated: false },
          { from: "f", to: "a", animated: false },
        ]}
        width={600}
        height={400}
        variant="glow"
      />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark min-h-[500px] bg-slate-950 p-8">
      <div className="flex items-center justify-center">
        <Beam
          points={networkPoints}
          connections={networkConnections}
          width={600}
          height={400}
          variant="glow"
        />
      </div>
    </div>
  ),
};
