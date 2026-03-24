/**
 * Status Badge Plugin
 *
 * Adds status-specific badge variants with semantic meaning
 * (active, inactive, pending, success, warning, error).
 */

import { createPlugin } from "../lib/plugin-system";

/**
 * Status badge plugin with semantic variants
 *
 * @example
 * ```typescript
 * import { getPluginRegistry } from "@/lib/plugin-system";
 * import { statusBadgePlugin } from "@/plugins/status-badge.plugin";
 *
 * const registry = getPluginRegistry();
 * registry.register(statusBadgePlugin);
 *
 * // Now Badge component can use status variants
 * <Badge variant="success">Published</Badge>
 * <Badge variant="pending">Processing</Badge>
 * <Badge variant="error">Failed</Badge>
 * ```
 */
export const statusBadgePlugin = createPlugin({
  component: "Badge",
  variants: {
    variant: {
      success: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
      error: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
      warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
      pending: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 animate-pulse",
      active: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
      inactive: "border-transparent bg-gray-200 text-gray-700 dark:bg-gray-700/40 dark:text-gray-400",
    },
  },
  metadata: {
    name: "status-badge-plugin",
    version: "1.0.0",
    description: "Adds semantic status badge variants",
    author: "design-system",
  },
});

export default statusBadgePlugin;
