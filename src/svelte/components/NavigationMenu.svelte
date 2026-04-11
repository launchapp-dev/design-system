<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("relative z-10 hidden md:flex max-w-max flex-1 items-center justify-center", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
