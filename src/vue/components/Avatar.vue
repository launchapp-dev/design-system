<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../utils/cn";

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const imgError = ref(false);

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const classes = computed(() =>
  cn(
    "relative flex shrink-0 overflow-hidden rounded-full",
    sizeClasses[props.size],
    props.class,
  ),
);

const initials = computed(() => {
  if (props.fallback) return props.fallback.slice(0, 2).toUpperCase();
  if (props.alt) {
    return props.alt
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return "?";
});
</script>

<template>
  <span :class="classes">
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt ?? ''"
      class="aspect-square h-full w-full object-cover"
      @error="imgError = true"
    />
    <span
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground"
    >
      <slot>{{ initials }}</slot>
    </span>
  </span>
</template>
