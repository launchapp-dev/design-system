<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn("border-t border-[hsl(var(--la-border))] bg-[hsl(var(--la-muted)/0.5)] font-medium [&>tr]:last:border-b-0", props.class),
);
</script>

<template>
  <tfoot :class="classes">
    <slot />
  </tfoot>
</template>
