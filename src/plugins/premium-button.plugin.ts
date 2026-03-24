/**
 * Premium Button Plugin
 *
 * Adds premium variants to the Button component with gradient backgrounds
 * and enhanced visual effects.
 */

import { createPlugin } from "../lib/plugin-system";

/**
 * Premium button plugin with gradient variants
 *
 * @example
 * ```typescript
 * import { getPluginRegistry } from "@/lib/plugin-system";
 * import { premiumButtonPlugin } from "@/plugins/premium-button.plugin";
 *
 * const registry = getPluginRegistry();
 * registry.register(premiumButtonPlugin);
 *
 * // Now Button component can use variant="premium"
 * <Button variant="premium">Premium Action</Button>
 * ```
 */
export const premiumButtonPlugin = createPlugin({
  component: "Button",
  variants: {
    variant: {
      premium:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg",
      gold: "bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 hover:from-amber-500 hover:to-yellow-500 shadow-lg",
      neon: "bg-cyan-400 text-gray-900 hover:bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
    },
  },
  metadata: {
    name: "premium-button-plugin",
    version: "1.0.0",
    description: "Adds premium gradient button variants",
    author: "design-system",
  },
});

export default premiumButtonPlugin;
