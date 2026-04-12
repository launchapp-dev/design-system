<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useRadioGroupContext } from "../composables/useRadioGroup";

interface Props {
  value: string;
  id?: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { value: selectedValue, onChange } = useRadioGroupContext();
const isSelected = computed(() => selectedValue.value === props.value);

const classes = computed(() =>
  cn(
    "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
    props.class,
  ),
);

function handleClick() {
  if (!props.disabled) {
    onChange(props.value);
  }
}
</script>

<template>
  <button
    :id="id"
    type="button"
    role="radio"
    :aria-checked="isSelected"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <div
      v-if="isSelected"
      class="h-2.5 w-2.5 rounded-full bg-primary"
    />
  </button>
</template>
