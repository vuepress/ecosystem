import { figure } from '@mdit/plugin-figure'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import type { MarkdownItImgMarkOptions } from '@mdit/plugin-img-mark'
import { imgMark } from '@mdit/plugin-img-mark'
import { imgSize, legacyImgSize, obsidianImgSize } from '@mdit/plugin-img-size'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownImagePluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Create markdown image plugin
 *
 * 创建 markdown 图片插件
 *
 * @param options - Plugin options / 插件配置项
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
export const markdownImagePlugin = (
  options: MarkdownImagePluginOptions,
): Plugin => ({
  name: PLUGIN_NAME,

  extendsMarkdown: (md) => {
    const { mark } = options

    if (options.figure) md.use(figure)
    if (options.lazyload) md.use(imgLazyload)
    if (options.size) md.use(imgSize)
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (options.legacySize) md.use(legacyImgSize)
    if (options.obsidianSize) md.use(obsidianImgSize)
    if (mark)
      md.use<MarkdownItImgMarkOptions>(imgMark, isPlainObject(mark) ? mark : {})
  },

  clientConfigFile: (app) => prepareClientConfigFile(app, options),
})
