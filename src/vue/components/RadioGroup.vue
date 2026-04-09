<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { provideRadioGroupContext } from "../composables/useRadioGroup";

interface Props {
  modelValue?: string;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

provideRadioGroupContext({
  value: computed(() => props.modelValue),
  onChange: (v: string) => emit("update:modelValue", v),
});

const classes = computed(() => cn("grid gap-2", props.class));
</script>

<template>
  <div role="radiogroup" :class="classes">
    <slot />
  </div>
</template>
