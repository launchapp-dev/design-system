import { describe, it, expect, beforeEach, vi } from "vitest";
import { pluginRegistry } from "../registry";
import { pluginLoader, PluginLoader } from "../loader";
import type { DesignSystemPlugin } from "../types";

describe("Plugin System", () => {
  const testPlugin: DesignSystemPlugin = {
    metadata: {
      name: "test-plugin",
      version: "1.0.0",
      description: "Test plugin",
      author: "Test",
    },
    componentExtensions: [
      {
        componentName: "Button",
        variants: [
          {
            name: "test-variants",
            variants: {
              variant: {
                test: "bg-red-500",
              },
            },
          },
        ],
      },
    ],
  };

  const testPluginWithHooks: DesignSystemPlugin = {
    metadata: {
      name: "test-plugin-hooks",
      version: "1.0.0",
    },
    componentExtensions: [],
    hooks: {
      onLoad: vi.fn(),
      onUnload: vi.fn(),
    },
  };

  beforeEach(() => {
    pluginRegistry["plugins"].clear();
  });

  describe("Plugin Registry", () => {
    it("should register a plugin", () => {
      pluginRegistry.register(testPlugin);
      expect(pluginRegistry.has("test-plugin")).toBe(true);
    });

    it("should retrieve a registered plugin", () => {
      pluginRegistry.register(testPlugin);
      const plugin = pluginRegistry.get("test-plugin");
      expect(plugin).toEqual(testPlugin);
    });

    it("should return all registered plugins", () => {
      pluginRegistry.register(testPlugin);
      pluginRegistry.register(testPluginWithHooks);
      const all = pluginRegistry.getAll();
      expect(all).toHaveLength(2);
    });

    it("should unregister a plugin", () => {
      pluginRegistry.register(testPlugin);
      expect(pluginRegistry.has("test-plugin")).toBe(true);
      pluginRegistry.unregister("test-plugin");
      expect(pluginRegistry.has("test-plugin")).toBe(false);
    });

    it("should get component extensions", () => {
      pluginRegistry.register(testPlugin);
      const extensions = pluginRegistry.getComponentExtensions("Button");
      expect(extensions).toHaveLength(1);
      expect(extensions[0].componentName).toBe("Button");
    });

    it("should get variant extensions", () => {
      pluginRegistry.register(testPlugin);
      const variants = pluginRegistry.getVariantExtensions("Button");
      expect(variants).toHaveLength(1);
      expect(variants[0].name).toBe("test-variants");
    });

    it("should handle non-existent plugin gracefully", () => {
      const plugin = pluginRegistry.get("non-existent");
      expect(plugin).toBeUndefined();
    });

    it("should warn when getting non-existent plugin", () => {
      const warnSpy = vi.spyOn(console, "warn");
      pluginRegistry.unregister("non-existent");
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("Plugin Loader", () => {
    it("should load a plugin", async () => {
      const loader = new PluginLoader();
      await loader.load(testPlugin);
      expect(loader.isLoaded("test-plugin")).toBe(true);
    });

    it("should call onLoad hook when loading", async () => {
      const loader = new PluginLoader();
      await loader.load(testPluginWithHooks);
      expect(testPluginWithHooks.hooks?.onLoad).toHaveBeenCalled();
    });

    it("should track loaded plugins", async () => {
      const loader = new PluginLoader();
      await loader.load(testPlugin);
      const loaded = loader.getLoadedPlugins();
      expect(loaded).toContain("test-plugin");
    });

    it("should unload a plugin", async () => {
      const loader = new PluginLoader();
      await loader.load(testPlugin);
      expect(loader.isLoaded("test-plugin")).toBe(true);
      loader.unload("test-plugin");
      expect(loader.isLoaded("test-plugin")).toBe(false);
    });

    it("should call onUnload hook when unloading", async () => {
      const loader = new PluginLoader();
      await loader.load(testPluginWithHooks);
      loader.unload("test-plugin-hooks");
      expect(testPluginWithHooks.hooks?.onUnload).toHaveBeenCalled();
    });

    it("should validate plugin structure", async () => {
      const loader = new PluginLoader();
      const invalidPlugin: DesignSystemPlugin = {
        metadata: {
          name: "",
          version: "1.0.0",
        },
        componentExtensions: [],
      };
      const warnSpy = vi.spyOn(console, "warn");
      await loader.load(invalidPlugin);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("should throw in strict mode for invalid plugin", async () => {
      const loader = new PluginLoader();
      const invalidPlugin: DesignSystemPlugin = {
        metadata: {
          name: "",
          version: "1.0.0",
        },
        componentExtensions: [],
      };
      await expect(
        loader.load(invalidPlugin, { strict: true })
      ).rejects.toThrow();
    });

    it("should load multiple plugins", async () => {
      const loader = new PluginLoader();
      await loader.loadMultiple([testPlugin, testPluginWithHooks]);
      expect(loader.getLoadedPlugins()).toHaveLength(2);
    });
  });

  describe("Plugin Loader Singleton", () => {
    it("should use pluginLoader singleton", async () => {
      pluginRegistry["plugins"].clear();
      await pluginLoader.load(testPlugin);
      expect(pluginLoader.isLoaded("test-plugin")).toBe(true);
      pluginLoader.unload("test-plugin");
    });
  });
});
