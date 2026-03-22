/**
 * Example: Writing Visual-Testable Storybook Stories
 * 
 * This file demonstrates best practices for writing stories that work
 * well with Chromatic visual regression testing.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';

const meta: Meta<typeof Button> = {
  title: 'Examples/Visual Testing Best Practices',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * ✅ BEST PRACTICE: Use deterministic, fixed data
 * 
 * Avoid random values, current dates, or dynamic data that changes
 * between builds. This ensures consistent screenshots.
 */
export const DeterministicData: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'md',
    // ✅ Fixed, predictable values
    disabled: false,
  },
};

/**
 * ❌ BAD PRACTICE: Random or dynamic data
 * 
 * This will cause false positives in visual testing because
 * the output changes on every build.
 */
export const BadRandomData: Story = {
  args: {
    // ❌ Random value - will change every time
    children: `Random: ${Math.random()}`,
    variant: 'default',
  },
};

/**
 * ✅ BEST PRACTICE: Test all component variants
 * 
 * Create stories that showcase all possible states and variants
 * of your component.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button disabled>Disabled Default</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
    </div>
  ),
};

/**
 * ✅ BEST PRACTICE: Test interactive states
 * 
 * Use Storybook's play function to simulate user interactions
 * and capture different states.
 */
export const InteractiveStates: Story = {
  args: {
    children: 'Interactive Button',
  },
  play: async ({ canvasElement }) => {
    // This simulates a click and captures the state
    // Note: Chromatic will capture the final state
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  },
};

/**
 * ✅ BEST PRACTICE: Mock loading and async states
 * 
 * Don't rely on actual API calls or async operations.
 * Use fixed states instead.
 */
export const LoadingState: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Loading Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </CardContent>
    </Card>
  ),
};

export const LoadedState: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Loaded Example</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          ✅ Data loaded successfully with fixed, predictable content.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * ✅ BEST PRACTICE: Use fixed dates
 * 
 * Avoid `new Date()` which will change every day.
 * Use a fixed date string instead.
 */
export const FixedDateExample: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Date Display</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Created: January 15, 2024</p>
        <p className="text-sm text-muted-foreground">
          {/* ✅ Fixed date, not new Date() */}
          Last updated: 2024-01-15 at 10:30 AM
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * ✅ BEST PRACTICE: Test accessibility
 * 
 * Ensure components are accessible by including proper ARIA
 * attributes and testing with screen readers in mind.
 */
export const AccessibleComponent: Story = {
  render: () => (
    <Button
      aria-label="Submit form"
      aria-describedby="submit-hint"
    >
      Submit
    </Button>
  ),
};

/**
 * ✅ BEST PRACTICE: Dark mode testing
 * 
 * Create stories specifically for dark mode to ensure
 * components look correct in both themes.
 */
export const DarkMode: Story = {
  parameters: {
    themes: { themeOverride: 'dark' },
  },
  render: () => (
    <div className="dark p-8 bg-background">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
};

/**
 * ✅ BEST PRACTICE: Responsive design
 * 
 * Test components at different viewport sizes.
 */
export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="p-4">
      <Button className="w-full">Full Width Button</Button>
    </div>
  ),
};

/**
 * ✅ BEST PRACTICE: Test edge cases
 * 
 * Include stories for edge cases like long text, empty states,
 * minimum and maximum values.
 */
export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Button>
        Normal button text
      </Button>
      <Button>
        Very long button text that might overflow or wrap to multiple lines
      </Button>
      <Button>
        {/* Empty or minimal content */}
      </Button>
      <Button>
        🎉 Emoji support ✨
      </Button>
    </div>
  ),
};

/**
 * ✅ BEST PRACTICE: Document intentional changes
 * 
 * When you intentionally change a component's appearance,
 * add a comment explaining why.
 */
export const IntentionalDesignChange: Story = {
  args: {
    children: 'New Design',
    variant: 'default',
    // NOTE: Changed padding from 16px to 12px for better density
    // This is an intentional design update (2024-01-15)
    className: 'py-3',
  },
};
