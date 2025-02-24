import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { resolveRouteFullPath } from 'vuepress/client'
import type { NavItemWithLink } from '../../shared/index.js'
import { isActive } from '../utils/index.js'
import { useData } from './data.js'
import { getFlatSideBarLinks, useSidebarData } from './sidebar.js'

export interface PrevNext {
  prev?: Partial<NavItemWithLink>
  next?: Partial<NavItemWithLink>
}

const uniqueBy = <T>(array: T[], keyGetter: (item: T) => unknown): T[] => {
  const seen = new Set()

  return array.filter((item) => {
    const key = keyGetter(item)

    return seen.has(key) ? false : seen.add(key)
  })
}

export const usePrevNext = (): ComputedRef<PrevNext> => {
  const { frontmatter, page, theme } = useData()
  const sidebar = useSidebarData()

  return computed(() => {
    const links = getFlatSideBarLinks(sidebar.value)

    // ignore inner-page links with hashes
    const candidates = uniqueBy(links, (link) =>
      link.link.replace(/[?#].*$/, ''),
    )

    const index = candidates.findIndex((link) =>
      isActive(page.value.path, resolveRouteFullPath(link.link)),
    )

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
          },
    } as {
      prev?: { text?: string; link?: string }
      next?: { text?: string; link?: string }
    }
  })
}
