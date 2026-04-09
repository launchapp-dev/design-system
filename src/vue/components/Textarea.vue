<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  error?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  error: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const classes = computed(() =>
  cn(
    "flex min-h-[80px] w-full rounded-[--la-radius] border bg-[hsl(var(--la-background))] px-3 py-2 text-sm text-[hsl(var(--la-foreground))] placeholder:text-[hsl(var(--la-muted-foreground))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
    props.error
      ? "border-[hsl(var(--la-destructive))] focus-visible:ring-[hsl(var(--la-destructive))]"
      : "border-[hsl(var(--la-input))] focus-visible:ring-[hsl(var(--la-ring))]",
    props.class,
  ),
);
</script>

<template>
  <textarea
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :class="classes"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    @change="emit('change', $event)"
    @blur="emit('blur', $event as FocusEvent)"
    @focus="emit('focus', $event as FocusEvent)"
  />
</template>
