import { useThemeData } from '@theme/theme-data'
import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouteLocale, useSiteData } from 'vuepress/client'

export const useLangs = ({ removeCurrent = true } = {}): {
  currentLang: Ref<{ label: string; link: string }>
  localeLinks: ComputedRef<{ text: string; link: string }[]>
} => {
  const site = useSiteData()
  const theme = useThemeData()
  const routeLocale = useRouteLocale()
  const route = useRoute()

  const currentLang = computed(() => {
    const link = routeLocale.value
    return {
      label:
        theme.value.locales?.[link]?.selectLanguageName ||
        site.value.locales[link].lang ||
        '',
      link,
    }
  })

  const localeLinks = computed(() =>
    Object.keys(site.value.locales).flatMap((localePath) => {
      const locale = theme.value.locales?.[localePath]
      return removeCurrent &&
        currentLang.value.label === locale?.selectLanguageName
        ? []
        : {
            text:
              locale?.selectLanguageName ||
              site.value.locales[localePath].lang ||
              '',
            link:
              route.path.replace(routeLocale.value, localePath) + route.hash,
          }
    }),
  )
  return {
    currentLang,
    localeLinks,
  }
}
