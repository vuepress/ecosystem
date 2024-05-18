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
import type { NodeOpen, Parser } from './parse.js'

const commentEmptyTag = /<span class="token comment">\s*?<\/span>/
export interface NotationOption {
  classMap: Record<string, string | string[]>
  classPre?: string
}

export const notationBase = (parser: Parser, options: NotationOption): void => {
  const { classMap, classPre } = options

  const pattern = new RegExp(
    `\\s*(?://|/\\*|<!--|#|--)\\s+\\[!code (${Object.keys(classMap).map(escapeRegExp).join('|')})(:\\d+)?\\]\\s*(?:\\*/|-->)?`,
  )

  const nodeRemove: NodeOpen[] = []

  const onMatch = (
    [, match, range = ':1']: string[],
    index: number,
  ): boolean => {
    const lineNum = Number.parseInt(range.slice(1), 10)
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
      !(node.content = node.content.replace(commentEmptyTag, '')).trim()
    ) {
      nodeRemove.push(node)
    }
  })
  for (const node of nodeRemove)
    parser.lines.splice(parser.lines.indexOf(node), 1)
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/**
 * line highlight
 *
 * `// [!code highlight]`, or `// [!code hl]`
 */
export const notationHighlight = (parser: Parser): void => {
  notationBase(parser, {
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
export const notationFocus = (parser: Parser): void => {
  notationBase(parser, {
    classMap: {
      focus: 'focused',
    },
    classPre: 'has-focused',
  })
}

/**
 * line diff
 *
 * `// [!code ++]` and `// [!code --]`
 */
export const notationDiff = (parser: Parser): void => {
  notationBase(parser, {
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
export const notationErrorLevel = (parser: Parser): void => {
  notationBase(parser, {
    classMap: {
      error: ['highlighted', 'error'],
      warning: ['highlighted', 'warning'],
    },
    classPre: 'has-highlighted',
  })
}
