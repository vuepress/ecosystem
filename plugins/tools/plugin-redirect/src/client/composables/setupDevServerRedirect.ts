import { redirectMap } from '@temp/redirect/map.js'
import { entries, isLinkHttp } from '@vuepress/helper/client'
import { usePreferredLanguages, watchImmediate } from '@vueuse/core'
import { computed } from 'vue'
import {
  useRoute,
  useRouteLocale,
  useRoutePath,
  useRouter,
} from 'vuepress/client'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { normalizePath } from '../../shared/index.js'

export const setupDevServerRedirect = ({
  autoLocale,
  config,
  defaultBehavior,
  defaultLocale: defaultLocalePath,
  localeFallback,
}: RedirectBehaviorConfig): void => {
  const localeEntries = Object.entries(config)
  const languages = usePreferredLanguages()
  const route = useRoute()
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const routePath = useRoutePath()

  const isRootLocale = computed(() => routeLocale.value === '/')

  const handleLocaleRedirect = (): void => {
    const routePathValue = routePath.value
    const routes = router.getRoutes()
    const defaultLocale =
      defaultLocalePath &&
      routes.some(
        ({ path }) => path === routePathValue.replace('/', defaultLocalePath),
      )
        ? defaultLocalePath
        : routes.find(
            ({ path }) =>
              routePathValue.split('/').length >= 3 &&
              path === routePathValue.replace(/^\/[^/]+\//, '/'),
          )?.path

    let matchedLocalePath: string | null = null

    // get matched locale
    // eslint-disable-next-line no-restricted-syntax
    findLanguage: for (const lang of languages.value)
      for (const [localePath, langs] of localeEntries)
        if (langs.includes(lang)) {
          if (
            localeFallback &&
            routes.every(
              ({ path }) => path !== routePathValue.replace('/', path),
            )
          )
            continue

          matchedLocalePath = localePath
          break findLanguage
        }

    // default link
    const defaultRoute = defaultLocale
      ? route.fullPath.replace('/', defaultLocale)
      : null

    // a locale matches
    if (matchedLocalePath) {
      const hasLocalePage = routes.some(
        ({ path }) => routePathValue.replace('/', matchedLocalePath) === path,
      )
      const localeRoute = route.fullPath.replace('/', matchedLocalePath)

      const redirectPath =
        // the locale page exists
        hasLocalePage
          ? localeRoute
          : // the page does not exist
            defaultBehavior === 'homepage'
            ? // locale homepage
              matchedLocalePath
            : defaultBehavior === 'defaultLocale' && defaultRoute
              ? // default locale page
                defaultRoute
              : // as is to get a 404 page of that locale
                localeRoute

      router.replace(redirectPath)
    }
    // we have a default page
    else if (defaultRoute) {
      router.replace(defaultRoute)
    } else if (routePath.value !== '/404.html') {
      router.replace('/404.html')
    }
  }

  watchImmediate(routePath, (path) => {
    // handle redirects
    for (const [from, to] of entries(redirectMap))
      if (normalizePath(path.toLowerCase()) === from.toLowerCase()) {
        if (isLinkHttp(to)) window.open(to)
        else router.replace(to)

        return
      }

    if (autoLocale && isRootLocale.value) handleLocaleRedirect()
  })
}
