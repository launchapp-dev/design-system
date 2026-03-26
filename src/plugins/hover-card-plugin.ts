import {
  createPlugin,
  type Plugin,
  type ComponentVariantDefinition,
  type ComponentHook,
} from "../lib/plugin-system";

const hoverCardVariants: ComponentVariantDefinition[] = [
  {
    name: "effect",
    description: "Hover effect style",
    values: {
      "lift":
        "transition-transform hover:shadow-xl hover:-translate-y-1 duration-200",
      "glow":
        "transition-shadow hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] duration-200",
      "flip":
        "transition-transform hover:scale-105 duration-300 origin-center",
      "slide":
        "transition-transform hover:translate-x-2 duration-200 hover:shadow-lg",
    },
  },
  {
    name: "border-style",
    description: "Border animation style",
    values: {
      "pulse": "border-2 border-primary animate-pulse",
      "gradient": "border-2 border-gradient-primary",
      "underline": "border-b-2 border-primary transition-all hover:border-b-4",
    },
  },
];

const hoverCardHooks: ComponentHook = {
  beforeRender: (props) => {
    if (props.interactive && !props.onClick) {
      return {
        role: "button",
        tabIndex: 0,
      };
    }
    return undefined;
  },
  afterRender: (element, props) => {
    if (props.hoverable) {
      return element;
    }
    return element;
  },
};

export const hoverCardPlugin: Plugin = createPlugin({
  name: "hover-card-plugin",
  version: "1.0.0",
  description: "Adds hover effects and interactive variants to Card component",
  author: "LaunchApp Team",
  extensions: [
    {
      componentName: "Card",
      variants: hoverCardVariants,
      hooks: hoverCardHooks,
    },
  ],
  hooks: {
    onLoad: (registry) => {
      console.log("Hover Card Plugin loaded");
    },
    onUnload: (registry) => {
      console.log("Hover Card Plugin unloaded");
    },
  },
});
