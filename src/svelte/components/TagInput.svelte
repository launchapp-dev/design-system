<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("w-full text-left px-2 py-1.5 rounded-sm text-sm transition-colors", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
