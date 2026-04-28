<template>
  <div
    class="site"
    :style="konamiActive ? { filter: 'hue-rotate(40deg) saturate(1.3)', transition: 'filter 0.6s' } : { filter: 'none', transition: 'filter 0.6s' }"
  >
    <!-- Sticky nav -->
    <nav class="nav" role="navigation" aria-label="Site navigation">
      <div class="nav-inner">
        <a href="#about" class="nav-brand">
          <span class="c-accent">~/</span>{{ resume.github }}
        </a>
        <button class="theme-btn" @click="toggleTheme" title="Toggle theme (T)">
          {{ theme === 'dark' ? '☼' : '☽' }}
        </button>
      </div>
    </nav>

    <main class="main" role="main">

      <!-- Hero / About -->
      <section id="about" class="section about-section">
        <div class="about-hello"># Hello,</div>
        <h1 class="about-h1">
          I'm <span class="c-accent">{{ resume.name }}</span>.<br />
          A {{ resume.role.toLowerCase() }}.
        </h1>
        <p class="about-intro">{{ resume.intro }}</p>
        <div class="about-badges">
          <span class="badge"><span class="c-green">●</span> {{ resume.status }}</span>
          <span class="badge">⌖ {{ resume.location }}</span>
          <span class="badge">↗ Open to relocation</span>
        </div>
        <div class="section-hd">
          <span class="section-prompt">$ whoami</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">About</span>
        </div>
        <div class="about-comments">
          <div v-for="(line, i) in resume.about" :key="i" class="about-comment">
            <span class="c-accent">// </span><span class="about-comment-body">{{ line }}</span>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="section">
        <div class="section-hd">
          <span class="section-prompt">$ git log --author=peter --pretty=experience</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">Experience</span>
        </div>
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

      <!-- Projects -->
      <section id="projects" class="section">
        <div class="section-hd">
          <span class="section-prompt">$ ls projects/</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">Projects</span>
        </div>
        <div class="projects-grid">
          <div
            v-for="(p, i) in resume.projects"
            :key="i"
            :class="['project-card', { 'project-card--open': openProject === i }]"
            role="button"
            :tabindex="0"
            :aria-expanded="openProject === i"
            @click="toggleProject(i)"
            @keydown.enter.prevent="toggleProject(i)"
            @keydown.space.prevent="toggleProject(i)"
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

      <!-- Education -->
      <section id="education" class="section">
        <div class="section-hd">
          <span class="section-prompt">$ cat education.txt</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">Education</span>
        </div>
        <div v-for="(ed, i) in resume.education" :key="i" class="edu-block">
          <div class="edu-school">{{ ed.school }}</div>
          <div class="edu-degree">{{ ed.degree }}</div>
          <div class="edu-period">{{ ed.period }} · {{ ed.detail.replace(/\.$/, '') }}</div>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="section">
        <div class="section-hd">
          <span class="section-prompt">$ cat skills.json</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">Skills</span>
        </div>
        <div class="skills-panel">
          <div class="c-muted">&#123;</div>
          <div v-for="([cat, items], i) in skillEntries" :key="cat" class="skills-row"><span class="c-muted">"{{ cat.toLowerCase() }}"</span><span class="c-muted">: [</span><template v-for="(s, k) in items" :key="k"><span class="c-accent">"{{ s }}"</span><span v-if="k < items.length - 1" class="c-muted">, </span></template><span class="c-muted">]{{ i < skillEntries.length - 1 ? ',' : '' }}</span></div>
          <div class="c-muted">&#125;</div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="section section--last">
        <div class="section-hd">
          <span class="section-prompt">$ contact --me</span>
          <div class="section-rule" aria-hidden="true"></div>
          <span class="section-label">Contact</span>
        </div>
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
          ── end of file · press <kbd class="kbd kbd--btn" @click="showHelp = true">?</kbd> for shortcuts ──
        </div>
      </section>

    </main>

    <!-- Help overlay -->
    <div
      v-if="showHelp"
      class="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      @click.self="showHelp = false"
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
        <div class="help-konami">
          # Try the konami code: <span class="c-accent">↑ ↑ ↓ ↓ ← → ← →</span>
        </div>
      </div>
    </div>

    <!-- Konami toast -->
    <div v-if="konamiActive" class="konami-toast" aria-live="polite">
      ✦ secret unlocked 
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { resume } from './content.js'

const theme = ref('light')
const openProject = ref(null)
const activeSection = ref('about')
const showHelp = ref(false)
const konamiActive = ref(false)

const skillEntries = computed(() => Object.entries(resume.skills))

const navItems = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'education' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
]

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

