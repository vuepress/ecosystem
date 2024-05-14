import { figure } from '@mdit/plugin-figure'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import { imgMark } from '@mdit/plugin-img-mark'
import { imgSize, obsidianImageSize } from '@mdit/plugin-img-size'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownImagePluginOptions } from './options.js'

export const markdownImagePlugin = ({
  figure: enableFigure,
  lazyload,
  mark,
  obsidianSize,
  size,
}: MarkdownImagePluginOptions): Plugin => ({
  name: '@vuepress/plugin-markdown-image',

  extendsMarkdown: (md) => {
    if (enableFigure) md.use(figure)
    if (lazyload) md.use(imgLazyload)
    if (obsidianSize) md.use(obsidianImageSize)
    if (size) md.use(imgSize)
    if (mark) md.use(imgMark, isPlainObject(mark) ? mark : {})
  },
})
