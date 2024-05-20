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
 *
 * You can also add `:\d` to achieve the same effect for the following `number` lines：
 *
 * - `// [!code highlight:3]`
 * - `// [!code ++:3]`
 * - ...more
 */
import { escapeRegExp } from '../utils/index.js'
import type { NodeOpen, CodeParser } from './getCodeParser.js'

const COMMENT_EMPTY_TAG = /<span class="token comment">\s*?<\/span>/

const toArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value]

export interface NotationOption {
  classMap: Record<string, string | string[]>
  classPre?: string
}

export const createNotationRule = (
  parser: CodeParser,
  options: NotationOption,
): void => {
  const { classMap, classPre } = options

  const pattern = new RegExp(
    `\\s*(?://|/\\*|<!--|#|--)\\s+\\[!code (${Object.keys(classMap).map(escapeRegExp).join('|')})(:\\d+)?\\]\\s*(?:\\*/|-->)?`,
  )

  const nodeRemove: NodeOpen[] = []

  const onMatch = (
    [, match, range = ':1']: string[],
    index: number,
  ): boolean => {
    const lineNum = Number(range.slice(1))

    parser.lines.slice(index, index + lineNum).forEach((node) => {
      node.class.push(...toArray(classMap[match]))
    })
    if (classPre) {
      parser.pre.class.push(classPre)
    }

    return true
  }

  parser.lines.forEach((node, index) => {
    let replaced = false
    node.content = node.content.replace(pattern, (...match) => {
      if (onMatch(match, index)) {
        replaced = true
        return ''
      }
      return match[0]
    })
    if (
      replaced &&
      !(node.content = node.content.replace(COMMENT_EMPTY_TAG, '')).trim()
    ) {
      nodeRemove.push(node)
    }
  })
  for (const node of nodeRemove)
    parser.lines.splice(parser.lines.indexOf(node), 1)
}

/**
 * line highlight
 *
 * `// [!code highlight]`, or `// [!code hl]`
 */
export const notationHighlight = (parser: CodeParser): void => {
  createNotationRule(parser, {
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
  createNotationRule(parser, {
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
  createNotationRule(parser, {
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
  createNotationRule(parser, {
    classMap: {
      error: ['highlighted', 'error'],
      warning: ['highlighted', 'warning'],
    },
    classPre: 'has-highlighted',
  })
}
