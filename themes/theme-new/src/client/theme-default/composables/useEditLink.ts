import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'

import {
  usePageRelativePath,
  useThemePageData,
} from '../../composables/useThemePageData.js'
import type { ThemeConfig } from '../shared.js'

export function useEditLink() {
  const theme = useThemeLocaleData<ThemeConfig>()
  const page = useThemePageData()
  const relativePath = usePageRelativePath()

  return computed(() => {
    const { text = 'Edit this page', pattern = '' } = theme.value.editLink || {}
    let url: string
    if (typeof pattern === 'function') {
      // the callback receives the native VuePress page data of the current page
      url = pattern(page.value)
    } else {
      url = pattern.replace(/:path/g, relativePath.value)
    }

    return { url, text }
  })
}
