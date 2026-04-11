<script lang="ts">
import { cn } from "../utils/cn";

  let { orientation = "horizontal", decorative = true, class: className, ...restProps }: {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();




let classes = $derived(
cn(
    "shrink-0 bg-[hsl(var(--la-border))]",
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
    className,
  ),
);
</script>

<div
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
    class={classes}
  / {...restProps}>
