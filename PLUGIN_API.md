# Plugin API Documentation

The LaunchApp Design System plugin API allows third-party developers to extend components with custom variants and behaviors without modifying the core library.

## Overview

The plugin system provides:
- **Custom Variant Registration** - Add new style variants to existing components
- **Hook System** - Subscribe to component lifecycle events
- **Singleton Manager** - Global plugin manager for coordinating all plugins
- **Type Safety** - Full TypeScript support with comprehensive types

## Getting Started

### Installation

If using this plugin system as a standalone package, install the design system:

```bash
npm install @launchapp/design-system
```

### Basic Plugin

Create a simple plugin:

```typescript
import { getPluginManager, type PluginConfig } from '@launchapp/design-system';

const myPlugin: PluginConfig = {
  name: 'my-button-variants',
  version: '1.0.0',
  description: 'Custom button variants',
  variants: [
    {
      name: 'gradient',
      componentName: 'Button',
      classes: 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600',
      description: 'Gradient background variant',
    },
  ],
};

await getPluginManager().register(myPlugin);
```

## Core Concepts

### Plugins

A plugin is a configuration object that describes extensions to the design system.

```typescript
interface PluginConfig {
  name: string;           // Unique plugin identifier
  version: string;        // Semantic versioning
  description?: string;   // Human-readable description
  author?: string;        // Plugin author name/email
  variants?: CustomVariant[];  // Style variants to register
  hooks?: Record<HookName, HookCallback | HookCallback[]>;  // Hook subscriptions
  initialize?: (context: PluginContext) => void | Promise<void>;  // Async init
}
```

### Variants

Custom variants allow you to extend components with new style presets:

```typescript
interface CustomVariant {
  name: string;              // Variant name (e.g., 'gradient')
  componentName: string;     // Target component (e.g., 'Button')
  classes: string | Record<string, string>;  // Tailwind classes
  responsive?: boolean;      // Support responsive variants
  description?: string;      // Documentation
}
```

### Hooks

Subscribe to component lifecycle events:

```typescript
type HookName =
  | 'component:before-render'  // Before component renders
  | 'component:after-render'   // After component renders
  | 'variant:register'         // When variant is registered
  | 'variant:resolve'          // When variant is resolved/used
  | 'theme:apply'              // When theme is applied
  | 'theme:update';            // When theme is updated

interface HookContext {
  componentName?: string;
  variantName?: string;
  variantValue?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

type HookCallback = (context: HookContext) => void | Promise<void>;
```

## Usage Guide

### Registering Variants

Register custom variants during plugin initialization:

```typescript
import { getPluginManager, type PluginConfig } from '@launchapp/design-system';

const brandPlugin: PluginConfig = {
  name: 'brand-components',
  version: '1.0.0',
  description: 'Brand-specific component variants',
  variants: [
    {
      name: 'brand-primary',
      componentName: 'Button',
      classes: 'bg-blue-600 hover:bg-blue-700 text-white',
      description: 'Primary brand button',
    },
    {
      name: 'brand-secondary',
      componentName: 'Button',
      classes: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      description: 'Secondary brand button',
    },
  ],
};

getPluginManager().register(brandPlugin);
```

### Using Custom Variants in Components

Use the `useVariant` hook to resolve variant classes:

```typescript
import { useVariant } from '@launchapp/design-system';

function MyComponent() {
  const brandClasses = useVariant('Button', 'brand-primary', 'px-4 py-2');
  // Returns: 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white'

  return (
    <button className={brandClasses}>
      Click me
    </button>
  );
}
```

### Variant Lookup Functions

Query the variant registry:

```typescript
import {
  getCustomVariant,
  getComponentVariants,
  hasCustomVariant,
} from '@launchapp/design-system';

// Get a specific variant
const variant = getCustomVariant('Button', 'brand-primary');
if (variant) {
  console.log(variant.classes); // 'bg-blue-600 hover:bg-blue-700 text-white'
}

// Get all variants for a component
const buttonVariants = getComponentVariants('Button');
console.log(buttonVariants.length); // Number of custom Button variants

// Check if variant exists
if (hasCustomVariant('Button', 'brand-primary')) {
  // Use the variant
}
```

### Using Hooks

Subscribe to lifecycle events:

