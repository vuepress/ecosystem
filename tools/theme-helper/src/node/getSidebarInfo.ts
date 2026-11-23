import { startsWith } from '@vuepress/helper'
import type { Page } from 'vuepress/core'

import type {
  SidebarDirInfo,
  SidebarFileInfo,
  SidebarFrontmatter,
  SidebarInfo,
  SidebarSorterFunction,
} from '../shared/index.js'
import { getStructureInfo } from './getStructureInfo.js'
import { getTitleFromFilename } from './getTitleFromFilename.js'

/**
 * Options of `getSidebarInfo`
 *
 * `getSidebarInfo` 的选项
 */
export interface SidebarInfoOptions {
  /**
   * Pages of the site
   *
   * 站点的页面
   */
  pages: Page[]

  /**
   * Sorters of the sidebar items
   *
   * 侧边栏条目的排序器
   */
  sorters: SidebarSorterFunction[]

  /**
   * File path scope, should end with a slash and have no leading slash, e.g.
   * `guide/` or an empty string for the root directory
   *
   * 文件路径范围，应以斜线结尾且不以斜线开头，例如 `guide/`，根目录为空字符串
   */
  scope: string
}

type SidebarPage = Page<Record<string, unknown>, SidebarFrontmatter>

const sortItems = (
  items: SidebarInfo[],
  sorters: SidebarSorterFunction[],
): SidebarInfo[] =>
  items.sort((infoA, infoB) => {
    for (const sorter of sorters) {
      const result = sorter(infoA, infoB)

      if (result !== 0) return result
    }

    return 0
  })

const getSidebarChildrenInfo = (
  { pages, scope, sorters }: SidebarInfoOptions,
  children: ReturnType<typeof getStructureInfo>,
): SidebarInfo[] =>
  sortItems(
    children
      .map((item) =>
        // oxlint-disable-next-line no-use-before-define
        getSidebarInfoFromStructure({ pages, scope, sorters }, item),
      )
      .filter((item): item is SidebarInfo => item != null),
    sorters,
  )

// oxlint-disable-next-line complexity
const getSidebarInfoFromStructure = (
  { scope, pages, sorters }: SidebarInfoOptions,
  info: ReturnType<typeof getStructureInfo>[number],
): SidebarInfo | null => {
  // the frontmatter of the page is typed as `Record<string, unknown>`, so the
  // pages are narrowed to the frontmatter shape of the sidebar
  const sidebarPages = pages as unknown as SidebarPage[]

  // handle file
  if (info.type === 'file') {
    const page = sidebarPages.find(
      ({ filePathRelative }) => filePathRelative === `${scope}${info.path}`,
    )

    if (!page) return null

    if (page.frontmatter.index === false) return null

    const fileInfo: SidebarFileInfo = {
      type: 'file',
      filename: info.filename,

      title: page.frontmatter.shortTitle ?? page.title,
      order: page.frontmatter.order ?? null,
      path: page.path,

      frontmatter: page.frontmatter,
      pageData: page.data,
    }

    return fileInfo
  }

  // handle dir

  const relatedPages = sidebarPages.filter(({ filePathRelative }) =>
    startsWith(filePathRelative, `${scope}${info.path}/`),
  )
  const READMEFile = info.children.find(
    (child) =>
      child.type === 'file' && child.filename.toLowerCase() === 'readme.md',
  )

  if (READMEFile) {
    const readmePage = relatedPages.find(
      ({ filePathRelative }) =>
        filePathRelative === `${scope}${READMEFile.path}`,
    )

    if (readmePage) {
      // get dir information
      const dirOptions = readmePage.frontmatter.dir

      const title =
        dirOptions?.text ??
        readmePage.frontmatter.shortTitle ??
        readmePage.title
      const icon = dirOptions?.icon ?? readmePage.frontmatter.icon
      const collapsible = dirOptions?.collapsible ?? true
      const expanded = collapsible && dirOptions?.expanded === true

      if (dirOptions?.index === false) return null

      const dirInfo: SidebarDirInfo = {
        type: 'dir',
        dirname: info.dirname,
        children: getSidebarChildrenInfo(
          { pages: relatedPages, scope, sorters },
          dirOptions?.link
            ? info.children.filter(
                // filter README.md
                (item) =>
                  item.type !== 'file' ||
                  item.filename.toLowerCase() !== 'readme.md',
              )
            : info.children,
        ),

        title,
        order: dirOptions?.order ?? null,

        // group information
        groupInfo: {
          ...(collapsible ? { collapsible } : {}),
          ...(expanded ? { expanded } : {}),
          ...(icon ? { icon } : {}),
          ...(dirOptions?.link ? { link: readmePage.path } : {}),
        },

        frontmatter: readmePage.frontmatter,
        pageData: readmePage.data,
      }

      return dirInfo
    }
  }

  const dirInfo: SidebarDirInfo = {
    type: 'dir',
    dirname: info.dirname,
    children: getSidebarChildrenInfo(
      { pages: relatedPages, scope, sorters },
      info.children,
    ),

    title: getTitleFromFilename(info.dirname),
    order: null,

    // group information
    groupInfo: {
      collapsible: true,
    },

    frontmatter: null,
    pageData: null,
  }

  return dirInfo
}

/**
 * Get the sidebar information of pages inside a scope from the file structure
 *
 * 根据文件结构获取范围内页面的侧边栏信息
 *
 * @param options - Options of the function / 函数的选项
 * @returns The sidebar information / 侧边栏信息
 */
export const getSidebarInfo = ({
  pages,
  sorters,
  scope,
}: SidebarInfoOptions): SidebarInfo[] =>
  sortItems(
    getStructureInfo(pages, scope)
      .map((info) =>
        getSidebarInfoFromStructure({ scope, pages, sorters }, info),
      )
      .filter((item): item is SidebarInfo => item != null),
    sorters,
  )
