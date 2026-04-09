<script setup lang="ts">
import { ref, watch } from "vue";
import { provideCollapsibleContext } from "../composables/useCollapsible";

interface Props {
  modelValue?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const open = ref(props.modelValue ?? props.defaultOpen);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) open.value = v;
  },
);

function toggle() {
  open.value = !open.value;
  emit("update:modelValue", open.value);
}

provideCollapsibleContext({ open, toggle });
</script>

<template>
  <div>
    <slot />
  </div>
</template>