```typescript
const analyticsPlugin: PluginConfig = {
  name: 'analytics',
  version: '1.0.0',
  hooks: {
    'variant:resolve': async (context) => {
      // Track variant usage
      if (context.componentName && context.variantName) {
        await trackEvent('variant_used', {
          component: context.componentName,
          variant: context.variantName,
        });
      }
    },
    'component:after-render': (context) => {
      // Log component renders
      console.log(`${context.componentName} rendered`);
    },
  },
};

getPluginManager().register(analyticsPlugin);
```

### Plugin Initialization

Perform async operations during plugin setup:

```typescript
const configPlugin: PluginConfig = {
  name: 'remote-config',
  version: '1.0.0',
  async initialize(context) {
    // Fetch theme from remote server
    const theme = await fetch('/api/theme').then(r => r.json());

    // Register variants from config
    for (const variant of theme.variants) {
      context.registerVariant({
        name: variant.id,
        componentName: variant.component,
        classes: variant.classes,
        description: variant.label,
      });
    }
  },
};

await getPluginManager().register(configPlugin);
```

## Plugin Package Format

When distributing plugins as npm packages:

### package.json Structure

```json
{
  "name": "@myorg/design-system-plugin-brand",
  "version": "1.0.0",
  "description": "Brand variants for LaunchApp Design System",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "react": "^18.0.0 || ^19.0.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "react": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Plugin Entry Point

```typescript
// src/index.ts
import { type PluginConfig } from '@launchapp/design-system';

export const brandPlugin: PluginConfig = {
  name: '@myorg/brand',
  version: '1.0.0',
  description: 'Official brand variants',
  author: 'MyOrg <support@myorg.com>',
  variants: [
    {
      name: 'primary',
      componentName: 'Button',
      classes: 'bg-brand-primary hover:bg-brand-primary-dark',
      responsive: true,
      description: 'Primary brand button',
    },
    // ... more variants
  ],
};

export default brandPlugin;
```

### Usage in Applications

```typescript
// In your app's main entry point
import { getPluginManager } from '@launchapp/design-system';
import { brandPlugin } from '@myorg/design-system-plugin-brand';

// Register plugin before rendering
await getPluginManager().register(brandPlugin);

// Now use custom variants
function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Best Practices

### 1. Naming Conventions

- Plugin names should be lowercase with hyphens: `my-plugin-name`
- Component names should match the design system: `Button`, `Card`, `Input`
- Variant names should be descriptive: `brand-primary`, `outline-dark`, `compact-sm`

### 2. Variant Classes

- Use Tailwind utility classes for consistency
- Avoid hardcoded colors; use CSS custom properties when possible
- Document responsive behavior if supported

```typescript
// Good: Using CSS custom properties
classes: 'bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary-dark))]'

// Less ideal: Hardcoded colors
classes: 'bg-blue-600 hover:bg-blue-700'
```

### 3. Hook Performance

- Keep hook callbacks fast and focused
- Use async only when necessary
- Clean up resources in plugin unregistration

### 4. Type Safety

- Always use TypeScript for plugin development
- Export plugin configuration with proper types
- Use strict mode for better type checking

```typescript
import { type PluginConfig, type CustomVariant } from '@launchapp/design-system';

const myVariant: CustomVariant = {
  name: 'my-variant',
  componentName: 'Button',
  classes: 'px-4 py-2',
};

const myPlugin: PluginConfig = {
  name: 'my-plugin',
  version: '1.0.0',
  variants: [myVariant],
};
```

### 5. Documentation

- Document what variants your plugin provides
- Include usage examples
- List any dependencies or peer dependencies
- Provide installation instructions

## Examples

### Theme Plugin

```typescript
import { type PluginConfig } from '@launchapp/design-system';

export const darkModePlugin: PluginConfig = {
  name: 'dark-mode-variants',
  version: '1.0.0',
  description: 'Dark mode optimized variants',
  variants: [
    {
      name: 'dark-default',
      componentName: 'Button',
      classes: 'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
      description: 'Default button for dark mode',
    },
    {
      name: 'dark-subtle',
      componentName: 'Button',
      classes: 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      description: 'Subtle button for dark mode',
    },
  ],
};
```

### Analytics Plugin

```typescript
import { type PluginConfig, type HookContext } from '@launchapp/design-system';

export const analyticsPlugin: PluginConfig = {
  name: 'analytics-tracker',
  version: '1.0.0',
  description: 'Track component usage',
  hooks: {
    'variant:resolve': (context: HookContext) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'component_variant', {
          component: context.componentName,
          variant: context.variantName,
        });
      }
    },
  },
};
```

