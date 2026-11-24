import type { Page } from 'vuepress/core'

import type { SidebarDirInfo, SidebarFileInfo } from '../../src/shared/index.js'

/**
 * The item shape of the theme used in the tests
 *
 * 测试中使用的主题条目形状
 */
export interface TestItem {
  text: string
  link?: string
  icon?: string
  collapsible?: boolean
  expanded?: boolean
  badge?: string
  items?: TestItem[]
}

/**
 * Read the `badge` frontmatter of the page into the structure item
 *
 * The helper does not know the `badge` frontmatter, the theme reads it in its
 * own getter.
 *
 * 将页面的 `badge` frontmatter 读取到结构条目中
 *
 * Helper 并不认识 `badge` frontmatter，主题在自己的获取器中读取它。
 *
 * @param _info - The sidebar info of the page / 页面的侧边栏信息
 * @param page - The page of the info / 信息对应的页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item / 自定义结构条目
 */
export const pageInfoGetter = (
  _info: SidebarFileInfo,
  page: Page | undefined,
  defaults: TestItem,
): Partial<TestItem> => ({
  ...defaults,
  ...(page?.frontmatter.badge
    ? { badge: page.frontmatter.badge as string }
    : {}),
})

/**
 * Skip the page whose frontmatter sets `hide: true`
 *
 * 跳过 frontmatter 设置 `hide: true` 的页面
 *
 * @param _info - The sidebar info of the page / 页面的侧边栏信息
 * @param page - The page of the info / 信息对应的页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item or `null` to skip / 自定义结构条目，返回 `null`
 *   时跳过
 */
export const skipPageInfoGetter = (
  _info: SidebarFileInfo,
  page: Page | undefined,
  defaults: TestItem,
): Partial<TestItem> | null =>
  page?.frontmatter.hide === true ? null : defaults

/**
 * Read the `badge` frontmatter of the `README.md` page into the group item
 *
 * 将 `README.md` 页面的 `badge` frontmatter 读取到分组条目中
 *
 * @param _info - The sidebar info of the directory / 目录的侧边栏信息
 * @param readmePage - The `README.md` page of the directory / 目录的 `README.md`
 *   页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item / 自定义结构条目
 */
export const dirInfoGetter = (
  _info: SidebarDirInfo,
  readmePage: Page | null,
  defaults: TestItem,
): Partial<TestItem> => ({
  ...defaults,
  ...(readmePage?.frontmatter.badge
    ? { badge: readmePage.frontmatter.badge as string }
    : {}),
})
