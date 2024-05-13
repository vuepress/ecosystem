import {
  ensureEndingSlash,
  ensureLeadingSlash,
  entries,
  isArray,
  isLinkExternal,
  isPlainObject,
  isString,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type {
  DefaultThemeLocaleOptions,
  Sidebar,
  SidebarInfo,
  SidebarItem,
  SidebarSorter,
  SidebarSorterFunction,
} from '../../../shared/index.js'
import type {
  ResolvedSidebar,
  ResolvedSidebarItem,
} from '../../../shared/resolved/sidebar.js'
import { getNavLinkWithPath } from '../../utils/index.js'
import { getSidebarInfo } from './getSidebarInfo.js'
import { getSidebarSorter } from './getSidebarSorter.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSidebarData) {
    __VUE_HMR_RUNTIME__.updateSidebarData(sidebarData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ sidebarData }) => {
    __VUE_HMR_RUNTIME__.updateSidebarData(sidebarData)
  })
}
`

export async function prepareSidebarData(
  app: App,
  localesOptions: DefaultThemeLocaleOptions,
  sorters?: SidebarSorter,
): Promise<void> {
  const locales: Record<string, Sidebar | undefined> = {}

  entries(localesOptions.locales || {}).forEach(([localePath, locale]) => {
    locales[localePath] = locale.sidebar
  })

  if (!locales['/']) {
    locales['/'] = localesOptions.sidebar
  }

  const sidebarData = getSidebarData(app, locales, sorters)

  let content = `\
export const sidebarData = ${JSON.stringify(sidebarData)}
`

  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/sidebar.js', content)
}

export function getSidebarData(
  app: App,
  locales: Record<string, Sidebar | undefined>,
  sorter?: SidebarSorter,
): ResolvedSidebar {
  const resolved: ResolvedSidebar = {}
  const sorters = getSidebarSorter(sorter)

  entries(locales).forEach(([localePath, sidebar]) => {
    if (!sidebar) return
    if (isArray(sidebar)) {
      resolved[localePath] = resolveSidebarItems(app, sorters, sidebar)
    } else if (isPlainObject(sidebar)) {
      entries(sidebar).forEach(([dirname, config]) => {
        resolved[dirname] =
          config === 'structure'
            ? getSidebarItemsFromStructure(app, sorters, dirname)
            : isArray(config)
              ? resolveSidebarItems(app, sorters, config)
              : config.items === 'structure'
                ? getSidebarItemsFromStructure(
                    app,
                    sorters,
                    config.base || dirname,
                  )
                : resolveSidebarItems(app, sorters, config.items, config.base)
      })
    } else if (sidebar === 'structure') {
      resolved[localePath] = getSidebarItemsFromStructure(
        app,
        sorters,
        localePath,
      )
    }
  })

  return resolved
}

function resolveSidebarItems(
  app: App,
  sorter: SidebarSorterFunction[],
  items: (string | SidebarItem)[],
  _base = '',
): ResolvedSidebarItem[] {
  return items.map((item) => {
    if (isString(item)) {
      return getNavLinkWithPath(app.pages, item)
    }
    const { base, link, items, ...args } = item
    return {
      ...args,
      link: isLinkExternal(link || '')
        ? link
        : _base && link !== undefined && !link.startsWith('/')
          ? normalizeLink(_base, link)
          : link,
      items:
        items === 'structure'
          ? getSidebarItemsFromStructure(app, sorter, base || _base)
          : items?.length
            ? resolveSidebarItems(app, sorter, items, base || _base)
            : undefined,
    }
  })
}

function getSidebarItemsFromStructure(
  app: App,
  sorters: SidebarSorterFunction[],
  dirname: string,
): ResolvedSidebarItem[] {
  const infos = getSidebarInfo({
    pages: app.pages,
    sorters,
    scope: removeLeadingSlash(ensureEndingSlash(dirname)),
  })
  return getSidebarItemsFromInfos(infos)
}

function getSidebarItemsFromInfos(infos: SidebarInfo[]): ResolvedSidebarItem[] {
  return infos.map((info) => {
    if (info.type === 'file') {
      return {
        link:
          info.path || ensureLeadingSlash(info.pageData.filePathRelative || ''),
        text: info.title,
      }
    }
    return {
      text: info.title,
      ...info.groupInfo,
      items: getSidebarItemsFromInfos(info.children),
    }
  })
}

function normalizeLink(base: string, link: string): string {
  return `${base}/${link}`.replace(/\/+/g, '/')
}
