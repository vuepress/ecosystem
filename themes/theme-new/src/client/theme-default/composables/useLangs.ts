import { computed } from 'vue'
import { useRoute } from 'vuepress/client'

import { CLEAN_URLS } from '../../composables/useRuntimeBase.js'
import {
  useThemeLocalePath,
  useThemeLocales,
  type ThemeLocale,
} from '../../composables/useThemeLocalePath.js'
import { useThemePageData } from '../../composables/useThemePageData.js'
import { ensureStartingSlash } from '../support/utils.js'

export interface UseLangsOptions {
  linkToCorrespondingPage?: boolean
}

/**
 * Resolve the locales of the theme and the links between them
 *
 * 解析主题的语言信息及其相互之间的链接
 *
 * @param options - Options of the composable / 组合式函数的选项
 * @returns The current locale and the links to the other locales / 当前语言与其他语言的链接
 */
export function useLangs(
  { linkToCorrespondingPage = false }: UseLangsOptions = {
    linkToCorrespondingPage: false,
  },
) {
  const locales = useThemeLocales()
  const localePath = useThemeLocalePath()
  const route = useRoute()
  const page = useThemePageData()

  const currentLang = computed(() => ({
    label: locales.value[localePath.value]?.label,
    link: locales.value[localePath.value]?.link ?? localePath.value,
  }))

  const localeLinks = computed(() =>
    Object.entries(locales.value).flatMap(([, value]) =>
      currentLang.value.label === value.label
        ? []
        : [
            {
              text: value.label,
              link: resolveLocaleLink(
                route,
                page.value.filePathRelative ?? '',
                {
                  targetLocaleLink: value.link,
                  currentLocaleLink: currentLang.value.link,
                  linkToCorrespondingPage,
                },
              ),
              lang: value.lang,
              dir: value.dir,
            },
          ],
    ),
  )

  return { currentLang, localeLinks }
}

export interface ResolveLocaleLinkOptions {
  /** The link of the target locale / 目标语言的链接 */
  targetLocaleLink: ThemeLocale['link']
  /** The link of the current locale / 当前语言的链接 */
  currentLocaleLink: ThemeLocale['link']
  /** Whether to append the current page path / 是否追加当前页面路径 */
  linkToCorrespondingPage: boolean
}

/**
 * Resolve the link to a locale
 *
 * 解析指向某个语言的链接
 *
 * @param route - The current route / 当前路由
 * @param relativePath - Path of the current page relative to the source dir /
 *   当前页面相对于源目录的路径
 * @param options - Options of the link / 链接选项
 * @returns The resolved locale link / 解析后的语言链接
 */
export function resolveLocaleLink(
  route: ReturnType<typeof useRoute>,
  relativePath: string,
  options: ResolveLocaleLinkOptions,
): string {
  const { targetLocaleLink, currentLocaleLink, linkToCorrespondingPage } =
    options

  // the current page suffix (query and hash) of the route
  const suffix = route.fullPath.startsWith(route.path)
    ? route.fullPath.slice(route.path.length)
    : route.hash

  return (
    normalizeLink(
      targetLocaleLink,
      linkToCorrespondingPage,
      relativePath.slice(currentLocaleLink.length - 1),
      !CLEAN_URLS,
    ) + suffix
  )
}

function normalizeLink(
  localeLink: string,
  appendPagePath: boolean,
  pagePath: string,
  addHtmlExt: boolean,
): string {
  return appendPagePath
    ? localeLink.replace(/\/$/, '') +
        ensureStartingSlash(
          pagePath
            .replace(/(^|\/)index\.md$/, '$1')
            .replace(/\.md$/, addHtmlExt ? '.html' : ''),
        )
    : localeLink
}
