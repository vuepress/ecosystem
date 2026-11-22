import { darkModeSymbol } from '@vuepress/helper/client'
import { useThemeData } from '@vuepress/plugin-theme-data/client'
import { watchImmediate } from '@vueuse/core'
import { readonly } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import type { ThemeConfig } from '../shared/types.js'
import { setupRawContainerLinks } from './composables/setupRawContainerLinks.js'
import {
  createDarkModeRef,
  themeDarkModeSymbol,
} from './composables/useDarkMode.js'

import './theme-default/styles/fonts.css'
import theme from './theme-default/without-fonts.js'

export default defineClientConfig({
  enhance({ app }) {
    // the raw theme data is a module-level ref, so it is available before the
    // app is set up, unlike the merged theme locale data
    const themeData = useThemeData<ThemeConfig>()
    const isDark = createDarkModeRef(themeData.value.appearance ?? true)

    app.provide(themeDarkModeSymbol, isDark)
    // share the dark mode state with the ecosystem plugins
    app.provide(darkModeSymbol, readonly(isDark))

    watchImmediate(isDark, (value) => {
      if (typeof document === 'undefined') return
      document.documentElement.dataset.theme = value ? 'dark' : 'light'
    })

    // the links inside the `raw` container bypass the SPA router
    setupRawContainerLinks()

    theme.enhanceApp({ app })
  },

  layouts: {
    Layout: theme.Layout,
    NotFound: theme.Layout,
  },
})
