<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  status?: "live" | "offline" | "idle";
  label?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  status: "live",
});

const statusColors = {
  live: "bg-green-500",
  offline: "bg-red-500",
  idle: "bg-yellow-500",
};

const classes = computed(() => cn("inline-flex items-center gap-1.5", props.class));
</script>

<template>
  <span :class="classes">
    <span class="relative flex h-2 w-2">
      <span
        v-if="status === 'live'"
        :class="cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', statusColors[status])"
      />
      <span :class="cn('relative inline-flex h-2 w-2 rounded-full', statusColors[status])" />
    </span>
    <span v-if="label" class="text-xs font-medium text-[hsl(var(--la-muted-foreground))]">{{ label }}</span>
    <slot />
  </span>
</template>
