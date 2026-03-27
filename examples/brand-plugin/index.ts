/**
 * Example Brand Plugin
 *
 * This plugin demonstrates how to create a custom brand plugin that:
 * - Registers custom component variants
 * - Uses hooks for tracking and analytics
 * - Follows best practices for plugin development
 *
 * Usage:
 * ```
 * import { getPluginManager } from '@launchapp/design-system';
 * import { brandPlugin } from './brand-plugin';
 *
 * await getPluginManager().register(brandPlugin);
 * ```
 */

import type { PluginConfig, HookContext } from '../../src/lib/plugins';

// Define custom variants for buttons
const buttonVariants = [
  {
    name: 'brand-primary',
    componentName: 'Button',
    classes:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500',
    description: 'Primary brand button - use for main actions',
    responsive: true,
  },
  {
    name: 'brand-secondary',
    componentName: 'Button',
    classes:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500',
    description: 'Secondary brand button - use for alternative actions',
    responsive: true,
  },
  {
    name: 'brand-danger',
    componentName: 'Button',
    classes:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500',
    description: 'Danger action button - use for destructive actions',
    responsive: true,
  },
  {
    name: 'brand-subtle',
    componentName: 'Button',
    classes:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    description: 'Subtle button - for less prominent actions',
    responsive: true,
  },
];

// Define custom variants for badges
const badgeVariants = [
  {
    name: 'brand-primary',
    componentName: 'Badge',
    classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    description: 'Primary brand badge',
  },
  {
    name: 'brand-success',
    componentName: 'Badge',
    classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    description: 'Success status badge',
  },
  {
    name: 'brand-warning',
    componentName: 'Badge',
    classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    description: 'Warning status badge',
  },
  {
    name: 'brand-error',
    componentName: 'Badge',
    classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    description: 'Error status badge',
  },
];

// Define custom variants for cards
const cardVariants = [
  {
    name: 'brand-elevated',
    componentName: 'Card',
    classes:
      'shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-200',
    description: 'Elevated card with brand styling',
  },
  {
    name: 'brand-minimal',
    componentName: 'Card',
    classes: 'border border-gray-200 dark:border-gray-700',
    description: 'Minimal card with subtle border',
  },
];

/**
 * Example hook: Track variant usage for analytics
 */
function createAnalyticsHook() {
  const variantUsage: Record<string, number> = {};

  return {
    'variant:resolve': (context: HookContext) => {
      if (context.componentName && context.variantName) {
        const key = `${context.componentName}:${context.variantName}`;
        variantUsage[key] = (variantUsage[key] || 0) + 1;
      }
    },
    getStats: () => variantUsage,
  };
}

const analyticsHook = createAnalyticsHook();

/**
 * Main brand plugin configuration
 */
export const brandPlugin: PluginConfig = {
  name: 'brand-components',
  version: '1.0.0',
  description: 'Official brand variants for buttons, badges, and cards',
  author: 'LaunchApp Design Team',
  variants: [...buttonVariants, ...badgeVariants, ...cardVariants],
  hooks: {
    'variant:register': (context: HookContext) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[BrandPlugin] Registered variant: ${context.variantName}`);
      }
    },
    'variant:resolve': analyticsHook['variant:resolve'],
  },
  initialize: async (context) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[BrandPlugin] Initializing brand plugin...');
      console.log(`[BrandPlugin] Registered ${context.getLoadedPlugins().length} plugins total`);
    }
  },
};

export default brandPlugin;

/**
 * Export stats function for development/debugging
 */
export function getBrandPluginStats() {
  return analyticsHook.getStats();
}

/**
 * Export variant definitions for documentation
 */
export const brandVariants = {
  buttons: buttonVariants,
  badges: badgeVariants,
  cards: cardVariants,
};
