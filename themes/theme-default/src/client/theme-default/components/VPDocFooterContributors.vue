<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'

import { useContributors } from '../composables/useContributors.js'
import type { ThemeConfig } from '../shared.js'

const theme = useThemeLocaleData<ThemeConfig>()
const contributors = useContributors()

const text = computed(() => theme.value.contributorsText ?? 'Contributors')
</script>

<template>
  <div v-if="contributors.length" class="vp-doc-footer-contributors">
    <span class="contributors-text">{{ text }}:</span>
    <span class="contributors">
      <template
        v-for="(contributor, index) in contributors"
        :key="contributor.email || contributor.name"
      >
        <a
          v-if="contributor.url"
          class="contributor"
          :href="contributor.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="`email: ${contributor.email}`"
        >
          {{ contributor.name }}
        </a>
        <span v-else class="contributor" :title="`email: ${contributor.email}`">
          {{ contributor.name }}
        </span>
        <span v-if="index !== contributors.length - 1" class="separator"
          >,
        </span>
      </template>
    </span>
  </div>
</template>

<style scoped>
.vp-doc-footer-contributors {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.7142857;
}

.contributors-text {
  margin-inline-end: 0.25em;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.contributors {
  font-weight: 400;
}

.contributor {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.25s;
}

.contributor:hover {
  color: var(--vp-c-brand-2);
}

.separator {
  white-space: pre;
}
</style>
