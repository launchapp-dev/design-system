import type {
  DesignSystemPlugin,
  PluginRegistry,
  ComponentExtension,
  VariantExtension,
  BehaviorExtension,
} from "./types";

class PluginRegistryImpl implements PluginRegistry {
  private plugins: Map<string, DesignSystemPlugin> = new Map();

  register(plugin: DesignSystemPlugin): void {
    const name = plugin.metadata.name;

    if (this.plugins.has(name)) {
      console.warn(
        `Plugin "${name}" is already registered. Overwriting previous plugin.`
      );
    }

    this.plugins.set(name, plugin);

    if (plugin.hooks?.onLoad) {
      try {
        plugin.hooks.onLoad();
      } catch (error) {
        console.error(`Error loading plugin "${name}":`, error);
        this.plugins.delete(name);
        throw error;
      }
    }
  }

  unregister(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);

    if (!plugin) {
      console.warn(`Plugin "${pluginName}" not found in registry.`);
      return;
    }

    if (plugin.hooks?.onUnload) {
      try {
        plugin.hooks.onUnload();
      } catch (error) {
        console.error(`Error unloading plugin "${pluginName}":`, error);
      }
    }

    this.plugins.delete(pluginName);
  }

  get(pluginName: string): DesignSystemPlugin | undefined {
    return this.plugins.get(pluginName);
  }

  getAll(): DesignSystemPlugin[] {
    return Array.from(this.plugins.values());
  }

  has(pluginName: string): boolean {
    return this.plugins.has(pluginName);
  }

  getComponentExtensions(componentName: string): ComponentExtension[] {
    const extensions: ComponentExtension[] = [];

    for (const plugin of this.plugins.values()) {
      const componentExts = plugin.componentExtensions.filter(
        (ext) => ext.componentName === componentName
      );
      extensions.push(...componentExts);
    }

    return extensions;
  }

  getVariantExtensions(componentName: string): VariantExtension[] {
    const extensions: VariantExtension[] = [];

    for (const ext of this.getComponentExtensions(componentName)) {
      if (ext.variants) {
        extensions.push(...ext.variants);
      }
    }

    return extensions;
  }

  getBehaviorExtensions(componentName: string): BehaviorExtension[] {
    const extensions: BehaviorExtension[] = [];

    for (const ext of this.getComponentExtensions(componentName)) {
      if (ext.behaviors) {
        extensions.push(...ext.behaviors);
      }
    }

    return extensions;
  }
}

export const pluginRegistry = new PluginRegistryImpl();
