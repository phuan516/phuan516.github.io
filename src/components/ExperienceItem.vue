<template>
  <BaseRow>
    <template #date>{{ date }}</template>

    <div class="experience">
      <h3 class="experience__title">{{ title }}</h3>
      <p class="experience__company">{{ company }}</p>
      <p v-if="location" class="experience__location">{{ location }}</p>
      <ul v-if="bullets?.length" class="experience__bullets">
        <li v-for="(bullet, i) in bullets" :key="i">{{ bullet }}</li>
      </ul>
    </div>
  </BaseRow>
</template>

<script setup>
import BaseRow from './BaseRow.vue'

defineProps({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: null,
  },
  bullets: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.experience__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
}

.experience__company {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.experience__location {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 2px;
}

.experience__bullets {
  margin-top: 10px;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: disc;
}

.experience__bullets li {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.experience__bullets li::marker {
  color: var(--text-light);
}
</style>
