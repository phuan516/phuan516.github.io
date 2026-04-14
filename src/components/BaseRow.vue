<template>
  <div class="base-row">
    <div class="base-row__date">
      <slot name="date" />
    </div>
    <div class="base-row__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.base-row {
  display: grid;
  grid-template-columns: var(--col-date) 1fr;
  gap: 0 var(--gap-h);
  padding: var(--gap-v) 0;
  border-top: 1px solid var(--border);
}

.base-row:first-child {
  border-top: none;
  padding-top: 0;
}

.base-row__date {
  padding-top: 2px;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  line-height: 1.5;
  white-space: pre-line;
}

@media (max-width: 560px) {
  .base-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
