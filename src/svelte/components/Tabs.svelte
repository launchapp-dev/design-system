<script lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../utils/cn";
import { provideTabsContext } from "../composables/useTabs";

  let { modelValue, defaultValue = "", class: className, children, ...restProps }: {
  modelValue?: string;
  defaultValue?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const internalValue = ref(modelValue ?? defaultValue);

watch(
  () => modelValue,
  (v) => {
    if (v !== undefined) internalValue.value = v;
  },
);

provideTabsContext(internalValue, (value) => {
  internalValue.value = value;
  emit("update:modelValue", value);
});

let classes = $derived(cn("w-full", className));
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
