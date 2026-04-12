<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("-mx-1 my-1 h-px bg-muted", props.class));
</script>

<template>
  <div role="separator" :class="classes" />
</template>
