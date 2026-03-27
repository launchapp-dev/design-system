# Brand Plugin Example

This is a complete example of a custom plugin for the LaunchApp Design System. It demonstrates how to:

- Register custom component variants
- Use hooks for analytics and tracking
- Follow plugin development best practices
- Package a plugin for distribution

## Features

### Custom Button Variants

- **brand-primary** - Main action button with brand colors
- **brand-secondary** - Alternative action button with outline style
- **brand-danger** - Destructive action button for warnings/deletes
- **brand-subtle** - Less prominent action button

### Custom Badge Variants

- **brand-primary** - Primary status badge
- **brand-success** - Success status indicator
- **brand-warning** - Warning status indicator
- **brand-error** - Error status indicator

### Custom Card Variants

- **brand-elevated** - Cards with elevated shadow and brand styling
- **brand-minimal** - Minimalist cards with subtle borders

## Usage

### Basic Setup

```typescript
import { getPluginManager } from '@launchapp/design-system';
import { brandPlugin } from './examples/brand-plugin';

// Register the plugin in your app entry point
await getPluginManager().register(brandPlugin);
```

### Using Custom Variants

Once registered, use custom variants in your components:

```typescript
import { useVariant } from '@launchapp/design-system';

function MyButton() {
  const brandClasses = useVariant('Button', 'brand-primary', 'px-4 py-2');

  return (
    <button className={brandClasses}>
      Click me
    </button>
  );
}
```

Or query the variant registry:

```typescript
import { getCustomVariant, hasCustomVariant } from '@launchapp/design-system';

if (hasCustomVariant('Button', 'brand-primary')) {
  const variant = getCustomVariant('Button', 'brand-primary');
  console.log(variant.classes);
  // Output: 'bg-blue-600 text-white hover:bg-blue-700 ...'
}
```

## Plugin Structure

The plugin demonstrates several key concepts:

### 1. Variant Registration

Variants are defined as configuration and automatically registered:

```typescript
const buttonVariants = [
  {
    name: 'brand-primary',
    componentName: 'Button',
    classes: 'bg-blue-600 text-white hover:bg-blue-700 ...',
    description: 'Primary brand button',
    responsive: true,
  },
  // ... more variants
];
```

### 2. Hook Implementation

The plugin uses hooks for analytics:

```typescript
hooks: {
  'variant:register': (context) => {
    console.log(`Registered variant: ${context.variantName}`);
  },
  'variant:resolve': (context) => {
    // Track when variants are used
    trackEvent('variant_used', {
      component: context.componentName,
      variant: context.variantName
    });
  },
}
```

### 3. Async Initialization

Complex setup can happen during initialization:

```typescript
initialize: async (context) => {
  console.log('Plugin initialized');
  console.log(`Total plugins: ${context.getLoadedPlugins().length}`);
}
```

## Development

### Adding New Variants

1. Add variant definition to the appropriate array (buttonVariants, badgeVariants, etc.)
2. Ensure component name matches a real design system component
3. Use valid Tailwind CSS classes
4. Include a description for documentation

### Testing

Test your plugin in isolation:

```typescript
import { getPluginManager, resetPluginManager } from '@launchapp/design-system';
import { brandPlugin } from './index';

describe('Brand Plugin', () => {
  afterEach(() => {
    resetPluginManager();
  });

  it('registers all variants', async () => {
    await getPluginManager().register(brandPlugin);

    const registry = getPluginManager().getRegistry();
    const buttonVariants = registry.getAllVariants('Button');

    expect(buttonVariants).toHaveLength(4); // brand-primary, secondary, danger, subtle
  });

  it('tracks variant usage', async () => {
    await getPluginManager().register(brandPlugin);

    await getPluginManager().emit('variant:resolve', {
      componentName: 'Button',
      variantName: 'brand-primary',
    });

    const stats = getBrandPluginStats();
    expect(stats['Button:brand-primary']).toBe(1);
  });
});
```

### Packaging for Distribution

To distribute this plugin as an npm package:

#### 1. Create package structure

```
@myorg/design-system-plugin-brand/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

#### 2. Configure package.json

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
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

#### 3. Build and publish

```bash
npm run build
npm publish
```

## Integration Examples

### With React

```typescript
import { getPluginManager } from '@launchapp/design-system';
import { brandPlugin } from './brand-plugin';

// In your app.tsx or main.tsx
async function initializeApp() {
  await getPluginManager().register(brandPlugin);

  // Now render your app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initializeApp();
```

### With Next.js

```typescript
// lib/plugins.ts
import { getPluginManager } from '@launchapp/design-system';
import { brandPlugin } from './brand-plugin';

let pluginsInitialized = false;

export async function initializePlugins() {
  if (pluginsInitialized) return;

  await getPluginManager().register(brandPlugin);
  pluginsInitialized = true;
}

// app/layout.tsx
import { initializePlugins } from '@/lib/plugins';

export default async function RootLayout() {
  await initializePlugins();

  return (
    <html>
      {/* ... */}
    </html>
  );
}
```

## Best Practices Demonstrated

1. **Clear Naming** - Plugin name and variant names are descriptive
2. **Documentation** - Each variant has a description
3. **Dark Mode Support** - Variants include dark mode utilities
4. **Responsive** - Variants support responsive behavior
5. **Hooks** - Analytics tracking via hooks
6. **Type Safety** - Full TypeScript support
7. **Export Options** - Multiple ways to use the plugin
8. **Development Helper** - Stats export for debugging

## Extending the Plugin

You can extend this plugin by:

1. Adding more component variants
2. Creating additional hooks
3. Adding initialization logic
4. Composing with other plugins

Example:

```typescript
import { brandPlugin } from './brand-plugin';

export const extendedBrandPlugin: PluginConfig = {
  ...brandPlugin,
  name: 'extended-brand',
  version: '1.1.0',
  variants: [
    ...(brandPlugin.variants || []),
    // Add new variants
    {
      name: 'brand-outline',
      componentName: 'Button',
      classes: 'border border-blue-600 text-blue-600 ...',
    },
  ],
};
```

## License

MIT - See main design system license
