<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input ring-offset-background", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
