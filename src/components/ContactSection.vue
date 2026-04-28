<template>
  <section id="contact" class="section contact-section">
    <SectionBlock prompt="$ contact --me" label="Contact" />
    <div class="contact-block">
      <div class="contact-row">
        <span class="contact-label c-muted">email</span>
        <span class="c-muted">→ </span>
        <a :href="`mailto:${resume.email}`" class="contact-link">{{ resume.email }}</a>
      </div>
      <div class="contact-row">
        <span class="contact-label c-muted">github</span>
        <span class="c-muted">→ </span>
        <a :href="`https://github.com/${resume.github}`" target="_blank" rel="noopener noreferrer" class="contact-link">github.com/{{ resume.github }}</a>
      </div>
      <div class="contact-row">
        <span class="contact-label c-muted">linkedin</span>
        <span class="c-muted">→ </span>
        <a :href="`https://linkedin.com/in/${resume.linkedin}`" target="_blank" rel="noopener noreferrer" class="contact-link">linkedin.com/in/{{ resume.linkedin }}</a>
      </div>
    </div>
    <div class="contact-footer">
      ── end of file · press <kbd class="kbd kbd--btn" @click="$emit('open-help')">?</kbd> for shortcuts ──
    </div>
  </section>
</template>

<script setup>
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'

defineEmits(['open-help'])
</script>

<style scoped>
.contact-section { margin-bottom: 32px; }

.contact-block {
  display: grid;
  gap: 10px;
  font-size: 14px;
  padding-left: 16px;
  border-left: 2px solid var(--line);
}

.contact-row { display: flex; align-items: baseline; gap: 6px; }
.contact-label { display: inline-block; width: 90px; flex-shrink: 0; }

.contact-link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}
.contact-link:hover { border-color: var(--accent); }

.contact-footer {
  margin-top: 40px;
  font-size: 11px;
  color: var(--muted);
  text-align: center;
  opacity: 0.55;
  letter-spacing: 0.05em;
}

.kbd--btn { cursor: pointer; }
.kbd--btn:hover { color: var(--accent); border-color: var(--accent); }
</style>
