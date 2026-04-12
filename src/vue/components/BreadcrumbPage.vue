<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("font-normal text-foreground", props.class));
</script>

<template>
  <span aria-current="page" :class="classes">
    <slot />
  </span>
</template>
