<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("inline-flex items-center gap-1.5", props.class));
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
