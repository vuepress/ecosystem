import type { Page } from 'vuepress'

import type { EditLinkPageData } from '../shared/index.js'

/**
 * Extend the page data and route meta with the fields that themes commonly need
 *
 * It stores the relative file path for the edit link and the page title for the
 * navbar and the sidebar.
 *
 * 扩展页面数据和路由元信息，补充主题常用的字段
 *
 * 它会保存用于编辑链接的相对文件路径，以及用于导航栏和侧边栏的页面标题。
 *
 * @param page - The page to extend / 需要扩展的页面
 */
export const extendsPageData = (
  page: Page<Partial<EditLinkPageData>>,
): void => {
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative
  // save title into route meta to generate navbar and sidebar
  page.routeMeta.title = page.title
}
