import { entries } from '@vuepress/helper/client'
import { usePreferredLanguages } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { RedirectBehaviorConfig } from '../../shared/index.js'

export interface RedirectInfo {
  lang: string
  localePath: string
}

export const useRedirectInfo = (
  behaviorConfig: RedirectBehaviorConfig,
): ComputedRef<RedirectInfo | null> => {
  const languages = usePreferredLanguages()
  const routeLocale = useRouteLocale()

  const localeEntries = entries(behaviorConfig.config)

  return computed(() => {
    if (localeEntries.some(([key]) => routeLocale.value === key))
      for (const language of languages.value)
        for (const [localePath, langs] of localeEntries)
          if (langs.includes(language)) {
            if (localePath === routeLocale.value) return null

            return {
              lang: language,
              localePath,
            }
          }

    return null
  })
}
