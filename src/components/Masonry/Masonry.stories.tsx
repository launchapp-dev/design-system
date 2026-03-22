import type { Meta, StoryObj } from "@storybook/react";
import { Masonry, MasonryItem } from "./index";

const meta = {
  title: "Components/Masonry",
  component: Masonry,
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4],
      description: "Number of columns in the masonry layout",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between masonry items",
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoItem = ({
  title,
  description,
  height,
}: {
  title: string;
  description: string;
  height?: number;
}) => (
  <MasonryItem
    className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-4"
    style={{ height }}
  >
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </MasonryItem>
);

const items = [
  { title: "Item 1", description: "Short content", height: 100 },
  { title: "Item 2", description: "Medium length content block", height: 150 },
  { title: "Item 3", description: "Tall content", height: 200 },
  { title: "Item 4", description: "Small", height: 80 },
  { title: "Item 5", description: "Another medium item", height: 140 },
  { title: "Item 6", description: "Large content block here", height: 180 },
  { title: "Item 7", description: "Tiny", height: 90 },
  { title: "Item 8", description: "Extra tall item", height: 220 },
  { title: "Item 9", description: "Normal height", height: 120 },
];

export const Default: Story = {
  render: (args) => (
    <Masonry {...args}>
      {items.map((item, i) => (
        <DemoItem key={i} {...item} />
      ))}
    </Masonry>
  ),
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: "md",
  },
  render: (args) => (
    <Masonry {...args}>
      {items.slice(0, 6).map((item, i) => (
        <DemoItem key={i} {...item} />
      ))}
    </Masonry>
  ),
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: "md",
  },
  render: (args) => (
    <Masonry {...args}>
      {items.map((item, i) => (
        <DemoItem key={i} {...item} />
      ))}
    </Masonry>
  ),
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: "md",
  },
  render: (args) => (
    <Masonry {...args}>
      {[...items, ...items].map((item, i) => (
        <DemoItem key={i} {...item} />
      ))}
    </Masonry>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">No Gap</h3>
        <Masonry columns={3} gap="none">
          {items.slice(0, 6).map((item, i) => (
            <DemoItem key={i} {...item} />
          ))}
        </Masonry>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Gap</h3>
        <Masonry columns={3} gap="sm">
          {items.slice(0, 6).map((item, i) => (
            <DemoItem key={i} {...item} />
          ))}
        </Masonry>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Medium Gap</h3>
        <Masonry columns={3} gap="md">
          {items.slice(0, 6).map((item, i) => (
            <DemoItem key={i} {...item} />
          ))}
        </Masonry>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large Gap</h3>
        <Masonry columns={3} gap="lg">
          {items.slice(0, 6).map((item, i) => (
            <DemoItem key={i} {...item} />
          ))}
        </Masonry>
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
    <Masonry columns={3} gap="md">
      {items.map((item, i) => (
        <DemoItem key={i} {...item} />
      ))}
    </Masonry>
  ),
};

export const ImageGallery: Story = {
  render: () => {
    const imageItems = [
      {
        title: "Landscape Photo",
        description: "Beautiful mountain view",
        height: 160,
      },
      {
        title: "Portrait Photo",
        description: "Professional headshot",
        height: 240,
      },
      {
        title: "Square Photo",
        description: "Product image",
        height: 140,
      },
      {
        title: "Wide Banner",
        description: "Hero image for homepage",
        height: 120,
      },
      {
        title: "Gallery Item",
        description: "Artistic photograph",
        height: 180,
      },
      {
        title: "Thumbnail",
        description: "Preview image",
        height: 100,
      },
    ];

    return (
      <Masonry columns={3} gap="md">
        {imageItems.map((item, i) => (
          <MasonryItem
            key={i}
            className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden"
          >
            <div
              className="bg-muted flex items-center justify-center"
              style={{ height: item.height }}
            >
              <span className="text-muted-foreground text-xs">
                {item.height}px
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const Responsive: Story = {
  args: {
    columns: 3,
    gap: "md",
  },
  render: (args) => (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Resize the viewport to see responsive behavior: single column on mobile,
        2 columns on sm breakpoint, 3 columns on lg breakpoint
      </p>
      <Masonry {...args}>
        {items.map((item, i) => (
          <DemoItem key={i} {...item} />
        ))}
      </Masonry>
    </div>
  ),
};
