import {
  ensureEndingSlash,
  ensureLeadingSlash,
  entries,
  isArray,
  isPlainObject,
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
import type { ResolvedSidebarItem } from '../../../shared/resolved/sidebar.js'
import { normalizeLink } from '../../utils/index.js'
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

export const prepareSidebarData = async (
  app: App,
  localesOptions: DefaultThemeLocaleOptions,
  sorters?: SidebarSorter,
): Promise<void> => {
  const locales: Record<string, Sidebar | undefined> = {}

  entries(localesOptions.locales ?? {}).forEach(([localePath, locale]) => {
    locales[localePath] = locale.sidebar
  })

  if (!locales['/']) {
    locales['/'] = localesOptions.sidebar
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const sidebarData = getSidebarData(app, locales, sorters)

  let content = `\
export const sidebarData = ${JSON.stringify(sidebarData)}
`

  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/sidebar.js', content)
}

export const getSidebarData = (
  app: App,
  locales: Record<string, Sidebar | undefined>,
  sorter?: SidebarSorter,
): Sidebar => {
  const structureDir: string[] = []

  const resolved: Sidebar = {}
  const sorters = getSidebarSorter(sorter)

  entries(locales).forEach(([localePath, sidebar]) => {
    if (!sidebar) return

    if (isArray(sidebar)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      structureDir.push(...findStructureList(sidebar, localePath))
    } else if (isPlainObject(sidebar)) {
      entries(sidebar).forEach(([dirname, config]) => {
        const prefix = normalizeLink(localePath, dirname)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        config === 'structure'
          ? structureDir.push(prefix)
          : isArray(config)
            ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
              structureDir.push(...findStructureList(config, prefix))
            : config.items === 'structure'
              ? structureDir.push(normalizeLink(prefix, config.prefix))
              : structureDir.push(
                  // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  ...findStructureList(
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    config.items ?? [],
                    normalizeLink(prefix, config.prefix),
                  ),
                )
      })
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (sidebar === 'structure') {
      structureDir.push(localePath)
    }
  })

  structureDir.forEach((dirname) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    resolved[dirname] = getSidebarItemsFromStructure(app, sorters, dirname)
  })

  return resolved
}

const findStructureList = (
  sidebar: (SidebarItem | string)[],
  prefix = '',
): string[] => {
  const list: string[] = []
  if (!sidebar.length) return list

  sidebar.forEach((item) => {
    if (isPlainObject(item)) {
      const nextPrefix = normalizeLink(prefix, item.prefix)
      if (item.items === 'structure') {
        list.push(nextPrefix)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.items?.length &&
          list.push(...findStructureList(item.items, nextPrefix))
      }
    }
  })

  return list
}

const getSidebarItemsFromStructure = (
  app: App,
  sorters: SidebarSorterFunction[],
  dirname: string,
): ResolvedSidebarItem[] => {
  const infos = getSidebarInfo({
    pages: app.pages,
    sorters,
    scope: removeLeadingSlash(ensureEndingSlash(dirname)),
  })
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return getSidebarItemsFromInfos(infos)
}

const getSidebarItemsFromInfos = (
  infos: SidebarInfo[],
): ResolvedSidebarItem[] =>
  infos.map((info) => {
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
