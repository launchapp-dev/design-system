<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  inset?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  inset: false,
});

const classes = computed(() =>
  cn("px-2 py-1.5 text-sm font-semibold", props.inset && "pl-8", props.class),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
