<script lang="ts">
import { cn } from "../utils/cn";
import { useRadioGroupContext } from "../composables/useRadioGroup";

  let { value, id, disabled = false, class: className, ...restProps }: {
  value: string;
  id?: string;
  disabled?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();




const { value: selectedValue, onChange } = useRadioGroupContext();
let isSelected = $derived(selectedValue.value === value);

let classes = $derived(
cn(
    "aspect-square h-4 w-4 rounded-full border border-[hsl(var(--la-primary))] text-[hsl(var(--la-primary))] ring-offset-[hsl(var(--la-background))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
    className,
  ),
);

function handleClick() {
  if (!disabled) {
    onChange(value);
  }
}
</script>

<button
    id={id}
    type="button"
    role="radio"
    :aria-checked="isSelected"
    disabled={disabled}
    class={classes}
    @click="handleClick"
   {...restProps}>
    <div
      v-if="isSelected"
      class="h-2.5 w-2.5 rounded-full bg-[hsl(var(--la-primary))]"
    />
  </button>
