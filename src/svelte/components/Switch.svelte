<script lang="ts">
import { cn } from "../utils/cn";

  let { modelValue = false, disabled = false, id, class: className, ...restProps }: {
  modelValue?: boolean;
  disabled?: boolean;
  id?: string;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

let trackClasses = $derived(
cn(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--la-background))] disabled:cursor-not-allowed disabled:opacity-50",
    modelValue ? "bg-[hsl(var(--la-primary))]" : "bg-[hsl(var(--la-input))]",
    className,
  ),
);

let thumbClasses = $derived(
cn(
    "pointer-events-none block h-5 w-5 rounded-full bg-[hsl(var(--la-background))] shadow-lg ring-0 transition-transform",
    modelValue ? "translate-x-5" : "translate-x-0",
  ),
);

function toggle() {
  if (!disabled) {
    const next = !modelValue;
    emit("update:modelValue", next);
    emit("change", next);
  }
}
</script>

<button
    id={id}
    type="button"
    role="switch"
    :aria-checked="modelValue"
    disabled={disabled}
    class={trackClasses}
    @click="toggle"
   {...restProps}>
    <span class={thumbClasses} />
  </button>
