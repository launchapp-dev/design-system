<script lang="ts">
import { cn } from "../utils/cn";

  let { inset = false, class: className, children, ...restProps }: {
  inset?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




let classes = $derived(
cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
);
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
