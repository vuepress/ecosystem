import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import { useRouteLocale } from 'vuepress/client'

import {
  usePageRelativePath,
  useThemePageFrontmatter,
} from '../../composables/useThemePageData.js'
import { isActive, normalize, type ThemeConfig } from '../shared.js'
import {
  getFlatSideBarLinks,
  getSidebar,
  resolveSidebarData,
} from '../support/sidebar.js'
import { uniqBy } from '../support/utils.js'

export function usePrevNext() {
  const theme = useThemeLocaleData<ThemeConfig>()
  const relativePath = usePageRelativePath()
  const frontmatter = useThemePageFrontmatter()
  const routeLocale = useRouteLocale()

  return computed<{
    prev?: { text?: string; link?: string; target?: string; rel?: string }
    next?: { text?: string; link?: string; target?: string; rel?: string }
  }>(() => {
    const sidebar = resolveSidebarData(
      getSidebar(
        theme.value.sidebar,
        relativePath.value,
        undefined,
        routeLocale.value,
      ),
    )
    const links = getFlatSideBarLinks(sidebar)

    // ignore inner-page links with hashes
    const candidates = uniqBy(links, (link) => normalize(link.link))

    const index = candidates.findIndex((link) => {
      return isActive(relativePath.value, '', link.link, false, true)
    })

    const hidePrev =
      (theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
      frontmatter.value.prev === false

    const hideNext =
      (theme.value.docFooter?.next === false && !frontmatter.value.next) ||
      frontmatter.value.next === false

    return {
      prev: hidePrev
        ? undefined
        : {
            text:
              (typeof frontmatter.value.prev === 'string'
                ? frontmatter.value.prev
                : typeof frontmatter.value.prev === 'object'
                  ? frontmatter.value.prev.text
                  : undefined) ??
              candidates[index - 1]?.docFooterText ??
              candidates[index - 1]?.text,
            link:
              (typeof frontmatter.value.prev === 'object'
                ? frontmatter.value.prev.link
                : undefined) ?? candidates[index - 1]?.link,
            target:
              (typeof frontmatter.value.prev === 'object'
                ? frontmatter.value.prev.target
                : undefined) ?? candidates[index - 1]?.target,
            rel:
              (typeof frontmatter.value.prev === 'object'
                ? frontmatter.value.prev.rel
                : undefined) ?? candidates[index - 1]?.rel,
          },
      next: hideNext
        ? undefined
        : {
            text:
              (typeof frontmatter.value.next === 'string'
                ? frontmatter.value.next
                : typeof frontmatter.value.next === 'object'
                  ? frontmatter.value.next.text
                  : undefined) ??
              candidates[index + 1]?.docFooterText ??
              candidates[index + 1]?.text,
            link:
              (typeof frontmatter.value.next === 'object'
                ? frontmatter.value.next.link
                : undefined) ?? candidates[index + 1]?.link,
            target:
              (typeof frontmatter.value.next === 'object'
                ? frontmatter.value.next.target
                : undefined) ?? candidates[index + 1]?.target,
            rel:
              (typeof frontmatter.value.next === 'object'
                ? frontmatter.value.next.rel
                : undefined) ?? candidates[index + 1]?.rel,
          },
    }
  })
}
