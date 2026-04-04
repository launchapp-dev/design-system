import { beforeEach, describe, expect, it } from "vitest";
import { createRegistry } from "./registry";
import type { ComponentPlugin } from "./types";
import { mergeDefaultVariants, mergeVariants } from "./utils";

describe("Plugin Registry", () => {
  let registry = createRegistry();

  beforeEach(() => {
    registry = createRegistry();
  });

  const testPlugin: ComponentPlugin = {
    name: "test-plugin",
    version: "1.0.0",
    targetComponent: "Button",
    variants: {
      size: {
        xl: "h-14 px-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
    description: "Test plugin",
  };

  it("should register a plugin", () => {
    registry.register(testPlugin);
    const plugin = registry.getPlugin("Button", "test-plugin");
    expect(plugin).toBeDefined();
    expect(plugin?.name).toBe("test-plugin");
  });

  it("should prevent duplicate plugin registration without override", () => {
    registry.register(testPlugin);
    expect(() => registry.register(testPlugin)).toThrow();
  });

  it("should allow override of existing plugin", () => {
    registry.register(testPlugin);
    const updated = { ...testPlugin, version: "2.0.0" };
    registry.register(updated, { override: true });
    const plugin = registry.getPlugin("Button", "test-plugin");
    expect(plugin?.version).toBe("2.0.0");
  });

  it("should get plugins for a component", () => {
    registry.register(testPlugin);
    const plugins = registry.getForComponent("Button");
    expect(plugins).toHaveLength(1);
    expect(plugins[0].name).toBe("test-plugin");
  });

  it("should unregister a plugin", () => {
    registry.register(testPlugin);
    const success = registry.unregister("Button", "test-plugin");
    expect(success).toBe(true);
    const plugin = registry.getPlugin("Button", "test-plugin");
    expect(plugin).toBeUndefined();
  });

  it("should enable/disable plugins", () => {
    registry.register(testPlugin, { enabled: true });
    let plugin = registry.getPlugin("Button", "test-plugin");
    expect(plugin?.enabled).toBe(true);

    registry.setEnabled("Button", "test-plugin", false);
    plugin = registry.getPlugin("Button", "test-plugin");
    expect(plugin?.enabled).toBe(false);
  });

  it("should get only enabled plugins", () => {
    registry.register(testPlugin, { enabled: true });
    const plugin2: ComponentPlugin = {
      ...testPlugin,
      name: "disabled-plugin",
    };
    registry.register(plugin2, { enabled: false });

    const enabled = registry.getEnabledForComponent("Button");
    expect(enabled).toHaveLength(1);
    expect(enabled[0].name).toBe("test-plugin");
  });

  it("should query plugins", () => {
    registry.register(testPlugin);
    const result = registry.query("Button");
    expect(result.targetComponent).toBe("Button");
    expect(result.count).toBe(1);
    expect(result.plugins).toHaveLength(1);
  });

  it("should get all plugins", () => {
    registry.register(testPlugin);
    const plugin2: ComponentPlugin = {
      ...testPlugin,
      name: "plugin-2",
      targetComponent: "Badge",
    };
    registry.register(plugin2);

    const all = registry.getAll();
    expect(all).toHaveLength(2);
  });

  it("should clear all plugins", () => {
    registry.register(testPlugin);
    registry.clear();
    expect(registry.getAll()).toHaveLength(0);
  });

  it("should get registry stats", () => {
    registry.register(testPlugin, { enabled: true });
    const plugin2: ComponentPlugin = {
      ...testPlugin,
      name: "plugin-2",
      targetComponent: "Button",
    };
    registry.register(plugin2, { enabled: false });

    const stats = registry.getStats();
    expect(stats.totalPlugins).toBe(2);
    expect(stats.enabledPlugins).toBe(1);
    expect(stats.disabledPlugins).toBe(1);
    expect(stats.totalComponents).toBe(1);
    expect(stats.pluginsByComponent.Button).toBe(2);
  });
});

describe("Plugin Utilities", () => {
  it("should merge variants correctly", () => {
    const baseVariants = {
      size: {
        sm: "h-8",
        md: "h-10",
      },
    };

    const pluginVariants = [
      {
        size: {
          lg: "h-12",
          xl: "h-14",
        },
      },
    ];

    const merged = mergeVariants(baseVariants, pluginVariants);
    expect(Object.keys(merged.size)).toContain("sm");
    expect(Object.keys(merged.size)).toContain("lg");
    expect(Object.keys(merged.size)).toContain("xl");
  });

  it("should merge default variants", () => {
    const baseDefaults = {
      size: "md",
    };

    const pluginDefaults = [
      {
        variant: "primary",
      },
    ];

    const merged = mergeDefaultVariants(baseDefaults, pluginDefaults);
    expect(merged.size).toBe("md");
    expect(merged.variant).toBe("primary");
  });

  it("should handle plugin variant conflicts (plugin wins)", () => {
    const baseVariants = {
      size: {
        lg: "h-12",
      },
    };

    const pluginVariants = [
      {
        size: {
          lg: "h-14", // Override base
        },
      },
    ];

    const merged = mergeVariants(baseVariants, pluginVariants);
    expect(merged.size.lg).toBe("h-14");
  });
});

describe("Plugin Hooks (with simulated registry)", () => {
  let registry = createRegistry();

  beforeEach(() => {
    registry = createRegistry();
  });

  it("should collect plugin variants", () => {
    const plugin1: ComponentPlugin = {
      name: "p1",
      version: "1.0.0",
      targetComponent: "Button",
      variants: {
        size: { xl: "h-14" },
      },
    };

    const plugin2: ComponentPlugin = {
      name: "p2",
      version: "1.0.0",
      targetComponent: "Button",
      variants: {
        variant: { gradient: "bg-gradient-to-r" },
      },
    };

    registry.register(plugin1);
    registry.register(plugin2);

    // Note: In actual implementation, usePluginVariants would use the defaultRegistry
    // This test demonstrates the collection logic
    const activePlugins = registry.getEnabledForComponent("Button");
    const collected: Record<string, Record<string, string>> = {};

    for (const plugin of activePlugins) {
      if (plugin.variants) {
        for (const [variantName, variantGroup] of Object.entries(
          plugin.variants,
        )) {
          if (!collected[variantName]) {
            collected[variantName] = {};
          }
          collected[variantName] = {
            ...collected[variantName],
            ...variantGroup,
          };
        }
      }
    }

    expect(Object.keys(collected)).toContain("size");
    expect(Object.keys(collected)).toContain("variant");
    expect(collected.size.xl).toBe("h-14");
    expect(collected.variant.gradient).toBe("bg-gradient-to-r");
  });
});
