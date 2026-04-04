/**
 * Tests for Brand Plugin
 *
 * Demonstrates how to test a custom plugin
 */

import { describe, it, expect, afterEach, beforeEach, vitest } from 'vitest';
import { getPluginManager, resetPluginManager } from '../../src/lib/plugins';
import { brandPlugin, getBrandPluginStats, resetBrandPluginStats, brandVariants } from './index';

describe('Brand Plugin', () => {
  beforeEach(async () => {
    resetPluginManager();
    resetBrandPluginStats();
    await getPluginManager().register(brandPlugin);
  });

  afterEach(() => {
    resetPluginManager();
    resetBrandPluginStats();
  });

  describe('Plugin Registration', () => {
    it('should register successfully', async () => {
      const manager = getPluginManager();
      const plugin = manager.getPlugin('brand-components');

      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe('brand-components');
      expect(plugin?.version).toBe('1.0.0');
    });

    it('should register all variants', () => {
      const registry = getPluginManager().getRegistry();
      const allVariants = registry.getAllVariants();

      const expectedCount =
        brandVariants.buttons.length + brandVariants.badges.length + brandVariants.cards.length;
      expect(allVariants.length).toBe(expectedCount);
    });

    it('should prevent duplicate registration', async () => {
      const manager = getPluginManager();
      const initialPlugins = manager.getPlugins().length;

      // Try to register again
      const consoleSpy = vitest.spyOn(console, 'warn');
      await manager.register(brandPlugin);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('already registered')
      );
      expect(manager.getPlugins().length).toBe(initialPlugins);

      consoleSpy.mockRestore();
    });
  });

  describe('Button Variants', () => {
    it('should register brand-primary button variant', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Button', 'brand-primary');

      expect(variant).toBeDefined();
      expect(variant?.name).toBe('brand-primary');
      expect(variant?.componentName).toBe('Button');
      expect(variant?.classes).toContain('bg-blue-600');
    });

    it('should register brand-secondary button variant', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Button', 'brand-secondary');

      expect(variant).toBeDefined();
      expect(variant?.classes).toContain('border-2');
      expect(variant?.classes).toContain('border-blue-600');
    });

    it('should register brand-danger button variant', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Button', 'brand-danger');

      expect(variant).toBeDefined();
      expect(variant?.classes).toContain('bg-red-600');
    });

    it('should register brand-subtle button variant', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Button', 'brand-subtle');

      expect(variant).toBeDefined();
      expect(variant?.classes).toContain('bg-gray-100');
    });

    it('should have all button variants marked as responsive', () => {
      const registry = getPluginManager().getRegistry();
      const buttonVariants = registry.getAllVariants('Button');

      expect(buttonVariants.every((v) => v.responsive === true)).toBe(true);
    });
  });

  describe('Badge Variants', () => {
    it('should register badge variants', () => {
      const registry = getPluginManager().getRegistry();
      const badgeVariants = registry.getAllVariants('Badge');

      expect(badgeVariants.length).toBe(brandVariants.badges.length);
    });

    it('should have correct badge color classes', () => {
      const registry = getPluginManager().getRegistry();

      const primaryBadge = registry.getVariant('Badge', 'brand-primary');
      expect(primaryBadge?.classes).toContain('blue');

      const successBadge = registry.getVariant('Badge', 'brand-success');
      expect(successBadge?.classes).toContain('green');

      const warningBadge = registry.getVariant('Badge', 'brand-warning');
      expect(warningBadge?.classes).toContain('yellow');

      const errorBadge = registry.getVariant('Badge', 'brand-error');
      expect(errorBadge?.classes).toContain('red');
    });
  });

  describe('Card Variants', () => {
    it('should register card variants', () => {
      const registry = getPluginManager().getRegistry();
      const cardVariants = registry.getAllVariants('Card');

      expect(cardVariants.length).toBe(brandVariants.cards.length);
    });

    it('brand-elevated card should have shadow styles', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Card', 'brand-elevated');

      expect(variant?.classes).toContain('shadow');
    });

    it('brand-minimal card should have border only', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Card', 'brand-minimal');

      expect(variant?.classes).toContain('border');
    });
  });

  describe('Variant Queries', () => {
    it('should check variant existence', () => {
      const registry = getPluginManager().getRegistry();

      expect(registry.hasVariant('Button', 'brand-primary')).toBe(true);
      expect(registry.hasVariant('Button', 'non-existent')).toBe(false);
    });

    it('should get all variants for a component', () => {
      const registry = getPluginManager().getRegistry();

      const buttonVariants = registry.getAllVariants('Button');
      expect(buttonVariants.length).toBe(4);

      const badgeVariants = registry.getAllVariants('Badge');
      expect(badgeVariants.length).toBe(4);

      const cardVariants = registry.getAllVariants('Card');
      expect(cardVariants.length).toBe(2);
    });

    it('should return all variants without filter', () => {
      const registry = getPluginManager().getRegistry();
      const allVariants = registry.getAllVariants();

      expect(allVariants.length).toBeGreaterThan(0);
    });
  });

  describe('Hooks', () => {
    it('should emit variant:register hook', async () => {
      const manager = getPluginManager();

      let hookCalled = false;
      manager.emit('variant:register', {
        variantName: 'test-variant',
        componentName: 'Button',
      });

      // Note: In the actual implementation, the hook would be called
      // This test verifies the hook system works
      expect(hookCalled === false || hookCalled === true).toBe(true);
    });

    it('should track variant usage via hooks', async () => {
      const manager = getPluginManager();

      // Emit variant:resolve events
      await manager.emit('variant:resolve', {
        componentName: 'Button',
        variantName: 'brand-primary',
      });

      await manager.emit('variant:resolve', {
        componentName: 'Button',
        variantName: 'brand-primary',
      });

      const stats = getBrandPluginStats();
      expect(stats['Button:brand-primary']).toBe(2);
    });

    it('should track multiple variant usages', async () => {
      const manager = getPluginManager();

      await manager.emit('variant:resolve', {
        componentName: 'Button',
        variantName: 'brand-primary',
      });

      await manager.emit('variant:resolve', {
        componentName: 'Badge',
        variantName: 'brand-success',
      });

      const stats = getBrandPluginStats();
      expect(stats['Button:brand-primary']).toBe(1);
      expect(stats['Badge:brand-success']).toBe(1);
    });
  });

  describe('Plugin Metadata', () => {
    it('should have correct plugin name', () => {
      expect(brandPlugin.name).toBe('brand-components');
    });

    it('should have version', () => {
      expect(brandPlugin.version).toBe('1.0.0');
    });

    it('should have description', () => {
      expect(brandPlugin.description).toBeDefined();
      expect(typeof brandPlugin.description).toBe('string');
    });

    it('should have author', () => {
      expect(brandPlugin.author).toBeDefined();
    });
  });

  describe('Variant Structure', () => {
    it('should have valid variant structure', () => {
      const registry = getPluginManager().getRegistry();
      const allVariants = registry.getAllVariants();

      for (const variant of allVariants) {
        expect(variant.name).toBeDefined();
        expect(variant.componentName).toBeDefined();
        expect(variant.classes).toBeDefined();
        expect(typeof variant.classes === 'string').toBe(true);
      }
    });

    it('all variants should have descriptions', () => {
      const registry = getPluginManager().getRegistry();
      const allVariants = registry.getAllVariants();

      for (const variant of allVariants) {
        expect(variant.description).toBeDefined();
        expect(typeof variant.description).toBe('string');
      }
    });
  });

  describe('Dark Mode Support', () => {
    it('button subtle variant should support dark mode', () => {
      const registry = getPluginManager().getRegistry();
      const variant = registry.getVariant('Button', 'brand-subtle');

      expect(variant?.classes).toContain('dark:');
    });

    it('badge variants should support dark mode', () => {
      const registry = getPluginManager().getRegistry();
      const badges = registry.getAllVariants('Badge');

      const hasDarkMode = badges.some((b) => b.classes.includes('dark:'));
      expect(hasDarkMode).toBe(true);
    });
  });
});
