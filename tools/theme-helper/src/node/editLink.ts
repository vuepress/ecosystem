import type { Page } from 'vuepress'
import type { EditLinkPageData } from '../shared/index.js'

export const extendsEditLinkPage = (
  page: Page<Partial<EditLinkPageData>>,
): void => {
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative
}
