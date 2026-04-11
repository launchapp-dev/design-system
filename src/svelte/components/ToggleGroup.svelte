<script lang="ts">
import { cn } from "../utils/cn";
import { provideToggleGroupContext } from "../composables/useToggleGroup";

  let { modelValue, type = "single", variant = "default", size = "md", class: className, children, ...restProps }: {
  modelValue?: string | string[];
  type?: "single" | "multiple";
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

provideToggleGroupContext({
  value: computed(() => modelValue),
  variant: computed(() => variant ?? "default"),
  size: computed(() => size ?? "md"),
  type: type ?? "single",
  toggle: (v: string) => {
    if (type === "multiple") {
      const current = Array.isArray(modelValue) ? modelValue : [];
      if (current.includes(v)) {
        emit("update:modelValue", current.filter((x) => x !== v));
      } else {
        emit("update:modelValue", [...current, v]);
      }
    } else {
      emit("update:modelValue", modelValue === v ? "" : v);
    }
  },
});

let classes = $derived(cn("flex items-center justify-center gap-1", className));
</script>

<div class={classes} role="group" {...restProps}>
    {@render children?.()}
  </div>
