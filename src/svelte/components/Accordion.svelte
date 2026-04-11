<script lang="ts">
import { ref, watch } from "vue";
import { provideAccordionContext } from "../composables/useAccordion";

  let { type = "single", modelValue, defaultValue, collapsible = true, class: className, children, ...restProps }: {
  type?: "single" | "multiple";
  modelValue?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

const defaultItems = modelValue
  ? Array.isArray(modelValue)
    ? modelValue
    : [modelValue]
  : defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];

const activeItems = ref<string[]>(defaultItems);

watch(
  () => modelValue,
  (v) => {
    if (v !== undefined) {
      activeItems.value = Array.isArray(v) ? v : [v];
    }
  },
);

function toggle(value: string) {
  if (type === "single") {
    if (activeItems.value.includes(value)) {
      activeItems.value = collapsible ? [] : [value];
    } else {
      activeItems.value = [value];
    }
    emit("update:modelValue", activeItems.value[0] ?? "");
  } else {
    if (activeItems.value.includes(value)) {
      activeItems.value = activeItems.value.filter((v) => v !== value);
    } else {
      activeItems.value = [...activeItems.value, value];
    }
    emit("update:modelValue", activeItems.value);
  }
}

provideAccordionContext({ activeItems, type: type, toggle });
</script>

<div {...restProps}>
    {@render children?.()}
  </div>
