<script lang="ts">
import { cn } from "../utils/cn";
import { provideRadioGroupContext } from "../composables/useRadioGroup";

  let { modelValue, class: className, children, ...restProps }: {
  modelValue?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

provideRadioGroupContext({
  value: computed(() => modelValue),
  onChange: (v: string) => emit("update:modelValue", v),
});

let classes = $derived(cn("grid gap-2", className));
</script>

<div role="radiogroup" class={classes} {...restProps}>
    {@render children?.()}
  </div>
