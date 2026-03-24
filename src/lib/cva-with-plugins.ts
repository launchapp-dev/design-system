/**
 * CVA Integration with Plugin System
 *
 * Provides utilities to create CVA variant configurations that automatically
 * merge with registered plugins at runtime.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { getPluginRegistry } from "./plugin-system";

/**
 * Create a CVA configuration that supports plugins
 *
 * This higher-order function creates a CVA config that automatically
 * merges with any registered plugins for the component. Plugins are
 * applied in registration order, allowing later plugins to override
 * earlier variant definitions.
 *
 * @param componentName - The component name for plugin registration
 * @param baseClasses - The base CSS classes
 * @param baseConfig - The CVA configuration object
 * @returns A new CVA function with plugin support
 *
 * @example
 * ```typescript
 * const buttonVariants = cvaWithPlugins("Button", "inline-flex items-center...", {
 *   variants: {
 *     variant: {
 *       default: "bg-blue-500...",
 *     },
 *     size: {
 *       md: "px-4 py-2...",
 *     },
 *   },
 * });
 * ```
 */
export function cvaWithPlugins(
  componentName: string,
  baseClasses: string,
  baseConfig: any
) {
  // Create a proxy that merges variants at call time
  return function (props?: any) {
    const registry = getPluginRegistry();
    const mergedVariants = registry.mergeVariants(
      componentName,
      baseConfig.variants || {}
    );

    // Create a new config with merged variants
    const configWithPlugins = {
      ...baseConfig,
      variants: mergedVariants,
    };

    // Use CVA with the merged config
    const cvaFn = cva(baseClasses, configWithPlugins);

    return cvaFn(props);
  };
}

/**
 * Alternative approach: Create CVA variants that can be extended by plugins
 *
 * This creates a variants object ready for use with CVA, but also
 * exposes the base variants for consumers who want to manually apply plugins.
 *
 * @param componentName - The component name for plugin registration
 * @param baseVariants - The base variants object
 * @returns Object with base variants and a method to get merged variants
 */
export function createExtensibleVariants<
  T extends Record<string, Record<string, string>>
>(componentName: string, baseVariants: T) {
  return {
    base: baseVariants,
    getMergedVariants: () => {
      const registry = getPluginRegistry();
      return registry.mergeVariants(componentName, baseVariants);
    },
  };
}
