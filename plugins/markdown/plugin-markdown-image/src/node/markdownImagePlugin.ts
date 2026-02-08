import { figure } from '@mdit/plugin-figure'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import type { MarkdownItImgMarkOptions } from '@mdit/plugin-img-mark'
import { imgMark } from '@mdit/plugin-img-mark'
import { imgSize, legacyImgSize, obsidianImgSize } from '@mdit/plugin-img-size'
import { deepAssign } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownImagePluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    image?: MarkdownImagePluginOptions
  }
}

/**
 * Create markdown image plugin
 *
 * 创建 markdown 图片插件
 *
 * @example
 * ```ts
 * import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
 *
 * markdownImagePlugin({
 *   figure: true,
 *   lazyload: true,
 *   mark: true,
 *   size: true,
 * })
 * ```
 */
export const markdownImagePlugin =
  (options: MarkdownImagePluginOptions): Plugin =>
  (app) => {
    const opts = deepAssign({}, app.options.markdown.image, options)
    app.options.markdown.image = opts

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        const { mark } = opts

        if (opts.figure) md.use(figure)
        if (opts.lazyload) md.use(imgLazyload)
        if (opts.size) md.use(imgSize)
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        if (opts.legacySize) md.use(legacyImgSize)
        if (opts.obsidianSize) md.use(obsidianImgSize)
        if (mark)
          md.use<MarkdownItImgMarkOptions>(
            imgMark,
            isPlainObject(mark) ? mark : {},
          )
      },

      clientConfigFile: () => prepareClientConfigFile(app, opts),
    }
  }
