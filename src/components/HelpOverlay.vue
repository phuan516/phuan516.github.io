<template>
  <div
    class="overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Keyboard shortcuts"
    @click.self="$emit('close')"
  >
    <div class="help-card">
      <div class="help-title">$ keymap</div>
      <div
        v-for="([label, keys], i) in shortcuts"
        :key="i"
        :class="['help-row', { 'help-row--first': i === 0 }]"
      >
        <span class="c-muted">{{ label }}</span>
        <span>
          <kbd v-for="(k, j) in keys.split(' ')" :key="j" class="kbd">{{ k }}</kbd>
        </span>
      </div>
      <div class="help-konami c-muted">
        # Try the konami code: <span class="c-accent">↑ ↑ ↓ ↓ ← → ← →</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])

const shortcuts = [
  ['Toggle theme', 'T'],
  ['Open / close help', '?'],
  ['Jump → about', 'g a'],
  ['Jump → experience', 'g e'],
  ['Jump → projects', 'g p'],
  ['Jump → skills', 'g s'],
  ['Jump → contact', 'g c'],
  ['Close overlay', 'Esc'],
]
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 13, 10, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.help-card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 28px 32px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: var(--ink);
}

.help-title {
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.help-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid var(--line);
  font-size: 13.5px;
}
.help-row--first { border-top: none; }

.help-konami { margin-top: 18px; font-size: 11.5px; line-height: 1.6; }
</style>
