<script lang="ts">
import { cn } from "../utils/cn";

  let { modelValue = false, variant = "default", size = "md", disabled = false, class: className, children, ...restProps }: {
  modelValue?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const variantClasses = {
  default: "bg-transparent hover:bg-[hsl(var(--la-muted))] hover:text-[hsl(var(--la-muted-foreground))] data-[state=on]:bg-[hsl(var(--la-accent))] data-[state=on]:text-[hsl(var(--la-accent-foreground))]",
  outline: "border border-[hsl(var(--la-input))] bg-transparent hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] data-[state=on]:bg-[hsl(var(--la-accent))] data-[state=on]:text-[hsl(var(--la-accent-foreground))]",
};

const sizeClasses = {
  sm: "h-9 px-2.5",
  md: "h-10 px-3",
  lg: "h-11 px-5",
};

let classes = $derived(
cn(
    "inline-flex items-center justify-center rounded-[--la-radius] text-sm font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ),
);

function toggle() {
  emit("update:modelValue", !modelValue);
}
</script>

<button
    type="button"
    :aria-pressed="modelValue"
    :data-state="modelValue ? 'on' : 'off'"
    disabled={disabled}
    class={classes}
    @click="toggle"
   {...restProps}>
    {@render children?.()}
  </button>
