<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-[hsl(var(--la-muted-foreground))]", props.class));
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol :class="classes">
      <slot />
    </ol>
  </nav>
</template>
