import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "./index";

const meta: Meta = {
  title: "Components/Accordion",
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    collapsible: { control: "boolean" },
  },
  args: {
    type: "single",
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "item-1", trigger: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
  { value: "item-2", trigger: "Is it styled?", content: "Yes. It comes with default styles that match the other components' aesthetic." },
  { value: "item-3", trigger: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
];

export const Single: Story = {
  render: (args) => (
    <AccordionRoot
      type="single"
      collapsible={args.collapsible as boolean}
      style={{ width: 400 }}
    >
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ),
};

export const Multiple: Story = {
  render: () => (
    <AccordionRoot type="multiple" defaultValue={["item-1"]} style={{ width: 400 }}>
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <AccordionRoot type="single" defaultValue="item-1" collapsible style={{ width: 400 }}>
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ),
};
