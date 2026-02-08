import type { MarkdownItAlertOptions as _MarkdownItAlertOptions } from '@mdit/plugin-alert'
import { alert as _alert } from '@mdit/plugin-alert'
import type { ExactLocaleConfig } from '@vuepress/helper'
import { ensureLeadingSlash } from '@vuepress/helper'
import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'
import { resolveLocalePath } from 'vuepress/shared'

import type { MarkdownHintPluginLocaleData } from './options.js'

export type MarkdownItAlertOptions =
  ExactLocaleConfig<MarkdownHintPluginLocaleData>

/**
 * GFM alert markdown-it plugin
 *
 * GFM 警告 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - plugin options / 插件选项
 */
export const alert: PluginWithOptions<MarkdownItAlertOptions> = (
  md,
  options = {},
) => {
  md.use<_MarkdownItAlertOptions>(_alert, {
    alertNames: ['important', 'note', 'tip', 'warning', 'caution', 'info'],
    openRender: (tokens, index) =>
      `<div class="hint-container ${tokens[index].markup}">\n`,
    titleRender: (tokens, index, _options, env: MarkdownEnv) => {
      const type = tokens[index].markup
      const relativePath = ensureLeadingSlash(env.filePathRelative ?? '')
      const localePath = resolveLocalePath(options, relativePath)

      return `\
<p class="hint-container-title">${
        options[localePath]?.[type as keyof MarkdownHintPluginLocaleData] ||
        type
      }</p>
`
    },
    closeRender: () => '</div>\n',
    deep: true,
  })
}