let observer = null

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved
  } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
  document.documentElement.setAttribute('data-theme', theme.value)

  const ids = ['about', 'experience', 'projects', 'education', 'skills', 'contact']
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) activeSection.value = visible[0].target.id
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
  )
  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', onKey)
  clearTimeout(gTimer)
  clearTimeout(konamiTimer)
})
</script>

<style>
/* ─── Fonts ─── */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* ─── Theme tokens ─── */
:root[data-theme="light"] {
  --bg: #f5efe2;
  --ink: #22201a;
  --muted: #7a6f58;
  --line: rgba(34, 32, 26, 0.14);
  --accent: #a8581c;
  --green: #5a6f3a;
  --panel: #ebe4d3;
  --panel-hover: #e2d9c3;
}
:root[data-theme="dark"] {
  --bg: #15130f;
  --ink: #e8dfcc;
  --muted: #7e7461;
  --line: rgba(232, 223, 204, 0.12);
  --accent: #e3a85c;
  --green: #a8c47e;
  --panel: #1c1913;
  --panel-hover: #221e16;
}

/* ─── Reset ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── Base ─── */
html { scroll-behavior: smooth; }

body {
  font-family: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
  background: var(--bg);
  color: var(--ink);
  font-size: 14.5px;
  line-height: 1.65;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background 0.25s, color 0.25s;
}

::selection { background: var(--accent); color: var(--bg); }

/* ─── Utility colors ─── */
.c-accent { color: var(--accent); }
.c-muted  { color: var(--muted); }
.c-green  { color: var(--green); }

/* ─── Focus styles ─── */
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ─── Nav ─── */
.nav {}

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

.nav-links {
  display: flex;
  gap: 4px;
  font-size: 13px;
  align-items: center;
}

.nav-link {
  color: var(--muted);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: color 0.15s;
  font-weight: 400;
}
.nav-link:hover { color: var(--ink); }
.nav-link--active { color: var(--accent); font-weight: 500; }
.nav-link--active:hover { color: var(--accent); }

.theme-btn {
  margin-left: 8px;
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

/* ─── Main layout ─── */
.main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

.section {
  margin-bottom: 64px;
  scroll-margin-top: 72px;
}
.section--last { margin-bottom: 32px; }
.about-section { margin-bottom: 72px; }

/* ─── Section header chrome ─── */
.section-hd {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 22px;
}
.section-prompt { font-size: 12.5px; color: var(--green); white-space: nowrap; }
.section-rule { flex: 1; height: 1px; background: var(--line); }
.section-label {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ─── Hero / About ─── */
.about-hello { font-size: 13px; color: var(--muted); margin-bottom: 6px; }

.about-h1 {
  font-family: 'Fraunces', 'Source Serif 4', Georgia, serif;
  font-size: clamp(42px, 7vw, 68px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}

.about-intro {
  max-width: 680px;
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--ink);
  opacity: 0.92;
}

.about-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
  font-size: 12px;
}

.badge {
  padding: 5px 10px;
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--muted);
}

.about-section .section-hd { margin-top: 32px; }

.about-comments {
  margin-top: 32px;
  padding-left: 16px;
  border-left: 2px solid var(--line);
}
.about-comment { margin-bottom: 6px; }
.about-comment-body { color: var(--ink); opacity: 0.88; }

/* ─── Experience ─── */
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

/* ─── Projects ─── */
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

/* ─── Education ─── */
.edu-block { padding-left: 16px; border-left: 2px solid var(--line); }
.edu-school { font-size: 17px; font-weight: 500; color: var(--ink); }
.edu-degree { color: var(--accent); font-size: 14px; margin-bottom: 4px; }
.edu-period { color: var(--muted); font-size: 12px; }

/* ─── Skills ─── */
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

/* ─── Contact ─── */
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

/* ─── Kbd ─── */
.kbd--btn { cursor: pointer; }
.kbd--btn:hover { color: var(--accent); border-color: var(--accent); }

.kbd {
  display: inline-block;
  padding: 1px 7px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 3px;
  font-family: inherit;
  font-size: 11px;
  color: var(--ink);
  margin: 0 2px;
}

/* ─── Help overlay ─── */
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

.help-konami { margin-top: 18px; font-size: 11.5px; color: var(--muted); line-height: 1.6; }

/* ─── Konami toast ─── */
.konami-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--bg);
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 12px;
  z-index: 200;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .nav-link { padding: 6px 6px; }
  .section-prompt { font-size: 11px; }
}
@media (max-width: 480px) {
  .main { padding: 40px 20px 60px; }
  .nav-inner { padding: 6px 20px; }
}
</style>
