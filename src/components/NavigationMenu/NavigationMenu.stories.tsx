import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./index";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- Navigation menu has \`role="navigation"\`
- Triggers have \`aria-expanded\` indicating submenu state
- Submenu lists have \`role="menu"\` with proper item markup
- Current page link marked with \`aria-current="page"\`

### Keyboard Navigation
- **Tab**: Navigate menu triggers
- **Arrow Right/Left**: Open/close submenus
- **Arrow Down/Up**: Navigate submenu items
- **Enter/Space**: Activate link or trigger
- **Escape**: Close submenu

### Screen Reader Behavior
- Navigation landmark announced
- Menu triggers announced with open/closed state
- Submenu items announced within menu context
- Links within submenus announced with context

### Focus Management
- Menu items in tab order
- Focus management for submenu opening/closing
- Return focus to trigger after submenu closes
- Clear visual focus indicator on all items
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element on hover.",
  },
];

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-[--la-radius] p-3 leading-none no-underline outline-none transition-colors hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] focus:bg-[hsl(var(--la-accent))] focus:text-[hsl(var(--la-accent-foreground))]",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-[hsl(var(--la-muted-foreground))]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="flex h-full w-full select-none flex-col justify-end rounded-[--la-radius] bg-gradient-to-b from-[hsl(var(--la-muted)/0.5)] to-[hsl(var(--la-muted))] p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        LaunchApp DS
                      </div>
                      <p className="text-sm leading-tight text-[hsl(var(--la-muted-foreground))]">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists, and more.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuTriggerStyle()}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <NavigationMenu>
        <NavigationMenuList>
          {["Home", "About", "Blog", "Contact"].map((item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                {item}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const DarkMode: Story = {
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
    <div className="flex items-center justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="flex h-full w-full select-none flex-col justify-end rounded-[--la-radius] bg-gradient-to-b from-[hsl(var(--la-muted)/0.5)] to-[hsl(var(--la-muted))] p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        LaunchApp DS
                      </div>
                      <p className="text-sm leading-tight text-[hsl(var(--la-muted-foreground))]">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists, and more.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuTriggerStyle()}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
