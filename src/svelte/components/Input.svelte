<script lang="ts">
import { cn } from "../utils/cn";

  let { modelValue, type = "text", placeholder, disabled, readonly, id, name, autocomplete, error = false, class: className, ...restProps }: {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  name?: string;
  autocomplete?: string;
  error?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

let classes = $derived(
cn(
    "flex h-10 w-full rounded-[--la-radius] border bg-[hsl(var(--la-background))] px-3 py-2 text-sm text-[hsl(var(--la-foreground))] placeholder:text-[hsl(var(--la-muted-foreground))] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    error
      ? "border-[hsl(var(--la-destructive))] focus-visible:ring-[hsl(var(--la-destructive))]"
      : "border-[hsl(var(--la-input))] focus-visible:ring-[hsl(var(--la-ring))]",
    className,
  ),
);
</script>

<input
    id={id}
    :name="name"
    type={type}
    :placeholder="placeholder"
    disabled={disabled}
    :readonly="readonly"
    :autocomplete="autocomplete"
    value={modelValue}
    class={classes}
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @change="emit('change', $event)"
    @blur="emit('blur', $event as FocusEvent)"
    @focus="emit('focus', $event as FocusEvent)"
  / {...restProps}>
