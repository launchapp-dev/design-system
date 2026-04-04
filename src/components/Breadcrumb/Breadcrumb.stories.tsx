import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- **BreadcrumbList**: Uses \`role="navigation"\` with \`aria-label="Breadcrumb"\`
- **BreadcrumbSeparator**: Marked as \`aria-hidden="true"\` as decorative
- **BreadcrumbPage**: Current page marked with \`aria-current="page"\`
- **BreadcrumbEllipsis**: Button with \`aria-label="More pages"\` for expandable navigation

### Keyboard Navigation
- **Tab**: Navigate through breadcrumb links
- **Enter**: Activate breadcrumb link
- **Ellipsis button**: Expanded with keyboard interaction

### Screen Reader Behavior
- Navigation landmark announced as "Breadcrumb navigation"
- Links announced with their text content
- Current page (last item) announced with aria-current="page"
- Separators hidden from screen readers
- Ellipsis expands to show hidden items

### Focus Management
- All links receive keyboard focus in tab order
- Visual focus indicator on links
- Ellipsis button toggle manages hidden items
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Standard breadcrumb navigation. Last item has aria-current="page". All links are keyboard accessible.`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb with ellipsis button. Button has aria-label="More pages" for screen reader context.`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const ThreeLevelWithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story: `Deep navigation breadcrumb with hidden levels shown via ellipsis.`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Design System</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb with custom text separator. Separator still marked aria-hidden.`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Data</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb with long text that wraps. Accessibility maintained with proper link attributes.`,
      },
    },
  },
  render: () => (
    <div className="max-w-sm">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Very Long Category Name That Might Overflow
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              An Extremely Long Page Title That Tests Wrapping Behavior
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story: `Dark mode breadcrumb with maintained accessibility and contrast.`,
      },
    },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add("dark");
        return () => document.documentElement.classList.remove("dark");
      }, []);
      return (
        <div className="dark bg-[hsl(var(--la-background))] p-8">
          <Story />
        </div>
      );
    },
  ],
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Design System</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
