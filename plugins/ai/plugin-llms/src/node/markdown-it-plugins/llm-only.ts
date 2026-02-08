import type { Markdown } from 'vuepress/markdown'

/**
 * Remove content enclosed within `<llm-only>` tags from markdown
 *
 * 从 markdown 中移除 `<llm-only>` 标签包含的内容
 */
export const llmOnlyPlugin = (md: Markdown): void => {
  md.block.ruler.before(
    'html_block',
    'llm-only',
    (state, startLine, endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine]

      // check starts with <llm-only>
      if (
        state.src.charCodeAt(start) !== 0x3c && // '<'
        state.src.charCodeAt(start + 9) !== 0x3e
      ) {
        // '>'
        return false
      }

      // strict match <llm-only>
      if (state.src.slice(start, start + 10) !== '<llm-only>') {
        return false
      }

      if (silent) {
        return true
      }

      let nextLine = startLine
      let found = false

      // find next </llm-only>
      while (nextLine < endLine) {
        const currentLine = state.bMarks[nextLine]
        const lineHeight = state.eMarks[nextLine]

        // check current line include </llm-only>
        if (state.src.slice(currentLine, lineHeight).includes('</llm-only>')) {
          found = true
          break
        }

        nextLine++
      }

      if (!found) {
        return false
      }

      const token = state.push('llm_only_block', '', 0)
      token.content = ''
      token.map = [startLine, nextLine + 1]
      // 更新状态行号
      state.line = nextLine + 1

      return true
    },
  )

  // renderer to empty content
  md.renderer.rules.llm_only_block = (): string => ''
}
