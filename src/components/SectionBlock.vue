<template>
  <div class="section-hd">
    <span class="section-prompt">{{ prompt }}</span>
    <div class="section-rule" aria-hidden="true"></div>
    <span class="section-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({ prompt: { type: String, required: true }, label: { type: String, required: true } })
</script>

<style scoped>
.section-hd {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 22px;
}

.section-prompt {
  font-size: 12.5px;
  color: var(--green);
  white-space: nowrap;
}

.section-rule {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.section-label {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .section-prompt { font-size: 11px; }
}
</style>
