<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  class?: string;
}

const props = defineProps<Props>();

const trendColors = {
  up: "text-green-600 dark:text-green-400",
  down: "text-red-600 dark:text-red-400",
  neutral: "text-muted-foreground",
};

const classes = computed(() =>
  cn("rounded-[--la-radius] border border-border bg-card p-6", props.class),
);
</script>

<template>
  <div :class="classes">
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
      <slot name="icon" />
    </div>
    <div class="mt-2 flex items-end gap-2">
      <span class="text-2xl font-bold text-foreground">{{ value }}</span>
      <span
        v-if="trendValue && trend"
        :class="cn('text-xs font-medium pb-0.5', trendColors[trend])"
      >
        {{ trendValue }}
      </span>
    </div>
    <p v-if="description" class="mt-1 text-xs text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
