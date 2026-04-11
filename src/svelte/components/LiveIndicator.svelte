<script lang="ts">
import { cn } from "../utils/cn";

  let { status = "live", label, class: className, children, ...restProps }: {
  status?: "live" | "offline" | "idle";
  label?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const statusColors = {
  live: "bg-green-500",
  offline: "bg-red-500",
  idle: "bg-yellow-500",
};

let classes = $derived(cn("inline-flex items-center gap-1.5", className));
</script>

<span class={classes} {...restProps}>
    <span class="relative flex h-2 w-2">
      <span
        v-if="status === 'live'"
        :class="cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', statusColors[status])"
      />
      <span :class="cn('relative inline-flex h-2 w-2 rounded-full', statusColors[status])" />
    </span>
    <span v-if="label" class="text-xs font-medium text-[hsl(var(--la-muted-foreground))]">{{ label }}</span>
    {@render children?.()}
  </span>
