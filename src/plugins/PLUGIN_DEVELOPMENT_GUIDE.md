# Plugin Development Guide

This guide provides step-by-step instructions for developers who want to create custom plugins for the Design System.

## Quick Start

### 1. Create Your First Plugin

Create a new file `my-plugin.ts`:

```typescript
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

export const myFirstPlugin: ComponentPlugin = {
  name: "my-first-plugin",
  version: "1.0.0",
  targetComponent: "Button",
  description: "My first custom Button variant",
  author: "Your Name",

  variants: {
    variant: {
      "my-custom": "bg-blue-500 hover:bg-blue-600 text-white rounded-lg",
    },
  },
};
```

### 2. Register the Plugin

```typescript
import { defaultRegistry } from "@launchapp/design-system/plugins";
import { myFirstPlugin } from "./my-plugin";

// Register your plugin
defaultRegistry.register(myFirstPlugin);

// Now use it in your component
import { Button } from "@launchapp/design-system";

export function MyComponent() {
  return <Button variant="my-custom">Click me</Button>;
}
```

## Plugin Structure

### Basic Fields

Every plugin requires these fields:

```typescript
const basicPlugin: ComponentPlugin = {
  name: "unique-plugin-name",           // Use kebab-case
  version: "1.0.0",                     // Semantic versioning
  targetComponent: "Button",            // Component name to extend
  description: "What this plugin does",
};
```

### Adding Variants

Define new variants for a component:

```typescript
const variantPlugin: ComponentPlugin = {
  name: "size-plugin",
  version: "1.0.0",
  targetComponent: "Button",

  variants: {
    size: {
      xl: "h-14 px-8 text-lg",
      "2xl": "h-16 px-10 text-2xl",
    },
  },

  defaultVariants: {
    size: "md",
  },
};
```

### Before Render Hook

Modify props before the component renders:

```typescript
const beforeHookPlugin: ComponentPlugin = {
  name: "auto-disable",
  version: "1.0.0",
  targetComponent: "Button",

  beforeRender: (props) => {
    return {
      ...props,
      disabled: props.isLoading ? true : props.disabled,
    };
  },
};
```

### After Render Hook

Transform the rendered element:

```typescript
const afterHookPlugin: ComponentPlugin = {
  name: "add-tracking",
  version: "1.0.0",
  targetComponent: "Button",

  afterRender: (element) => {
    return React.cloneElement(element, {
      "data-tracked": true,
    });
  },
};
```

## Real-World Examples

### Example 1: Loading Button with Spinner

```typescript
import React from "react";
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

export const loadingButtonPlugin: ComponentPlugin = {
  name: "loading-button",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Adds loading state support",
  author: "Design System Team",

  beforeRender: (props) => {
    const { isLoading, loadingLabel = "Loading..." } = props;

    return {
      ...props,
      disabled: isLoading || props.disabled,
      "aria-busy": isLoading,
    };
  },

  afterRender: (element) => {
    const { isLoading, loadingLabel } = element.props;

    if (!isLoading) {
      return element;
    }

    return React.cloneElement(element, {
      children: (
        <div className="flex items-center gap-2">
          <div className="animate-spin w-4 h-4 border-2 border-current border-r-transparent rounded-full" />
          {loadingLabel}
        </div>
      ),
    });
  },
};
```

### Example 2: Success/Error State Badge

```typescript
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

export const statusBadgePlugin: ComponentPlugin = {
  name: "status-badge",
  version: "1.0.0",
  targetComponent: "Badge",
  description: "Predefined status variants",

  variants: {
    status: {
      success:
        "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200",
      error:
        "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200",
      warning:
        "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200",
      info: "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-200",
    },
  },

  beforeRender: (props) => {
    const { status, ...rest } = props;
    return {
      ...rest,
      variant: status || "info",
      role: "status",
      "aria-label": `Status: ${status}`,
    };
  },
};
```

### Example 3: Icon Button with Size Variants

```typescript
import type { ComponentPlugin } from "@launchapp/design-system/plugins";

export const iconButtonPlugin: ComponentPlugin = {
  name: "icon-button",
  version: "1.0.0",
  targetComponent: "Button",
  description: "Icon-specific variants and sizing",

  variants: {
    variant: {
      icon: "p-0 h-auto w-auto",
      "icon-circle":
        "rounded-full aspect-square flex items-center justify-center",
    },
    size: {
      "icon-sm": "h-8 w-8",
      "icon-md": "h-10 w-10",
      "icon-lg": "h-12 w-12",
    },
  },

  beforeRender: (props) => {
    const { isIconOnly, children } = props;

    if (isIconOnly) {
      return {
        ...props,
        "aria-label": props["aria-label"] || "Icon button",
      };
    }

    return props;
  },
};
```

## Publishing a Plugin

### As an npm Package

1. **Create package directory:**

```bash
mkdir @company/design-system-plugins
cd @company/design-system-plugins
npm init -y
```

2. **Set up package.json:**

```json
{
  "name": "@company/design-system-plugins",
  "version": "1.0.0",
  "description": "Custom Design System plugins",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./button": "./dist/button.js",
    "./badge": "./dist/badge.js"
  },
  "peerDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "react": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@launchapp/design-system": "^0.2.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

3. **Structure your plugins:**

```
src/
├── index.ts         # Main exports
├── button.ts        # Button plugins
└── badge.ts         # Badge plugins
```

4. **Export plugins:**

```typescript
// src/index.ts
export { myButtonPlugin } from "./button";
export { myBadgePlugin } from "./badge";

