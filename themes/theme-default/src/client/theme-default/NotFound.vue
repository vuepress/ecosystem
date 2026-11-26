<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import { withBase } from 'vuepress/client'

import { useLangs } from './composables/useLangs.js'
import type { ThemeConfig } from './shared.js'

const theme = useThemeLocaleData<ThemeConfig>()
const { currentLang } = useLangs()

// the classic theme configures a list of messages, the theme keeps the first
// one as the quote before the config reaches the client
const notFound = computed(() => {
  const value = theme.value.notFound

  if (Array.isArray(value)) return { quote: value[0] }

  return value ?? {}
})
</script>

<template>
  <div class="vp-not-found">
    <p class="code">{{ notFound.code ?? '404' }}</p>
    <h1 class="title">
      <bdi>{{ notFound.title ?? 'PAGE NOT FOUND' }}</bdi>
    </h1>
    <div class="divider" />
    <blockquote class="quote">
      <bdi>{{
        notFound.quote ??
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
      }}</bdi>
    </blockquote>

    <div class="action">
      <a
        class="link"
        :href="withBase(notFound.link ?? currentLang.link)"
        :aria-label="notFound.linkLabel ?? 'go to home'"
      >
        <bdi>{{ notFound.linkText ?? 'Take me home' }}</bdi>
      </a>
    </div>
  </div>
</template>

<style scoped>
.vp-not-found {
  padding: 4rem 1.5rem 6rem;
  text-align: center;
}

@media (min-width: 48rem) {
  .vp-not-found {
    padding: 6rem 2rem 10.5rem;
  }
}

.code {
  font-weight: 600;
  font-size: 4rem;
  line-height: 1;
}

.title {
  padding-top: 0.75rem;

  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1;
  letter-spacing: 0.1em;
}

.divider {
  width: 4rem;
  height: 1px;
  margin: 1.5rem auto 1.125rem;
  background-color: var(--vp-c-divider);
}

.quote {
  max-width: 16rem;
  margin: 0 auto;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 0.875rem;
}

.action {
  padding-top: 1.25rem;
}

.link {
  display: inline-block;

  padding: 0.1875rem 1rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 1rem;

  color: var(--vp-c-brand);

  font-weight: 500;
  font-size: 0.875rem;

  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-hover);
  color: var(--vp-c-brand-hover);
}
</style>
