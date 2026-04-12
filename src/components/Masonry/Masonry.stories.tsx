import type { Meta, StoryObj } from "@storybook/react";
import { Masonry, MasonryCard } from "./index";

const meta = {
  title: "Components/Masonry",
  component: Masonry,
  argTypes: {
    columns: {
      control: { type: "range", min: 1, max: 5, step: 1 },
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    sequential: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateItems = (count: number, varyingHeights: boolean = true) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    height: varyingHeights ? Math.floor(Math.random() * 150) + 100 : 150,
    color: [
      "hsl(var(--primary) / 0.1)",
      "hsl(var(--secondary) / 0.1)",
      "hsl(var(--accent) / 0.1)",
      "hsl(var(--muted) / 0.3)",
    ][i % 4],
  }));
};

export const Default: Story = {
  render: () => {
    const items = generateItems(12);
    return (
      <Masonry columns={3} gap="md">
        {items.map((item) => (
          <MasonryCard key={item.id} style={{ minHeight: item.height, padding: "16px" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>{item.title}</h3>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
              Variable height content that demonstrates the masonry layout behavior.
            </p>
          </MasonryCard>
        ))}
      </Masonry>
    );
  },
};

export const AllGapVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Small</h3>
        <Masonry columns={3} gap="sm">
          {generateItems(6, false).map((item) => (
            <MasonryCard key={item.id} style={{ padding: "12px" }}>
              <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
            </MasonryCard>
          ))}
        </Masonry>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Medium</h3>
        <Masonry columns={3} gap="md">
          {generateItems(6, false).map((item) => (
            <MasonryCard key={item.id} style={{ padding: "12px" }}>
              <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
            </MasonryCard>
          ))}
        </Masonry>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Gap: Large</h3>
        <Masonry columns={3} gap="lg">
          {generateItems(6, false).map((item) => (
            <MasonryCard key={item.id} style={{ padding: "12px" }}>
              <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
            </MasonryCard>
          ))}
        </Masonry>
      </div>
    </div>
  ),
};

