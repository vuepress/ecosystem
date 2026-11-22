<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useNavigatorLanguage } from '@vueuse/core'
import {
  computed,
  onMounted,
  shallowRef,
  useTemplateRef,
  watchEffect,
} from 'vue'
import { usePageLang } from 'vuepress/client'

import { usePageLastUpdated } from '../../composables/useThemePageData.js'
import type { ThemeConfig } from '../shared.js'

const theme = useThemeLocaleData<ThemeConfig>()
const pageLang = usePageLang()
const pageLastUpdated = usePageLastUpdated()
const { language: browserLang } = useNavigatorLanguage()

const timeRef = useTemplateRef('timeRef')

const lastUpdatedOptions = computed(() =>
  typeof theme.value.lastUpdated === 'object' ? theme.value.lastUpdated : {},
)
const date = computed(() => new Date(pageLastUpdated.value!))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = shallowRef('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    const lang = lastUpdatedOptions.value.formatOptions?.forceLocale
      ? pageLang.value
      : browserLang.value

    datetime.value = new Intl.DateTimeFormat(
      lang,
      lastUpdatedOptions.value.formatOptions ?? {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    ).format(date.value)

    if (lang && pageLang.value !== lang) {
      timeRef.value?.setAttribute('lang', lang)
    } else {
      timeRef.value?.removeAttribute('lang')
    }
  })
})
</script>

<template>
  <p class="vp-last-updated">
    <bdi>{{ lastUpdatedOptions.text || 'Last updated' }}: </bdi>
    <time ref="timeRef" dir="auto" :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.vp-last-updated {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.7142857;
}

@media (min-width: 40rem) {
  .vp-last-updated {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 2.2857143;
  }
}
</style>
