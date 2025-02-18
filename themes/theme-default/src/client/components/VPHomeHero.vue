<script setup lang="ts">
import VPAutoLink from '@theme/VPAutoLink.vue'
import { useDarkMode } from '@theme/useDarkMode'
import { useData } from '@theme/useData'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import { ClientOnly, withBase } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const { pageFrontmatter, siteLocaleData } =
  useData<DefaultThemeHomePageFrontmatter>()
const isDarkMode = useDarkMode()

const heroText = computed(() => {
  if (pageFrontmatter.value.heroText === null) {
    return null
  }
  return pageFrontmatter.value.heroText || siteLocaleData.value.title || 'Hello'
})
const tagline = computed(() => {
  if (pageFrontmatter.value.tagline === null) {
    return null
  }

  return (
    pageFrontmatter.value.tagline ||
    siteLocaleData.value.description ||
    'Welcome to your VuePress site'
  )
})
const heroImage = computed(() => {
  if (isDarkMode.value && pageFrontmatter.value.heroImageDark !== undefined) {
    return pageFrontmatter.value.heroImageDark
  }
  return pageFrontmatter.value.heroImage
})
const heroAlt = computed(
  () => pageFrontmatter.value.heroAlt || heroText.value || 'hero',
)
const heroHeight = computed(() => pageFrontmatter.value.heroHeight ?? 280)

const actions = computed(() => {
  if (!Array.isArray(pageFrontmatter.value.actions)) {
    return []
  }

  return pageFrontmatter.value.actions.map(({ type = 'primary', ...rest }) => ({
    type,
    ...rest,
  }))
})

const HomeHeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null

  const img = h('img', {
    class: 'vp-hero-image',
    src: withBase(heroImage.value),
    alt: heroAlt.value,
    height: heroHeight.value,
  })

  if (pageFrontmatter.value.heroImageDark === undefined) {
    return img
  }

  // wrap hero image with <ClientOnly> to avoid ssr-mismatch
  // when using a different hero image in dark mode
  return h(ClientOnly, () => img)
}
</script>

<template>
  <header class="vp-hero">
    <HomeHeroImage />

    <h1 v-if="heroText" id="main-title">
      {{ heroText }}
    </h1>

    <p v-if="tagline" class="vp-hero-description">
      {{ tagline }}
    </p>

    <p v-if="actions.length" class="vp-hero-actions">
      <VPAutoLink
        v-for="action in actions"
        :key="action.text"
        class="vp-hero-action-button"
        :class="[action.type]"
        :config="action"
      />
    </p>
  </header>
</template>

<style lang="scss">
@use '../styles/variables' as *;

.vp-hero {
  text-align: center;
}

.vp-hero-image {
  display: block;
  max-width: 100%;
  max-height: 280px;
  margin: 3rem auto 1.5rem;

  @media (max-width: $MQMobileNarrow) {
    max-height: 210px;
    margin: 2rem auto 1.2rem;
  }
}

#main-title {
  font-size: 3rem;

  @media (max-width: $MQMobileNarrow) {
    font-size: 2rem;
  }
}

#main-title,
.vp-hero-description,
.vp-hero-actions {
  margin: 1.8rem auto;

  @media (max-width: $MQMobileNarrow) {
    margin: 1.2rem auto;
  }
}

.vp-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.vp-hero-description {
  max-width: 35rem;
  color: var(--vp-c-text-mute);
  font-size: 1.6rem;
  line-height: 1.3;

  @media (max-width: $MQMobileNarrow) {
    font-size: 1.2rem;
  }
}

.vp-hero-action-button {
  display: inline-block;

  box-sizing: border-box;
  padding: 0.8rem 1.6rem;
  border: 2px solid var(--vp-c-accent-bg);
  border-radius: 4px;

  background-color: var(--vp-c-bg);
  color: var(--vp-c-accent);

  font-size: 1.2rem;

  transition: background-color border-color color var(--vp-t-color);

  @media (max-width: $MQMobileNarrow) {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }

  &:hover {
    color: var(--vp-c-accent-text);
  }

  &.primary {
    background-color: var(--vp-c-accent-bg);
    color: var(--vp-c-accent-text);

    &:hover {
      border-color: var(--vp-c-accent-hover);
      background-color: var(--vp-c-accent-hover);
    }
  }
}
</style>