export const ColumnVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {[2, 3, 4, 5].map((cols) => (
        <div key={cols}>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>{cols} Columns</h3>
          <Masonry columns={cols} gap="md">
            {generateItems(cols * 2).map((item) => (
              <MasonryCard key={item.id} style={{ minHeight: item.height, padding: "16px" }}>
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

export const SequentialVsBalanced: Story = {
  render: () => {
    const items = generateItems(9);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Balanced Distribution (Default)</h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Items distributed to fill the shortest column first
          </p>
          <Masonry columns={3} gap="md" sequential={false}>
            {items.map((item) => (
              <MasonryCard key={item.id} style={{ minHeight: item.height, padding: "16px" }}>
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Sequential Distribution</h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Items placed in order: column 1, then 2, then 3, repeat
          </p>
          <Masonry columns={3} gap="md" sequential={true}>
            {items.map((item) => (
              <MasonryCard key={item.id} style={{ minHeight: item.height, padding: "16px" }}>
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
      </div>
    );
  },
};

export const CardVariants: Story = {
  render: () => {
    const items = generateItems(6);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Default Cards</h3>
          <Masonry columns={3} gap="md">
            {items.map((item) => (
              <MasonryCard
                variant="default"
                key={item.id}
                style={{ minHeight: 120, padding: "16px" }}
              >
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "hsl(var(--muted-foreground))",
                    marginTop: "8px",
                  }}
                >
                  Default bordered card
                </p>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Elevated Cards</h3>
          <Masonry columns={3} gap="md">
            {items.map((item) => (
              <MasonryCard
                variant="elevated"
                key={item.id}
                style={{ minHeight: 120, padding: "16px" }}
              >
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "hsl(var(--muted-foreground))",
                    marginTop: "8px",
                  }}
                >
                  Elevated with shadow
                </p>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Outlined Cards</h3>
          <Masonry columns={3} gap="md">
            {items.map((item) => (
              <MasonryCard
                variant="outlined"
                key={item.id}
                style={{ minHeight: 120, padding: "16px" }}
              >
                <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "hsl(var(--muted-foreground))",
                    marginTop: "8px",
                  }}
                >
                  Outlined border style
                </p>
              </MasonryCard>
            ))}
          </Masonry>
        </div>
      </div>
    );
  },
};

export const PinterestStyle: Story = {
  render: () => {
    const pins = [
      { id: 1, title: "Mountain Landscape", height: 280, category: "Nature" },
      { id: 2, title: "City Skyline", height: 180, category: "Urban" },
      { id: 3, title: "Ocean Sunset", height: 320, category: "Nature" },
      { id: 4, title: "Forest Path", height: 220, category: "Nature" },
      { id: 5, title: "Street Art", height: 260, category: "Art" },
      { id: 6, title: "Coffee Shop", height: 160, category: "Lifestyle" },
      { id: 7, title: "Desert Dunes", height: 240, category: "Nature" },
      { id: 8, title: "Architecture", height: 300, category: "Design" },
      { id: 9, title: "Food Photography", height: 200, category: "Food" },
      { id: 10, title: "Vintage Car", height: 180, category: "Automotive" },
      { id: 11, title: "Book Collection", height: 220, category: "Lifestyle" },
      { id: 12, title: "Abstract Art", height: 280, category: "Art" },
    ];

    return (
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Pinterest-Style Gallery</h3>
        <Masonry columns={4} gap="md">
          {pins.map((pin) => (
            <MasonryCard
              key={pin.id}
              style={{
                minHeight: pin.height,
                background: `linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))`,
              }}
            >
              <div
                style={{
                  height: pin.height - 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                  {pin.height}px
                </span>
              </div>
              <div style={{ padding: "12px" }}>
                <h4 style={{ fontWeight: 600, fontSize: "0.875rem" }}>{pin.title}</h4>
                <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                  {pin.category}
                </span>
              </div>
            </MasonryCard>
          ))}
        </Masonry>
      </div>
    );
  },
};

export const ImageGallery: Story = {
  render: () => {
    const images = [
      { id: 1, alt: "Tall image", aspectRatio: "2/3", color: "hsl(var(--primary) / 0.2)" },
      { id: 2, alt: "Wide image", aspectRatio: "3/2", color: "hsl(var(--secondary) / 0.2)" },
      { id: 3, alt: "Square image", aspectRatio: "1/1", color: "hsl(var(--accent) / 0.2)" },
      { id: 4, alt: "Portrait", aspectRatio: "3/4", color: "hsl(var(--muted) / 0.4)" },
      { id: 5, alt: "Landscape", aspectRatio: "4/3", color: "hsl(var(--primary) / 0.15)" },
      { id: 6, alt: "Panoramic", aspectRatio: "2/1", color: "hsl(var(--secondary) / 0.15)" },
      { id: 7, alt: "Tall portrait", aspectRatio: "9/16", color: "hsl(var(--accent) / 0.15)" },
      { id: 8, alt: "Classic", aspectRatio: "4/5", color: "hsl(var(--muted) / 0.3)" },
    ];

    return (
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Variable Aspect Ratio Images</h3>
        <Masonry columns={3} gap="md">
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                aspectRatio: img.aspectRatio,
                background: img.color,
                borderRadius: "var(--la-radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--muted-foreground))",
                fontSize: "0.75rem",
              }}
            >
              {img.alt} ({img.aspectRatio})
            </div>
          ))}
        </Masonry>
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const items = generateItems(9);
    return (
      <Masonry columns={3} gap="md">
        {items.map((item) => (
          <MasonryCard key={item.id} style={{ minHeight: item.height, padding: "16px" }}>
            <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
            <p
              style={{
                fontSize: "0.75rem",
                color: "hsl(var(--muted-foreground))",
                marginTop: "8px",
              }}
            >
              Dark mode styling with proper contrast
            </p>
          </MasonryCard>
        ))}
      </Masonry>
    );
  },
};

export const SingleColumn: Story = {
  render: () => {
    const items = generateItems(4);
    return (
      <div>
        <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>Single Column (Stacked Layout)</h3>
        <Masonry columns={1} gap="md">
          {items.map((item) => (
            <MasonryCard key={item.id} style={{ padding: "16px" }}>
              <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                  marginTop: "8px",
                }}
              >
                Single column layout for mobile or narrow views
              </p>
            </MasonryCard>
          ))}
        </Masonry>
      </div>
    );
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <Masonry columns={3} gap="md">
      <MasonryCard style={{ padding: "20px", minHeight: 200 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "8px" }}>📊 Analytics</h3>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
          Track your key performance indicators with real-time data visualization.
        </p>
        <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
          <span
            style={{
              padding: "4px 8px",
              background: "hsl(var(--primary) / 0.1)",
              borderRadius: "4px",
              fontSize: "0.75rem",
            }}
          >
            +12%
          </span>
          <span
            style={{
              padding: "4px 8px",
              background: "hsl(var(--muted))",
              borderRadius: "4px",
              fontSize: "0.75rem",
            }}
          >
            Weekly
          </span>
        </div>
      </MasonryCard>

      <MasonryCard
        style={{
          padding: "20px",
          minHeight: 280,
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))",
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "8px" }}>
          🚀 Quick Start
        </h3>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
          Get up and running in minutes with our comprehensive documentation and starter templates.
        </p>
        <button
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Start Building →
        </button>
      </MasonryCard>

      <MasonryCard style={{ padding: "20px", minHeight: 160 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "8px" }}>
          ⚡ Performance
        </h3>
        <div style={{ fontSize: "2rem", fontWeight: 700, color: "hsl(var(--primary))" }}>99.9%</div>
        <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
          Uptime guaranteed
        </p>
      </MasonryCard>

      <MasonryCard style={{ padding: "20px", minHeight: 220 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "12px" }}>👥 Team</h3>
        <div style={{ display: "flex", gap: "-8px" }}>
          {["JD", "AB", "CD", "+5"].map((initials, i) => (
            <div
              key={i}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: i === 3 ? "hsl(var(--muted))" : "hsl(var(--primary) / 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.625rem",
                fontWeight: 600,
                marginLeft: i > 0 ? "-8px" : 0,
                border: "2px solid hsl(var(--background))",
              }}
            >
              {initials}
            </div>
          ))}
        </div>
        <p
          style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", marginTop: "12px" }}
        >
          8 team members active
        </p>
      </MasonryCard>

      <MasonryCard style={{ padding: "20px", minHeight: 180 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "8px" }}>📦 Resources</h3>
        <ul
          style={{
            fontSize: "0.875rem",
            color: "hsl(var(--muted-foreground))",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li style={{ padding: "4px 0" }}>→ Documentation</li>
          <li style={{ padding: "4px 0" }}>→ API Reference</li>
          <li style={{ padding: "4px 0" }}>→ Community</li>
        </ul>
      </MasonryCard>

      <MasonryCard
        style={{ padding: "20px", minHeight: 140, background: "hsl(var(--accent) / 0.3)" }}
      >
        <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>💡 Tip of the Day</h3>
        <p
          style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", marginTop: "8px" }}
        >
          Use keyboard shortcuts to navigate faster!
        </p>
      </MasonryCard>
    </Masonry>
  ),
};
