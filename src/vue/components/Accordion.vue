<script setup lang="ts">
import { ref, watch } from "vue";
import { provideAccordionContext } from "../composables/useAccordion";

interface Props {
  type?: "single" | "multiple";
  modelValue?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "single",
  collapsible: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

const defaultItems = props.modelValue
  ? Array.isArray(props.modelValue)
    ? props.modelValue
    : [props.modelValue]
  : props.defaultValue
    ? Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue]
    : [];

const activeItems = ref<string[]>(defaultItems);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) {
      activeItems.value = Array.isArray(v) ? v : [v];
    }
  },
);

function toggle(value: string) {
  if (props.type === "single") {
    if (activeItems.value.includes(value)) {
      activeItems.value = props.collapsible ? [] : [value];
    } else {
      activeItems.value = [value];
    }
    emit("update:modelValue", activeItems.value[0] ?? "");
  } else {
    if (activeItems.value.includes(value)) {
      activeItems.value = activeItems.value.filter((v) => v !== value);
    } else {
      activeItems.value = [...activeItems.value, value];
    }
    emit("update:modelValue", activeItems.value);
  }
}

provideAccordionContext({ activeItems, type: props.type, toggle });
</script>

<template>
  <div>
    <slot />
  </div>
</template>
