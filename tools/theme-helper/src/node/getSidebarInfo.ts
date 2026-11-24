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

/**
 * Normalize a frontmatter date to a `Date` instance
 *
 * @param value - Date value of the frontmatter / frontmatter 的日期值
 * @returns The normalized date, `undefined` when it is invalid / 规范化后的日期，无效时为
 *   `undefined`
 */
const normalizeDate = (value?: Date | string): Date | undefined => {
  if (value == null) return undefined

  const date = value instanceof Date ? value : new Date(value)

  return Number.isNaN(date.getTime()) ? undefined : date
}

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

    const date = normalizeDate(page.frontmatter.date)
    const { icon } = page.frontmatter

    const fileInfo: SidebarFileInfo = {
      type: 'file',
      filename: info.filename,

      text: page.frontmatter.shortTitle ?? page.title,
      link: page.path,
      ...(icon ? { icon } : {}),
      order: page.frontmatter.order ?? null,
      ...(date ? { date } : {}),

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

      if (dirOptions?.index === false) return null

      const text =
        dirOptions?.text ??
        readmePage.frontmatter.shortTitle ??
        readmePage.title
      const icon = dirOptions?.icon ?? readmePage.frontmatter.icon
      const date = normalizeDate(readmePage.frontmatter.date)
      const collapsible = dirOptions?.collapsible ?? true
      const expanded = collapsible && dirOptions?.expanded === true

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

        text,
        link: dirOptions?.link ? readmePage.path : undefined,
        ...(icon ? { icon } : {}),
        order: dirOptions?.order ?? null,
        ...(date ? { date } : {}),

        collapsible,
        expanded,

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

    text: getTitleFromFilename(info.dirname),
    order: null,

    collapsible: true,
    expanded: false,

    pageData: null,
  }

  return dirInfo
}

/**
 * Get the normalized sidebar information of the pages inside a scope from the
 * file structure
 *
 * The frontmatter fields read by this function are documented in
 * `SidebarFrontmatter`. They are the default conventions, a theme can read any
 * other frontmatter in its own getters.
 *
 * 根据文件结构获取范围内页面的规范化侧边栏信息
 *
 * 此函数读取的 frontmatter 字段记录在 `SidebarFrontmatter` 中，它们只是默认约定，主题可以在自己的获取器中读取任何其它
 * frontmatter。
 *
 * @param options - Options of the function / 函数的选项
 * @returns The normalized sidebar information / 规范化后的侧边栏信息
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
