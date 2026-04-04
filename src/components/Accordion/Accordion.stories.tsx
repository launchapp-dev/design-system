import type { Meta, StoryObj } from "@storybook/react";
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "./index";

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
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- **AccordionRoot**: \`region\` role with semantic grouping
- **AccordionTrigger**: Button role with \`aria-expanded\` indicating open/closed state
- **AccordionContent**: Uses \`role="region"\` with \`aria-labelledby\` pointing to trigger

### Keyboard Navigation
- **Enter/Space**: Toggles accordion item between expanded/collapsed
- **Arrow Up/Down**: Navigate between accordion items
- **Home/End**: Move to first/last accordion item

### Screen Reader Behavior
- Announces accordion item as "button" with current expanded/collapsed state
- Expands/collapses state announced to screen readers
- Collapsed content not included in tab order

### Focus Management
- Focus remains on trigger after toggle
- Tab order: triggers are tabbable, hidden content skipped when collapsed
- Visible focus indicator on triggers (ring style)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content:
      "Yes. It comes with default styles that match the other components' aesthetic.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export const Single: Story = {
  parameters: {
    docs: {
      description: {
        story: `Single mode allows only one item expanded at a time. Use **Space** or **Enter** on a trigger to expand/collapse.`,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: `Multiple mode allows multiple items expanded simultaneously. Use **Space** or **Enter** to toggle any item independently.`,
      },
    },
  },
  render: () => (
    <AccordionRoot
      type="multiple"
      defaultValue={["item-1"]}
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

export const DefaultOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: `Item starts expanded. Screen readers announce the initial state with aria-expanded="true".`,
      },
    },
  },
  render: () => (
    <AccordionRoot
      type="single"
      defaultValue="item-1"
      collapsible
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
