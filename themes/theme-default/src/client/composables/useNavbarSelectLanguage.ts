import { useData } from '@theme/useData'
import { useRoutePaths } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vuepress/client'
import type { NavbarItem } from '../typings.js'

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarSelectLanguage = (): ComputedRef<NavbarItem[]> => {
  const route = useRoute()
  const routePaths = useRoutePaths()
  const { routeLocale, siteData, siteLocaleData, themeData, themeLocaleData } =
    useData()

  return computed<NavbarItem[]>(() => {
    const localePaths = Object.keys(siteData.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = route.path
    const currentFullPath = route.fullPath

    const languageDropdown: NavbarItem = {
      text: `${themeLocaleData.value.selectLanguageText}`,
      ariaLabel: `${
        themeLocaleData.value.selectLanguageAriaLabel ??
        themeLocaleData.value.selectLanguageText
      }`,
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this language link

        const targetSiteLocale = siteData.value.locales[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeData.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang

        // if the target language is current language
        // stay at current link
        if (targetLang === siteLocaleData.value.lang) {
          return {
            text,
            activeMatch: '.',
            link: route.fullPath,
          }
        }

        // if the target language is not current language
        // try to link to the corresponding page of current page
        // or fallback to homepage
        const targetLocalePage = currentPath.replace(
          routeLocale.value,
          targetLocalePath,
        )

        return {
          text,
          // try to keep current hash and params across languages
          link: routePaths.value.some((item) => item === targetLocalePage)
            ? currentFullPath.replace(currentPath, targetLocalePage)
            : (targetThemeLocale.home ?? targetLocalePath),
        }
      }),
    }

    return [languageDropdown]
  })
}
