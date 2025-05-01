import { figure } from '@mdit/plugin-figure'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import type { MarkdownItImgMarkOptions } from '@mdit/plugin-img-mark'
import { imgMark } from '@mdit/plugin-img-mark'
import { imgSize, legacyImgSize } from '@mdit/plugin-img-size'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownImagePluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

export const markdownImagePlugin = (
  options: MarkdownImagePluginOptions,
): Plugin => ({
  name: PLUGIN_NAME,

  extendsMarkdown: (md) => {
    const { mark } = options

    if (options.figure) md.use(figure)
    if (options.lazyload) md.use(imgLazyload)
    if (options.size)
      md.use(imgSize, options.size === 'strict' ? { strict: true } : {})
    if (options.legacySize) md.use(legacyImgSize)
    if (mark)
      md.use<MarkdownItImgMarkOptions>(imgMark, isPlainObject(mark) ? mark : {})
  },

  clientConfigFile: (app) => prepareClientConfigFile(app, options),
})
