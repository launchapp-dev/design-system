import type { VariantProps } from "class-variance-authority";
import type { PluginMetadata, PluginVariants } from "./types";
import defaultRegistry from "./registry";

/**
 * Merge plugin variants with component variants
 * Plugin variants take precedence over component variants for conflicting keys
 */
export function mergeVariants(
  componentVariants: PluginVariants,
  pluginVariants: PluginVariants[]
): PluginVariants {
  const merged = { ...componentVariants };

  for (const plugin of pluginVariants) {
    for (const [variantName, variantGroup] of Object.entries(plugin)) {
      if (!merged[variantName]) {
        merged[variantName] = {};
      }
      merged[variantName] = {
        ...merged[variantName],
        ...variantGroup,
      };
    }
  }

  return merged;
}

/**
 * Merge default variants from multiple sources
 */
export function mergeDefaultVariants(
  componentDefaults: Record<string, string> = {},
  pluginDefaults: Record<string, string>[] = []
): Record<string, string> {
  const merged = { ...componentDefaults };

  for (const defaults of pluginDefaults) {
    Object.assign(merged, defaults);
  }

  return merged;
}

/**
 * Apply plugin-level before/after hooks to props
 */
export function applyPluginHooks(
  props: any,
  plugins: PluginMetadata[]
): { props: any; afterHooks: PluginMetadata[] } {
  let currentProps = props;
  const afterHooks: PluginMetadata[] = [];

  for (const plugin of plugins) {
    if (plugin.beforeRender) {
      currentProps = plugin.beforeRender(currentProps);
    }
    if (plugin.afterRender) {
      afterHooks.push(plugin);
    }
  }

  return { props: currentProps, afterHooks };
}

/**
 * Apply plugin-level after render hooks to element
 */
export function applyAfterRenderHooks(
  element: React.ReactElement,
  plugins: PluginMetadata[]
): React.ReactElement {
  let currentElement = element;

  for (const plugin of plugins) {
    if (plugin.afterRender) {
      currentElement = plugin.afterRender(currentElement);
    }
  }

  return currentElement;
}

/**
 * Get active plugins for a component
 */
export function getActivePlugins(componentName: string): PluginMetadata[] {
  return defaultRegistry.getEnabledForComponent(componentName);
}

/**
 * Collect all variant styles from plugins for a component
 */
export function collectPluginVariants(
  componentName: string
): PluginVariants {
  const plugins = getActivePlugins(componentName);
  const collected: PluginVariants = {};

  for (const plugin of plugins) {
    if (plugin.variants) {
      for (const [variantName, variantGroup] of Object.entries(
        plugin.variants
      )) {
        if (!collected[variantName]) {
          collected[variantName] = {};
        }
        collected[variantName] = {
          ...collected[variantName],
          ...variantGroup,
        };
      }
    }
  }

  return collected;
}

/**
 * Collect default variants from plugins for a component
 */
export function collectPluginDefaultVariants(
  componentName: string
): Record<string, string> {
  const plugins = getActivePlugins(componentName);
  const collected: Record<string, string> = {};

  for (const plugin of plugins) {
    if (plugin.defaultVariants) {
      Object.assign(collected, plugin.defaultVariants);
    }
  }

  return collected;
}
