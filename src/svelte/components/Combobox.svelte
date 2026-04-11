<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cn } from "../utils/cn";

interface Option {
  label: string;
  value: string;
}

  let { modelValue, options, placeholder = "Select option...", searchPlaceholder = "Search...", emptyText = "No results found.", disabled = false, class: className, ...restProps }: {
  modelValue?: string;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const open = ref(false);
const search = ref("");
const containerRef = ref<HTMLElement | null>(null);

let selectedLabel = $derived(
options.find((o) => o.value === modelValue)?.label,
);

let filtered = $derived(
options.filter((o) =>
    o.label.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function select(value: string) {
  emit("update:modelValue", value);
  open.value = false;
  search.value = "";
}

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false;
    search.value = "";
  }
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));

let triggerClasses = $derived(
cn(
    "flex h-10 w-full items-center justify-between rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-2 text-sm cursor-pointer",
    disabled && "cursor-not-allowed opacity-50",
    className,
  ),
);
</script>

<div ref="containerRef" class="relative" {...restProps}>
    <button
      type="button"
      disabled={disabled}
      class={triggerClasses}
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span :class="selectedLabel ? 'text-[hsl(var(--la-foreground))]' : 'text-[hsl(var(--la-muted-foreground))]'">
        {{ selectedLabel ?? placeholder }}
      </span>
      <svg class="h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    <div
      v-if="open"
      class="absolute z-50 mt-1 w-full overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] shadow-md"
    >
      <div class="flex items-center border-b border-[hsl(var(--la-border))] px-3">
        <svg class="mr-2 h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          v-model="search"
          :placeholder="searchPlaceholder"
          class="h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-[hsl(var(--la-muted-foreground))]"
        />
      </div>
      <div class="max-h-[200px] overflow-y-auto p-1">
        <div
          v-if="filtered.length === 0"
          class="py-6 text-center text-sm text-[hsl(var(--la-muted-foreground))]"
        >
          {{ emptyText }}
        </div>
        <div
          v-for="opt in filtered"
          :key="opt.value"
          role="option"
          :aria-selected="modelValue === opt.value"
          class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]"
          @click="select(opt.value)"
        >
          <svg
            v-if="modelValue === opt.value"
            class="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span v-else class="mr-6" />
          {{ opt.label }}
        </div>
      </div>
    </div>
  </div>
