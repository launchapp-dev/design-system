# Design System Plugin System

The Design System Plugin System enables third-party developers to extend components with custom variants and behaviors without modifying the core library.

## Overview

Plugins allow you to:
- Add custom variants to existing components
- Modify component props before rendering
- Transform component elements after rendering
- Discover available plugins for any component
- Enable/disable plugins dynamically

## Core Concepts

### Plugin

A plugin is a configuration object that describes how to extend a component:

```typescript
interface ComponentPlugin {
  name: string;                          // Unique identifier
  version: string;                       // Semantic version
  targetComponent: string;               // Component to extend (e.g., "Button")
  variants?: PluginVariants;             // New variant definitions
  defaultVariants?: PluginDefaultVariants; // Default variant values
  beforeRender?: BeforeRenderHook;       // Modify props before render
  afterRender?: AfterRenderHook;         // Transform element after render
  description?: string;
  author?: string;
  repository?: string;
  minComponentVersion?: string;
  maxComponentVersion?: string;
}
```

### Plugin Registry

The registry manages all registered plugins for discovery and activation:

```typescript
import { defaultRegistry } from "@launchapp/design-system/plugins";

// Register a plugin
defaultRegistry.register(myPlugin);

// Get all plugins for a component
const plugins = defaultRegistry.getForComponent("Button");

// Get a specific plugin
const plugin = defaultRegistry.getPlugin("Button", "myPlugin");

// Get plugin stats
const stats = defaultRegistry.getStats();
```

## Getting Started

### Creating a Simple Variant Plugin

Create a plugin that adds a new "gradient" variant to the Button component:

```typescript
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

const gradientButtonPlugin: ComponentPlugin = {
  name: "gradient-button",
  version: "1.0.0",
  targetComponent: "Button",
  variants: {
    variant: {
      gradient: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
      "gradient-subtle": "bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-900",
    },
  },
  description: "Adds gradient variants to Button component",
  author: "Your Company",
};
```

Usage in a component:

```typescript
import { Button } from "@launchapp/design-system";
import { defaultRegistry } from "@launchapp/design-system/plugins";
import { gradientButtonPlugin } from "./plugins/gradient-button";

// Register the plugin
defaultRegistry.register(gradientButtonPlugin);

// Now you can use the new variant
function App() {
  return (
    <Button variant="gradient" size="lg">
      Gradient Button
    </Button>
  );
}
```

### Creating a Plugin with Lifecycle Hooks

Create a plugin that tracks Button clicks:

```typescript
import type { ComponentPlugin, BeforeRenderHook, AfterRenderHook } from "@launchapp/design-system/plugins";

const analyticsPlugin: ComponentPlugin = {
  name: "analytics-button",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds analytics tracking to Button clicks",

  beforeRender: ((props) => {
    return {
      ...props,
      onClick: (e: React.MouseEvent) => {
        // Track the click
        console.log("Button clicked");
        props.onClick?.(e);
      },
    };
  }) as BeforeRenderHook,

  afterRender: ((element) => {
    // Add a data attribute for testing
    return React.cloneElement(element, {
      "data-analytics": "tracked",
    });
  }) as AfterRenderHook,
};
```

### Creating a Plugin Package

Structure your plugin as a reusable npm package:

```
my-design-system-plugin/
├── package.json
├── src/
│   ├── index.ts
│   ├── Button.plugin.ts
│   ├── Badge.plugin.ts
│   └── hooks.ts
└── README.md
```

**package.json:**

```json
{
  "name": "@company/design-system-button-plugins",
  "version": "1.0.0",
  "description": "Custom Button plugins for LaunchApp Design System",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

**src/index.ts:**

```typescript
import { defaultRegistry } from "@launchapp/design-system/plugins";
import { gradientButtonPlugin } from "./Button.plugin";
import { statusBadgePlugin } from "./Badge.plugin";

export { gradientButtonPlugin, statusBadgePlugin };

// Auto-register plugins on import
export function registerAll() {
  defaultRegistry.register(gradientButtonPlugin);
  defaultRegistry.register(statusBadgePlugin);
}

// Or register individually
export const plugins = [gradientButtonPlugin, statusBadgePlugin];
```

## Using Plugins in Components

### In Component Props

When a component is updated to support plugins, you can pass plugin variants directly:

```typescript
// If the component has been enhanced to support plugins:
<Button variant="custom-variant" {...props} />
```

### Discovering Available Plugins

```typescript
import { defaultRegistry } from "@launchapp/design-system/plugins";

function PluginInfo({ componentName }: { componentName: string }) {
  const result = defaultRegistry.query(componentName);

  return (
    <div>
      <h2>{componentName} Plugins</h2>
      <p>Total: {result.count}</p>
      {result.plugins.map((plugin) => (
        <div key={plugin.name}>
          <h3>{plugin.name}</h3>
          <p>{plugin.description}</p>
          <p>v{plugin.version}</p>
          <label>
            <input
              type="checkbox"
              checked={plugin.enabled}
              onChange={(e) =>
                defaultRegistry.setEnabled(
                  componentName,
                  plugin.name,
                  e.target.checked
                )
              }
            />
            Enabled
          </label>
        </div>
      ))}
    </div>
  );
}
```

### Using Plugin Hooks

```typescript
import {
  useComponentPlugins,
  usePluginVariants,
  useApplyPlugins,
} from "@launchapp/design-system/plugins";

