<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    "border-b border-[hsl(var(--la-border))] transition-colors hover:bg-[hsl(var(--la-muted)/0.5)] data-[state=selected]:bg-[hsl(var(--la-muted))]",
    props.class,
  ),
);
</script>

<template>
  <tr :class="classes">
    <slot />
  </tr>
</template>
