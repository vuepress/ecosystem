<script setup lang="ts">
import { useData } from '@theme/useData'
import { computed, onMounted, ref } from 'vue'
import { RouteLink } from 'vuepress/client'

const { routeLocale, theme, themeLocale } = useData()

const isMounted = ref(false)

// 404 page will fall back to root locale,
// so we shall use the '/' to avoid SSR mismatch
const expectedRouteLocale = computed(() =>
  isMounted.value ? routeLocale.value : '/',
)

// 404 page will fall back to root locale,
// so we shall use the root theme locale to avoid SSR mismatch
const expectedThemeLocale = computed(() => {
  if (isMounted.value) return themeLocale.value

  const { locales, ...baseOptions } = theme.value

  return {
    ...baseOptions,
    ...locales?.['/'],
  }
})

const homeLink = computed(
  () => expectedThemeLocale.value.home ?? expectedRouteLocale.value,
)
const homeText = computed(
  () => expectedThemeLocale.value.backToHome ?? 'Back to home',
)

const messages = computed(
  () => expectedThemeLocale.value.notFound ?? ['Not Found'],
)

const notFoundMsg = computed(() => {
  if (isMounted.value) {
    return messages.value[Math.floor(Math.random() * messages.value.length)]
  }

  return messages.value[0]
})

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="vp-theme-container" vp-container>
    <main class="page">
      <div vp-content>
        <h1>404</h1>

        <blockquote>{{ notFoundMsg }}</blockquote>

        <RouteLink :to="homeLink">{{ homeText }}</RouteLink>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.vp-theme-container {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 2.5rem;

  @media (max-width: 959px) {
    padding: 2rem;
  }
}
</style>
