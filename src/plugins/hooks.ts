import { useMemo } from "react";
import type { PluginMetadata } from "./types";
import {
  getActivePlugins,
  collectPluginVariants,
  collectPluginDefaultVariants,
  applyPluginHooks,
  applyAfterRenderHooks,
} from "./utils";

/**
 * Hook to get active plugins for a component
 */
export function useComponentPlugins(componentName: string): PluginMetadata[] {
  return useMemo(() => getActivePlugins(componentName), [componentName]);
}

/**
 * Hook to get merged variant styles from plugins
 */
export function usePluginVariants(componentName: string) {
  return useMemo(() => collectPluginVariants(componentName), [componentName]);
}

/**
 * Hook to get merged default variants from plugins
 */
export function usePluginDefaultVariants(componentName: string) {
  return useMemo(
    () => collectPluginDefaultVariants(componentName),
    [componentName]
  );
}

/**
 * Hook to apply plugins to component props
 * Returns modified props and after-render hooks to apply
 */
export function useApplyPlugins(
  componentName: string,
  props: any
) {
  return useMemo(() => {
    const plugins = getActivePlugins(componentName);
    return applyPluginHooks(props, plugins);
  }, [componentName, props]);
}

/**
 * Hook to apply after-render hooks to a React element
 */
export function useApplyAfterRenderHooks(
  componentName: string,
  element: React.ReactElement
) {
  return useMemo(() => {
    const plugins = getActivePlugins(componentName);
    return applyAfterRenderHooks(element, plugins);
  }, [componentName, element]);
}
