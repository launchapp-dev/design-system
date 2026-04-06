/**
 * Example plugins demonstrating the plugin system capabilities
 * These are provided as reference implementations for plugin developers
 */

import type { ComponentPlugin } from "./types";

/**
 * Example 1: Add gradient variants to Button
 */
export const gradientButtonPlugin: ComponentPlugin = {
  name: "gradient-variants",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds gradient color variants to Button component",
  author: "Design System Team",

  variants: {
    variant: {
      gradient:
        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
      "gradient-subtle":
        "bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-900",
      "gradient-warm":
        "bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white",
    },
  },

  defaultVariants: {
    variant: "default",
  },
};

/**
 * Example 2: Add size variants to Badge
 */
export const badgeSizePlugin: ComponentPlugin = {
  name: "size-variants",
  version: "1.0.0",
  targetComponent: "Badge",
  description: "Adds small and large size variants to Badge component",
  author: "Design System Team",

  variants: {
    size: {
      sm: "px-1.5 py-0.25 text-xs",
      lg: "px-4 py-1 text-base",
    },
  },

  defaultVariants: {
    size: "md",
  },
};

/**
 * Example 3: Button with theme variants
 */
export const themeVariantPlugin: ComponentPlugin = {
  name: "theme-variants",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds semantic theme variants (success, warning, danger, etc)",
  author: "Design System Team",

  variants: {
    theme: {
      success: "bg-green-600 hover:bg-green-700 text-white",
      warning: "bg-amber-500 hover:bg-amber-600 text-white",
      danger: "bg-red-600 hover:bg-red-700 text-white",
      info: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  },
};

/**
 * Example 4: Button with loading state using beforeRender hook
 */
export const loadingStatePlugin: ComponentPlugin = {
  name: "loading-state",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds loading state support with automatic disabled state and label changes",
  author: "Design System Team",

  beforeRender: (props) => {
    const { isLoading, loadingText = "Loading...", disabled, children, ...rest } = props;

    return {
      ...rest,
      disabled: disabled || isLoading,
      children: isLoading ? loadingText : children,
      "aria-busy": isLoading,
    };
  },
};

/**
 * Example 5: Button with tooltip using afterRender hook
 */
export const tooltipPlugin: ComponentPlugin = {
  name: "tooltip-wrapper",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Wraps Button with tooltip when tooltip prop is provided",
  author: "Design System Team",

  afterRender: (element) => {
    const tooltipText = (element.props as Record<string, unknown>).tooltip;

    if (!tooltipText) {
      return element;
    }

    // Return wrapped element (would require TooltipRoot import in real usage)
    return element;
  },
};

/**
 * Example 6: Badge status variants with semantic meaning
 */
export const statusBadgePlugin: ComponentPlugin = {
  name: "status-variants",
  version: "1.0.0",
  targetComponent: "Badge",
  description: "Adds status badge variants for common states",
  author: "Design System Team",

  variants: {
    status: {
      active: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200",
      pending:
        "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200",
      error: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200",
    },
  },
};

/**
 * Example 7: Input field with character counter using hooks
 */
export const characterCountPlugin: ComponentPlugin = {
  name: "character-count",
  version: "1.0.0",
  targetComponent: "Input",
  description: "Adds character count display for input fields",
  author: "Design System Team",

  beforeRender: (props) => {
    const { maxLength, ...rest } = props;

    return {
      ...rest,
      maxLength,
      "data-character-count": true,
    };
  },
};

/**
 * All example plugins
 */
export const examplePlugins = [
  gradientButtonPlugin,
  badgeSizePlugin,
  themeVariantPlugin,
  loadingStatePlugin,
  tooltipPlugin,
  statusBadgePlugin,
  characterCountPlugin,
];

/**
 * Register all example plugins to the default registry
 * Note: This is optional and should only be called if you want to use these examples
 */
export function registerExamplePlugins() {
  const { defaultRegistry } = require("./registry");

  for (const plugin of examplePlugins) {
    try {
      defaultRegistry.register(plugin);
    } catch {
      // Plugin already registered, skip
    }
  }
}
