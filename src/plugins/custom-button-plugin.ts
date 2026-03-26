import {
  createPlugin,
  type Plugin,
  type ComponentVariantDefinition,
  type ComponentHook,
} from "../lib/plugin-system";

const customButtonVariants: ComponentVariantDefinition[] = [
  {
    name: "gradient",
    description: "Gradient background button",
    values: {
      "primary-secondary": "bg-gradient-to-r from-primary to-secondary",
      "success-emerald":
        "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      "sunset":
        "bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600",
    },
  },
  {
    name: "animated",
    description: "Animated effect button",
    values: {
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      shimmer: "animate-shimmer",
    },
  },
  {
    name: "state",
    description: "Custom button states",
    values: {
      "loading": "opacity-70 cursor-wait",
      "success": "bg-green-500 text-white",
      "error": "bg-red-500 text-white",
    },
  },
];

const customButtonHooks: ComponentHook = {
  beforeRender: (props) => {
    if (props.variant === "gradient") {
      return {
        className: (props.className || "") + " " + "font-semibold",
      };
    }
    return undefined;
  },
  afterRender: (element, props) => {
    if (props.isLoading) {
      return element;
    }
    return element;
  },
};

export const customButtonPlugin: Plugin = createPlugin({
  name: "custom-button-plugin",
  version: "1.0.0",
  description: "Adds custom variants and behaviors to Button component",
  author: "LaunchApp Team",
  extensions: [
    {
      componentName: "Button",
      variants: customButtonVariants,
      hooks: customButtonHooks,
    },
  ],
  hooks: {
    onLoad: (registry) => {
      console.log("Custom Button Plugin loaded");
    },
    onUnload: (registry) => {
      console.log("Custom Button Plugin unloaded");
    },
  },
});
