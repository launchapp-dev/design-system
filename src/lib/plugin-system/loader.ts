import type { DesignSystemPlugin, PluginLoadOptions } from "./types";
import { pluginRegistry } from "./registry";

export class PluginLoader {
  private loadedPlugins: Set<string> = new Set();

  async load(
    plugin: DesignSystemPlugin,
    options: PluginLoadOptions = {}
  ): Promise<void> {
    const { validate = true, strict = false } = options;

    if (validate) {
      this.validatePlugin(plugin, strict);
    }

    const pluginName = plugin.metadata.name;

    if (this.loadedPlugins.has(pluginName)) {
      if (strict) {
        throw new Error(`Plugin "${pluginName}" is already loaded.`);
      }
      console.warn(`Plugin "${pluginName}" is already loaded.`);
      return;
    }

    try {
      pluginRegistry.register(plugin);
      this.loadedPlugins.add(pluginName);
    } catch (error) {
      if (strict) {
        throw error;
      }
      console.error(`Failed to load plugin "${pluginName}":`, error);
    }
  }

  async loadMultiple(
    plugins: DesignSystemPlugin[],
    options: PluginLoadOptions = {}
  ): Promise<void> {
    for (const plugin of plugins) {
      await this.load(plugin, options);
    }
  }

  unload(pluginName: string, strict: boolean = false): void {
    if (!this.loadedPlugins.has(pluginName)) {
      if (strict) {
        throw new Error(`Plugin "${pluginName}" is not loaded.`);
      }
      console.warn(`Plugin "${pluginName}" is not loaded.`);
      return;
    }

    try {
      pluginRegistry.unregister(pluginName);
      this.loadedPlugins.delete(pluginName);
    } catch (error) {
      if (strict) {
        throw error;
      }
      console.error(`Failed to unload plugin "${pluginName}":`, error);
    }
  }

  getLoadedPlugins(): string[] {
    return Array.from(this.loadedPlugins);
  }

  isLoaded(pluginName: string): boolean {
    return this.loadedPlugins.has(pluginName);
  }

  private validatePlugin(plugin: DesignSystemPlugin, strict: boolean): void {
    const { metadata, componentExtensions } = plugin;

    if (!metadata?.name) {
      const msg = "Plugin metadata must include a name";
      if (strict) {
        throw new Error(msg);
      }
      console.warn(msg);
    }

    if (!metadata?.version) {
      const msg = "Plugin metadata should include a version";
      if (strict) {
        throw new Error(msg);
      }
      console.warn(msg);
    }

    if (!Array.isArray(componentExtensions)) {
      const msg = "Plugin must include componentExtensions array";
      if (strict) {
        throw new Error(msg);
      }
      console.warn(msg);
    }

    for (const ext of componentExtensions) {
      if (!ext.componentName) {
        const msg = `Component extension missing componentName`;
        if (strict) {
          throw new Error(msg);
        }
        console.warn(msg);
      }
    }
  }
}

export const pluginLoader = new PluginLoader();
