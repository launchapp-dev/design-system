import { describe, it, expect, beforeEach } from "vitest";
import { PluginRegistry, createPlugin, getPluginRegistry } from "./plugin-system";
import type { ComponentPlugin } from "./plugin-system";

describe("Plugin System", () => {
  let registry: PluginRegistry;

  beforeEach(() => {
    registry = PluginRegistry.getInstance();
    registry.clear();
  });

  describe("PluginRegistry", () => {
    it("should be a singleton", () => {
      const registry1 = PluginRegistry.getInstance();
      const registry2 = PluginRegistry.getInstance();
      expect(registry1).toBe(registry2);
    });

    it("should register a single plugin", () => {
      const plugin = createPlugin({
        component: "Button",
        variants: {
          variant: {
            custom: "bg-blue-500",
          },
        },
      });

      registry.register(plugin);
      const plugins = registry.getPlugins("Button");
      expect(plugins).toHaveLength(1);
      expect(plugins[0]).toBe(plugin);
    });

    it("should merge plugin variants with base variants", () => {
      const baseVariants = {
        variant: {
          default: "bg-blue-500",
          outline: "border border-blue-500",
        },
      };

      const plugin = createPlugin({
        component: "Button",
        variants: {
          variant: {
            custom: "bg-gradient-to-r from-purple-500 to-pink-500",
          },
        },
      });

      registry.register(plugin);
      const merged = registry.mergeVariants("Button", baseVariants);

      expect(merged.variant).toEqual({
        default: "bg-blue-500",
        outline: "border border-blue-500",
        custom: "bg-gradient-to-r from-purple-500 to-pink-500",
      });
    });

    it("should allow later plugins to override earlier variants", () => {
      const baseVariants = {
        variant: {
          custom: "bg-blue-500",
        },
      };

      const plugin1 = createPlugin({
        component: "Button",
        variants: {
          variant: {
            custom: "bg-red-500",
          },
        },
      });

      const plugin2 = createPlugin({
        component: "Button",
        variants: {
          variant: {
            custom: "bg-green-500",
          },
        },
      });

      registry.register(plugin1);
      registry.register(plugin2);

      const merged = registry.mergeVariants("Button", baseVariants);
      expect(merged.variant.custom).toBe("bg-green-500");
    });

    it("should clear all plugins", () => {
      registry.register(
        createPlugin({
          component: "Button",
          variants: { variant: { custom: "bg-blue-500" } },
        })
      );

      expect(registry.getPlugins("Button")).toHaveLength(1);
      registry.clear();
      expect(registry.getPlugins("Button")).toHaveLength(0);
    });
  });

  describe("getPluginRegistry", () => {
    it("should return singleton instance", () => {
      const reg1 = getPluginRegistry();
      const reg2 = getPluginRegistry();
      expect(reg1).toBe(reg2);
    });
  });

  describe("createPlugin", () => {
    it("should create a valid plugin", () => {
      const plugin = createPlugin({
        component: "Button",
        variants: {
          variant: {
            custom: "bg-blue-500",
          },
        },
        metadata: {
          name: "my-plugin",
          version: "1.0.0",
        },
      });

      expect(plugin.component).toBe("Button");
      expect(plugin.variants).toBeDefined();
      expect(plugin.metadata?.name).toBe("my-plugin");
    });
  });
});
