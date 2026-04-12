<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  id?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const trackClasses = computed(() =>
  cn(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    props.modelValue ? "bg-primary" : "bg-input",
    props.class,
  ),
);

const thumbClasses = computed(() =>
  cn(
    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
    props.modelValue ? "translate-x-5" : "translate-x-0",
  ),
);

function toggle() {
  if (!props.disabled) {
    const next = !props.modelValue;
    emit("update:modelValue", next);
    emit("change", next);
  }
}
</script>

<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="trackClasses"
    @click="toggle"
  >
    <span :class="thumbClasses" />
  </button>
</template>
