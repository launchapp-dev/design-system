<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { useSelectContext } from "../composables/useSelect";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const { open, close, containerRef } = useSelectContext();

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

const classes = computed(() =>
  cn(
    "absolute z-50 min-w-[8rem] overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] text-[hsl(var(--la-popover-foreground))] shadow-md top-full mt-1 w-full",
    props.class,
  ),
);
</script>

<template>
  <div v-if="open" :class="classes" role="listbox">
    <div class="p-1">
      <slot />
    </div>
  </div>
</template>
