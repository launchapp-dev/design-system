<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn("animate-pulse rounded-[--la-radius] bg-[hsl(var(--la-muted))]", props.class),
);
</script>

<template>
  <div :class="classes" />
</template>
