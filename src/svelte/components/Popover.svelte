<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
