<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  label: string;
  value: string | number;
  sublabel?: string;
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("flex flex-col gap-1", props.class));
</script>

<template>
  <div :class="classes">
    <span class="text-sm text-[hsl(var(--la-muted-foreground))]">{{ label }}</span>
    <span class="text-2xl font-semibold tabular-nums text-[hsl(var(--la-foreground))]">{{ value }}</span>
    <span v-if="sublabel" class="text-xs text-[hsl(var(--la-muted-foreground))]">{{ sublabel }}</span>
    <slot />
  </div>
</template>
