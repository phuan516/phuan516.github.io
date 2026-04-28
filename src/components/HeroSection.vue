<template>
  <section id="about" class="section hero">
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
    <SectionBlock class="whoami-hd" prompt="$ whoami" label="About" />
    <div class="about-comments">
      <div v-for="(line, i) in resume.about" :key="i" class="about-comment">
        <span class="c-accent">// </span><span class="about-comment-body">{{ line }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { resume } from '../content.js'
import SectionBlock from './SectionBlock.vue'
</script>

<style scoped>
.hero { margin-bottom: 72px; }

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

.whoami-hd { margin-top: 32px; }

.about-comments {
  padding-left: 16px;
  border-left: 2px solid var(--line);
}

.about-comment { margin-bottom: 6px; }
.about-comment-body { color: var(--ink); opacity: 0.88; }
</style>
