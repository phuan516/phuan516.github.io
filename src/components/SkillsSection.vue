<template>
  <section id="skills" class="section">
    <SectionBlock prompt="$ cat skills.json" label="Skills" />
    <div class="skills-panel">
      <div class="c-muted">&#123;</div>
      <div v-for="([cat, items], i) in skillEntries" :key="cat" class="skills-row"><span class="c-muted">"{{ cat.toLowerCase() }}"</span><span class="c-muted">: [</span><template v-for="(s, k) in items" :key="k"><span class="c-accent">"{{ s }}"</span><span v-if="k < items.length - 1" class="c-muted">, </span></template><span class="c-muted">]{{ i < skillEntries.length - 1 ? ',' : '' }}</span></div>
      <div class="c-muted">&#125;</div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'

const skillEntries = computed(() => Object.entries(resume.skills))
</script>

<style scoped>
.skills-panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 16px 20px;
  font-size: 13.5px;
  line-height: 1.85;
  overflow-x: auto;
}
.skills-row { padding-left: 24px; }
</style>
