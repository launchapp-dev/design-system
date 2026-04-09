<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { usePopoverContext } from "../composables/usePopover";

interface Props {
  align?: "start" | "end" | "center";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  align: "center",
});

const { open, close, containerRef } = usePopoverContext();

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    close();
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

onMounted(() => {
  document.addEventListener("mousedown", onClickOutside);
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", onClickOutside);
  document.removeEventListener("keydown", onKeydown);
});

const alignClasses = {
  start: "left-0",
  end: "right-0",
  center: "left-1/2 -translate-x-1/2",
};

const classes = computed(() =>
  cn(
    "absolute z-50 mt-2 w-72 rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-4 text-[hsl(var(--la-popover-foreground))] shadow-md outline-none",
    alignClasses[props.align],
    props.class,
  ),
);
</script>

<template>
  <div v-if="open" :class="classes">
    <slot />
  </div>
</template>
