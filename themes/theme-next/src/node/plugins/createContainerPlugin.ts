import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import type { MarkdownContainerPluginOptions } from '@vuepress/plugin-markdown-container'
import type { Plugin } from 'vuepress'
import type { ContainerOptions } from '../../shared/index.js'

export const createContainerPlugin = (
  type: string,
  locales: Record<string, ContainerOptions>,
): Plugin => {
  const containerLocales: MarkdownContainerPluginOptions['locales'] = {}

  Object.keys(locales).forEach((localePath) => {
    containerLocales[localePath] = {
      defaultInfo: locales[localePath]?.[`${type}Label`],
    }
  })

  return markdownContainerPlugin({
    type,
    locales: containerLocales,
    before(info) {
      if (type === 'details')
        return `<details class="${type} custom-block"><summary>${info}</summary>`
      return `<div class="${type} custom-block"><p class="custom-block-title">${info}</p>`
    },
    after() {
      return type === 'details' ? `</details>` : `</div>`
    },
  })
}
