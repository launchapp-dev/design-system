<script lang="ts">
import { cn } from "../utils/cn";

  let { modelValue = false, disabled = false, id, name, value, indeterminate = false, class: className, ...restProps }: {
  modelValue?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  indeterminate?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

let classes = $derived(
cn(
    "peer h-4 w-4 shrink-0 rounded-sm border border-[hsl(var(--la-primary))] ring-offset-[hsl(var(--la-background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    modelValue || indeterminate
      ? "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]"
      : "bg-[hsl(var(--la-background))]",
    className,
  ),
);

function handleChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  emit("update:modelValue", checked);
  emit("change", checked);
}
</script>

<div class="relative flex items-center" {...restProps}>
    <input
      id={id}
      :name="name"
      value={value}
      type="checkbox"
      :checked="modelValue"
      disabled={disabled}
      :indeterminate="indeterminate"
      :class="cn('sr-only', classes)"
      @change="handleChange"
    />
    <div
      class={classes}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        v-if="modelValue && !indeterminate"
        class="h-3 w-3"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="indeterminate"
        class="h-3 w-3"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </div>
  </div>
