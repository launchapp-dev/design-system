<script lang="ts">
import { cn } from "../utils/cn";

  let { title, value, description, trend, trendValue, class: className, ...restProps }: {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
    class?: string;
    [key: string]: any;
  } = $props();




const trendColors = {
  up: "text-green-600 dark:text-green-400",
  down: "text-red-600 dark:text-red-400",
  neutral: "text-[hsl(var(--la-muted-foreground))]",
};

let classes = $derived(
cn("rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] p-6", className),
);
</script>

<div class={classes} {...restProps}>
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-[hsl(var(--la-muted-foreground))]">{{ title }}</p>
      <slot name="icon" />
    </div>
    <div class="mt-2 flex items-end gap-2">
      <span class="text-2xl font-bold text-[hsl(var(--la-foreground))]">{{ value }}</span>
      <span
        v-if="trendValue && trend"
        :class="cn('text-xs font-medium pb-0.5', trendColors[trend])"
      >
        {{ trendValue }}
      </span>
    </div>
    <p v-if="description" class="mt-1 text-xs text-[hsl(var(--la-muted-foreground))]">
      {{ description }}
    </p>
  </div>
