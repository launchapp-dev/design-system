<script setup lang="ts">
import { ref } from "vue";
import { cn } from "../utils/cn";

interface Props {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  side: "top",
});

const visible = ref(false);

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
};
</script>

<template>
  <div
    class="relative inline-flex"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focusin="visible = true"
    @focusout="visible = false"
  >
    <slot />
    <div
      v-if="visible"
      role="tooltip"
      :class="cn(
        'absolute z-50 overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] px-3 py-1.5 text-xs text-[hsl(var(--la-popover-foreground))] shadow-md whitespace-nowrap',
        sideClasses[side],
        props.class,
      )"
    >
      {{ content }}
    </div>
  </div>
</template>
