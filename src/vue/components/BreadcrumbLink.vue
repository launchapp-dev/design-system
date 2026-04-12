<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  href?: string;
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn("transition-colors hover:text-foreground", props.class),
);
</script>

<template>
  <a v-if="href" :href="href" :class="classes">
    <slot />
  </a>
  <span v-else :class="classes">
    <slot />
  </span>
</template>
