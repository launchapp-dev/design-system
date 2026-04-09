<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  value?: number;
  max?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
});

const percentage = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)));

const classes = computed(() =>
  cn("relative h-4 w-full overflow-hidden rounded-full bg-[hsl(var(--la-secondary))]", props.class),
);
</script>

<template>
  <div
    :class="classes"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
  >
    <div
      class="h-full w-full flex-1 bg-[hsl(var(--la-primary))] transition-all"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </div>
</template>
