export { getPluginManager, resetPluginManager } from "./PluginManager";
export type {
  PluginConfig,
  PluginContext,
  PluginManager,
  HookName,
  HookCallback,
  HookContext,
  CustomVariant,
  VariantRegistry,
} from "./types";
export { useVariant, getCustomVariant, getComponentVariants, hasCustomVariant } from "./useVariant";
