<script lang="ts">
import { cn } from "../utils/cn";

  let { label, value, sublabel, class: className, children, ...restProps }: {
  label: string;
  value: string | number;
  sublabel?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("flex flex-col gap-1", className));
</script>

<div class={classes} {...restProps}>
    <span class="text-sm text-[hsl(var(--la-muted-foreground))]">{{ label }}</span>
    <span class="text-2xl font-semibold tabular-nums text-[hsl(var(--la-foreground))]">{{ value }}</span>
    <span v-if="sublabel" class="text-xs text-[hsl(var(--la-muted-foreground))]">{{ sublabel }}</span>
    {@render children?.()}
  </div>
