<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn(
    "inline-flex h-10 items-center justify-center rounded-[--la-radius] bg-muted p-1 text-muted-foreground",
    className,
  ),
);
</script>

<div role="tablist" class={classes} {...restProps}>
    {@render children?.()}
  </div>
