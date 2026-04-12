<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useTabsContext } from "../composables/useTabs";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { activeTab, setActiveTab } = useTabsContext();
const isActive = computed(() => activeTab.value === props.value);

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    isActive.value
      ? "bg-background text-foreground shadow-sm"
      : "text-muted-foreground hover:bg-muted",
    props.class,
  ),
);
</script>

<template>
  <button
    role="tab"
    :aria-selected="isActive"
    :disabled="disabled"
    :class="classes"
    @click="setActiveTab(value)"
  >
    <slot />
  </button>
</template>
