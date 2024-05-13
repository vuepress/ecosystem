import { entries } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePageData,
} from '../../shared/index.js'
import type { NavItem } from '../../shared/navbar.js'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithLink,
} from '../../shared/resolved/navbar.js'
import { getNavLinkWithPath } from '../utils/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateNavbarData) {
    __VUE_HMR_RUNTIME__.updateNavbarData(navbarData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ navbarData }) => {
    __VUE_HMR_RUNTIME__.updateNavbarData(navbarData)
  })
}
`

export async function prepareNavbarData(
  app: App,
  localesOptions: DefaultThemeLocaleOptions,
): Promise<void> {
  const resolved: Record<string, ResolvedNavItem[]> = {}

  entries(localesOptions.locales || {}).forEach(([localePath, locale]) => {
    resolved[localePath] = resolveNavbar(
      app.pages as Page<DefaultThemePageData>[],
      locale.navbar || [],
    )
  })

  if (!resolved['/']?.length) {
    resolved['/'] = resolveNavbar(
      app.pages as Page<DefaultThemePageData>[],
      localesOptions.navbar || [],
    )
  }

  let content = `\
export const navbarData = ${JSON.stringify(resolved)}
`

  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/navbar.js', content)
}

function resolveNavbar(
  pages: Page<DefaultThemePageData>[],
  navbar: NavItem[],
): ResolvedNavItem[] {
  const resolved: ResolvedNavItem[] = []
  navbar.forEach((item) => {
    if (typeof item === 'string') {
      resolved.push(getNavLinkWithPath(pages, item))
    } else {
      const { items, children, ...args } = item
      const list = items?.length ? items : children
      const res = { ...args } as ResolvedNavItem
      if (list?.length) {
        res.items = resolveNavbar(pages, list) as ResolvedNavItemWithLink[]
      }
      resolved.push(res)
    }
  })
  return resolved
}
