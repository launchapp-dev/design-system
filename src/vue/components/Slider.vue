<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../utils/cn";

interface Props {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
  change: [value: number];
}>();

const percentage = computed(() =>
  ((props.modelValue - props.min) / (props.max - props.min)) * 100,
);

function handleInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  emit("update:modelValue", value);
  emit("change", value);
}

const classes = computed(() =>
  cn("relative flex w-full touch-none select-none items-center", props.class),
);
</script>

<template>
  <div :class="classes">
    <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-[hsl(var(--la-secondary))]">
      <div
        class="absolute h-full bg-[hsl(var(--la-primary))]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      @input="handleInput"
    />
    <div
      class="block h-5 w-5 rounded-full border-2 border-[hsl(var(--la-primary))] bg-[hsl(var(--la-background))] shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 absolute"
      :style="{ left: `calc(${percentage}% - 10px)` }"
    />
  </div>
</template>
