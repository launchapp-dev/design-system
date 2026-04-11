<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("group relative rounded-[--la-radius] border border-border bg-card p-4 transition-shadow", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
