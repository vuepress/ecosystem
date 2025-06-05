import type { CodeParser, OpenTag } from './getCodeParser.js'

// prismjs comments
const COMMENT_EMPTY_TAG = /<span class="token comment">\s*?<\/span>/

/**
 * Create notation rule for code parser
 *
 * 为代码解析器创建标记规则
 *
 * @param parser - Code parser instance / 代码解析器实例
 * @param pattern - RegExp pattern to match / 用于匹配的正则表达式模式
 * @param onMatch - Callback function when pattern matches / 模式匹配时的回调函数
 * @example
 * ```ts
 * import { createNotationRule, getCodeParser } from '@vuepress/plugin-prismjs'
 *
 * const parser = getCodeParser('<pre><code>// [!code highlight]</code></pre>')
 * createNotationRule(parser, /\/\/ \[!code highlight\]/, () => true)
 * ```
 */
export const createNotationRule = (
  parser: CodeParser,
  pattern: RegExp,
  onMatch: (match: string[], index: number) => boolean,
): void => {
  const nodeRemove: OpenTag[] = []

  parser.lines.forEach((node, index) => {
    let replaced = false as boolean

    node.content = node.content.replace(pattern, (...match) => {
      if (onMatch(match, index)) {
        replaced = true
        return ''
      }
      return match[0]
    })

    if (replaced) {
      node.content = node.content.replace(COMMENT_EMPTY_TAG, '')
      if (!node.content.trim()) nodeRemove.push(node)
    }
  })
  for (const node of nodeRemove)
    parser.lines.splice(parser.lines.indexOf(node), 1)
}
