<script setup lang="ts">
import { ref, watch } from "vue";
import { provideDialogContext } from "../composables/useDisclosure";

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

const internalOpen = ref(props.modelValue ?? props.defaultOpen);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) internalOpen.value = v;
  },
);

function close() {
  internalOpen.value = false;
  emit("update:modelValue", false);
}

provideDialogContext(internalOpen, close);
</script>

<template>
  <slot />
</template>
