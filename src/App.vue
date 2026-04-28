<template>
  <div
    class="site"
    :style="konamiActive ? { filter: 'hue-rotate(40deg) saturate(1.3)', transition: 'filter 0.6s' } : { filter: 'none', transition: 'filter 0.6s' }"
  >
    <NavBar :theme="theme" @toggle-theme="toggleTheme" />
    <main class="main" role="main">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection :open-project="openProject" @toggle="toggleProject" />
      <EducationSection />
      <SkillsSection />
      <ContactSection @open-help="showHelp = true" />
    </main>
    <HelpOverlay v-if="showHelp" @close="showHelp = false" />
    <KonamiToast v-if="konamiActive" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import HelpOverlay from './components/HelpOverlay.vue'
import KonamiToast from './components/KonamiToast.vue'

const theme = ref('light')
const openProject = ref(null)
const showHelp = ref(false)
const konamiActive = ref(false)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function toggleProject(i) {
  openProject.value = openProject.value === i ? null : i
}

watch(theme, (t) => {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('theme', t)
})

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
let konamiIdx = 0
let gPending = false
let gTimer = null
let konamiTimer = null

function onKey(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return

  if (e.key === konamiCode[konamiIdx]) {
    konamiIdx++
    if (konamiIdx === konamiCode.length) {
      konamiIdx = 0
      konamiActive.value = true
      clearTimeout(konamiTimer)
      konamiTimer = setTimeout(() => { konamiActive.value = false }, 5000)
    }
  } else {
    konamiIdx = 0
  }

  if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
    e.preventDefault()
    showHelp.value = !showHelp.value
    return
  }
  if (e.key === 'Escape') { showHelp.value = false; return }
  if (e.key === 't' || e.key === 'T') { toggleTheme(); return }
  if (e.key === 'g') {
    gPending = true
    clearTimeout(gTimer)
    gTimer = setTimeout(() => { gPending = false }, 800)
    return
  }
  if (gPending) {
    const map = { a: 'about', e: 'experience', p: 'projects', s: 'skills', c: 'contact' }
    const id = map[e.key.toLowerCase()]
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      gPending = false
      clearTimeout(gTimer)
    }
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved
  } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
  document.documentElement.setAttribute('data-theme', theme.value)
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  clearTimeout(gTimer)
  clearTimeout(konamiTimer)
})
</script>

<style scoped>
.main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 32px 80px;
}

@media (max-width: 480px) {
  .main { padding: 40px 20px 60px; }
}
</style>
