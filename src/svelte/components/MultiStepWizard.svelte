<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex-1 h-1 rounded-full transition-colors duration-200", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
