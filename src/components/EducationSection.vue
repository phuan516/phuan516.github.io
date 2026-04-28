<template>
  <section id="education" class="section">
    <SectionBlock prompt="$ cat education.txt" label="Education" />
    <div v-for="(ed, i) in resume.education" :key="i" class="edu-block">
      <div class="edu-school">{{ ed.school }}</div>
      <div class="edu-degree c-accent">{{ ed.degree }}</div>
      <div class="edu-period c-muted">{{ ed.period }} · {{ ed.detail.replace(/\.$/, '') }}</div>
    </div>
  </section>
</template>

<script setup>
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'
</script>

<style scoped>
.edu-block { padding-left: 16px; border-left: 2px solid var(--line); }
.edu-school { font-size: 17px; font-weight: 500; color: var(--ink); }
.edu-degree { font-size: 14px; margin-bottom: 4px; }
.edu-period { font-size: 12px; }
</style>
