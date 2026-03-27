import type { VariantProps } from "class-variance-authority";
import type React from "react";

export interface PluginMetadata {
  name: string;
  version: string;
  description?: string;
  author?: string;
}

export interface ComponentVariant {
  [key: string]: string | Record<string, string>;
}

export interface VariantExtension {
  name: string;
  variants: ComponentVariant;
  defaultVariants?: Record<string, string>;
}

export interface BehaviorExtension {
  name: string;
  hook?: (props: any) => any;
  wrapper?: (Component: React.ComponentType<any>) => React.ComponentType<any>;
  eventHandler?: (eventName: string, handler: Function) => Function;
}

export interface ComponentExtension {
  componentName: string;
  variants?: VariantExtension[];
  behaviors?: BehaviorExtension[];
  customProps?: Record<string, any>;
}

export interface DesignSystemPlugin {
  metadata: PluginMetadata;
  componentExtensions: ComponentExtension[];
  hooks?: {
    onLoad?: () => void | Promise<void>;
    onUnload?: () => void | Promise<void>;
  };
}

export interface PluginLoadOptions {
  validate?: boolean;
  strict?: boolean;
}

export interface PluginRegistry {
  register(plugin: DesignSystemPlugin): void;
  unregister(pluginName: string): void;
  get(pluginName: string): DesignSystemPlugin | undefined;
  getAll(): DesignSystemPlugin[];
  getComponentExtensions(componentName: string): ComponentExtension[];
  getVariantExtensions(componentName: string): VariantExtension[];
  getBehaviorExtensions(componentName: string): BehaviorExtension[];
  has(pluginName: string): boolean;
}
