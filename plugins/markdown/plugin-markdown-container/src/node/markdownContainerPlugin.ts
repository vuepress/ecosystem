import type { MarkdownItContainerOptions as MditContainerOptions } from '@mdit/plugin-container'
import { container } from '@mdit/plugin-container'
import type { Plugin, PluginObject } from 'vuepress/core'
import { ensureLeadingSlash, resolveLocalePath } from 'vuepress/shared'
import { colors, logger } from 'vuepress/utils'

import type {
  MarkdownContainerPluginOptions,
  RenderPlaceFunction,
} from './options.js'

/**
 * Create markdown container plugin
 *
 * 创建 markdown 容器插件
 *
 * @example
 *   import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
 *
 *   markdownContainerPlugin({
 *     type: 'tip',
 *     locales: {
 *       '/': { defaultInfo: 'TIP' },
 *       '/zh/': { defaultInfo: '提示' },
 *     },
 *   })
 */
export const markdownContainerPlugin = ({
  // plugin options
  type,
  after,
  before,
  locales,

  // raw options for the container plugin
  validate,
  marker,
  render: renderOptions,
}: MarkdownContainerPluginOptions): Plugin => {
  const plugin: PluginObject = {
    name: '@vuepress/plugin-markdown-container',
    multiple: true,
  }

  // `type` option is required
  if (!type) {
    logger.warn(`[${plugin.name}] ${colors.magenta('type')} option is required`)
    return plugin
  }

  let render = renderOptions

  // if `render` option is not specified
  // use `before` and `after` to generate render function
  if (!render) {
    let renderBefore: RenderPlaceFunction
    let renderAfter: RenderPlaceFunction

    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = before
      renderAfter = after
    } else {
      // fallback
      renderBefore = (info: string): string =>
        `<div class="custom-container ${type}">${
          info ? `<p class="custom-container-title">${info}</p>` : ''
        }\n`
      renderAfter = (): string => '</div>\n'
    }

    // token info stack
    const infoStack: string[] = []

    render = (tokens, index, _, env): string => {
      const token = tokens[index]

      if (token.nesting === 1) {
        // `before` tag

        // resolve info (title)
        let info = token.info.trim().slice(type.length).trim()

        if (!info) {
          // locale
          const { filePathRelative } = env
          const relativePath = ensureLeadingSlash(filePathRelative ?? '')

          const localeData = locales
            ? (locales[resolveLocalePath(locales, relativePath)] ?? {})
            : {}

          info = localeData.defaultInfo || type.toUpperCase()
        }

        // push the info to stack
        infoStack.push(info)

        // render
        return renderBefore(info)
      }

      // `after` tag

      // pop the info from stack
      const info = infoStack.pop() || ''

      // render
      return renderAfter(info)
    }
  }

  // use @mdit/plugin-container
  plugin.extendsMarkdown = (md) => {
    md.use<MditContainerOptions>(container, {
      name: type,
      marker,
      validate,
      openRenderer: render,
      closeRenderer: render,
    })
  }

  return plugin
}
