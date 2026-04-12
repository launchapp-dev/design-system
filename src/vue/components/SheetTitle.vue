<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("text-lg font-semibold text-foreground", props.class));
</script>

<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>
