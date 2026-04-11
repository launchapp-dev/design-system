<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
