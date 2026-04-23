<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import { cn } from "../utils/cn";

interface Props {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  as?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  as: "button",
  loading: false,
  disabled: false,
  type: "button",
});

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses = {
  sm: "h-11 md:h-9 rounded-[var(--la-radius)] px-3 text-sm min-h-[44px] md:min-h-0",
  md: "h-12 md:h-10 px-4 py-2 text-sm min-h-[44px] md:min-h-0",
  lg: "h-12 rounded-[var(--la-radius)] px-8 text-base min-h-[44px]",
  icon: "h-11 w-11 md:h-10 md:w-10 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
};

const isDisabled = computed(() => props.disabled || props.loading);

const nativeElements = new Set(["button", "a", "span", "div", "input", "label"]);

const tag = computed(() => {
  if (nativeElements.has(props.as)) return props.as;
  return resolveComponent(props.as);
});

const isButton = computed(() => props.as === "button");

const classes = computed(() =>
  cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--la-radius)] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>

<template>
  <component
    :is="tag"
    :type="isButton ? type : undefined"
    :disabled="isButton ? isDisabled : undefined"
    :aria-disabled="!isButton && isDisabled ? true : undefined"
    :class="classes"
  >
    <svg
      v-if="loading"
      class="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </component>
</template>
