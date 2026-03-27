import type React from "react";
import { cva, type CVAReturn } from "class-variance-authority";
import { cn } from "../utils";
import type {
  VariantExtension,
  BehaviorExtension,
  ComponentExtension,
} from "./types";
import { pluginRegistry } from "./registry";

export function mergeVariants(
  baseCVA: CVAReturn,
  extensions: VariantExtension[]
): CVAReturn {
  if (extensions.length === 0) {
    return baseCVA;
  }

  const mergedVariants = { ...baseCVA.variants };
  let mergedDefaults = baseCVA.defaultVariants
    ? { ...baseCVA.defaultVariants }
    : {};

  for (const ext of extensions) {
    for (const [key, value] of Object.entries(ext.variants)) {
      if (mergedVariants[key]) {
        mergedVariants[key] = {
          ...(typeof mergedVariants[key] === "object"
            ? mergedVariants[key]
            : {}),
          ...value,
        };
      } else {
        mergedVariants[key] = value;
      }
    }

    if (ext.defaultVariants) {
      mergedDefaults = { ...mergedDefaults, ...ext.defaultVariants };
    }
  }

  return cva(baseCVA.base, {
    variants: mergedVariants,
    defaultVariants: mergedDefaults,
  });
}

export function applyBehaviorExtensions(
  Component: React.ComponentType<any>,
  extensions: BehaviorExtension[]
): React.ComponentType<any> {
  let WrappedComponent = Component;

  for (const ext of extensions) {
    if (ext.wrapper) {
      WrappedComponent = ext.wrapper(WrappedComponent);
    }
  }

  return WrappedComponent;
}

export function getComponentExtensionsForName(
  componentName: string
): ComponentExtension[] {
  return pluginRegistry.getComponentExtensions(componentName);
}

export function getExtendedVariantsForComponent(
  componentName: string,
  baseCVA: CVAReturn
): CVAReturn {
  const variantExtensions = pluginRegistry.getVariantExtensions(componentName);
  return mergeVariants(baseCVA, variantExtensions);
}

export function wrapComponentWithBehaviors(
  Component: React.ComponentType<any>,
  componentName: string
): React.ComponentType<any> {
  const behaviorExtensions = pluginRegistry.getBehaviorExtensions(componentName);
  return applyBehaviorExtensions(Component, behaviorExtensions);
}
