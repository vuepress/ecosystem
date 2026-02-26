import type { Markdown } from 'vuepress/markdown'

/**
 * Only remove the `<llm-exclude>` tag itself, and expand the content contained within the `<llm-exclude>` tag
 *
 * 仅移除 `<llm-exclude>` 标签本身，展开 `<llm-exclude>` 标签包含的内容
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const llmExcludePlugin = (md: Markdown): void => {
  const START_TAG = '<llm-exclude>'
  const END_TAG = '</llm-exclude>'

  md.inline.ruler.before(
    'html_inline',
    'llm_exclude_start',
    (state, silent) => {
      const start = state.pos
      if (state.src.slice(start, start + START_TAG.length) !== START_TAG)
        return false

      if (!silent) {
        const token = state.push('llm_exclude_start', 'html_inline', 0)
        token.content = ''
        token.meta = { type: 'start' }
      }
      state.pos += START_TAG.length
      return true
    },
  )

  md.inline.ruler.before('html_inline', 'llm_exclude_end', (state, silent) => {
    const start = state.pos
    if (state.src.slice(start, start + END_TAG.length) !== END_TAG) return false

    if (!silent) {
      const token = state.push('llm_exclude_end', 'html_inline', 0)
      token.content = ''
      token.meta = { type: 'end' }
    }
    state.pos += END_TAG.length
    return true
  })

  md.renderer.rules.llm_exclude_start = (): string => ''
  md.renderer.rules.llm_exclude_end = (): string => ''
}
