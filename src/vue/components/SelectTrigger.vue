<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useSelectContext } from "../composables/useSelect";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const { toggle, open } = useSelectContext();

const classes = computed(() =>
  cn(
    "flex h-10 w-full items-center justify-between rounded-[--la-radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    props.class,
  ),
);
</script>

<template>
  <button type="button" :class="classes" aria-haspopup="listbox" :aria-expanded="open" @click="toggle">
    <slot />
    <svg class="h-4 w-4 opacity-50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>
</template>
