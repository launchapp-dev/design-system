import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PaletteSwitcher } from "./index";
import { builtinPalettes } from "../../themes/palettes";
import { Button } from "../Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { Badge } from "../Badge";
import { Input } from "../Input";

const meta: Meta<typeof PaletteSwitcher> = {
  title: "Components/PaletteSwitcher",
  component: PaletteSwitcher,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PaletteSwitcher>;

export const Default: Story = {
  render: (args) => (
    <div className="p-6 space-y-4">
      <PaletteSwitcher {...args} />
      <p className="text-sm text-muted-foreground">Select a palette to apply it to the page.</p>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-4 items-start">
      <PaletteSwitcher size="sm" />
      <PaletteSwitcher size="md" />
      <PaletteSwitcher size="lg" />
    </div>
  ),
};

export const AllPalettes: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Available Palettes</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {builtinPalettes.map((palette) => (
          <div key={palette.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-4 w-4 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: palette.previewColor }}
            />
            <span>{palette.label}</span>
          </div>
        ))}
      </div>
      <PaletteSwitcher />
    </div>
  ),
};

export const WithUIPreview: Story = {
  render: () => {
    const [palette, setPalette] = React.useState("default");
    return (
      <div className="p-6 space-y-6 max-w-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <PaletteSwitcher value={palette} onValueChange={(name) => setPalette(name)} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Component Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button variant="default" size="sm">
                Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <Input placeholder="Input field…" />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const CustomPalettes: Story = {
  render: () => {
    const customPalettes = builtinPalettes.slice(0, 4);
    return (
      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Subset of 4 palettes passed via the <code>palettes</code> prop.
        </p>
        <PaletteSwitcher palettes={customPalettes} />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("ocean");
    return (
      <div className="p-6 space-y-4">
        <PaletteSwitcher value={value} onValueChange={(name) => setValue(name)} />
        <p className="text-sm text-muted-foreground">
          Active palette: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};
