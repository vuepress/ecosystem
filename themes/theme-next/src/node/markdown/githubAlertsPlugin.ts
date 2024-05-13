import type MarkdownIt from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'
import { ensureLeadingSlash, resolveLocalePath } from 'vuepress/shared'
import type { ContainerOptions } from '../../shared/index.js'

const markerRE =
  /^\[!(TIP|NOTE|INFO|IMPORTANT|WARNING|CAUTION|DANGER)\]([^\n\r]*)/i

export const gitHubAlertsPlugin = (
  md: MarkdownIt,
  locales: Record<string, ContainerOptions>,
): void => {
  md.core.ruler.after('block', 'github-alerts', (state) => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'blockquote_open') {
        const startIndex = i
        const open = tokens[startIndex]
        let endIndex = i + 1
        while (
          endIndex < tokens.length &&
          (tokens[endIndex].type !== 'blockquote_close' ||
            tokens[endIndex].level !== open.level)
        )
          endIndex++
        if (endIndex === tokens.length) continue
        const close = tokens[endIndex]
        const firstContent = tokens
          .slice(startIndex, endIndex + 1)
          .find((token) => token.type === 'inline')
        if (!firstContent) continue
        const match = firstContent.content.match(markerRE)
        if (!match) continue
        const type = match[1].toLowerCase()
        const title = match[2].trim()
        firstContent.content = firstContent.content
          .slice(match[0].length)
          .trimStart()
        open.type = 'github_alert_open'
        open.tag = 'div'
        open.meta = {
          title,
          type,
        }
        close.type = 'github_alert_close'
        close.tag = 'div'
      }
    }
  })
  md.renderer.rules.github_alert_open = function (
    tokens,
    idx,
    _,
    env: MarkdownEnv,
  ) {
    const { title, type } = tokens[idx].meta
    const { filePathRelative } = env
    const relativePath = ensureLeadingSlash(filePathRelative ?? '')
    const localePath = resolveLocalePath(locales, relativePath)
    const defaultTitle =
      locales[localePath]?.[`${type}Label`] || type.toUpperCase()
    const attrs = ''
    return `<div class="${type} custom-block github-alert"${attrs}><p class="custom-block-title">${title || defaultTitle}</p>\n`
  }
}
