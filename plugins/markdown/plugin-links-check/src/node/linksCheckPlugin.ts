import { isArray, isFunction, isRegExp } from '@vuepress/helper'
import type { Plugin } from 'vuepress'
import { checkMarkdownLink } from './checkMarkdownLink.js'
import type { LinksCheckPluginOptions } from './options.js'

/**
 * VuePress plugin to check dead links in markdown files
 *
 * VuePress 插件，用于检查 Markdown 文件中的死链接
 *
 * @example
 * ```ts
 * import { linksCheckPlugin } from '@vuepress/plugin-links-check'
 *
 * export default {
 *   plugins: [
 *     // Basic usage
 *     linksCheckPlugin(),
 *
 *     // With options
 *     linksCheckPlugin({
 *       dev: true,
 *       build: 'error', // Fail build on dead links
 *       exclude: [
 *         /^https?:\/\/example\.com/,
 *         'mailto:example@example.com',
 *         (link, isDev) => isDev && link.startsWith('/api/')
 *       ]
 *     })
 *   ]
 * }
 * ```
 */
export const linksCheckPlugin =
  ({
    dev = true,
    build = true,
    exclude: ignore = [],
  }: LinksCheckPluginOptions): Plugin =>
  (app) => {
    const enabled =
      (app.env.isDev && dev) || (app.env.isBuild && build) || false

    const isLinkIgnored = isFunction(ignore)
      ? (link: string): boolean => ignore(link, app.env.isDev)
      : isArray(ignore)
        ? (link: string): boolean =>
            ignore.some((item) =>
              isRegExp(item) ? item.test(link) : item === link,
            )
        : (): boolean => false

    const shouldThrowError = app.env.isBuild && build === 'error'
    let isAppInitialized = false

    return {
      name: '@vuepress/plugin-links-check',

      extendsPage: (page) => {
        if (enabled && isAppInitialized) {
          checkMarkdownLink(page, app, isLinkIgnored)
        }
      },

      onInitialized: () => {
        isAppInitialized = true

        if (enabled) {
          const results = app.pages.map((page) =>
            checkMarkdownLink(page, app, isLinkIgnored),
          )

          if (shouldThrowError && results.some(Boolean)) {
            throw new Error(
              'Dead links found in markdown, please check the console logs for details',
            )
          }
        }
      },
    }
  }
