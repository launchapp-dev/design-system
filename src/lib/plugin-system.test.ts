import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  PluginRegistry,
  createPlugin,
  type Plugin,
  type ComponentVariantDefinition,
} from "./plugin-system";

describe("PluginRegistry", () => {
  let registry: PluginRegistry;

  beforeEach(() => {
    registry = new PluginRegistry();
  });

  describe("registerPlugin", () => {
    it("should register a plugin successfully", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants: [
              {
                name: "custom",
                values: { test: "value" },
              },
            ],
          },
        ],
      });

      registry.registerPlugin(plugin);
      expect(registry.getPlugin(plugin.id)).toBe(plugin);
    });

    it("should warn when registering duplicate plugin", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [],
      });

      registry.registerPlugin(plugin);
      registry.registerPlugin(plugin);

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("should call onLoad hook when registering", () => {
      const onLoad = vi.fn();
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [],
        hooks: { onLoad },
      });

      registry.registerPlugin(plugin);
      expect(onLoad).toHaveBeenCalledWith(registry);
    });

    it("should register component variants", () => {
      const variants: ComponentVariantDefinition[] = [
        {
          name: "gradient",
          values: { primary: "bg-gradient-to-r from-blue-500 to-purple-600" },
        },
      ];

      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants,
          },
        ],
      });

      registry.registerPlugin(plugin);
      const registered = registry.getComponentVariants("Button");
      expect(registered).toHaveLength(1);
      expect(registered[0].name).toBe("gradient");
    });
  });

  describe("unregisterPlugin", () => {
    it("should unregister a plugin", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [],
      });

      registry.registerPlugin(plugin);
      registry.unregisterPlugin(plugin.id);
      expect(registry.getPlugin(plugin.id)).toBeUndefined();
    });

    it("should warn when unregistering non-existent plugin", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      registry.unregisterPlugin("non-existent-plugin");
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("should call onUnload hook when unregistering", () => {
      const onUnload = vi.fn();
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [],
        hooks: { onUnload },
      });

      registry.registerPlugin(plugin);
      registry.unregisterPlugin(plugin.id);
      expect(onUnload).toHaveBeenCalledWith(registry);
    });

    it("should remove component variants when unregistering", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants: [
              {
                name: "custom",
                values: { test: "value" },
              },
            ],
          },
        ],
      });

      registry.registerPlugin(plugin);
      expect(registry.getComponentVariants("Button")).toHaveLength(1);

      registry.unregisterPlugin(plugin.id);
      expect(registry.getComponentVariants("Button")).toHaveLength(0);
    });
  });

  describe("getComponentVariants", () => {
    it("should return empty array for component with no variants", () => {
      const variants = registry.getComponentVariants("Button");
      expect(variants).toEqual([]);
    });

    it("should return all variants for a component", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants: [
              {
                name: "gradient",
                values: { test: "value" },
              },
              {
                name: "animated",
                values: { test: "value" },
              },
            ],
          },
        ],
      });

      registry.registerPlugin(plugin);
      const variants = registry.getComponentVariants("Button");
      expect(variants).toHaveLength(2);
    });
  });

  describe("getComponentVariant", () => {
    it("should get a specific variant", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants: [
              {
                name: "gradient",
                description: "Gradient variant",
                values: { primary: "gradient-bg" },
              },
            ],
          },
        ],
      });

      registry.registerPlugin(plugin);
      const variant = registry.getComponentVariant("Button", "gradient");
      expect(variant).toBeDefined();
      expect(variant?.name).toBe("gradient");
      expect(variant?.description).toBe("Gradient variant");
    });

    it("should return undefined for non-existent variant", () => {
      const variant = registry.getComponentVariant("Button", "non-existent");
      expect(variant).toBeUndefined();
    });
  });

  describe("getComponentHooks", () => {
    it("should return empty array for component with no hooks", () => {
      const hooks = registry.getComponentHooks("Button");
      expect(hooks).toEqual([]);
    });

    it("should return hooks for a component", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            hooks: {
              beforeRender: (props) => ({ ...props }),
            },
          },
        ],
      });

      registry.registerPlugin(plugin);
      const hooks = registry.getComponentHooks("Button");
      expect(hooks).toHaveLength(1);
    });
  });

  describe("applyHooks", () => {
    it("should apply beforeRender hooks", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            hooks: {
              beforeRender: (props) => ({
                customProp: "added",
              }),
            },
          },
        ],
      });

      registry.registerPlugin(plugin);

      const element = <button>Test</button> as any;
      const result = registry.applyHooks("Button", element, {});

      expect(result).toBeDefined();
    });

    it("should apply afterRender hooks", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            hooks: {
              afterRender: (element) => element,
            },
          },
        ],
      });

      registry.registerPlugin(plugin);

      const element = <button>Test</button> as any;
      const result = registry.applyHooks("Button", element, {});

      expect(result).toBeDefined();
    });
  });

  describe("clear", () => {
    it("should clear all plugins and variants", () => {
      const plugin = createPlugin({
        name: "test-plugin",
        version: "1.0.0",
        extensions: [
          {
            componentName: "Button",
            variants: [
              {
                name: "custom",
                values: { test: "value" },
              },
            ],
          },
        ],
      });

      registry.registerPlugin(plugin);
      registry.clear();

      expect(registry.getPlugins()).toHaveLength(0);
      expect(registry.getComponentVariants("Button")).toHaveLength(0);
    });
  });

  describe("getPlugins", () => {
    it("should return all registered plugins", () => {
      const plugin1 = createPlugin({
        name: "plugin1",
        version: "1.0.0",
        extensions: [],
      });

      const plugin2 = createPlugin({
        name: "plugin2",
        version: "1.0.0",
        extensions: [],
      });

      registry.registerPlugin(plugin1);
      registry.registerPlugin(plugin2);

      const plugins = registry.getPlugins();
      expect(plugins).toHaveLength(2);
    });
  });
});

describe("createPlugin", () => {
  it("should create a plugin with proper id", () => {
    const plugin = createPlugin({
      name: "my-plugin",
      version: "1.0.0",
      extensions: [],
    });

    expect(plugin.id).toBe("my-plugin@1.0.0");
    expect(plugin.name).toBe("my-plugin");
    expect(plugin.version).toBe("1.0.0");
  });
});
