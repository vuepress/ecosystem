import { getPageText } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { ExtendPage } from './typings/index.js'

export const generateDescription = (
  app: App,
  page: ExtendPage,
  autoDescription = true,
): void => {
  // generate description
  if (!page.frontmatter.description && autoDescription) {
    const pageText = getPageText(app, page, { length: 180 })

    page.frontmatter.description =
      pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText

    page.data.autoDesc = true
  }
}
