<template>
  <header class="header">
    <div class="header__inner">

      <div class="header__identity">
        <h1 class="header__name">{{ name }}</h1>
        <p class="header__tagline">{{ tagline }}</p>
        <a v-if="website" :href="website" class="header__website" target="_blank">
          {{ websiteDisplay }}
        </a>
      </div>

      <nav class="header__contact" aria-label="Contact links">
        <a
          v-for="link in contacts"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="header__contact-link"
        >
          <component :is="iconMap[link.icon]" class="header__contact-icon" aria-hidden="true" />
          {{ link.label }}
        </a>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import IconPhone from './icons/IconPhone.vue'
import IconEmail from './icons/IconEmail.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconGitHub from './icons/IconGitHub.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: null,
  },
  contacts: {
    type: Array,
    default: () => [],
  },
})

const iconMap = {
  phone: IconPhone,
  email: IconEmail,
  linkedin: IconLinkedIn,
  github: IconGitHub,
}

const websiteDisplay = computed(() =>
  props.website?.replace(/^https?:\/\//, '') ?? ''
)
</script>

<style scoped>
.header {
  padding: 56px 24px 0;
}

.header__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding-bottom: 48px;
}

.header__identity {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.header__name {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.header__tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.header__website {
  font-size: 0.85rem;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.15s;
}

.header__website:hover {
  color: var(--text);
}

.header__contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.header__contact-link {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.header__contact-link:hover {
  color: var(--text);
}

.header__contact-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .header {
    padding: 36px 20px 0;
  }

  .header__inner {
    flex-direction: column;
    gap: 24px;
    padding-bottom: 36px;
  }

  .header__contact {
    align-items: flex-start;
  }
}
</style>
