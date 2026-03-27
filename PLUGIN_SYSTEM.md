# Design System Plugin System

The LaunchApp Design System provides a powerful plugin system that allows you to extend components with custom variants and behaviors without modifying the core library.

## Overview

The plugin system enables you to:

- Register custom variants for existing components
- Add custom behaviors and hooks to components
- Define component wrappers and middleware
- Automatically load and unload plugins with lifecycle hooks
- Discover and manage registered plugins

## Core Concepts

### Plugin Structure

A plugin is a plain JavaScript object that conforms to the `DesignSystemPlugin` interface:

```typescript
interface DesignSystemPlugin {
  metadata: PluginMetadata;
  componentExtensions: ComponentExtension[];
  hooks?: {
    onLoad?: () => void | Promise<void>;
    onUnload?: () => void | Promise<void>;
  };
}
```

### Metadata

Every plugin must define metadata:

```typescript
interface PluginMetadata {
  name: string;           // Unique identifier for the plugin
  version: string;        // Semantic version (e.g., "1.0.0")
  description?: string;   // What the plugin does
  author?: string;        // Creator/maintainer
}
```

### Component Extensions

Extensions define how a plugin extends a specific component:

```typescript
interface ComponentExtension {
  componentName: string;           // Target component (e.g., "Button")
  variants?: VariantExtension[];   // Custom variants to add
  behaviors?: BehaviorExtension[]; // Custom behaviors to add
  customProps?: Record<string, any>;  // Custom prop definitions
}
```

## Adding Custom Variants

Variants extend a component's visual options. Define them using the same structure as CVA (class-variance-authority):

```typescript
const MyButtonPlugin: DesignSystemPlugin = {
  metadata: {
    name: "my-button-plugin",
    version: "1.0.0",
    description: "Add custom button variants",
  },
  componentExtensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "my-variants",
          variants: {
            variant: {
              custom: "bg-blue-500 text-white hover:bg-blue-600",
              fancy: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            size: {
              huge: "h-20 px-12 text-2xl",
            },
          },
          defaultVariants: {
            size: "huge",
          },
        },
      ],
    },
  ],
};
```

## Adding Custom Behaviors

Behaviors allow you to add hooks, event handlers, or wrap components:

```typescript
const MyBehaviorPlugin: DesignSystemPlugin = {
  metadata: {
    name: "my-behavior-plugin",
    version: "1.0.0",
  },
  componentExtensions: [
    {
      componentName: "Button",
      behaviors: [
        {
          name: "analytics-tracker",
          eventHandler: (eventName: string, handler: Function) => {
            return (...args: any[]) => {
              console.log(`Button ${eventName} clicked`);
              return handler(...args);
            };
          },
        },
      ],
    },
  ],
};
```

## Plugin Lifecycle Hooks

Plugins can define lifecycle hooks that execute when loaded/unloaded:

```typescript
const MyPlugin: DesignSystemPlugin = {
  metadata: { name: "my-plugin", version: "1.0.0" },
  componentExtensions: [],
  hooks: {
    onLoad: () => {
      console.log("Plugin loaded!");
      // Initialize resources, fetch configurations, etc.
    },
    onUnload: () => {
      console.log("Plugin unloaded!");
      // Clean up resources
    },
  },
};
```

## Loading Plugins

### Using the Plugin Loader

```typescript
import { pluginLoader } from "@launchapp/design-system";
import { MyPlugin } from "./my-plugin";

// Load a single plugin
await pluginLoader.load(MyPlugin);

// Load multiple plugins
await pluginLoader.loadMultiple([Plugin1, Plugin2]);

// Check if a plugin is loaded
if (pluginLoader.isLoaded("my-plugin")) {
  console.log("Plugin is active");
}

// Get all loaded plugins
const loaded = pluginLoader.getLoadedPlugins();

// Unload a plugin
pluginLoader.unload("my-plugin");
```

### Plugin Load Options

```typescript
interface PluginLoadOptions {
  validate?: boolean;  // Validate plugin structure (default: true)
  strict?: boolean;    // Throw errors instead of warnings (default: false)
}

await pluginLoader.load(MyPlugin, { validate: true, strict: true });
```

## Using the Plugin Registry

Access registered plugins and their extensions:

```typescript
import { pluginRegistry } from "@launchapp/design-system";

// Get a specific plugin
const plugin = pluginRegistry.get("my-plugin");

// Check if a plugin is registered
if (pluginRegistry.has("my-plugin")) {
  console.log("Plugin found!");
}

// Get all registered plugins
const allPlugins = pluginRegistry.getAll();

// Get extensions for a specific component
const buttonExtensions = pluginRegistry.getComponentExtensions("Button");
const buttonVariants = pluginRegistry.getVariantExtensions("Button");
const buttonBehaviors = pluginRegistry.getBehaviorExtensions("Button");
```

## Applying Extensions to Components

For component developers, apply extensions using helper functions:

