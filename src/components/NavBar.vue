<template>
  <nav class="nav" role="navigation" aria-label="Site navigation">
    <div class="nav-inner">
      <a href="#about" class="nav-brand">
        <span class="c-accent">~/</span>{{ resume.github }}
      </a>
      <button class="theme-btn" @click="$emit('toggle-theme')" title="Toggle theme (T)">
        {{ theme === 'dark' ? '☼' : '☽' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { resume } from '../content.js'

defineProps({ theme: { type: String, required: true } })
defineEmits(['toggle-theme'])
</script>

<style scoped>
.nav-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.theme-btn {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--muted);
  font-family: inherit;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.theme-btn:hover { color: var(--ink); }

@media (max-width: 480px) {
  .nav-inner { padding: 6px 20px; }
}
</style>
