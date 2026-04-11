<script lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

  let { align = "start", class: className, children, ...restProps }: {
  align?: "start" | "end" | "center";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




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

let classes = $derived(
cn(
    "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-1 text-[hsl(var(--la-popover-foreground))] shadow-md",
    alignClasses[align],
    className,
  ),
);
</script>

<div v-if="open" class={classes} role="menu" {...restProps}>
    {@render children?.()}
  </div>