```typescript
import {
  getExtendedVariantsForComponent,
  wrapComponentWithBehaviors,
} from "@launchapp/design-system";

// Get variants with plugin extensions merged in
const extendedButtonVariants = getExtendedVariantsForComponent(
  "Button",
  buttonVariants
);

// Wrap component with behavior extensions
const ButtonWithBehaviors = wrapComponentWithBehaviors(Button, "Button");
```

## Example: Custom Button Variants Plugin

The design system includes an example plugin that adds gradient, neon, and outline-glow variants to the Button component:

```typescript
import { pluginLoader } from "@launchapp/design-system";
import { CustomButtonVariantsPlugin } from "@launchapp/design-system/lib/plugin-system/examples/CustomButtonVariantsPlugin";

await pluginLoader.load(CustomButtonVariantsPlugin);

// Now use the new variants:
// <Button variant="gradient">Gradient Button</Button>
// <Button variant="neon">Neon Button</Button>
// <Button variant="outline-glow" size="xl">Glow Button</Button>
```

## Plugin Package Format

For distributable plugins, follow this structure:

```
my-plugin/
├── package.json
├── src/
│   ├── plugin.ts          # Plugin definition
│   ├── components/        # Optional custom components
│   └── hooks/             # Optional custom hooks
├── dist/                  # Compiled output
└── README.md
```

Package.json example:

```json
{
  "name": "@myorg/my-button-plugin",
  "version": "1.0.0",
  "description": "Custom button variants for LaunchApp Design System",
  "main": "./dist/plugin.js",
  "types": "./dist/plugin.d.ts",
  "peerDependencies": {
    "@launchapp/design-system": "^0.2.0"
  }
}
```

## Best Practices

### Naming Conventions

- **Plugin names**: kebab-case (e.g., `custom-button-variants`)
- **Variant names**: kebab-case within extension (e.g., `color-variants`)
- **Behavior names**: kebab-case (e.g., `analytics-tracker`)

### Version Strategy

Follow semantic versioning:
- `1.0.0` - Major API change
- `1.0.1` - Bug fix
- `1.1.0` - New features (backward compatible)

### Scope

Keep plugins focused on a single concern:

- ✅ "custom-button-variants" - adds button variants
- ❌ "ui-enhancements" - too broad and vague

### Documentation

Every plugin should include:

- Clear name and description
- Example usage code
- List of extensions it provides
- Compatibility information
- Installation instructions (for distributable plugins)

### Performance

- Lazy load plugins only when needed
- Avoid heavy computations in `onLoad` hooks
- Clean up resources in `onUnload` hooks

## Validation

The plugin system validates plugins on load:

```typescript
// Strict validation - throws errors
await pluginLoader.load(plugin, { strict: true });

// Lenient validation - logs warnings
await pluginLoader.load(plugin, { strict: false });

// Skip validation entirely
await pluginLoader.load(plugin, { validate: false });
```

Common validation errors:

- Missing `metadata.name`
- Missing `metadata.version`
- Empty or missing `componentExtensions`
- Missing `componentName` in extensions

## Troubleshooting

### Plugin not loading

Check that:
- Plugin name is unique
- Metadata is complete
- Component names match existing components
- No syntax errors in variant definitions

### Variants not appearing

Verify:
- Plugin is loaded and registered
- Component name is correct
- Variants are properly defined
- Class names are valid Tailwind utilities

### Performance issues

- Unload unused plugins
- Avoid recursive plugin dependencies
- Batch plugin loading operations

## API Reference

### pluginRegistry

```typescript
interface PluginRegistry {
  register(plugin: DesignSystemPlugin): void;
  unregister(pluginName: string): void;
  get(pluginName: string): DesignSystemPlugin | undefined;
  getAll(): DesignSystemPlugin[];
  getComponentExtensions(componentName: string): ComponentExtension[];
  getVariantExtensions(componentName: string): VariantExtension[];
  getBehaviorExtensions(componentName: string): BehaviorExtension[];
  has(pluginName: string): boolean;
}
```

### pluginLoader

```typescript
class PluginLoader {
  async load(plugin: DesignSystemPlugin, options?: PluginLoadOptions): Promise<void>;
  async loadMultiple(plugins: DesignSystemPlugin[], options?: PluginLoadOptions): Promise<void>;
  unload(pluginName: string, strict?: boolean): void;
  getLoadedPlugins(): string[];
  isLoaded(pluginName: string): boolean;
}
```

### Utility Functions

```typescript
function mergeVariants(baseCVA: CVAReturn, extensions: VariantExtension[]): CVAReturn;
function applyBehaviorExtensions(Component: React.ComponentType<any>, extensions: BehaviorExtension[]): React.ComponentType<any>;
function getComponentExtensionsForName(componentName: string): ComponentExtension[];
function getExtendedVariantsForComponent(componentName: string, baseCVA: CVAReturn): CVAReturn;
function wrapComponentWithBehaviors(Component: React.ComponentType<any>, componentName: string): React.ComponentType<any>;
```

## Contributing Plugins

To contribute a plugin to the design system:

1. Create a plugin following the conventions above
2. Add tests for your plugin
3. Document the variants and behaviors it provides
4. Submit a PR to the design system repository

## License

The plugin system is part of the LaunchApp Design System and follows the same MIT license.
