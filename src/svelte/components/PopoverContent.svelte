<script lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { usePopoverContext } from "../composables/usePopover";

  let { align = "center", class: className, children, ...restProps }: {
  align?: "start" | "end" | "center";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




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

let classes = $derived(
cn(
    "absolute z-50 mt-2 w-72 rounded-[--la-radius] border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
    alignClasses[align],
    className,
  ),
);
</script>

<div v-if="open" class={classes} {...restProps}>
    {@render children?.()}
  </div>
