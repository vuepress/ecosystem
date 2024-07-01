import { alert } from '@mdit/plugin-alert'
import type { App } from 'vuepress'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { ensureLeadingSlash, resolveLocalePath } from 'vuepress/shared'
import type { DefaultThemeLocaleOptions } from '../../shared/index.js'
import { resolveContainerLocales } from '../config/index.js'

export const githubAlertsPlugin = (
  md: Markdown,
  app: App,
  localeOptions: DefaultThemeLocaleOptions,
): void => {
  const locales = resolveContainerLocales(app, localeOptions)
  md.use(alert, {
    alertNames: [
      'tip',
      'note',
      'info',
      'warning',
      'danger',
      'caution',
      'important',
    ],
    openRender(tokens, idx) {
      const type = tokens[idx].markup
      return `<div class="${type} custom-block github-alert">`
    },
    titleRender(tokens, idx, _, env: MarkdownEnv) {
      const token = tokens[idx]
      const type = token.markup
      const title = token.content === type.toUpperCase() ? '' : token.content
      const { filePathRelative } = env
      const relativePath = ensureLeadingSlash(filePathRelative ?? '')
      const localePath = resolveLocalePath(locales, relativePath)
      const defaultTitle =
        locales[localePath]?.[`${type}Label`] || type.toUpperCase()

      return `<p class="custom-block-title">${title || defaultTitle}</p>`
    },
  })
}
