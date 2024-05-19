import type { Markdown } from 'vuepress/markdown'

export const inlineCodePlugin = (md: Markdown, vPreInline = true): void => {
  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline!
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options, env, slf)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  }
}
