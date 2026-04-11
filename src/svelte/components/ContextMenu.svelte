<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  let classes = $derived(cn("flex cursor-default select-none items-center gap-2 rounded-sm px-3 md:px-2 py-4 md:py-1.5 text-base md:text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] md:min-h-0", className));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
