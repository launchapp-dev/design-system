// Plugin system exports

// Type definitions
export type {
  ComponentPlugin,
  PluginMetadata,
  RegisterPluginOptions,
  PluginQueryResult,
  PluginVariants,
  PluginDefaultVariants,
  BeforeRenderHook,
  AfterRenderHook,
  VariantStyleConfig,
  VariantGroup,
} from "./types";

// Registry
export { createRegistry, defaultRegistry } from "./registry";
export type { default as PluginRegistry } from "./registry";

// Utilities
export {
  mergeVariants,
  mergeDefaultVariants,
  applyPluginHooks,
  applyAfterRenderHooks,
  getActivePlugins,
  collectPluginVariants,
  collectPluginDefaultVariants,
} from "./utils";

// Hooks
export {
  useComponentPlugins,
  usePluginVariants,
  usePluginDefaultVariants,
  useApplyPlugins,
  useApplyAfterRenderHooks,
} from "./hooks";
