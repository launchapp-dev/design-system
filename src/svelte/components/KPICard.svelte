<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
