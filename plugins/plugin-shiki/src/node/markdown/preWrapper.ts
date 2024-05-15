// markdown-it plugin for generating line numbers.
// v-pre block logic is in `../highlight.ts`
import type { Markdown } from 'vuepress/markdown'
import type { ShikiPluginOptions } from '../types.js'
import { resolveAttr, resolveLanguage } from '../utils.js'

export const preWrapperPlugin = (
  md: Markdown,
  { inline: vPreInline = true }: ShikiPluginOptions['vPre'] = {},
): void => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    const lang = resolveLanguage(info)
    const title = resolveAttr(info, 'title') || lang
    const languageClass = `${options.langPrefix}${lang}`

    return `<div class="${languageClass}" data-ext="${lang}" data-title="${title}">${fence(...args)}</div>`
  }

  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline!
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options, env, slf)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  }
}
