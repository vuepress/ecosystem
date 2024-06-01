<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import {
  AutoLink,
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'
import { useDarkMode } from '../composables/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const isDarkMode = useDarkMode()

const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }
  return frontmatter.value.heroImage
})
const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero',
)
const heroHeight = computed(() => frontmatter.value.heroHeight || 280)

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
})

const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }

  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    'Welcome to your VuePress site'
  )
})

const actions = computed(() => {
  if (!Array.isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
    text,
    link,
    type,
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

  if (frontmatter.value.heroImageDark === undefined) {
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
      <AutoLink
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
@import '../styles//variables';

.vp-hero {
  text-align: center;
}

.vp-hero-image {
  max-width: 100%;
  max-height: 280px;
  display: block;
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
  font-size: 1.6rem;
  line-height: 1.3;
  color: var(--c-text-lightest);

  @media (max-width: $MQMobileNarrow) {
    font-size: 1.2rem;
  }
}

.vp-hero-action-button {
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.8rem 1.6rem;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  transition: background-color var(--t-color);
  box-sizing: border-box;

  @media (max-width: $MQMobileNarrow) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  &.primary {
    color: var(--c-bg);
    background-color: var(--c-brand);
    border-color: var(--c-brand);

    &:hover {
      background-color: var(--c-brand-light);
    }
  }

  &.secondary {
    color: var(--c-brand);
    background-color: var(--c-bg);
    border-color: var(--c-brand);

    &:hover {
      color: var(--c-bg);
      background-color: var(--c-brand-light);
    }
  }
}
</style>
