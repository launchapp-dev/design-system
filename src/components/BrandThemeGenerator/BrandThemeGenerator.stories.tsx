import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BrandThemeGenerator } from "./index";
import type { VisionThemeResult } from "../../lib/vision";

const meta: Meta<typeof BrandThemeGenerator> = {
  title: "Components/BrandThemeGenerator",
  component: BrandThemeGenerator,
  parameters: {
    docs: {
      description: {
        component: `
## Brand Theme Generator

The BrandThemeGenerator component enables users to extract colors from brand websites and automatically generate complete design system themes.

## Features

### Color Extraction
- URL input for brand website screenshots or images
- Vision API integration to analyze images and extract dominant colors
- Automatic color categorization (primary, secondary, muted, accent, destructive)

### Theme Generation
- Generates complete light and dark theme tokens from primary color
- Uses sophisticated HSL color calculations for consistency
- Automatically creates secondary, muted, accent, and destructive color variations

### Manual Overrides
- Edit extracted colors directly with hex color inputs
- Real-time validation of hex color format
- Automatic theme regeneration when colors are modified

### Live Preview
- Light and dark mode preview toggles
- Component previews (buttons, badges, cards) with generated theme applied
- Visual feedback of color changes in real-time

### Save & Export
- Named theme saving capability
- Callback support for integrating with theme management systems
- Complete theme metadata (colors and tokens) provided on save

## Accessibility Features

### Input & Navigation
- Proper label associations for all form inputs
- Keyboard navigation through form elements
- Clear error messages for validation failures
- Loading state indicators for API calls

### Color Contrast
- All text meets WCAG AA standards
- Color preview areas maintain sufficient contrast
- Form labels clearly visible against backgrounds

### Screen Reader Support
- Semantic HTML structure with proper landmarks
- ARIA labels for color inputs and toggles
- Status messages announced for loading/error states
- Theme preview clearly labeled as such

### Keyboard Navigation
- **Tab**: Move through all interactive elements
- **Space/Enter**: Activate buttons and toggle buttons
- **Arrow Keys**: Toggle light/dark preview mode
- All controls reachable without mouse

## API Integration

The component expects a backend API endpoint at \`/api/analyze-brand\` that:
- Accepts POST requests with \`{ imageUrl: string }\`
- Returns \`{ colors: VisionColorMap; theme: ThemeResult }\`
- Handles image analysis using Claude Vision API or similar
- Returns colors as hex values (#RRGGBB format)

## Usage Example

\`\`\`tsx
<BrandThemeGenerator
  onSaveTheme={(theme, name) => {
    // Handle theme save
    console.log(\`Saved theme: \${name}\`, theme);
  }}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BrandThemeGenerator>;

export const Default: Story = {
  render: () => (
    <BrandThemeGenerator
      onSaveTheme={(theme: VisionThemeResult, name: string) => {
        console.log(`Theme "${name}" saved:`, theme);
      }}
    />
  ),
};

export const WithCustomSave: Story = {
  render: () => (
    <BrandThemeGenerator
      onSaveTheme={(theme: VisionThemeResult, name: string) => {
        const themeCss = theme.theme.cssString;
        console.log(`Generated CSS for "${name}":\n${themeCss}`);

        // Example: Download theme as CSS file
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          `data:text/plain;charset=utf-8,${encodeURIComponent(themeCss)}`
        );
        element.setAttribute("download", `${name.toLowerCase().replace(/\s+/g, "-")}.css`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }}
    />
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  render: () => (
    <div className="dark bg-[hsl(var(--la-background))] min-h-screen">
      <BrandThemeGenerator
        onSaveTheme={(theme: VisionThemeResult, name: string) => {
          console.log(`Theme "${name}" saved:`, theme);
        }}
      />
    </div>
  ),
};
