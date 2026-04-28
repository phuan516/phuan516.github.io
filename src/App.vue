<template>
  <div id="app">
    <AppHeader :name="profile.name" :tagline="profile.tagline" :website="profile.website" :contacts="contacts"
      @copy-email="handleCopyEmail" />

    <main class="main">
      <div class="content">

        <SectionBlock title="About">
          <p class="about-text">{{ profile.about }}</p>
        </SectionBlock>

        <SectionBlock title="Experience">
          <ExperienceItem v-for="job in experience" :key="job.company + job.date" v-bind="job" />
        </SectionBlock>

        <SectionBlock title="Skills">
          <SkillRow v-for="skill in skills" :key="skill.category" v-bind="skill" />
        </SectionBlock>

        <SectionBlock title="Education">
          <EducationItem v-for="edu in education" :key="edu.school" v-bind="edu" />
        </SectionBlock>

        <SectionBlock title="Side Projects">
          <ProjectItem v-for="project in projects" :key="project.name" v-bind="project" />
        </SectionBlock>

      </div>
    </main>

    <AppFooter :name="profile.name" :tagline="profile.tagline" />

    <Toast ref="toast" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import SectionBlock from './components/SectionBlock.vue'
import ExperienceItem from './components/ExperienceItem.vue'
import SkillRow from './components/SkillRow.vue'
import EducationItem from './components/EducationItem.vue'
import ProjectItem from './components/ProjectItem.vue'
import Toast from './components/Toast.vue'
import { profile, contacts, experience, skills, education, projects } from './content.js'

const toast = ref(null)

function handleCopyEmail() {
  toast.value?.show('Email copied to clipboard')
}
</script>

<style>
/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

/* ─── Design Tokens ────────────────────────────────────────────────────────── */
:root {
  --bg: #FAFAFA;
  --text: #111111;
  --text-secondary: #444444;
  --text-muted: #888888;
  --text-light: #BBBBBB;
  --border: #E8E8E8;

  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'DM Mono', 'Menlo', monospace;

  --max-width: 680px;
  --col-date: 110px;
  --gap-h: 32px;
  --gap-v: 24px;
  --section-gap: 48px;
}

/* ─── Reset ────────────────────────────────────────────────────────────────── */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── Base ─────────────────────────────────────────────────────────────────── */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

/* ─── Layout ───────────────────────────────────────────────────────────────── */
#app {
  min-height: 100vh;
}

.main {
  padding: 0 24px;
}

.content {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ─── About text ───────────────────────────────────────────────────────────── */
.about-text {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

@media (max-width: 560px) {
  .main {
    padding: 0 20px;
  }
}
</style>
