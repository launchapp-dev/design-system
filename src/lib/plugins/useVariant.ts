import { useMemo } from "react";
import { cn } from "../utils";
import { getPluginManager } from "./PluginManager";
import type { CustomVariant } from "./types";

/**
 * Hook to resolve variant classes for a component
 * First checks the plugin registry, then falls back to a provided default variant
 *
 * @param componentName - Name of the component
 * @param variantName - Name of the variant to resolve
 * @param defaultClasses - Default classes to use if variant is not found
 * @returns Merged className string
 */
export function useVariant(
  componentName: string,
  variantName: string,
  defaultClasses: string = ""
): string {
  return useMemo(() => {
    const manager = getPluginManager();
    const variant = manager.getRegistry().getVariant(componentName, variantName);

    if (variant) {
      const variantClasses =
        typeof variant.classes === "string" ? variant.classes : Object.values(variant.classes).join(" ");
      return cn(defaultClasses, variantClasses);
    }

    return defaultClasses;
  }, [componentName, variantName, defaultClasses]);
}

/**
 * Get a custom variant by component and variant name
 *
 * @param componentName - Name of the component
 * @param variantName - Name of the variant
 * @returns The custom variant or undefined
 */
export function getCustomVariant(
  componentName: string,
  variantName: string
): CustomVariant | undefined {
  const manager = getPluginManager();
  return manager.getRegistry().getVariant(componentName, variantName);
}

/**
 * Get all custom variants for a component
 *
 * @param componentName - Name of the component
 * @returns Array of custom variants
 */
export function getComponentVariants(componentName: string): CustomVariant[] {
  const manager = getPluginManager();
  return manager.getRegistry().getAllVariants(componentName);
}

/**
 * Check if a custom variant exists
 *
 * @param componentName - Name of the component
 * @param variantName - Name of the variant
 * @returns True if the variant exists in the registry
 */
export function hasCustomVariant(componentName: string, variantName: string): boolean {
  const manager = getPluginManager();
  return manager.getRegistry().hasVariant(componentName, variantName);
}
