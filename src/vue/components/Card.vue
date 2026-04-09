<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn("rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] text-[hsl(var(--la-card-foreground))] shadow-sm", props.class),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
