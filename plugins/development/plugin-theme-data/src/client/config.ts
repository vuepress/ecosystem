import { computed } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import {
  resolveThemeLocaleData,
  setupDevTools,
  themeLocaleDataSymbol,
  useThemeData,
} from './composables/index.js'

export default defineClientConfig({
  enhance({ app }) {
    // provide theme data & theme locale data
    const themeData = useThemeData()
    const themeLocaleData = computed(() =>
      resolveThemeLocaleData(
        themeData.value,
        (app.config.globalProperties as Record<string, unknown>)
          .$routeLocale as string,
      ),
    )
    app.provide(themeLocaleDataSymbol, themeLocaleData)

    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData.value
        },
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value
        },
      },
    })

    // setup devtools in dev mode
    setupDevTools(app, themeData, themeLocaleData)
  },
})
