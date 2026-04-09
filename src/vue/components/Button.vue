<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  loading: false,
  disabled: false,
  type: "button",
});

const variantClasses = {
  default: "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] hover:bg-[hsl(var(--la-primary)/0.9)]",
  destructive: "bg-[hsl(var(--la-destructive))] text-[hsl(var(--la-destructive-foreground))] hover:bg-[hsl(var(--la-destructive)/0.9)]",
  outline: "border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
  secondary: "bg-[hsl(var(--la-secondary))] text-[hsl(var(--la-secondary-foreground))] hover:bg-[hsl(var(--la-secondary)/0.8)]",
  ghost: "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
  link: "text-[hsl(var(--la-primary))] underline-offset-4 hover:underline",
};

const sizeClasses = {
  sm: "h-9 rounded-[--la-radius] px-3 text-sm",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-12 rounded-[--la-radius] px-8 text-base",
  icon: "h-10 w-10",
};

const isDisabled = computed(() => props.disabled || props.loading);
const classes = computed(() =>
  cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[--la-radius] font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>

<template>
  <button :type="type" :disabled="isDisabled" :class="classes">
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
  </button>
</template>
