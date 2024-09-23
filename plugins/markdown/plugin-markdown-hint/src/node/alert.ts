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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        options[localePath]?.[type as keyof MarkdownHintPluginLocaleData] ||
        type
      }</p>
`
    },
    closeRender: () => '</div>\n',
    deep: true,
  })
}
