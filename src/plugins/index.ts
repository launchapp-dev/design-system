// Plugin system exports

// Hooks
export {
  useApplyAfterRenderHooks,
  useApplyPlugins,
  useComponentPlugins,
  usePluginDefaultVariants,
  usePluginVariants,
} from "./hooks";
export type { default as PluginRegistry } from "./registry";
// Registry
export { createRegistry, defaultRegistry } from "./registry";
// Type definitions
export type {
  AfterRenderHook,
  BeforeRenderHook,
  ComponentPlugin,
  PluginDefaultVariants,
  PluginMetadata,
  PluginQueryResult,
  PluginVariants,
  RegisterPluginOptions,
  VariantGroup,
  VariantStyleConfig,
} from "./types";
// Utilities
export {
  applyAfterRenderHooks,
  applyPluginHooks,
  collectPluginDefaultVariants,
  collectPluginVariants,
  getActivePlugins,
  mergeDefaultVariants,
  mergeVariants,
} from "./utils";
