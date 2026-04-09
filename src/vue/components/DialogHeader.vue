<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("flex flex-col space-y-1.5 text-center sm:text-left", props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
