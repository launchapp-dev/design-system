import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Masonry, MasonryItem } from "./index";

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "Number of columns in the masonry layout",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between items",
    },
    sequential: {
      control: "boolean",
      description: "Distribute items sequentially instead of balancing heights",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Masonry>;

const heights = [100, 150, 200, 120, 180, 140, 220, 160, 130, 190, 110, 170];

const MasonryTestCard = ({
  height,
  index,
}: {
  height: number;
  index: number;
}) => (
  <MasonryItem
    className="rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] p-4"
    style={{ height }}
  >
    <div className="text-sm font-medium">Item {index + 1}</div>
    <div className="text-xs text-[hsl(var(--la-muted-foreground))]">
      Height: {height}px
    </div>
  </MasonryItem>
);

const ImageCard = ({
  src,
  alt,
  height,
}: {
  src: string;
  alt: string;
  height: number;
}) => (
  <MasonryItem className="overflow-hidden rounded-lg">
    <div
      className="bg-gradient-to-br from-[hsl(var(--la-primary))] to-[hsl(var(--la-accent))] flex items-center justify-center text-white"
      style={{ height }}
    >
      {alt}
    </div>
  </MasonryItem>
);

export const Default: Story = {
  render: () => (
    <Masonry cols={3} gap="md">
      {heights.map((h, i) => (
        <MasonryTestCard key={i} height={h} index={i} />
      ))}
    </Masonry>
  ),
};

export const ColumnVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {([2, 3, 4] as const).map((cols) => (
        <div key={cols}>
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
            {cols} Columns
          </p>
          <Masonry cols={cols} gap="sm">
            {heights.slice(0, cols * 3).map((h, i) => (
              <MasonryTestCard key={i} height={h} index={i} />
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["none", "sm", "md", "lg"] as const).map((gap) => (
        <div key={gap}>
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
            Gap: {gap}
          </p>
          <Masonry cols={3} gap={gap}>
            {heights.slice(0, 9).map((h, i) => (
              <MasonryTestCard key={i} height={h} index={i} />
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

export const Sequential: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
          Balanced (default) - tries to equalize column heights
        </p>
        <Masonry cols={3} gap="md" sequential={false}>
          {heights.map((h, i) => (
            <MasonryTestCard key={i} height={h} index={i} />
          ))}
        </Masonry>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
          Sequential - items go in order (1,2,3,1,2,3...)
        </p>
        <Masonry cols={3} gap="md" sequential>
          {heights.map((h, i) => (
            <MasonryTestCard key={i} height={h} index={i} />
          ))}
        </Masonry>
      </div>
    </div>
  ),
};

export const PinterestStyle: Story = {
  render: () => (
    <div className="rounded-lg border border-[hsl(var(--la-border))] p-4">
      <h3 className="mb-4 text-lg font-semibold">Gallery</h3>
      <Masonry cols={4} gap="md">
        {[
          { h: 200, label: "Nature" },
          { h: 280, label: "Architecture" },
          { h: 160, label: "Portrait" },
          { h: 240, label: "Abstract" },
          { h: 180, label: "Landscape" },
          { h: 220, label: "Urban" },
          { h: 300, label: "Wildlife" },
          { h: 140, label: "Food" },
          { h: 260, label: "Travel" },
          { h: 190, label: "Fashion" },
          { h: 230, label: "Art" },
          { h: 170, label: "Tech" },
        ].map((item, i) => (
          <ImageCard
            key={i}
            src=""
            alt={item.label}
            height={item.h}
          />
        ))}
      </Masonry>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div>
      <p className="mb-2 text-sm text-[hsl(var(--la-muted-foreground))]">
        Resize browser to see responsive behavior
      </p>
      <Masonry cols={4} gap="md">
        {heights.map((h, i) => (
          <MasonryTestCard key={i} height={h + 50} index={i} />
        ))}
      </Masonry>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Masonry cols={3} gap="md">
      {[
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation.",
        "Duis aute irure dolor in reprehenderit in voluptate velit.",
        "Excepteur sint occaecat cupidatat non proident.",
        "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus.",
        "Nulla gravida orci a odio.",
        "Nullam varius, turpis et commodo pharetra.",
      ].map((text, i) => (
        <MasonryItem
          key={i}
          className="rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] p-4"
        >
          <h4 className="mb-2 font-medium">Card {i + 1}</h4>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">{text}</p>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <div className="bg-[hsl(var(--la-background))] p-4">
        <Masonry cols={3} gap="md">
          {heights.slice(0, 6).map((h, i) => (
            <MasonryTestCard key={i} height={h} index={i} />
          ))}
        </Masonry>
      </div>
    </div>
  ),
};
