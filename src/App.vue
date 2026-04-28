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

const toast = ref(null)

function handleCopyEmail() {
  toast.value?.show('Email copied to clipboard')
}

// ─── Profile ──────────────────────────────────────────────────────────────────

const profile = {
  name: 'Peter Huang',
  tagline: 'Full Stack Developer · Calgary, AB',
  // website: 'https://github.com/phuan516',
  about:
    'Full Stack Developer with a proven track record in front-end and back-end development, using various languages and frameworks including JavaScript, TypeScript, ReactJS, and Python. Proficient in optimizing web applications for better performance and user experience. Demonstrated ability to implement robust coding practices and introduce new technologies to streamline development workflows and enhance scalability. Experienced in using cloud services such as AWS and GCP.',
}

// ─── Contact links (rendered in header) ───────────────────────────────────────

const contacts = [
  { label: '+1 403-975-8206', href: 'tel:403-975-8206', icon: 'phone', external: false },
  { label: 'phuan516@mtroyal.ca', href: 'mailto:phuan516@mtroyal.ca', icon: 'email', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/peter-huang-904b82164/', icon: 'linkedin', external: true },
  { label: 'GitHub', href: 'https://github.com/phuan516', icon: 'github', external: true },
]

// ─── Experience ───────────────────────────────────────────────────────────────

const experience = [
  {
    company: 'Steelhaus Technologies',
    title: 'Full Stack Developer',
    date: 'Mar 2025 –\nApr 2026',
    location: 'Calgary, AB',
    bullets: [
      'Built features to support employee compliance, training, certification, and maintenance workflows, streamlining oversight for 400+ employees and assets.',
      'Led development of a third-party HRIS integration connecting BambooHR and ADP Workforce Now, eliminating manual data entry.',
      'Introduced AI coding tools for rapid prototyping, cutting approval turnaround by ~2 weeks.',
      'Incorporated OHS requirements into incident reporting, reducing documentation time by 2–3 hours per incident.',
    ],
  },
  {
    company: 'Serenorty AI',
    title: 'Full Stack Developer',
    date: 'May 2024 –\nMar 2025',
    location: 'Remote',
    bullets: [
      'Adapted React/Python app to Next.js, improving initial page load time and SEO.',
      'Introduced TypeScript across the team for improved type safety and code maintainability.',
      'Collaborated with product team on roadmap and project deliverables.',
      'Designed and implemented UI layouts in Figma following Material Design best practices.',
    ],
  },
  {
    company: 'Best Buy Canada',
    title: 'Product Process Specialist',
    date: 'Nov 2024 –\nMar 2025',
    location: 'Calgary, AB',
    bullets: [
      'Assist customers with computer recommendations from 50+ options based on requirements and inventory.',
      'Processed incoming shipments of 1,500 items within same day.',
      'Maintained store organization per floor plans for efficient product location.',
    ],
  },
  {
    company: 'Neo Financial',
    title: 'Full Stack Developer, Intern',
    date: 'Jan 2022 –\nAug 2022',
    location: 'Calgary, AB',
    bullets: [
      'Developed internal tools contributing to 10% increase in developer productivity.',
      'Designed and built a web app tracking 200+ developers\' GitHub and Shortcut activities.',
      'Led AWS pipeline monitoring tool trial with 30 developers across 5 teams.',
      'Redesigned UI based on feedback, reducing pipeline idle time by 70%.',
    ],
  },
  {
    company: 'Alberta Health Services',
    title: 'Project Manager, Intern',
    date: 'Jan 2021 –\nAug 2021',
    location: 'Calgary, AB',
    bullets: [
      'Led requirement gathering for Connect Care wave 2 deployment with hospital units and physicians.',
      'Oversaw tracking of service tickets, reducing ticket assessment time.',
      'Coordinated weekly developer meetings to address roadblocks and reduce delays.',
    ],
  },
  {
    company: 'Kent Imaging',
    title: 'Junior Developer',
    date: 'Jul 2020 –\nAug 2020',
    location: 'Calgary, AB',
    bullets: [
      'Independently learned and implemented React/TypeScript to port mobile app login to web application.',
    ],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

const skills = [
  { category: 'Languages', items: 'JavaScript, TypeScript, Java, Python, HTML, CSS, SQL' },
  { category: 'Frameworks', items: 'ReactJS, Next.js, GraphQL, REST API, Vue' },
  { category: 'Tools', items: 'Figma, Jest, Git, GitHub, AWS, GCP, Vercel, Claude Code, Ollama, Azure Dev Ops, Jenkins' },
  { category: 'Databases', items: 'MySQL, MongoDB, PostgreSQL' },
]

// ─── Education ────────────────────────────────────────────────────────────────

const education = [
  {
    degree: 'Bachelor of Computer Information Systems',
    school: 'Mount Royal University',
    years: '2017 – 2023',
    location: 'Calgary, AB',
  },
]

// ─── Side Projects ────────────────────────────────────────────────────────────

const projects = [
  {
    name: "Ledger",
    description: "A budget tracker that uses Google Sheets as a backend. Sign in with Google, connect a spreadsheet, and track spending across categories, payment methods, and fixed expenses — with your data staying entirely in your own Google account.",
    language: "TypeScript",
    hreft: "https://github.com/phuan516/Budget"
  },
  {
    name: "DevLog",
    description: "A developer productivity tool for tracking Azure DevOps work items alongside Obsidian vault notes",
    language: "JavaScript",
    href: 'https://github.com/phuan516/DevLog',
  },
  {
    name: '100WeeksCSS Challenge',
    description: 'Daily CSS design challenges showcasing front-end creativity',
    language: 'HTML, CSS, JavaScript',
    href: 'https://github.com/phuan516/100WeeksCSS',
  },
  {
    name: 'Commit Bot',
    description: 'Automation tool for managing conventional commit messages',
    language: 'Shell',
    href: 'https://github.com/phuan516/commit-bot',
  },
  {
    name: 'LiveTerm',
    description: 'Customizable terminal emulator with extensible configuration',
    language: 'TypeScript, Shell, Docker',
    href: 'https://github.com/phuan516/LiveTerm-Personal',
  },
  {
    name: 'Photo Search App Challenge',
    description: 'Image search application with modern UI and API integration',
    language: 'TypeScript, CSS',
    href: 'https://github.com/phuan516/photo-search-interview-excerise',
  },
  {
    name: 'Mobile App Interface Hiring Challenge',
    description: 'Mobile app interface design challenge showcasing front-end skills',
    language: 'HTML, CSS, JavaScript, SCSS',
    href: 'https://github.com/phuan516/Frontend-Hiring-Challenge',
  },
  {
    name: 'Dev Utility App',
    description: 'Collection of personal automation and developer tools',
    language: 'TypeScript, JavaScript',
    href: 'https://github.com/phuan516/random-stuff',
  },
  {
    name: 'Game Jam Project',
    description: 'Final project for game development course; chose Godot to learn a new language and engine',
    language: 'GDScript',
    href: 'https://github.com/phuan516/third-times-a-charm',
  },
]
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
