<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("absolute inline-flex animate-ping rounded-full opacity-75", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
