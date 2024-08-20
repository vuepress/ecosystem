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
}

const createNotationCommentMarkerRule = (
  parser: CodeParser,
  { classMap, classPre }: NotationCommentMarkerOption,
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

      parser.lines.slice(index, index + lineNum).forEach((node) => {
        node.classList.push(...toArray(classMap[match]))
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
 * `// [!code highlight]`, or `// [!code hl]`
 */
export const notationHighlight = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
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
 * `// [!code focus]`
 */
export const notationFocus = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
    classMap: {
      focus: 'has-focus',
    },
    classPre: 'has-focused-lines',
  })
}

/**
 * line diff
 *
 * `// [!code ++]` and `// [!code --]`
 */
export const notationDiff = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
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
 * `// [!code warning]` and `// [!code error]`
 */
export const notationErrorLevel = (parser: CodeParser): void => {
  createNotationCommentMarkerRule(parser, {
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
 * `// [!code word:xxx]`: `xxx` can be any word.
 * @param parser
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
      const normalizedWord = word.replace(/\\(.)/g, '$1')

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
