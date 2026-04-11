<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
