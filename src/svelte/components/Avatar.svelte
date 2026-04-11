<script lang="ts">
import { computed, ref } from "vue";
import { cn } from "../utils/cn";

  let { src, alt, fallback, size = "md", class: className, ...restProps }: {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
    class?: string;
    [key: string]: any;
  } = $props();




const imgError = ref(false);

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

let classes = $derived(
cn(
    "relative flex shrink-0 overflow-hidden rounded-full",
    sizeClasses[size],
    className,
  ),
);

const initials = computed(() => {
  if (fallback) return fallback.slice(0, 2).toUpperCase();
  if (alt) {
    return alt
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return "?";
});
</script>

<span class={classes} {...restProps}>
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt ?? ''"
      class="aspect-square h-full w-full object-cover"
      @error="imgError = true"
    />
    <span
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-[hsl(var(--la-muted))] font-medium text-[hsl(var(--la-muted-foreground))]"
    >
      <slot>{{ initials }}</slot>
    </span>
  </span>
