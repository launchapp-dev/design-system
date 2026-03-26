import type {
  ComponentPlugin,
  PluginMetadata,
  RegisterPluginOptions,
  PluginQueryResult,
} from "./types";

class PluginRegistry {
  private plugins: Map<string, PluginMetadata[]> = new Map();
  private pluginIndex: Map<string, PluginMetadata> = new Map();

  /**
   * Register a plugin for a component
   */
  register(
    plugin: ComponentPlugin,
    options: RegisterPluginOptions = {}
  ): void {
    const {
      enabled = true,
      override = false,
      mergeConflicts = true,
    } = options;

    const pluginId = `${plugin.targetComponent}:${plugin.name}`;

    if (this.pluginIndex.has(pluginId) && !override) {
      throw new Error(
        `Plugin "${pluginId}" is already registered. Use { override: true } to replace it.`
      );
    }

    const metadata: PluginMetadata = {
      ...plugin,
      registeredAt: new Date(),
      enabled,
    };

    if (!this.plugins.has(plugin.targetComponent)) {
      this.plugins.set(plugin.targetComponent, []);
    }

    const componentPlugins = this.plugins.get(plugin.targetComponent)!;

    if (override) {
      const index = componentPlugins.findIndex((p) => p.name === plugin.name);
      if (index !== -1) {
        componentPlugins[index] = metadata;
      } else {
        componentPlugins.push(metadata);
      }
    } else {
      componentPlugins.push(metadata);
    }

    this.pluginIndex.set(pluginId, metadata);
  }

  /**
   * Unregister a plugin
   */
  unregister(targetComponent: string, pluginName: string): boolean {
    const pluginId = `${targetComponent}:${pluginName}`;
    const plugins = this.plugins.get(targetComponent);

    if (!plugins) {
      return false;
    }

    const index = plugins.findIndex((p) => p.name === pluginName);
    if (index === -1) {
      return false;
    }

    plugins.splice(index, 1);
    this.pluginIndex.delete(pluginId);

    if (plugins.length === 0) {
      this.plugins.delete(targetComponent);
    }

    return true;
  }

  /**
   * Get all plugins for a specific component
   */
  getForComponent(targetComponent: string): PluginMetadata[] {
    return this.plugins.get(targetComponent) || [];
  }

  /**
   * Get enabled plugins for a specific component
   */
  getEnabledForComponent(targetComponent: string): PluginMetadata[] {
    return this.getForComponent(targetComponent).filter((p) => p.enabled);
  }

  /**
   * Get a specific plugin
   */
  getPlugin(targetComponent: string, pluginName: string): PluginMetadata | undefined {
    const pluginId = `${targetComponent}:${pluginName}`;
    return this.pluginIndex.get(pluginId);
  }

  /**
   * Enable or disable a plugin
   */
  setEnabled(
    targetComponent: string,
    pluginName: string,
    enabled: boolean
  ): boolean {
    const plugin = this.getPlugin(targetComponent, pluginName);
    if (!plugin) {
      return false;
    }
    plugin.enabled = enabled;
    return true;
  }

  /**
   * Get all registered plugins
   */
  getAll(): PluginMetadata[] {
    return Array.from(this.pluginIndex.values());
  }

  /**
   * Query plugins by target component
   */
  query(targetComponent: string): PluginQueryResult {
    const plugins = this.getForComponent(targetComponent);
    return {
      plugins,
      targetComponent,
      count: plugins.length,
    };
  }

  /**
   * Clear all plugins (useful for testing)
   */
  clear(): void {
    this.plugins.clear();
    this.pluginIndex.clear();
  }

  /**
   * Get registry statistics
   */
  getStats(): {
    totalPlugins: number;
    totalComponents: number;
    enabledPlugins: number;
    disabledPlugins: number;
    pluginsByComponent: Record<string, number>;
  } {
    const allPlugins = this.getAll();
    const enabledPlugins = allPlugins.filter((p) => p.enabled).length;
    const disabledPlugins = allPlugins.length - enabledPlugins;

    const pluginsByComponent: Record<string, number> = {};
    this.plugins.forEach((plugins, component) => {
      pluginsByComponent[component] = plugins.length;
    });

    return {
      totalPlugins: allPlugins.length,
      totalComponents: this.plugins.size,
      enabledPlugins,
      disabledPlugins,
      pluginsByComponent,
    };
  }
}

export const createRegistry = (): PluginRegistry => new PluginRegistry();

export const defaultRegistry = createRegistry();

export default defaultRegistry;
