<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useTabsContext } from "../composables/useTabs";

interface Props {
  value: string;
  class?: string;
}

const props = defineProps<Props>();
const { activeTab } = useTabsContext();
const isActive = computed(() => activeTab.value === props.value);
const classes = computed(() =>
  cn("mt-2 ring-offset-[hsl(var(--la-background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2", props.class),
);
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :class="classes"
  >
    <slot />
  </div>
</template>
