/**
 * Demo: Using the Brand Plugin
 *
 * This file shows how to use the brand plugin in a React application.
 * It demonstrates:
 * - Plugin registration
 * - Using custom variants with the useVariant hook
 * - Querying the variant registry
 * - Integrating with components
 */

import { useEffect, useState } from 'react';
import {
  getPluginManager,
  useVariant,
  getComponentVariants,
  hasCustomVariant,
  getCustomVariant,
  type CustomVariant,
} from '../../src/lib/plugins';
import { brandPlugin, getBrandPluginStats } from './index';

/**
 * Initialize plugins in your app
 */
async function initializePlugins() {
  const manager = getPluginManager();

  // Register the brand plugin
  await manager.register(brandPlugin);

  console.log('✓ Brand plugin registered');
  console.log(`✓ Total plugins: ${manager.getPlugins().length}`);

  // List all registered variants
  const registry = manager.getRegistry();
  const allVariants = registry.getAllVariants();
  console.log(`✓ Total variants: ${allVariants.length}`);
}

/**
 * Component: Brand Button Showcase
 *
 * Demonstrates using custom button variants
 */
function BrandButtonShowcase() {
  const primaryClasses = useVariant('Button', 'brand-primary', 'px-4 py-2 rounded');
  const secondaryClasses = useVariant('Button', 'brand-secondary', 'px-4 py-2 rounded');
  const dangerClasses = useVariant('Button', 'brand-danger', 'px-4 py-2 rounded');
  const subtleClasses = useVariant('Button', 'brand-subtle', 'px-4 py-2 rounded');

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Brand Button Variants</h2>

      <div className="space-y-2">
        <button className={primaryClasses}>Primary Action</button>
        <button className={secondaryClasses}>Secondary Action</button>
        <button className={dangerClasses}>Delete (Danger)</button>
        <button className={subtleClasses}>Additional Option</button>
      </div>
    </div>
  );
}

/**
 * Component: Variant Registry Browser
 *
 * Shows all available variants and their details
 */
function VariantRegistryBrowser() {
  const [variants, setVariants] = useState<CustomVariant[]>([]);

  useEffect(() => {
    const registry = getPluginManager().getRegistry();
    setVariants(registry.getAllVariants());
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Variants</h2>

      <div className="grid gap-4">
        {variants.map((variant) => (
          <div key={`${variant.componentName}:${variant.name}`} className="border rounded p-4">
            <h3 className="font-semibold">
              {variant.componentName} → {variant.name}
            </h3>
            {variant.description && <p className="text-sm text-gray-600">{variant.description}</p>}
            <code className="block bg-gray-100 p-2 rounded mt-2 text-xs">{variant.classes}</code>
            {variant.responsive && <span className="text-xs text-green-600 mt-2 block">✓ Responsive</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Component: Variant Query Examples
 *
 * Demonstrates different ways to query the variant registry
 */
function VariantQueryExamples() {
  const [queryResults, setQueryResults] = useState<string[]>([]);

  useEffect(() => {
    const results: string[] = [];

    // Check if a variant exists
    if (hasCustomVariant('Button', 'brand-primary')) {
      results.push('✓ Button variant "brand-primary" exists');
    }

    // Get a specific variant
    const variant = getCustomVariant('Button', 'brand-primary');
    if (variant) {
      results.push(`✓ Button variant classes: ${variant.classes}`);
    }

    // Get all variants for a component
    const buttonVariants = getComponentVariants('Button');
    results.push(`✓ Total Button variants: ${buttonVariants.length}`);

    const badgeVariants = getComponentVariants('Badge');
    results.push(`✓ Total Badge variants: ${badgeVariants.length}`);

    setQueryResults(results);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Variant Registry Queries</h2>

      <div className="space-y-2">
        {queryResults.map((result, idx) => (
          <div key={idx} className="font-mono text-sm">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Component: Analytics Dashboard
 *
 * Shows plugin analytics (tracked via hooks)
 */
function AnalyticsDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    // Get stats from the brand plugin
    const pluginStats = getBrandPluginStats();
    setStats(pluginStats);

    // Update stats when variants are used
    const manager = getPluginManager();
    manager.emit('variant:resolve', {
      componentName: 'Button',
      variantName: 'brand-primary',
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Variant Usage Analytics</h2>

      {Object.keys(stats).length > 0 ? (
        <div className="space-y-2">
          {Object.entries(stats).map(([key, count]) => (
            <div key={key} className="flex justify-between items-center border-b pb-2">
              <span className="font-mono">{key}</span>
              <span className="font-bold">{count} uses</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No variant usage tracked yet</p>
      )}
    </div>
  );
}

/**
 * Component: Plugin Info
 *
 * Displays information about loaded plugins
 */
function PluginInfo() {
  const [pluginInfo, setPluginInfo] = useState<string[]>([]);

  useEffect(() => {
    const manager = getPluginManager();
    const plugins = manager.getPlugins();
    const info = plugins.map((p) => `${p.name} v${p.version}`);
    setPluginInfo(info);
  }, []);

  return (
    <div className="p-6 bg-blue-50 rounded">
      <h2 className="text-2xl font-bold mb-4">Loaded Plugins</h2>

      <div className="space-y-2">
        {pluginInfo.map((info) => (
          <div key={info} className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span className="font-mono">{info}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main Demo App
 */
export default function BrandPluginDemo() {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializePlugins()
      .then(() => setInitialized(true))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded">
        <h1 className="text-xl font-bold text-red-800">Error</h1>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Initializing plugins...</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Brand Plugin Demo</h1>

      <PluginInfo />

      <BrandButtonShowcase />

      <VariantQueryExamples />

      <VariantRegistryBrowser />

      <AnalyticsDashboard />

      <div className="p-6 bg-white border rounded">
        <h2 className="text-xl font-bold mb-4">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Create your own custom variants</li>
          <li>Add hooks for analytics or custom logic</li>
          <li>Package your plugin for distribution</li>
          <li>Share with the community</li>
        </ul>
      </div>
    </div>
  );
}
