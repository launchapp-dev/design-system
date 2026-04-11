<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
