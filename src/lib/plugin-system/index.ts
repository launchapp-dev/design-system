export { pluginRegistry } from "./registry";
export { pluginLoader } from "./loader";
export { PluginLoader } from "./loader";

export {
  mergeVariants,
  applyBehaviorExtensions,
  getComponentExtensionsForName,
  getExtendedVariantsForComponent,
  wrapComponentWithBehaviors,
} from "./utils";

export type {
  DesignSystemPlugin,
  PluginMetadata,
  ComponentExtension,
  VariantExtension,
  BehaviorExtension,
  PluginRegistry,
  PluginLoadOptions,
} from "./types";
