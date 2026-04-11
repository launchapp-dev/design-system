<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("bento-card-header mb-2", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
