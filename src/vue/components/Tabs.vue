<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../utils/cn";
import { provideTabsContext } from "../composables/useTabs";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const internalValue = ref(props.modelValue ?? props.defaultValue);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) internalValue.value = v;
  },
);

provideTabsContext(internalValue, (value) => {
  internalValue.value = value;
  emit("update:modelValue", value);
});

const classes = computed(() => cn("w-full", props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
