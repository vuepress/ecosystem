import { align as alignPlugin } from '@mdit/plugin-align'
import { attrs as attrsPlugin } from '@mdit/plugin-attrs'
import { mark as markPlugin } from '@mdit/plugin-mark'
import { spoiler as spoilerPlugin } from '@mdit/plugin-spoiler'
import { stylize as stylizePlugin } from '@mdit/plugin-stylize'
import { sub as subPlugin } from '@mdit/plugin-sub'
import { sup as supPlugin } from '@mdit/plugin-sup'
import type { Plugin } from 'vuepress/core'
import type { MarkdownEnv } from 'vuepress/markdown'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownStylizePluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'

export const markdownStylizePlugin = ({
  attrs,
  align,
  mark,
  spoiler,
  sup,
  sub,
  stylize,
}: MarkdownStylizePluginOptions): Plugin => {
  return {
    name: '@vuepress/plugin-markdown-stylize',

    extendsMarkdown: (md) => {
      if (attrs) md.use(attrsPlugin, isPlainObject(attrs) ? attrs : {})
      if (align) md.use(alignPlugin)
      if (mark) md.use(markPlugin)
      if (spoiler) md.use(spoilerPlugin)
      if (sub) md.use(subPlugin)
      if (sup) md.use(supPlugin)
      if (stylize)
        md.use(stylizePlugin, {
          config: stylize,
          localConfigGetter: (env: MarkdownEnv) =>
            env.frontmatter?.stylize || null,
        })
    },

    clientConfigFile: spoiler ? (app) => prepareConfigFile(app) : undefined,
  }
}
