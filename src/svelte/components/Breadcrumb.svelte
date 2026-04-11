<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-[hsl(var(--la-muted-foreground))]", className));
</script>

<nav aria-label="breadcrumb" {...restProps}>
    <ol class={classes}>
      {@render children?.()}
    </ol>
  </nav>
