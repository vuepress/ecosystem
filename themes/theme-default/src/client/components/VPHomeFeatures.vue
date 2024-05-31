<script setup lang="ts">
import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const features = computed(() => {
  if (Array.isArray(frontmatter.value.features)) {
    return frontmatter.value.features
  }
  return []
})
</script>

<template>
  <div v-if="features.length" class="vp-features">
    <div v-for="feature in features" :key="feature.title" class="vp-feature">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/variables';

.vp-features {
  border-top: 1px solid var(--c-border);
  transition: border-color var(--t-color);
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;

  @media (max-width: $MQMobile) {
    flex-direction: column;
  }
}

.vp-feature {
  flex-grow: 1;
  flex-basis: 30%;
  max-width: 30%;

  @media (max-width: $MQMobile) {
    max-width: 100%;
    padding: 0 2.5rem;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: var(--c-text-light);

    @media (max-width: $MQMobileNarrow) {
      font-size: 1.25rem;
    }
  }

  p {
    color: var(--c-text-lighter);
  }
}
</style>
