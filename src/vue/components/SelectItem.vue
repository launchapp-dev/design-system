<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useSelectContext } from "../composables/useSelect";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { value: selectedValue, select } = useSelectContext();
const isSelected = computed(() => selectedValue.value === props.value);

const classes = computed(() =>
  cn(
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
    props.disabled && "pointer-events-none opacity-50",
    props.class,
  ),
);
</script>

<template>
  <div
    role="option"
    :aria-selected="isSelected"
    :class="classes"
    @click="!disabled && select(value)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg v-if="isSelected" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
    <slot />
  </div>
</template>
