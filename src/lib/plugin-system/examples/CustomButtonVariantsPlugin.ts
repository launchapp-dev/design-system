import type { DesignSystemPlugin } from "../types";

export const CustomButtonVariantsPlugin: DesignSystemPlugin = {
  metadata: {
    name: "custom-button-variants",
    version: "1.0.0",
    description:
      "Adds custom button variants: gradient, neon, and outline-glow to the Button component",
    author: "LaunchApp Design System",
  },

  componentExtensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "color-variants",
          variants: {
            variant: {
              gradient:
                "bg-gradient-to-r from-[hsl(var(--la-primary))] to-[hsl(var(--la-secondary))] text-[hsl(var(--la-primary-foreground))] hover:from-[hsl(var(--la-primary)/0.9)] hover:to-[hsl(var(--la-secondary)/0.9)] transition-all",
              neon: "border-2 border-[hsl(var(--la-primary))] text-[hsl(var(--la-primary))] bg-transparent hover:bg-[hsl(var(--la-primary)/0.1)] shadow-[0_0_10px_hsl(var(--la-primary)/0.5)]",
              "outline-glow":
                "border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:border-[hsl(var(--la-primary))] hover:shadow-[0_0_20px_hsl(var(--la-primary)/0.3)] transition-all",
            },
          },
        },
        {
          name: "size-extra",
          variants: {
            size: {
              xl: "h-14 px-10 text-lg min-h-[44px]",
              "2xl": "h-16 px-12 text-xl min-h-[44px]",
            },
          },
        },
      ],
    },
  ],

  hooks: {
    onLoad: () => {
      console.log(
        "Custom Button Variants plugin loaded successfully with gradient, neon, and outline-glow variants"
      );
    },
    onUnload: () => {
      console.log("Custom Button Variants plugin unloaded");
    },
  },
};
