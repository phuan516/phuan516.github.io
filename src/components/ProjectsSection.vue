<template>
  <section id="projects" class="section">
    <SectionBlock prompt="$ ls projects/" label="Projects" />
    <div class="projects-grid">
      <div
        v-for="(p, i) in resume.projects"
        :key="i"
        :class="['project-card', { 'project-card--open': openProject === i }]"
        role="button"
        :tabindex="0"
        :aria-expanded="openProject === i"
        @click="$emit('toggle', i)"
        @keydown.enter.prevent="$emit('toggle', i)"
        @keydown.space.prevent="$emit('toggle', i)"
      >
        <div class="project-hd">
          <span class="project-caret" aria-hidden="true">{{ openProject === i ? '▾' : '▸' }}</span>
          <span class="project-name">{{ p.name }}/</span>
          <span class="project-blurb">{{ p.blurb }}</span>
          <span class="project-year">{{ p.year }}</span>
        </div>
        <div :class="['project-body', { 'project-body--open': openProject === i }]">
          <p class="project-detail">{{ p.detail }}</p>
          <div class="project-stack">
            <span class="c-muted">stack:</span>
            <span v-for="(s, k) in p.stack" :key="k" class="c-green">{{ s.toLowerCase() }}</span>
          </div>
          <div class="project-status-row">
            <span class="c-muted">status: </span><span class="c-green">{{ p.status.toLowerCase() }}</span><span class="c-muted"> · link: </span><a
              :href="`https://${p.link}`"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link c-accent"
              @click.stop
            >{{ p.link }} ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'

defineProps({ openProject: { type: Number, default: null } })
defineEmits(['toggle'])
</script>

<style scoped>
.projects-grid { display: grid; gap: 10px; }

.project-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 14px 18px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  outline: none;
}
.project-card:hover { border-color: var(--accent); background: var(--panel-hover); }
.project-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.project-hd {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.project-caret { color: var(--muted); font-size: 13px; width: 12px; flex-shrink: 0; }
.project-name { font-size: 16px; color: var(--accent); font-weight: 500; }
.project-blurb { font-size: 13.5px; color: var(--ink); opacity: 0.85; flex: 1; min-width: 200px; }
.project-year { font-size: 11px; color: var(--muted); }

.project-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.2, 0.7, 0.3, 1), margin-top 0.25s, padding-top 0.25s;
  padding-left: 24px;
  margin-top: 0;
  padding-top: 0;
  border-top: 1px dashed transparent;
}
.project-body--open {
  max-height: 300px;
  margin-top: 14px;
  padding-top: 14px;
  border-top-color: var(--line);
}

.project-detail {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--ink);
  opacity: 0.88;
  margin-bottom: 12px;
}

.project-stack {
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 12px;
  margin-bottom: 4px;
}

.project-status-row { font-size: 11px; color: var(--muted); }

.project-link {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}
.project-link:hover { border-color: var(--accent); }
</style>