### Feature Plugin

```typescript
import { type PluginConfig } from '@launchapp/design-system';

export const advancedButtonsPlugin: PluginConfig = {
  name: 'advanced-buttons',
  version: '1.0.0',
  description: 'Advanced button variants with animations',
  variants: [
    {
      name: 'animated-pulse',
      componentName: 'Button',
      classes: 'animate-pulse hover:animate-none transition-all',
      responsive: true,
      description: 'Button with pulse animation',
    },
    {
      name: 'glass-morphism',
      componentName: 'Button',
      classes: 'backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40',
      responsive: true,
      description: 'Glassmorphism button style',
    },
  ],
};
```

## API Reference

### getPluginManager()

Returns the global singleton plugin manager instance.

```typescript
const manager = getPluginManager();
```

### PluginManager Methods

#### register(plugin: PluginConfig): Promise<void>

Register a new plugin and initialize it.

```typescript
await getPluginManager().register(myPlugin);
```

#### unregister(pluginName: string): void

Remove a registered plugin.

```typescript
getPluginManager().unregister('my-plugin');
```

#### getPlugin(pluginName: string): PluginConfig | undefined

Retrieve a registered plugin by name.

```typescript
const plugin = getPluginManager().getPlugin('my-plugin');
```

#### getPlugins(): PluginConfig[]

Get all registered plugins.

```typescript
const allPlugins = getPluginManager().getPlugins();
```

#### emit(hookName: HookName, context: HookContext): Promise<void>

Trigger a hook for all subscribed callbacks.

```typescript
await getPluginManager().emit('variant:register', {
  componentName: 'Button',
  variantName: 'custom',
});
```

#### getRegistry(): VariantRegistry

Get the variant registry.

```typescript
const registry = getPluginManager().getRegistry();
```

### VariantRegistry Methods

#### addVariant(variant: CustomVariant): void

Add a variant to the registry.

```typescript
registry.addVariant({
  name: 'my-variant',
  componentName: 'Button',
  classes: 'custom-classes',
});
```

#### getVariant(componentName: string, variantName: string): CustomVariant | undefined

Get a specific variant.

```typescript
const variant = registry.getVariant('Button', 'primary');
```

#### getAllVariants(componentName?: string): CustomVariant[]

Get all variants, optionally filtered by component.

```typescript
const allVariants = registry.getAllVariants();
const buttonVariants = registry.getAllVariants('Button');
```

#### hasVariant(componentName: string, variantName: string): boolean

Check if a variant exists.

```typescript
if (registry.hasVariant('Button', 'primary')) {
  // variant exists
}
```

## Testing Plugins

```typescript
import { getPluginManager, resetPluginManager } from '@launchapp/design-system';

describe('My Plugin', () => {
  afterEach(() => {
    resetPluginManager();
  });

  it('registers variants correctly', async () => {
    await getPluginManager().register(myPlugin);

    const variant = getPluginManager().getRegistry().getVariant('Button', 'custom');
    expect(variant).toBeDefined();
    expect(variant?.classes).toBe('expected-classes');
  });

  it('hooks are called correctly', async () => {
    const callback = vitest.fn();

    const testPlugin: PluginConfig = {
      name: 'test',
      version: '1.0.0',
      hooks: {
        'variant:register': callback,
      },
    };

    await getPluginManager().register(testPlugin);
    await getPluginManager().emit('variant:register', { variantName: 'test' });

    expect(callback).toHaveBeenCalled();
  });
});
```

## Troubleshooting

### Plugin not loading

- Ensure the plugin is registered before components are rendered
- Check console for error messages during registration
- Verify plugin name and component names match exactly

### Custom variants not appearing

- Confirm variant name matches what you're querying
- Check that component name is correct (case-sensitive)
- Verify Tailwind classes are valid in your configuration

### Type errors

- Install proper TypeScript definitions
- Import types from the design system: `import type { PluginConfig } from '@launchapp/design-system'`
- Run `tsc --noEmit` to check for type errors

## Contributing

To contribute plugins to the ecosystem:

1. Follow the naming conventions and best practices
2. Write comprehensive documentation
3. Include unit tests
4. Ensure TypeScript types are correct
5. Open a PR to add your plugin to the registry

## License

Plugin API is part of @launchapp/design-system and follows the same MIT license.
