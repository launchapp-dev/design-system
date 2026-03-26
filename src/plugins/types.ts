import type { VariantProps } from "class-variance-authority";

/**
 * Represents a single variant value's style configuration
 */
export type VariantStyleConfig = string;

/**
 * Represents a group of variant values (e.g., size: { sm: "...", md: "...", lg: "..." })
 */
export type VariantGroup = Record<string, VariantStyleConfig>;

/**
 * Plugin variant configuration
 */
export interface PluginVariants {
  [variantName: string]: VariantGroup;
}

/**
 * Default variant values for a plugin
 */
export interface PluginDefaultVariants {
  [variantName: string]: string;
}

/**
 * Lifecycle hook for modifying component props before render
 */
export type BeforeRenderHook = (
  props: Record<string, any>
) => Record<string, any>;

/**
 * Lifecycle hook for modifying component element after render
 */
export type AfterRenderHook = (
  element: React.ReactElement
) => React.ReactElement;

/**
 * Configuration for extending a component with new variants and behaviors
 */
export interface ComponentPlugin {
  /** Unique identifier for the plugin */
  name: string;

  /** Semantic version of the plugin */
  version: string;

  /** Name of the component this plugin targets (e.g., "Button", "Badge") */
  targetComponent: string;

  /** New variant definitions to add or merge with component variants */
  variants?: PluginVariants;

  /** Default values for plugin variants */
  defaultVariants?: PluginDefaultVariants;

  /** Optional lifecycle hook called before component renders */
  beforeRender?: BeforeRenderHook;

  /** Optional lifecycle hook called after component renders */
  afterRender?: AfterRenderHook;

  /** Description of what this plugin does */
  description?: string;

  /** Author of the plugin */
  author?: string;

  /** Repository URL */
  repository?: string;

  /** Minimum component version required */
  minComponentVersion?: string;

  /** Maximum component version supported */
  maxComponentVersion?: string;
}

/**
 * Plugin metadata for registry discovery
 */
export interface PluginMetadata extends ComponentPlugin {
  registeredAt: Date;
  enabled: boolean;
}

/**
 * Options for registering a plugin
 */
export interface RegisterPluginOptions {
  /** Automatically merge variant styles if keys conflict */
  mergeConflicts?: boolean;

  /** Enable the plugin immediately after registration */
  enabled?: boolean;

  /** Override existing variants with same name */
  override?: boolean;
}

/**
 * Plugin registry query result
 */
export interface PluginQueryResult {
  plugins: PluginMetadata[];
  targetComponent: string;
  count: number;
}
