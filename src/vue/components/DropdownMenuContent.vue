<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

interface Props {
  align?: "start" | "end" | "center";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  align: "start",
});

const { open, close, containerRef } = useDropdownMenuContext();

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
    "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-[--la-radius] border border-border bg-popover p-1 text-popover-foreground shadow-md",
    alignClasses[props.align],
    props.class,
  ),
);
</script>

<template>
  <div v-if="open" :class="classes" role="menu">
    <slot />
  </div>
</template>
