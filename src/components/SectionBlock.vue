<template>
  <section class="section">
    <h2 class="section__title">{{ title }}</h2>
    <div class="section__body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: var(--col-date) 1fr;
  gap: 0 var(--gap-h);
  padding: var(--section-gap) 0;
  border-top: 1px solid var(--border);
}

.section__title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding-top: 4px;
  font-family: var(--font-mono);
}

.section__body {
  display: flex;
  flex-direction: column;
}

@media (max-width: 560px) {
  .section {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
