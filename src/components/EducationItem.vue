<template>
  <BaseRow>
    <template #date>{{ years }}</template>

    <div class="education">
      <h3 class="education__degree">{{ degree }}</h3>
      <p class="education__school">{{ school }}</p>
      <p v-if="location" class="education__location">{{ location }}</p>
    </div>
  </BaseRow>
</template>

<script setup>
import BaseRow from './BaseRow.vue'

defineProps({
  degree: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: null,
  },
})
</script>

<style scoped>
.education__degree {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
}

.education__school {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.education__location {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 2px;
}
</style>