function CustomButton(props) {
  // Get active plugins
  const plugins = useComponentPlugins("Button");

  // Get available custom variants
  const customVariants = usePluginVariants("Button");

  // Apply plugin hooks to props
  const { props: modifiedProps, afterHooks } = useApplyPlugins("Button", props);

  return (
    <button {...modifiedProps}>
      {props.children}
    </button>
  );
}
```

## Plugin Registry API

### Core Methods

#### `register(plugin: ComponentPlugin, options?: RegisterPluginOptions)`

Register a plugin with the registry.

```typescript
defaultRegistry.register(myPlugin, { enabled: true, override: false });
```

#### `unregister(targetComponent: string, pluginName: string): boolean`

Unregister a plugin.

```typescript
defaultRegistry.unregister("Button", "gradient-button");
```

#### `getForComponent(targetComponent: string): PluginMetadata[]`

Get all plugins for a component.

```typescript
const buttonPlugins = defaultRegistry.getForComponent("Button");
```

#### `getEnabledForComponent(targetComponent: string): PluginMetadata[]`

Get only enabled plugins for a component.

```typescript
const activePlugins = defaultRegistry.getEnabledForComponent("Button");
```

#### `getPlugin(targetComponent: string, pluginName: string): PluginMetadata | undefined`

Get a specific plugin.

```typescript
const plugin = defaultRegistry.getPlugin("Button", "gradient-button");
```

#### `setEnabled(targetComponent: string, pluginName: string, enabled: boolean): boolean`

Enable or disable a plugin.

```typescript
defaultRegistry.setEnabled("Button", "gradient-button", false);
```

#### `getAll(): PluginMetadata[]`

Get all registered plugins across all components.

```typescript
const allPlugins = defaultRegistry.getAll();
```

#### `query(targetComponent: string): PluginQueryResult`

Query plugins for a component.

```typescript
const result = defaultRegistry.query("Button");
console.log(result.count); // Number of plugins
console.log(result.plugins); // Array of plugins
```

#### `getStats(): RegistryStats`

Get registry statistics.

```typescript
const stats = defaultRegistry.getStats();
console.log(stats.totalPlugins);
console.log(stats.pluginsByComponent);
```

## Best Practices

### Plugin Naming

Use descriptive, component-specific names:

```typescript
// Good
"gradient-button"
"animated-badge"
"with-tooltip"

// Avoid
"my-plugin"
"variant1"
"plugin"
```

### Variant Style Guidelines

Follow Tailwind CSS conventions and the design system's color tokens:

```typescript
// Use design system tokens
"bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]"

// Support dark mode
"dark:bg-slate-900 dark:text-slate-50"

// Keep responsive in mind
"text-sm md:text-base lg:text-lg"
```

### Documentation

Always include a description and document your plugin variants:

```typescript
const myPlugin: ComponentPlugin = {
  name: "size-variants",
  description: "Adds xl and 2xl size variants to Button",
  author: "Company Name",
  repository: "https://github.com/company/my-plugin",
  variants: {
    size: {
      xl: "h-14 px-6 text-lg",
      "2xl": "h-16 px-8 text-xl",
    },
  },
  // ...
};
```

### Version Compatibility

Specify component version requirements:

```typescript
const myPlugin: ComponentPlugin = {
  // ...
  minComponentVersion: "0.2.0",
  maxComponentVersion: "1.0.0",
};
```

## Examples

### Example: Theme Variant Plugin

```typescript
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

export const themeVariantPlugin: ComponentPlugin = {
  name: "theme-variants",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds theme-based variants for consistent styling",
  author: "Design System Team",

  variants: {
    theme: {
      success: "bg-green-600 hover:bg-green-700 text-white",
      warning: "bg-amber-500 hover:bg-amber-600 text-white",
      info: "bg-blue-500 hover:bg-blue-600 text-white",
      error: "bg-red-600 hover:bg-red-700 text-white",
    },
  },

  defaultVariants: {
    theme: "info",
  },
};
```

### Example: Compound Plugin with Hooks

```typescript
import type { ComponentPlugin, BeforeRenderHook } from "@launchapp/design-system/plugins";

export const loadingPlugin: ComponentPlugin = {
  name: "loading-state",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds loading state management with spinner",

  beforeRender: ((props) => {
    const { isLoading, disabled, children, ...rest } = props;

    return {
      ...rest,
      disabled: disabled || isLoading,
      children: isLoading ? "Loading..." : children,
    };
  }) as BeforeRenderHook,
};
```

## Troubleshooting

### Plugin Not Appearing

1. Check if plugin is registered: `defaultRegistry.getPlugin("Button", "name")`
2. Verify plugin is enabled: `plugin.enabled === true`
3. Confirm target component name matches exactly

### Variant Styles Not Applied

1. Verify variant names match: `plugin.variants?.variantName`
2. Check Tailwind CSS class conflicts
3. Ensure plugin is enabled for the component

### Performance Issues

- Use `useMemo` when accessing plugin data in components
- Avoid creating new plugins in render functions
- Consider lazy-loading plugins for large applications

## Advanced Usage

### Custom Registry

Create a custom registry for isolated plugin management:

```typescript
import { createRegistry } from "@launchapp/design-system/plugins";

const customRegistry = createRegistry();
customRegistry.register(myPlugin);
```

### Plugin Composition

Layer multiple plugins together:

```typescript
defaultRegistry.register(basePlugin);
defaultRegistry.register(themePlugin);
defaultRegistry.register(animationPlugin);

// All plugins are applied to the component
const button = <Button variant="gradient" animate="bounce" />;
```

## Contributing Plugins

Share your plugins with the community:

1. Create a plugin package following the structure above
2. Document your variants and behavior
3. Add examples in your README
4. Publish to npm with the `@launchapp-design-system-plugin` scope

## See Also

- [Design System Documentation](../../README.md)
- [Component API](../components)
- [CVA Documentation](https://cva.style/)
