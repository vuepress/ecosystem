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
  collapsed?: boolean
  items?: TestItem[]
}

/**
 * Add the icon of the page to the structure item
 *
 * 将页面的图标添加到结构条目中
 *
 * @param info - The sidebar info of the page / 页面的侧边栏信息
 * @param _page - The page of the info / 信息对应的页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item / 自定义结构条目
 */
export const pageInfoGetter = (
  info: SidebarFileInfo,
  _page: Page | undefined,
  defaults: TestItem,
): Partial<TestItem> => ({
  ...defaults,
  ...(info.frontmatter.icon ? { icon: info.frontmatter.icon } : {}),
})

/**
 * Skip the page whose frontmatter sets `hide: true`
 *
 * 跳过 frontmatter 设置 `hide: true` 的页面
 *
 * @param info - The sidebar info of the page / 页面的侧边栏信息
 * @param _page - The page of the info / 信息对应的页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item or `null` to skip / 自定义结构条目，返回 `null`
 *   时跳过
 */
export const skipPageInfoGetter = (
  info: SidebarFileInfo,
  _page: Page | undefined,
  defaults: TestItem,
): Partial<TestItem> | null =>
  info.frontmatter.hide === true ? null : defaults

/**
 * Add the icon and the collapsed state of the directory to the structure item
 *
 * 将目录的图标和折叠状态添加到结构条目中
 *
 * @param info - The sidebar info of the directory / 目录的侧边栏信息
 * @param _page - The README page of the directory / 目录的 README 页面
 * @param defaults - The default structure item / 默认结构条目
 * @returns The customized structure item / 自定义结构条目
 */
export const dirInfoGetter = (
  info: SidebarDirInfo,
  _page: Page | null,
  defaults: TestItem,
): Partial<TestItem> => ({
  ...defaults,
  ...(info.groupInfo.icon ? { icon: info.groupInfo.icon } : {}),
  ...(info.groupInfo.collapsible
    ? { collapsed: info.groupInfo.expanded !== true }
    : {}),
})
