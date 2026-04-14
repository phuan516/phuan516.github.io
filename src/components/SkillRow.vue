<template>
  <BaseRow>
    <template #date>{{ category }}</template>
    <p class="skill-items">{{ items }}</p>
  </BaseRow>
</template>

<script setup>
import BaseRow from './BaseRow.vue'

defineProps({
  category: {
    type: String,
    required: true,
  },
  items: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.skill-items {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  padding-top: 2px;
}
</style>
