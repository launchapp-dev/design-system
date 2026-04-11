<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex items-center gap-1 rounded pr-0.5", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
