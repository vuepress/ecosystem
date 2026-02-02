/**
 * This module implements some of the functionalities of the `shiki` transformer.
 * You can use the following magic comments:
 *
 * - line highlight:   `// [!code highlight]`, or `// [!code hl]`
 * - line diff add:    `// [!code ++]`
 * - line diff remove: `// [!code --]`
 * - line focus:       `// [!code focus]`
 * - line warning:     `// [!code warning]`
 * - line error:       `// [!code error]`
 * - highlight word:   `// [!code word:xxx]` `xxx` can be any word
 *
 * You can also add `:\d` to achieve the same effect for the following `number` lines：
 *
 * - `// [!code highlight:3]`
 * - `// [!code ++:3]`
 * - ...more
 */
import { escapeRegExp } from '../utils/index.js'
import { createNotationRule } from './createNotationRule.js'
import type { CodeParser } from './getCodeParser.js'
import { highlightWordInLine } from './highlightWord.js'

const toArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value]

export interface NotationCommentMarkerOption {
  classMap: Record<string, string[] | string>
  classPre?: string
  notation?: string
}

const createNotationCommentMarkerRule = (
  parser: CodeParser,
  { classMap, classPre, notation }: NotationCommentMarkerOption,
): void => {
  const marker = Object.keys(classMap).map(escapeRegExp).join('|')
  createNotationRule(
    parser,
    new RegExp(
      // comment-begin               | marker           | range |   comment-end
      `\\s*(?://|/\\*|<!--|#|--)\\s+\\[!code (${marker})(:\\d+)?\\]\\s*(?:\\*/|-->)?`,
    ),
    ([, match, range = ':1'], index): boolean => {
      const lineNum = Number.parseInt(range.slice(1), 10)

      parser.line((line, i) => {
        if (i < index || i >= index + lineNum) return

        line.classList.push(...toArray(classMap[match]))

        // fix https://github.com/vuepress/ecosystem/issues/569
        // Only the focus issue within the diff code blocks has been fixed here.
        // In reality, other notations in diff code blocks have similar problems.
        // However, because prismjs does not properly handle lines when processing inserted/deleted content in diff code blocks, the performance of other notations is quite poor.
        if (parser.lang === 'diff' && notation === 'focus') {
          line.content = line.content.replaceAll(
            'class="',
            `class="${toArray(classMap[match]).join(' ')} `,
          )
        }
      })
      if (classPre) {
        parser.pre.classList.push(classPre)
      }

      return true
    },
  )
}

/**
 * line highlight
 *
 * 行高亮
 *
 * `// [!code highlight]`, or `// [!code hl]`
 *
 * @param parser - Code parser instance / 代码解析器实例
 */
export const notationHighlight = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
    notation: 'highlight',
    classMap: {
      highlight: 'highlighted',
      hl: 'highlighted',
    },
    classPre: 'has-highlighted',
  })
}

/**
 * line focus
 *
 * 行聚焦
 *
 * `// [!code focus]`
 *
 * @param parser - Code parser instance / 代码解析器实例
 */
export const notationFocus = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
    notation: 'focus',
    classMap: {
      focus: 'has-focus',
    },
    classPre: 'has-focused-lines',
  })
}

/**
 * line diff
 *
 * 行差异
 *
 * `// [!code ++]` and `// [!code --]`
 *
 * @param parser - Code parser instance / 代码解析器实例
 */
export const notationDiff = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
    notation: 'diff',
    classMap: {
      '++': 'diff add',
      '--': 'diff remove',
    },
    classPre: 'has-diff',
  })
}

/**
 * line error level
 *
 * 行错误级别
 *
 * `// [!code warning]` and `// [!code error]`
 *
 * @param parser - Code parser instance / 代码解析器实例
 */
export const notationErrorLevel = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
    notation: 'error',
    classMap: {
      error: ['highlighted', 'error'],
      warning: ['highlighted', 'warning'],
    },
    classPre: 'has-highlighted',
  })
}

/**
 * highlight word
 *
 * 词汇高亮
 *
 * `// [!code word:xxx]`: `xxx` can be any word.
 *
 * @param parser - Code parser instance / 代码解析器实例
 */
export const notationWordHighlight = (parser: CodeParser): void => {
  createNotationRule(
    parser,
    // comment-begin             | marker    |word            | range |   comment-end
    /\s*(?:\/\/|\/\*|<!--|#)\s+\[!code word:((?:\\.|[^:\]])+)(:\d+)?\]\s*(?:\*\/|-->)?/,
    ([, word, range], index): boolean => {
      const lineNum = range
        ? Number.parseInt(range.slice(1), 10)
        : parser.lines.length - 1

      // escape backslashes
      const normalizedWord = word.replaceAll(/\\(.)/g, '$1')

      parser.lines
        // start from the next line after the comment
        .slice(index + 1, index + 1 + lineNum)
        .forEach((line) => {
          highlightWordInLine(line, normalizedWord)
        })

      return true
    },
  )
}
