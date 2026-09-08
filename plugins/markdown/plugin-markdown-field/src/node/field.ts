import { escapeHtml } from '@mdit/helper'
import { field as fieldPlugin } from '@mdit/plugin-field'
import type {
  MarkdownItFieldOpenRenderer,
  MarkdownItFieldOptions,
} from '@mdit/plugin-field'
import { ensureLeadingSlash } from '@vuepress/helper'
import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'
import { resolveLocalePath } from 'vuepress/shared'

import type {
  MarkdownFieldPluginLocaleConfig,
  MarkdownFieldPluginLocaleData,
} from './options.js'

const DEFAULT_LOCALE: MarkdownFieldPluginLocaleData = {
  default: 'Default',
  required: 'Required',
  optional: 'Optional',
  deprecated: 'Deprecated',
}

const escape = (value: string | true): string =>
  value === true ? '' : escapeHtml(value)

const resolveFieldLocale = (
  options: MarkdownFieldPluginLocaleConfig,
  env: MarkdownEnv,
): MarkdownFieldPluginLocaleData => {
  const relativePath = ensureLeadingSlash(env.filePathRelative ?? '')
  const localePath = resolveLocalePath(options, relativePath)

  return options[localePath] ?? DEFAULT_LOCALE
}

/**
 * Field container markdown-it plugin
 *
 * 字段容器 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Locale config / 国际化配置
 */
export const field: PluginWithOptions<MarkdownFieldPluginLocaleConfig> = (
  md,
  options = {},
) => {
  const fieldOpenRenderer: MarkdownItFieldOpenRenderer = (
    { attributes, name },
    tokens,
    index,
    _options,
    env: MarkdownEnv,
  ) => {
    const locale = resolveFieldLocale(options, env)
    const classNames = ['vp-field']
    const badges: string[] = []
    let type = ''
    let defaultValue = ''

    for (const { attr, value } of attributes) {
      if (attr === 'type') {
        type = `<code class="vp-field-type">${escape(value)}</code>\n`
      } else if (attr === 'default') {
        defaultValue = `<div class="vp-field-default">\n<span class="vp-field-default-label">${locale.default}</span>\n<code>${escape(value)}</code>\n</div>\n`
      } else if (
        attr === 'required' ||
        attr === 'optional' ||
        attr === 'deprecated'
      ) {
        if (attr === 'deprecated') classNames.push('deprecated')
        badges.push(`<span class="vp-field-${attr}">${locale[attr]}</span>\n`)
      } else {
        badges.push(
          `<span class="vp-field-attr">${attr}: ${escape(value)}</span>\n`,
        )
      }
    }

    const badgesHtml = badges.length
      ? `<span class="vp-field-badges">\n${badges.join('')}</span>\n`
      : ''

    return `<div class="${classNames.join(' ')}">\n<div class="vp-field-header">\n<span class="vp-field-name">${escapeHtml(name)}</span>\n${badgesHtml}${type}</div>\n${defaultValue}<div class="vp-field-description">\n`
  }

  md.use<MarkdownItFieldOptions>(fieldPlugin, {
    fieldsOpenRenderer: () => '<div class="vp-fields">\n',
    fieldsCloseRenderer: () => '</div>\n',
    fieldOpenRenderer,
    fieldCloseRenderer: () => '</div>\n</div>\n',
  })
}
