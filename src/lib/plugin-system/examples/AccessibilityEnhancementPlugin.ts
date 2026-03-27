import type { DesignSystemPlugin } from "../types";

export const AccessibilityEnhancementPlugin: DesignSystemPlugin = {
  metadata: {
    name: "accessibility-enhancement",
    version: "1.0.0",
    description:
      "Adds accessibility-focused variants to components: high-contrast mode and focus-enhanced states",
    author: "LaunchApp Design System",
  },

  componentExtensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "accessibility-variants",
          variants: {
            variant: {
              "high-contrast":
                "border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-4 focus:outline-offset-2 focus:outline-black dark:focus:outline-white",
              "focus-enhanced":
                "focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus-visible:ring-4",
            },
          },
        },
      ],
    },
    {
      componentName: "Input",
      variants: [
        {
          name: "accessibility-input-variants",
          variants: {
            variant: {
              "high-contrast":
                "border-2 border-black dark:border-white focus:border-black dark:focus:border-white focus:outline-4 focus:outline-offset-2 focus:outline-blue-500",
              "focus-enhanced":
                "focus:ring-4 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500",
            },
          },
        },
      ],
    },
    {
      componentName: "Select",
      variants: [
        {
          name: "accessibility-select-variants",
          variants: {
            variant: {
              "high-contrast":
                "border-2 border-black dark:border-white focus:border-black dark:focus:border-white",
              "focus-enhanced": "focus:ring-4 focus:ring-blue-500 focus:outline-none",
            },
          },
        },
      ],
    },
  ],

  hooks: {
    onLoad: () => {
      console.log(
        "Accessibility Enhancement plugin loaded with high-contrast and focus-enhanced variants"
      );
    },
    onUnload: () => {
      console.log("Accessibility Enhancement plugin unloaded");
    },
  },
};
