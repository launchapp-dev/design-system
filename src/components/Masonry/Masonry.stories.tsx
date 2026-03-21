import type { Meta, StoryObj } from "@storybook/react";
import { Masonry, MasonryItem } from "./index";

const meta = {
  title: "Components/Masonry",
  component: Masonry,
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { height: 120, label: "Item 1", color: "#6366f1" },
  { height: 200, label: "Item 2", color: "#8b5cf6" },
  { height: 160, label: "Item 3", color: "#10b981" },
  { height: 100, label: "Item 4", color: "#f59e0b" },
  { height: 240, label: "Item 5", color: "#ef4444" },
  { height: 140, label: "Item 6", color: "#3b82f6" },
  { height: 180, label: "Item 7", color: "#ec4899" },
  { height: 110, label: "Item 8", color: "#14b8a6" },
  { height: 220, label: "Item 9", color: "#f97316" },
];

const ImagePlaceholder = ({ height, label, color }: { height: number; label: string; color: string }) => (
  <MasonryItem style={{ marginBottom: "var(--masonry-gap, 1rem)" }}>
    <div
      style={{
        height,
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{label}</span>
    </div>
  </MasonryItem>
);

export const Default: Story = {
  render: () => (
    <Masonry cols={3} style={{ width: "720px" }}>
      {items.map((item) => (
        <MasonryItem key={item.label} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              height: item.height,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Masonry cols={2} style={{ width: "480px" }}>
      {items.slice(0, 6).map((item) => (
        <MasonryItem key={item.label} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              height: item.height,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Masonry cols={4} style={{ width: "960px" }}>
      {[...items, ...items.slice(0, 3)].map((item, i) => (
        <MasonryItem key={`${item.label}-${i}`} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              height: item.height,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const SixColumns: Story = {
  render: () => (
    <Masonry cols={6} style={{ width: "1200px" }}>
      {[...items, ...items, ...items].map((item, i) => (
        <MasonryItem key={`${item.label}-${i}`} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              height: item.height,
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.75rem" }}>{item.label}</span>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
        <div key={gap}>
          <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>gap={gap}</p>
          <Masonry cols={3} gap={gap} style={{ width: "720px" }}>
            {items.slice(0, 6).map((item) => (
              <MasonryItem key={item.label}>
                <div
                  style={{
                    height: item.height,
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
                </div>
              </MasonryItem>
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

export const ItemVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>variant=&quot;default&quot;</p>
        <Masonry cols={3} style={{ width: "720px" }}>
          {items.slice(0, 3).map((item) => (
            <MasonryItem key={item.label} variant="default" style={{ marginBottom: "1rem" }}>
              <div style={{ height: item.height, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>variant=&quot;outlined&quot;</p>
        <Masonry cols={3} style={{ width: "720px" }}>
          {items.slice(0, 3).map((item) => (
            <MasonryItem key={item.label} variant="outlined" style={{ marginBottom: "1rem" }}>
              <div style={{ height: item.height, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>variant=&quot;elevated&quot;</p>
        <Masonry cols={3} style={{ width: "720px" }}>
          {items.slice(0, 3).map((item) => (
            <MasonryItem key={item.label} variant="elevated" style={{ marginBottom: "1rem" }}>
              <div style={{ height: item.height, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>variant=&quot;flat&quot;</p>
        <Masonry cols={3} style={{ width: "720px" }}>
          {items.slice(0, 3).map((item) => (
            <MasonryItem key={item.label} variant="flat" style={{ marginBottom: "1rem" }}>
              <div style={{ height: item.height, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </div>
    </div>
  ),
};

export const HoverVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["default", "glow", "scale", "none"] as const).map((hover) => (
        <div key={hover}>
          <p style={{ marginBottom: "8px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>hover=&quot;{hover}&quot;</p>
          <Masonry cols={3} style={{ width: "720px" }}>
            {items.slice(0, 3).map((item) => (
              <MasonryItem key={item.label} hover={hover} style={{ marginBottom: "1rem" }}>
                <div style={{ height: item.height, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
                </div>
              </MasonryItem>
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

export const ImageGallery: Story = {
  render: () => {
    const images = [
      { height: 280, label: "Landscape 1", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
      { height: 180, label: "Portrait 1", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
      { height: 220, label: "Square 1", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
      { height: 320, label: "Tall 1", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
      { height: 160, label: "Wide 1", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
      { height: 240, label: "Landscape 2", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
      { height: 200, label: "Portrait 2", gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" },
      { height: 280, label: "Square 2", gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)" },
      { height: 140, label: "Small 1", gradient: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)" },
    ];

    return (
      <Masonry cols={4} gap="md" style={{ width: "960px" }}>
        {images.map((img, i) => (
          <MasonryItem key={i} hover="scale" style={{ marginBottom: "1rem" }}>
            <div
              style={{
                height: img.height,
                background: img.gradient,
                borderRadius: "8px",
                display: "flex",
                alignItems: "flex-end",
                padding: "16px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>{img.label}</span>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const PinterestStyle: Story = {
  render: () => {
    const pins = [
      { title: "Modern Interior", category: "Design", saves: "2.4k", height: 200, color: "#6366f1" },
      { title: "Nature Photography", category: "Photography", saves: "1.8k", height: 280, color: "#10b981" },
      { title: "Typography Art", category: "Art", saves: "956", height: 160, color: "#f59e0b" },
      { title: "Architecture", category: "Design", saves: "3.1k", height: 240, color: "#8b5cf6" },
      { title: "Fashion Editorial", category: "Fashion", saves: "1.2k", height: 320, color: "#ec4899" },
      { title: "Product Design", category: "Design", saves: "2.9k", height: 180, color: "#3b82f6" },
      { title: "Food Styling", category: "Food", saves: "4.5k", height: 220, color: "#f97316" },
      { title: "Travel Moments", category: "Travel", saves: "1.5k", height: 260, color: "#14b8a6" },
    ];

    return (
      <Masonry cols={3} gap="md" style={{ width: "720px" }}>
        {pins.map((pin, i) => (
          <MasonryItem key={i} hover="lift" style={{ marginBottom: "1rem" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  height: pin.height,
                  background: `linear-gradient(135deg, ${pin.color}20, ${pin.color}40)`,
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={pin.color} strokeWidth="2" style={{ opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div style={{ padding: "12px" }}>
                <h4 style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "4px" }}>{pin.title}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{pin.category}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--muted-foreground)" }}>📌 {pin.saves}</span>
                </div>
              </div>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "var(--background)", padding: "24px", borderRadius: "8px" }}>
      <Masonry cols={3} style={{ width: "680px" }}>
        {items.map((item) => (
          <MasonryItem key={item.label} style={{ marginBottom: "1rem" }}>
            <div
              style={{
                height: item.height,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "16px", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        Resize the viewport to see responsive column changes: 1 → 2 → 3 → 4 → 5 → 6 columns.
      </p>
      <Masonry cols={6}>
        {[...items, ...items, ...items].map((item, i) => (
          <MasonryItem key={i} style={{ marginBottom: "1rem" }}>
            <div
              style={{
                height: item.height,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label} #{i + 1}</span>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    </div>
  ),
};
