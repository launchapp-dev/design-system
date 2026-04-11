<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("w-full px-4 py-1 text-sm text-left hover:bg-white/20 transition-colors min-h-[36px]", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
