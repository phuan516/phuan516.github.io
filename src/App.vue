<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="name-section">
          <h1 class="name">Peter Huang</h1>
          <p class="title">Full Stack Developer</p>
        </div>
        <div class="contact-section">
          <a href="tel:403-975-8206" class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.4.2 2.7.6 3.9.1.3 0 .7-.2 1l-2.2 2.2z"/></svg>
            403-975-8206
          </a>
          <a href="mailto:phuan516@mtroyal.ca" class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            phuan516@mtroyal.ca
          </a>
          <a href="https://www.linkedin.com/in/peter-huang-904b82164/" target="_blank" class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.59h2.8V10.24c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v8.59h2.8m-6.6-8.54a2.86 2.86 0 1 0 0-5.72 2.86 2.86 0 0 0 0 5.72z"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/phuan516" target="_blank" class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="content">
        <!-- Summary Section -->
        <section class="section-card">
          <span class="section-label">About</span>
          <p class="summary-text">
            Full Stack Developer with a proven track record in front-end and back-end development, using various
            languages and frameworks including JavaScript, TypeScript, ReactJS, and Python. Proficient in optimizing
            web applications for better performance and user experience. Demonstrated ability to implement robust
            coding practices and introduce new technologies to streamline development workflows and enhance scalability.
            Experienced in using cloud services such as AWS and GCP. Passionate about leveraging technical expertise
            to contribute to innovative and efficient software development projects.
          </p>
        </section>

        <!-- Experience Section -->
        <section class="section-card">
          <span class="section-label">Experience</span>
          <div class="experience-list">
            <div v-for="job in experience" :key="job.company" class="experience-item">
              <div class="experience-header">
                <div class="experience-left">
                  <h3 class="company-name">{{ job.company }}</h3>
                  <span class="job-title">{{ job.title }}</span>
                </div>
                <span class="job-date">{{ job.date }}</span>
              </div>
              <ul class="job-bullets">
                <li v-for="(bullet, idx) in job.bullets" :key="idx">{{ bullet }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="section-card">
          <span class="section-label">Skills</span>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.category" class="skill-category">
              <span class="skill-category-label">{{ skill.category }}</span>
              <span class="skill-items">{{ skill.items }}</span>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="section-card">
          <span class="section-label">Education</span>
          <div class="education-item">
            <div class="experience-header">
              <div class="experience-left">
                <h3 class="company-name">Mount Royal University</h3>
                <span class="job-title">Bachelor of Computer Information Systems</span>
              </div>
              <span class="job-date">2017 – 2023</span>
            </div>
            <span class="location-text">Calgary, AB</span>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
const experience = [
  {
    company: 'Steelhaus Technologies',
    title: 'Full Stack Developer',
    date: 'Mar 2025 – Apr 2026',
    bullets: [
      'Built features to support employee compliance, training, certification, and maintenance workflows, streamlining oversight for 400+ employees and assets.',
      'Led development of a third-party HRIS integration connecting BambooHR and ADP Workforce Now, eliminating manual data entry.',
      'Introduced AI coding tools for rapid prototyping, cutting approval turnaround by ~2 weeks.',
      'Incorporated OHS requirements into incident reporting, reducing documentation time by 2-3 hours per incident.',
    ],
  },
  {
    company: 'Serenorty AI',
    title: 'Full Stack Developer',
    date: 'May 2024 – Present',
    bullets: [
      'Adapted React/Python app to NextJS, improving initial page load time and SEO.',
      'Introduced TypeScript across the team for improved type safety and code maintainability.',
      'Collaborated with product team on roadmap and project deliverables.',
      'Designed and implemented UI layouts in Figma following Material Design best practices.',
    ],
  },
  {
    company: 'Best Buy Canada',
    title: 'Product Process Specialist',
    date: 'Jan 2024 – Present',
    bullets: [
      'Assist customers with computer recommendations from 50+ options based on requirements and inventory.',
      'Processed incoming shipments of 1500 items within same day.',
      'Maintained store organization per floor plans for efficient product location.',
    ],
  },
  {
    company: 'Neo Financial',
    title: 'Full Stack Developer, Intern',
    date: 'Jan 2022 – Aug 2022',
    bullets: [
      'Developed internal tools contributing to 10% increase in developer productivity.',
      'Designed and built a web app tracking 200+ developers\' Github and Shortcut activities.',
      'Led AWS pipeline monitoring tool trial with 30 developers across 5 teams.',
      'Redesigned UI based on feedback, reducing pipeline idle time by 70%.',
    ],
  },
  {
    company: 'Alberta Health Services',
    title: 'Project Manager, Intern',
    date: 'Jan 2021 – Aug 2021',
    bullets: [
      'Led requirement gathering for Connect Care wave 2 deployment with hospital units and physicians.',
      'Oversaw tracking of service tickets, reducing ticket assessment time.',
      'Coordinated weekly developer meetings to address roadblocks and reduce delays.',
    ],
  },
  {
    company: 'Kent Imaging',
    title: 'Junior Developer',
    date: 'Jul 2020 – Aug 2020',
    bullets: [
      'Independently learned and implemented React/TypeScript to port mobile app login to web app.',
    ],
  },
]

const skills = [
  { category: 'Languages', items: 'JavaScript, TypeScript, Java, Python, HTML, CSS, SQL' },
  { category: 'Frameworks', items: 'ReactJS, NextJS, GraphQL, REST API' },
  { category: 'Tools', items: 'Figma, Jest, GIT, GitHub, AWS, GCP, Vercel, Claude Code, Ollama' },
  { category: 'Databases', items: 'MySQL, MongoDB' },
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #e0e0e0;
  background: linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 48px 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
}

.name-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.contact-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.contact-item:hover {
  color: #6366f1;
}

.icon {
  width: 18px;
  height: 18px;
}

.main {
  padding: 32px 24px 64px;
  flex: 1;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 28px 32px;
}

.section-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 16px;
}

.summary-text {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.experience-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.experience-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
}

.job-title {
  font-size: 0.9rem;
  color: #6366f1;
  font-weight: 500;
}

.job-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

.job-bullets {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.job-bullets li {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
}

.job-bullets li::marker {
  color: rgba(255, 255, 255, 0.3);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-category-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.skill-items {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}

.education-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.location-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 2px;
}

@media (max-width: 640px) {
  .header {
    padding: 32px 16px 24px;
  }

  .header-content {
    flex-direction: column;
    gap: 24px;
  }

  .contact-section {
    align-items: flex-start;
  }

  .name {
    font-size: 2rem;
  }

  .main {
    padding: 24px 16px 48px;
  }

  .section-card {
    padding: 20px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>