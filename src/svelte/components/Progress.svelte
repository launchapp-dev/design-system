<script lang="ts">
import { cn } from "../utils/cn";

  let { value = 0, max = 100, class: className, ...restProps }: {
  value?: number;
  max?: number;
    class?: string;
    [key: string]: any;
  } = $props();




let percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

let classes = $derived(
cn("relative h-4 w-full overflow-hidden rounded-full bg-[hsl(var(--la-secondary))]", className),
);
</script>

<div
    class={classes}
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
   {...restProps}>
    <div
      class="h-full w-full flex-1 bg-[hsl(var(--la-primary))] transition-all"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </div>
