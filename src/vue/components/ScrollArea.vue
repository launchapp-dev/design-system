<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("relative overflow-hidden", props.class));
</script>

<template>
  <div :class="classes">
    <div class="h-full w-full overflow-auto">
      <slot />
    </div>
  </div>
</template>
