<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  variant?: "default" | "destructive";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const variantClasses = {
  default: "bg-[hsl(var(--la-background))] text-[hsl(var(--la-foreground))]",
  destructive: "border-[hsl(var(--la-destructive)/0.5)] text-[hsl(var(--la-destructive))] [&>svg]:text-[hsl(var(--la-destructive))]",
};

const classes = computed(() =>
  cn(
    "relative w-full rounded-[--la-radius] border border-[hsl(var(--la-border))] p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
    variantClasses[props.variant],
    props.class,
  ),
);
</script>

<template>
  <div role="alert" :class="classes">
    <slot />
  </div>
</template>
