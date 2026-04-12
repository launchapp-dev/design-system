<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    "inline-flex h-10 items-center justify-center rounded-[--la-radius] bg-muted p-1 text-muted-foreground",
    props.class,
  ),
);
</script>

<template>
  <div role="tablist" :class="classes">
    <slot />
  </div>
</template>
