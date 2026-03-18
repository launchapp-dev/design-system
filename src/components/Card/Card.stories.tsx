import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description with supporting text.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Footer content</p>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "360px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Header + Content</CardTitle>
          <CardDescription>Card with header and body only.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content area without footer.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Full Card</CardTitle>
          <CardDescription>Card with all sub-components composed together.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content section with descriptive body text.</p>
        </CardContent>
        <CardFooter>
          <p style={{ fontSize: "0.875rem" }}>Footer action area</p>
        </CardFooter>
      </Card>

      <Card>
        <CardContent style={{ paddingTop: "24px" }}>
          <p>Content-only card, no header or footer.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Header Only</CardTitle>
          <CardDescription>No content or footer sub-components.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ width: "240px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Small</CardTitle>
            <CardDescription>Narrow container.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Compact layout.</p>
          </CardContent>
        </Card>
      </div>

      <div style={{ width: "400px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Medium</CardTitle>
            <CardDescription>Standard container width.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Default card layout at typical form width.</p>
          </CardContent>
        </Card>
      </div>

      <div style={{ width: "640px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Wide</CardTitle>
            <CardDescription>Full-width dashboard card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Expanded layout for richer content areas like dashboards or data panels.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Use Storybook controls to customize className.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card renders with live args from the controls panel.</p>
        </CardContent>
        <CardFooter>
          <p style={{ fontSize: "0.875rem" }}>Footer</p>
        </CardFooter>
      </Card>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "360px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Dark Mode Card</CardTitle>
          <CardDescription>Card rendered in dark theme context.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content adapts to dark background via CSS variables.</p>
        </CardContent>
        <CardFooter>
          <p style={{ fontSize: "0.875rem" }}>Footer content</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Another Card</CardTitle>
          <CardDescription>Multiple cards in dark mode.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Verifies border and shadow render correctly on dark backgrounds.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "360px" }}>
      <Card>
        <CardHeader>
          <CardTitle>A very long card title that may wrap across multiple lines in a constrained layout</CardTitle>
          <CardDescription>
            A description that is also quite long and tests how the card handles multiline text gracefully in the header sub-component.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Normal content.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{""}</CardTitle>
          <CardDescription>{""}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Empty title and description.</p>
        </CardContent>
      </Card>

      <Card>
        <CardFooter>
          <p style={{ fontSize: "0.875rem" }}>Footer-only card with no header or content.</p>
        </CardFooter>
      </Card>
    </div>
  ),
};
