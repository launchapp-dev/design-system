<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn("absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]", props.class),
);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
