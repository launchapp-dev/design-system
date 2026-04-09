<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useAccordionContext, useAccordionItemContext } from "../composables/useAccordion";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const { activeItems, toggle } = useAccordionContext();
const { value } = useAccordionItemContext();
const isOpen = computed(() => activeItems.value.includes(value));

const classes = computed(() =>
  cn(
    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
    props.class,
  ),
);
</script>

<template>
  <h3 class="flex">
    <button
      type="button"
      :aria-expanded="isOpen"
      :class="classes"
      @click="toggle(value)"
    >
      <slot />
      <svg
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  </h3>
</template>
