<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useAccordionContext, useAccordionItemContext } from "../composables/useAccordion";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const { activeItems } = useAccordionContext();
const { value } = useAccordionItemContext();
const isOpen = computed(() => activeItems.value.includes(value));
const classes = computed(() => cn("overflow-hidden text-sm", props.class));
</script>

<template>
  <div v-if="isOpen" :class="classes">
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template>
