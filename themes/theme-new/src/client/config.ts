import { darkModeSymbol } from '@vuepress/helper/client'
import {
  resolveThemeLocaleData,
  themeLocaleDataSymbol,
  useThemeData,
} from '@vuepress/plugin-theme-data/client'
import { watchImmediate } from '@vueuse/core'
import { computed, readonly } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import { resolveLocalePath } from 'vuepress/shared'

import type { DefaultTheme } from '../shared/types.js'
import {
  createDarkModeRef,
  themeDarkModeSymbol,
} from './composables/darkMode.js'

import './theme-default/styles/fonts.css'
import { resolveThemeLocalePath } from './composables/locale.js'
import theme from './theme-default/without-fonts.js'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // the raw theme data is a module-level ref, so it is available before the
    // app is set up, unlike the merged theme locale data
    const themeData = useThemeData<DefaultTheme.Config>()
    const isDark = createDarkModeRef(themeData.value.appearance ?? true)

    app.provide(themeDarkModeSymbol, isDark)
    // share the dark mode state with the ecosystem plugins
    app.provide(darkModeSymbol, readonly(isDark))

    watchImmediate(isDark, (value) => {
      if (typeof document === 'undefined') return
      document.documentElement.dataset.theme = value ? 'dark' : 'light'
    })

    // VuePress resolves the route locale from the site locales, while the
    // ported VitePress theme resolves its locale from the theme locales. The
    // theme locale path is derived from the current route so that the merged
    // theme locale data keeps the VitePress behavior even when only theme
    // locales are configured.
    app.provide(
      themeLocaleDataSymbol,
      computed(() =>
        resolveThemeLocaleData(
          themeData.value,
          resolveThemeLocalePath(
            themeData.value.locales,
            router.currentRoute.value.path,
            resolveLocalePath(
              siteData.value.locales,
              router.currentRoute.value.path,
            ),
          ),
        ),
      ),
    )

    theme.enhanceApp({ app })
  },

  layouts: {
    Layout: theme.Layout,
    NotFound: theme.Layout,
  },
})
