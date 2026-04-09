<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  modelValue?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  variant: "default",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const variantClasses = {
  default: "bg-transparent hover:bg-[hsl(var(--la-muted))] hover:text-[hsl(var(--la-muted-foreground))] data-[state=on]:bg-[hsl(var(--la-accent))] data-[state=on]:text-[hsl(var(--la-accent-foreground))]",
  outline: "border border-[hsl(var(--la-input))] bg-transparent hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] data-[state=on]:bg-[hsl(var(--la-accent))] data-[state=on]:text-[hsl(var(--la-accent-foreground))]",
};

const sizeClasses = {
  sm: "h-9 px-2.5",
  md: "h-10 px-3",
  lg: "h-11 px-5",
};

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center rounded-[--la-radius] text-sm font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="modelValue"
    :data-state="modelValue ? 'on' : 'off'"
    :disabled="disabled"
    :class="classes"
    @click="toggle"
  >
    <slot />
  </button>
</template>
