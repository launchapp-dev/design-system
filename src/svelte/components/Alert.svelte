<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("mb-1 font-medium leading-none tracking-tight", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
