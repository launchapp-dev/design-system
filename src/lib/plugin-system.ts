/**
 * Design System Plugin API
 *
 * Allows developers to author and consume custom variants for design system components
 * without forking the library. Plugins can extend component variants at build-time or
 * runtime through a standardized registry interface.
 */

import type { VariantProps } from "class-variance-authority";

/**
 * Plugin configuration for a single component
 *
 * @template T - The CVA configuration object type
 */
export interface ComponentPlugin<T extends Record<string, any>> {
  /** Component name this plugin extends (e.g., "Button", "Badge") */
  component: string;

  /** Additional variants to merge with the component's default variants */
  variants?: Record<string, Record<string, string>>;

  /** Metadata about the plugin for introspection and debugging */
  metadata?: {
    /** Plugin name for identification */
    name: string;
    /** Plugin version */
    version: string;
    /** Plugin description */
    description?: string;
    /** Plugin author/maintainer */
    author?: string;
  };
}

/**
 * Registry for managing component plugins
 *
 * Collects plugins by component and provides utilities to merge
 * plugin variants with component defaults at runtime.
 */
export class PluginRegistry {
  private static instance: PluginRegistry;
  private plugins: Map<string, ComponentPlugin<any>[]> = new Map();

  private constructor() {}

  /**
   * Get singleton instance of the plugin registry
   */
  static getInstance(): PluginRegistry {
    if (!PluginRegistry.instance) {
      PluginRegistry.instance = new PluginRegistry();
    }
    return PluginRegistry.instance;
  }

  /**
   * Register a plugin for a component
   *
   * Plugins are applied in registration order. Later plugins
   * can override earlier variants with the same keys.
   */
  register(plugin: ComponentPlugin<any>): void {
    if (!plugin.component) {
      throw new Error("Plugin must specify a component name");
    }

    const componentName = plugin.component;
    if (!this.plugins.has(componentName)) {
      this.plugins.set(componentName, []);
    }

    this.plugins.get(componentName)!.push(plugin);
  }

  /**
   * Register multiple plugins at once
   */
  registerBatch(plugins: ComponentPlugin<any>[]): void {
    plugins.forEach((plugin) => this.register(plugin));
  }

  /**
   * Get all plugins for a component
   */
  getPlugins(component: string): ComponentPlugin<any>[] {
    return this.plugins.get(component) || [];
  }

  /**
   * Merge plugin variants with base variants
   *
   * Creates a new variants object that includes both the component's
   * default variants and any variants defined by registered plugins.
   *
   * Plugin variants are merged in registration order, so later plugins
   * can override earlier variant definitions.
   */
  mergeVariants(
    component: string,
    baseVariants: Record<string, Record<string, string>>
  ): Record<string, Record<string, string>> {
    const plugins = this.getPlugins(component);

    if (plugins.length === 0) {
      return baseVariants;
    }

    const merged: Record<string, Record<string, string>> = { ...baseVariants };

    for (const plugin of plugins) {
      if (!plugin.variants) continue;

      for (const [variantKey, variantValues] of Object.entries(
        plugin.variants
      )) {
        if (variantKey in merged) {
          // Merge with existing variant group
          merged[variantKey] = {
            ...merged[variantKey],
            ...variantValues,
          };
        } else {
          // Add new variant group
          merged[variantKey] = variantValues;
        }
      }
    }

    return merged;
  }

  /**
   * Clear all registered plugins (useful for testing)
   */
  clear(): void {
    this.plugins.clear();
  }

  /**
   * Get metadata about registered plugins for debugging
   */
  getMetadata(component?: string): Record<string, any> {
    if (component) {
      const plugins = this.getPlugins(component);
      return {
        component,
        pluginCount: plugins.length,
        plugins: plugins.map((p) => ({
          component: p.component,
          metadata: p.metadata,
          variantKeys: p.variants ? Object.keys(p.variants) : [],
        })),
      };
    }

    const metadata: Record<string, any> = {};
    for (const [comp, pluginList] of this.plugins.entries()) {
      metadata[comp] = {
        pluginCount: pluginList.length,
        plugins: pluginList.map((p) => ({
          metadata: p.metadata,
          variantKeys: p.variants ? Object.keys(p.variants) : [],
        })),
      };
    }
    return metadata;
  }
}

/**
 * Convenience function to get the global plugin registry
 */
export function getPluginRegistry(): PluginRegistry {
  return PluginRegistry.getInstance();
}

/**
 * Helper to create a plugin with full type safety
 *
 * @example
 * ```typescript
 * const myButtonPlugin = createPlugin({
 *   component: "Button",
 *   variants: {
 *     variant: {
 *       premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
 *     },
 *   },
 *   metadata: {
 *     name: "premium-button-plugin",
 *     version: "1.0.0",
 *     author: "my-org",
 *   },
 * });
 * ```
 */
export function createPlugin<T extends Record<string, any>>(
  config: ComponentPlugin<T>
): ComponentPlugin<T> {
  return config;
}
