import { footnote as footnotePlugin } from '@mdit/plugin-footnote'
import { tasklist as tasklistPlugin } from '@mdit/plugin-tasklist'
import { deepAssign } from '@vuepress/helper'
import markdownItCjkFriendlyPlugin from 'markdown-it-cjk-friendly'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'

import {
  component as componentPlugin,
  vPre as vPrePlugin,
} from './markdown-it-plugins/index.js'
import type { MarkdownExtPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepreClientConfigFile.js'
import { PLUGIN_NAME } from './utils.js'

const CJK_LANG_REGEXP = /^(zh|ja|ko)\b/i

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    ext?: MarkdownExtPluginOptions
  }
}

/**
 * Markdown extensions plugin
 *
 * Markdown 扩展插件
 *
 * @example
 *   import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
 *
 *   export default {
 *     plugins: [
 *       markdownExtPlugin({
 *         gfm: true,
 *         component: true,
 *         vPre: true,
 *       }),
 *     ],
 *   }
 */
export const markdownExtPlugin =
  (options: MarkdownExtPluginOptions): Plugin =>
  (app) => {
    const mergedOptions = deepAssign({}, app.options.markdown.ext, options)
    const {
      gfm,
      breaks,
      linkify,
      footnote,
      tasklist,
      component,
      vPre,
      cjkFriendly,
    } = mergedOptions

    app.options.markdown.ext = mergedOptions

    // Auto-detect CJK if cjkFriendly is not explicitly set
    const isCjkFriendlyEnabled =
      cjkFriendly ??
      [
        app.options.lang,
        ...Object.values(app.options.locales).map((locale) => locale.lang),
      ].some((lang) => lang && CJK_LANG_REGEXP.test(lang))

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        // Behavior
        if (breaks ?? gfm) md.options.breaks = true
        if (linkify ?? gfm) md.options.linkify = true

        if (footnote ?? gfm) md.use(footnotePlugin)
        if (tasklist ?? gfm)
          md.use(tasklistPlugin, [isPlainObject(tasklist) ? tasklist : {}])
        if (component) md.use(componentPlugin)
        if (vPre) md.use(vPrePlugin)
        if (isCjkFriendlyEnabled) md.use(markdownItCjkFriendlyPlugin)
      },

      clientConfigFile: () =>
        prepareClientConfigFile(app, {
          gfm,
          footnote,
          tasklist,
        }),
    }
  }
