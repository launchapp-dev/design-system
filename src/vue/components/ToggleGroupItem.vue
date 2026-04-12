<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useToggleGroupContext } from "../composables/useToggleGroup";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const ctx = useToggleGroupContext();

const isSelected = computed(() => {
  const v = ctx.value.value;
  if (Array.isArray(v)) return v.includes(props.value);
  return v === props.value;
});

const variantClasses: Record<string, string> = {
  default: "bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
};

const sizeClasses: Record<string, string> = {
  sm: "h-9 px-2.5",
  md: "h-10 px-3",
  lg: "h-11 px-5",
};

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center rounded-[--la-radius] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[ctx.variant.value],
    sizeClasses[ctx.size.value],
    props.class,
  ),
);
</script>

<template>
  <button
    type="button"
    :data-state="isSelected ? 'on' : 'off'"
    :aria-pressed="isSelected"
    :disabled="disabled"
    :class="classes"
    @click="ctx.toggle(value)"
  >
    <slot />
  </button>
</template>
