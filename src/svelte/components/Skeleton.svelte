<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {

    class?: string;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("animate-pulse rounded-[--la-radius] bg-[hsl(var(--la-muted))]", className),
);
</script>

<div class={classes} / {...restProps}>
