<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("z-50 w-80 rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-0 text-[hsl(var(--la-popover-foreground))] shadow-lg outline-none", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
