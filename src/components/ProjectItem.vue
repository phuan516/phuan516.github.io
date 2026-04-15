<template>
  <BaseRow>
    <template #date>
      <span class="project__language">{{ language }}</span>
    </template>

    <div class="project">
      <h3 class="project__name">
        <a v-if="href" :href="href" target="_blank" rel="noopener">{{ name }}</a>
        <span v-else>{{ name }}</span>
      </h3>
      <p v-if="description" class="project__description">{{ description }}</p>
    </div>
  </BaseRow>
</template>

<script setup>
import BaseRow from './BaseRow.vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
})
</script>

<style scoped>
.project__language {
  font-size: 0.75rem;
  color: var(--text-light);
  font-family: var(--font-mono);
}

.project__name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
}

.project__name a {
  color: inherit;
  text-decoration: none;
}

.project__name a:hover {
  text-decoration: underline;
}

.project__description {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 2px;
}
</style>