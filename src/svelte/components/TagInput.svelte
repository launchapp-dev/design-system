<script lang="ts">
import { computed, ref } from "vue";
import { cn } from "../utils/cn";

  let { modelValue, placeholder, disabled = false, max, class: className, ...restProps }: {
  modelValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  max?: number;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const inputValue = ref("");

let classes = $derived(
cn(
    "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-2 text-sm ring-offset-[hsl(var(--la-background))] focus-within:outline-none focus-within:ring-2 focus-within:ring-[hsl(var(--la-ring))] focus-within:ring-offset-2",
    disabled && "cursor-not-allowed opacity-50",
    className,
  ),
);

function addTag(value: string) {
  const tag = value.trim();
  if (!tag) return;
  if (modelValue.includes(tag)) return;
  if (max && modelValue.length >= max) return;
  emit("update:modelValue", [...modelValue, tag]);
  inputValue.value = "";
}

function removeTag(tag: string) {
  emit("update:modelValue", modelValue.filter((t) => t !== tag));
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addTag(inputValue.value);
  } else if (e.key === "Backspace" && !inputValue.value && modelValue.length > 0) {
    const lastTag = modelValue[modelValue.length - 1];
    if (lastTag) removeTag(lastTag);
  }
}
</script>

<div class={classes} {...restProps}>
    <span
      v-for="tag in modelValue"
      :key="tag"
      class="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--la-secondary))] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--la-secondary-foreground))]"
    >
      {{ tag }}
      <button
        v-if="!disabled"
        type="button"
        class="ml-0.5 rounded-full hover:bg-[hsl(var(--la-secondary)/0.8)] focus:outline-none"
        :aria-label="`Remove ${tag}`"
        @click="removeTag(tag)"
      >
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </span>
    <input
      v-model="inputValue"
      :placeholder="!modelValue.length ? placeholder : ''"
      disabled={disabled}
      class="min-w-[120px] flex-1 bg-transparent outline-none placeholder:text-[hsl(var(--la-muted-foreground))]"
      @keydown="handleKeydown"
      @blur="addTag(inputValue)"
    />
  </div>
