// markdown-it plugin for generating line numbers.
// v-pre block logic is in `../highlight.ts`
import type { Markdown } from 'vuepress/markdown'
import type { ShikiPluginOptions } from '../types.js'
import {
  NO_V_PRE_RE,
  resolveAttr,
  resolveLanguage,
  V_PRE_RE,
} from '../utils.js'

export const preWrapperPlugin = (
  md: Markdown,
  {
    vPre: { inline: vPreInline = true, block: vPrevBlock = true } = {},
    preWrapper = true,
  }: ShikiPluginOptions = {},
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

    let result = fence(...args)

    if (!preWrapper) {
      // remove `<code>` attributes
      result = result.replace(/<code[^]*?>/, '<code>')
      result = `<pre class="${languageClass}"${result.slice('<pre'.length)}`
      if (
        (vPrevBlock && !NO_V_PRE_RE.test(info)) ||
        (!vPrevBlock && V_PRE_RE.test(info))
      ) {
        result = `<pre v-pre${result.slice('<pre'.length)}`
      }

      return result
    }

    return `<div class="${languageClass}" data-ext="${lang}" data-title="${title}">${result}</div>`
  }

  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline!
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options, env, slf)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  }
}
