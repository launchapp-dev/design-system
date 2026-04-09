<script setup lang="ts">
import { ref, watch } from "vue";
import { provideSelectContext } from "../composables/useSelect";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const open = ref(false);
const value = ref(props.modelValue ?? props.defaultValue);
const containerRef = ref<HTMLElement | null>(null);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) value.value = v;
  },
);

function select(v: string) {
  value.value = v;
  open.value = false;
  emit("update:modelValue", v);
}

function close() {
  open.value = false;
}

function toggle() {
  if (!props.disabled) open.value = !open.value;
}

provideSelectContext({ open, value, containerRef, select, close, toggle });
</script>

<template>
  <div ref="containerRef" class="relative">
    <slot />
  </div>
</template>