export function registerAll() {
  const { defaultRegistry } = require("@launchapp/design-system/plugins");
  const { myButtonPlugin } = require("./button");
  const { myBadgePlugin } = require("./badge");

  defaultRegistry.register(myButtonPlugin);
  defaultRegistry.register(myBadgePlugin);
}
```

5. **Publish to npm:**

```bash
npm publish
```

### Using Your Published Plugin

```typescript
import { defaultRegistry } from "@launchapp/design-system/plugins";
import { myButtonPlugin } from "@company/design-system-plugins";

defaultRegistry.register(myButtonPlugin);
```

## Best Practices

### 1. Naming Conventions

```typescript
// Good
const badgeStatusPlugin = { name: "status-badge" };
const buttonGradientPlugin = { name: "gradient-button" };
const inputCounterPlugin = { name: "character-counter" };

// Avoid
const plugin1 = { name: "plugin1" };
const myPlugin = { name: "my-plugin" };
const badNamePlugin = { name: "bad" };
```

### 2. Documentation

Always include meaningful descriptions:

```typescript
export const myPlugin: ComponentPlugin = {
  name: "feature-plugin",
  version: "1.0.0",
  targetComponent: "Button",

  // Clear description of what the plugin does
  description: "Adds loading state and disabled behavior",

  // Document your author for support
  author: "John Doe <john@example.com>",

  // Link to repository for issues
  repository: "https://github.com/company/plugin-repo",

  // Specify compatibility
  minComponentVersion: "0.2.0",
  maxComponentVersion: "1.0.0",
};
```

### 3. Style Guidelines

Follow Tailwind CSS conventions and design system tokens:

```typescript
// Use design system tokens
variants: {
  variant: {
    primary: "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]",
  },
}

// Support dark mode
"dark:bg-slate-900 dark:text-slate-50"

// Use responsive classes
"text-sm md:text-base lg:text-lg"

// Focus and accessibility
"focus:outline-none focus:ring-2 focus:ring-offset-2"
```

### 4. Type Safety

Use TypeScript for better development experience:

```typescript
interface MyPluginProps {
  isLoading?: boolean;
  loadingText?: string;
  customClass?: string;
}

const myPlugin: ComponentPlugin = {
  // ...
  beforeRender: ((props: MyPluginProps) => {
    // Type-safe prop handling
    return {
      ...props,
      disabled: props.isLoading || props.disabled,
    };
  }) as BeforeRenderHook,
};
```

### 5. Testing Your Plugin

```typescript
import { createRegistry } from "@launchapp/design-system/plugins";
import { myPlugin } from "./my-plugin";

describe("My Plugin", () => {
  it("should register successfully", () => {
    const registry = createRegistry();
    registry.register(myPlugin);

    const plugin = registry.getPlugin("Button", "my-plugin");
    expect(plugin).toBeDefined();
  });

  it("should have correct variants", () => {
    const registry = createRegistry();
    registry.register(myPlugin);

    const plugin = registry.getPlugin("Button", "my-plugin");
    expect(Object.keys(plugin?.variants?.size || {})).toContain("xl");
  });
});
```

## Common Patterns

### Pattern 1: Conditional Styling

```typescript
beforeRender: (props) => {
  const { isActive, ...rest } = props;

  return {
    ...rest,
    className: isActive ? "ring-2 ring-blue-500" : "",
  };
};
```

### Pattern 2: Composable Variants

```typescript
variants: {
  intent: {
    primary: "...",
    secondary: "...",
  },
  size: {
    sm: "...",
    lg: "...",
  },
  // Both are applied: <Button intent="primary" size="sm" />
};
```

### Pattern 3: Hook Integration

```typescript
beforeRender: (props) => {
  const { onClick, ...rest } = props;

  return {
    ...rest,
    onClick: (e: React.MouseEvent) => {
      // Custom logic
      console.log("Clicked!");
      onClick?.(e);
    },
  };
};
```

## Troubleshooting

### Plugin Not Registering

```typescript
// Check if plugin exists
const plugin = defaultRegistry.getPlugin("Button", "my-plugin");
console.log(plugin); // undefined = not registered

// Check spelling of targetComponent
// Should match the component name exactly: "Button", not "button"
```

### Variants Not Applied

```typescript
// Verify variant structure
const plugin = defaultRegistry.getPlugin("Button", "my-plugin");
console.log(plugin?.variants); // Check structure

// Ensure variant names match usage
// Plugin defines: variants: { size: { xl: "..." } }
// Usage: <Button size="xl" />
```

### Style Conflicts

```typescript
// Use !important sparingly for overrides
"!bg-blue-500 !text-white"

// Or use more specific selectors
"bg-blue-500 hover:bg-blue-600 [&:disabled]:opacity-50"
```

## Resources

- [Plugin Registry API](./README.md#plugin-registry-api)
- [CVA Documentation](https://cva.style/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React TypeScript Handbook](https://react-typescript-cheatsheet.netlify.app/)

## Getting Help

- Check the [Plugin System README](./README.md)
- Review [example plugins](./examples.ts)
- Look at [plugin tests](./plugin.test.ts) for patterns
- File an issue on GitHub

## Contributing Back

Have a useful plugin? Consider:

1. Publishing it to npm
2. Adding it to the [community plugins list](../../README.md#community-plugins)
3. Creating a PR with examples
