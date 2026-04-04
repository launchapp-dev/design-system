/**
 * Hook lifecycle events that plugins can subscribe to
 */
export type HookName =
  | "component:before-render"
  | "component:after-render"
  | "variant:register"
  | "variant:resolve"
  | "theme:apply"
  | "theme:update";

/**
 * Hook callback function signature
 */
export type HookCallback = (context: HookContext) => void | Promise<void>;

/**
 * Context passed to hook callbacks
 */
export interface HookContext {
  componentName?: string;
  variantName?: string;
  variantValue?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Variant definition that can be registered by plugins
 */
export interface CustomVariant {
  name: string;
  componentName: string;
  classes: string | Record<string, string>;
  responsive?: boolean;
  description?: string;
}

/**
 * Plugin configuration
 */
export interface PluginConfig {
  name: string;
  version: string;
  description?: string;
  author?: string;
  variants?: CustomVariant[];
  hooks?: Record<HookName, HookCallback | HookCallback[]>;
  initialize?: (context: PluginContext) => void | Promise<void>;
}

/**
 * Context provided to plugins
 */
export interface PluginContext {
  registerVariant: (variant: CustomVariant) => void;
  registerHook: (hookName: HookName, callback: HookCallback) => void;
  getRegistry: () => VariantRegistry;
  getLoadedPlugins: () => PluginConfig[];
}

/**
 * Registry for managing variants
 */
export interface VariantRegistry {
  variants: Map<string, CustomVariant>;
  addVariant: (variant: CustomVariant) => void;
  getVariant: (
    componentName: string,
    variantName: string,
  ) => CustomVariant | undefined;
  getAllVariants: (componentName?: string) => CustomVariant[];
  hasVariant: (componentName: string, variantName: string) => boolean;
}

/**
 * Plugin manager interface
 */
export interface PluginManager {
  register: (plugin: PluginConfig) => Promise<void>;
  unregister: (pluginName: string) => void;
  getPlugin: (pluginName: string) => PluginConfig | undefined;
  getPlugins: () => PluginConfig[];
  emit: (hookName: HookName, context: HookContext) => Promise<void>;
  getRegistry: () => VariantRegistry;
}
