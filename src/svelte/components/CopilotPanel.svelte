<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex flex-col gap-1.5 border-b px-6 py-4", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
