<script lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "../utils/cn";
import { useSelectContext } from "../composables/useSelect";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



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

let classes = $derived(
cn(
    "absolute z-50 min-w-[8rem] overflow-hidden rounded-[--la-radius] border border-border bg-popover text-popover-foreground shadow-md top-full mt-1 w-full",
    className,
  ),
);
</script>

<div v-if="open" class={classes} role="listbox" {...restProps}>
    <div class="p-1">
      {@render children?.()}
    </div>
  </div>
