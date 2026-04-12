<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { provideAccordionItemContext, useAccordionContext } from "../composables/useAccordion";

interface Props {
  value: string;
  class?: string;
}

const props = defineProps<Props>();
provideAccordionItemContext({ value: props.value });
const { activeItems } = useAccordionContext();
const isOpen = computed(() => activeItems.value.includes(props.value));
const classes = computed(() => cn("border-b border-border", props.class));
</script>

<template>
  <div :class="classes" :data-state="isOpen ? 'open' : 'closed'">
    <slot />
  </div>
</template>
