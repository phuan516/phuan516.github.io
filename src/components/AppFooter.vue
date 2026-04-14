<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__name">{{ name }}</p>
      <p class="footer__tagline">{{ tagline }}</p>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.footer {
  padding: 0 24px 64px;
}

.footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: var(--section-gap);
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.footer__tagline {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 560px) {
  .footer {
    padding: 0 20px 48px;
  }
}
</style>
