import type {
  PluginConfig,
  PluginContext,
  PluginManager,
  HookName,
  HookContext,
  VariantRegistry,
  CustomVariant,
  HookCallback,
} from "./types";

class VariantRegistryImpl implements VariantRegistry {
  variants: Map<string, CustomVariant> = new Map();

  addVariant(variant: CustomVariant): void {
    const key = `${variant.componentName}:${variant.name}`;
    this.variants.set(key, variant);
  }

  getVariant(componentName: string, variantName: string): CustomVariant | undefined {
    const key = `${componentName}:${variantName}`;
    return this.variants.get(key);
  }

  getAllVariants(componentName?: string): CustomVariant[] {
    const variants = Array.from(this.variants.values());
    if (componentName) {
      return variants.filter((v) => v.componentName === componentName);
    }
    return variants;
  }

  hasVariant(componentName: string, variantName: string): boolean {
    const key = `${componentName}:${variantName}`;
    return this.variants.has(key);
  }
}

class PluginManagerImpl implements PluginManager {
  private plugins: Map<string, PluginConfig> = new Map();
  private hooks: Map<HookName, HookCallback[]> = new Map();
  private registry: VariantRegistry = new VariantRegistryImpl();

  async register(plugin: PluginConfig): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered. Skipping duplicate registration.`);
      return;
    }

    const context: PluginContext = {
      registerVariant: (variant: CustomVariant) => {
        this.registry.addVariant(variant);
        this.emitSync("variant:register", {
          componentName: variant.componentName,
          variantName: variant.name,
        });
      },
      registerHook: (hookName: HookName, callback: HookCallback) => {
        if (!this.hooks.has(hookName)) {
          this.hooks.set(hookName, []);
        }
        this.hooks.get(hookName)?.push(callback);
      },
      getRegistry: () => this.registry,
      getLoadedPlugins: () => Array.from(this.plugins.values()),
    };

    this.plugins.set(plugin.name, plugin);

    if (plugin.variants) {
      for (const variant of plugin.variants) {
        this.registry.addVariant(variant);
      }
    }

    if (plugin.hooks) {
      for (const [hookName, callbacks] of Object.entries(plugin.hooks)) {
        const hookCallbacks = Array.isArray(callbacks) ? callbacks : [callbacks];
        if (!this.hooks.has(hookName as HookName)) {
          this.hooks.set(hookName as HookName, []);
        }
        this.hooks.get(hookName as HookName)?.push(...hookCallbacks);
      }
    }

    if (plugin.initialize) {
      await plugin.initialize(context);
    }
  }

  unregister(pluginName: string): void {
    this.plugins.delete(pluginName);
  }

  getPlugin(pluginName: string): PluginConfig | undefined {
    return this.plugins.get(pluginName);
  }

  getPlugins(): PluginConfig[] {
    return Array.from(this.plugins.values());
  }

  private emitSync(hookName: HookName, context: HookContext): void {
    const callbacks = this.hooks.get(hookName);
    if (callbacks) {
      for (const callback of callbacks) {
        try {
          callback(context);
        } catch (error) {
          console.error(`Error executing hook "${hookName}":`, error);
        }
      }
    }
  }

  async emit(hookName: HookName, context: HookContext): Promise<void> {
    const callbacks = this.hooks.get(hookName);
    if (callbacks) {
      for (const callback of callbacks) {
        try {
          await callback(context);
        } catch (error) {
          console.error(`Error executing hook "${hookName}":`, error);
        }
      }
    }
  }

  getRegistry(): VariantRegistry {
    return this.registry;
  }
}

let globalPluginManager: PluginManager | null = null;

/**
 * Get the global plugin manager instance (singleton)
 */
export function getPluginManager(): PluginManager {
  if (!globalPluginManager) {
    globalPluginManager = new PluginManagerImpl();
  }
  return globalPluginManager;
}

/**
 * Reset the plugin manager (useful for testing)
 */
export function resetPluginManager(): void {
  globalPluginManager = null;
}

export { PluginManagerImpl };
