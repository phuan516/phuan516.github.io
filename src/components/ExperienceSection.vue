<template>
  <section id="experience" class="section">
    <SectionBlock prompt="$ git log --author=peter --pretty=experience" label="Experience" />
    <article
      v-for="(exp, i) in resume.experience"
      :key="i"
      :class="['exp-item', { 'exp-item--last': i === resume.experience.length - 1 }]"
    >
      <div class="exp-commit">
        <span class="c-accent">commit</span> {{ exp.period.toLowerCase() }} · {{ exp.location }}
      </div>
      <div class="exp-role">
        {{ exp.role }} <span class="c-muted">@</span> <span class="c-accent">{{ exp.company }}</span>
      </div>
      <ul class="exp-bullets">
        <li v-for="(b, j) in exp.bullets" :key="j" class="exp-bullet">
          <span class="c-green exp-plus" aria-hidden="true">+</span>
          <span class="exp-bullet-text">{{ b }}</span>
        </li>
      </ul>
      <div class="exp-tags">
        <span class="c-muted">tags:</span>
        <span v-for="(s, k) in exp.stack" :key="k" class="exp-tag">{{ s.toLowerCase() }}</span>
      </div>
    </article>
  </section>
</template>

<script setup>
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'
</script>

<style scoped>
.exp-item {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px dashed var(--line);
}
.exp-item--last { border-bottom: none; padding-bottom: 0; }

.exp-commit { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
.exp-role { font-size: 18px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }

.exp-bullets { list-style: none; padding: 0; margin: 12px 0 0; }
.exp-bullet { display: flex; gap: 10px; margin-bottom: 6px; font-size: 14px; line-height: 1.6; }
.exp-plus { flex-shrink: 0; font-weight: 600; }
.exp-bullet-text { color: var(--ink); opacity: 0.92; }

.exp-tags {
  margin-top: 12px;
  font-size: 11px;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 0 12px;
}
.exp-tag { color: var(--ink); opacity: 0.75; }
</style>
