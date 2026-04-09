<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { provideToggleGroupContext } from "../composables/useToggleGroup";

interface Props {
  modelValue?: string | string[];
  type?: "single" | "multiple";
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "single",
  variant: "default",
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

provideToggleGroupContext({
  value: computed(() => props.modelValue),
  variant: computed(() => props.variant ?? "default"),
  size: computed(() => props.size ?? "md"),
  type: props.type ?? "single",
  toggle: (v: string) => {
    if (props.type === "multiple") {
      const current = Array.isArray(props.modelValue) ? props.modelValue : [];
      if (current.includes(v)) {
        emit("update:modelValue", current.filter((x) => x !== v));
      } else {
        emit("update:modelValue", [...current, v]);
      }
    } else {
      emit("update:modelValue", props.modelValue === v ? "" : v);
    }
  },
});

const classes = computed(() => cn("flex items-center justify-center gap-1", props.class));
</script>

<template>
  <div :class="classes" role="group">
    <slot />
  </div>
</template>
