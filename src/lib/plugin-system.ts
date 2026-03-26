import { type VariantProps } from "class-variance-authority";
import * as React from "react";

export interface ComponentVariantDefinition {
  name: string;
  description?: string;
  values: Record<string, string | number>;
}

export interface ComponentHook {
  beforeRender?: (props: Record<string, any>) => Record<string, any> | void;
  afterRender?: (
    element: React.ReactElement,
    props: Record<string, any>
  ) => React.ReactElement;
  onMount?: (instance: React.Component | null) => void;
  onUnmount?: (instance: React.Component | null) => void;
}

export interface ComponentExtension {
  componentName: string;
  variants?: ComponentVariantDefinition[];
  hooks?: ComponentHook;
  styling?: Record<string, string>;
}

export interface Plugin {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  extensions: ComponentExtension[];
  hooks?: {
    onLoad?: (registry: PluginRegistry) => void;
    onUnload?: (registry: PluginRegistry) => void;
  };
}

export class PluginRegistry {
  private plugins = new Map<string, Plugin>();
  private variantRegistry = new Map<
    string,
    Map<string, ComponentVariantDefinition>
  >();
  private hookRegistry = new Map<string, ComponentHook[]>();

  registerPlugin(plugin: Plugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin with id "${plugin.id}" is already registered`);
      return;
    }

    this.plugins.set(plugin.id, plugin);

    plugin.extensions.forEach((ext) => {
      if (ext.variants) {
        if (!this.variantRegistry.has(ext.componentName)) {
          this.variantRegistry.set(ext.componentName, new Map());
        }
        const componentVariants = this.variantRegistry.get(ext.componentName)!;
        ext.variants.forEach((variant) => {
          componentVariants.set(variant.name, variant);
        });
      }

      if (ext.hooks) {
        if (!this.hookRegistry.has(ext.componentName)) {
          this.hookRegistry.set(ext.componentName, []);
        }
        this.hookRegistry.get(ext.componentName)!.push(ext.hooks);
      }
    });

    plugin.hooks?.onLoad?.(this);
  }

  unregisterPlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      console.warn(`Plugin with id "${pluginId}" not found`);
      return;
    }

    plugin.hooks?.onUnload?.(this);

    plugin.extensions.forEach((ext) => {
      if (ext.variants) {
        const componentVariants = this.variantRegistry.get(ext.componentName);
        if (componentVariants) {
          ext.variants.forEach((variant) => {
            componentVariants.delete(variant.name);
          });
        }
      }

      if (ext.hooks) {
        const hooks = this.hookRegistry.get(ext.componentName);
        if (hooks) {
          const index = hooks.indexOf(ext.hooks);
          if (index > -1) {
            hooks.splice(index, 1);
          }
        }
      }
    });

    this.plugins.delete(pluginId);
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getComponentVariants(componentName: string): ComponentVariantDefinition[] {
    const variants = this.variantRegistry.get(componentName);
    return variants ? Array.from(variants.values()) : [];
  }

  getComponentHooks(componentName: string): ComponentHook[] {
    return this.hookRegistry.get(componentName) || [];
  }

  getComponentVariant(
    componentName: string,
    variantName: string
  ): ComponentVariantDefinition | undefined {
    return this.variantRegistry.get(componentName)?.get(variantName);
  }

  applyHooks(
    componentName: string,
    element: React.ReactElement,
    props: Record<string, any>
  ): React.ReactElement {
    const hooks = this.getComponentHooks(componentName);
    let modifiedProps = { ...props };
    let modifiedElement = element;

    hooks.forEach((hook) => {
      if (hook.beforeRender) {
        const result = hook.beforeRender(modifiedProps);
        if (result) {
          modifiedProps = { ...modifiedProps, ...result };
        }
      }
    });

    hooks.forEach((hook) => {
      if (hook.afterRender) {
        modifiedElement = hook.afterRender(modifiedElement, modifiedProps);
      }
    });

    return modifiedElement;
  }

  clear(): void {
    this.plugins.clear();
    this.variantRegistry.clear();
    this.hookRegistry.clear();
  }
}

export const globalPluginRegistry = new PluginRegistry();

export function createPlugin(
  pluginDefinition: Omit<Plugin, "id">
): Plugin {
  return {
    id: `${pluginDefinition.name}@${pluginDefinition.version}`,
    ...pluginDefinition,
  };
}

export function withPlugins(
  Component: React.ComponentType<any>,
  componentName: string
) {
  return React.forwardRef<any, any>((props, ref) => {
    const hooks = globalPluginRegistry.getComponentHooks(componentName);
    let modifiedProps = { ...props };

    hooks.forEach((hook) => {
      if (hook.beforeRender) {
        const result = hook.beforeRender(modifiedProps);
        if (result) {
          modifiedProps = { ...modifiedProps, ...result };
        }
      }
    });

    let element = <Component {...modifiedProps} ref={ref} />;

    hooks.forEach((hook) => {
      if (hook.afterRender) {
        element = hook.afterRender(element, modifiedProps);
      }
    });

    return element;
  });
}
