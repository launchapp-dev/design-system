# Design System Plugin System

The LaunchApp Design System includes a powerful plugin system that allows third-party developers to extend components with custom variants and behaviors without modifying the core library.

## Overview

The plugin system enables you to:

- **Add Custom Variants**: Define new variant options for existing components
- **Hook into Component Lifecycle**: Execute code before/after component rendering
- **Extend Component Behavior**: Modify props, add event handlers, and customize rendering
- **Publish Reusable Plugins**: Share your extensions as standalone npm packages

## Core Concepts

### Plugin

A plugin is a package that extends one or more components with new functionality.

```typescript
interface Plugin {
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
```

### Component Extension

An extension defines how a plugin modifies a specific component.

```typescript
interface ComponentExtension {
  componentName: string;
  variants?: ComponentVariantDefinition[];
  hooks?: ComponentHook;
  styling?: Record<string, string>;
}
```

### Component Variant Definition

Custom variants that can be registered for a component.

```typescript
interface ComponentVariantDefinition {
  name: string;
  description?: string;
  values: Record<string, string | number>;
}
```

### Component Hook

Lifecycle hooks for intercepting and modifying component behavior.

```typescript
interface ComponentHook {
  beforeRender?: (props: Record<string, any>) => Record<string, any> | void;
  afterRender?: (
    element: React.ReactElement,
    props: Record<string, any>
  ) => React.ReactElement;
  onMount?: (instance: React.Component | null) => void;
  onUnmount?: (instance: React.Component | null) => void;
}
```

## Getting Started

### Creating Your First Plugin

```typescript
import { createPlugin } from "@launchapp/design-system";

export const myCustomPlugin = createPlugin({
  name: "my-custom-plugin",
  version: "1.0.0",
  description: "Adds custom button variants",
  author: "Your Name",
  extensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "custom",
          description: "My custom button style",
          values: {
            "branded":
              "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold",
            "minimal": "bg-transparent border border-gray-300 hover:bg-gray-50",
          },
        },
      ],
      hooks: {
        beforeRender: (props) => {
          // Modify props before component renders
          if (props.variant === "custom") {
            return { className: (props.className || "") + " rounded-lg" };
          }
        },
      },
    },
  ],
  hooks: {
    onLoad: (registry) => {
      console.log("My plugin loaded!");
    },
  },
});
```

### Registering a Plugin

```typescript
import { globalPluginRegistry, myCustomPlugin } from "@launchapp/design-system";

// Register the plugin
globalPluginRegistry.registerPlugin(myCustomPlugin);

// Use the custom variant in your components
<Button variant="custom" size="md">
  Click me
</Button>
```

### Using Example Plugins

The design system includes built-in example plugins:

```typescript
import {
  globalPluginRegistry,
  customButtonPlugin,
  hoverCardPlugin,
} from "@launchapp/design-system";

// Load example plugins
globalPluginRegistry.registerPlugin(customButtonPlugin);
globalPluginRegistry.registerPlugin(hoverCardPlugin);
```

## Advanced Usage

### Creating a Multi-Component Plugin

```typescript
export const advancedPlugin = createPlugin({
  name: "advanced-plugin",
  version: "1.0.0",
  extensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "advanced",
          values: {
            "animated": "transition-all hover:scale-105",
          },
        },
      ],
    },
    {
      componentName: "Card",
      variants: [
        {
          name: "advanced",
          values: {
            "elevated": "shadow-lg hover:shadow-xl transition-shadow",
          },
        },
      ],
    },
  ],
});
```

### Using Component Hooks

```typescript
const myHooks = {
  beforeRender: (props) => {
    // Intercept and modify props
    return {
      ...props,
      disabled: props.disabled || props.loading,
    };
  },
  afterRender: (element, props) => {
    // Wrap or modify the rendered element
    if (props.showBorder) {
      return (
        <div className="border-2 border-primary">
          {element}
        </div>
      );
    }
    return element;
  },
  onMount: (instance) => {
    // Component mounted
  },
  onUnmount: (instance) => {
    // Component unmounting
  },
};
```

## Plugin Registry API

### Core Methods

```typescript
interface PluginRegistry {
  // Register a new plugin
  registerPlugin(plugin: Plugin): void;

  // Remove a plugin
  unregisterPlugin(pluginId: string): void;

  // Get a specific plugin
  getPlugin(pluginId: string): Plugin | undefined;

  // Get all registered plugins
  getPlugins(): Plugin[];

  // Get all variants for a component
  getComponentVariants(componentName: string): ComponentVariantDefinition[];

  // Get a specific variant
  getComponentVariant(
    componentName: string,
    variantName: string
  ): ComponentVariantDefinition | undefined;

  // Get all hooks for a component
  getComponentHooks(componentName: string): ComponentHook[];

  // Apply hooks to an element
  applyHooks(
    componentName: string,
    element: React.ReactElement,
    props: Record<string, any>
  ): React.ReactElement;

  // Clear all plugins
  clear(): void;
}
```

## Publishing a Plugin Package

To share your plugin as an npm package:

1. Create a new npm package with your plugin code
2. Export the plugin definition
3. Include documentation in your README
4. Publish to npm

Example `package.json`:

```json
{
  "name": "@mycompany/design-system-custom-button-plugin",
  "version": "1.0.0",
  "description": "Custom button variants for LaunchApp Design System",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "react": "^18.0.0"
  }
}
```

## Best Practices

1. **Namespace Your Plugin**: Use a descriptive name to avoid conflicts
2. **Document Your Variants**: Include descriptions for each variant
3. **Test Component Integration**: Ensure plugins don't break existing components
4. **Handle Prop Conflicts**: Check for conflicting props in beforeRender hooks
5. **Provide TypeScript Support**: Include proper type definitions for your plugins
6. **Version Your Plugins**: Use semantic versioning

## Example Plugins

### Custom Button Plugin

The `customButtonPlugin` adds gradient, animated, and state variants to the Button component.

```typescript
import { globalPluginRegistry, customButtonPlugin } from "@launchapp/design-system";

globalPluginRegistry.registerPlugin(customButtonPlugin);

<Button variant="gradient" size="md">
  Gradient Button
</Button>
```

### Hover Card Plugin

The `hoverCardPlugin` adds hover effects and interactive variants to the Card component.

```typescript
import { globalPluginRegistry, hoverCardPlugin } from "@launchapp/design-system";

globalPluginRegistry.registerPlugin(hoverCardPlugin);

<Card effect="lift" className="cursor-pointer">
  Interactive Card
</Card>
```

## Troubleshooting

### Plugin Not Registering

Ensure the plugin ID is unique:

```typescript
const plugin = createPlugin({
  name: "my-plugin",
  version: "1.0.0",
  // ... rest of config
});

// Plugin ID will be "my-plugin@1.0.0"
globalPluginRegistry.registerPlugin(plugin);
```

### Hooks Not Firing

Ensure hooks are properly structured:

```typescript
// ✓ Correct
hooks: {
  beforeRender: (props) => {
    return { ...props };
  },
},

// ✗ Incorrect - no return statement
hooks: {
  beforeRender: (props) => {
    props.custom = true;
  },
},
```

### Variant Not Available

Check if the plugin is registered:

```typescript
const variants = globalPluginRegistry.getComponentVariants("Button");
console.log(variants); // Should include your plugin's variants
```

## API Reference

See `src/lib/plugin-system.ts` for complete TypeScript definitions and implementation details.
