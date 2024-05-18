import { describe, expect, it } from 'vitest'
import {
  highlightLines,
  notationDiff,
  notationErrorLevel,
  notationFocus,
  notationHighlight,
  parse,
  resolveHighlightLines,
} from '../src/node/index.js'

const genCode = (code: string) => `<pre><code>${code}</code></pre>`

describe('@vuepress/plugin-prismjs > parser', () => {
  it('normal parse', () => {
    const code = genCode(`const a = 1
const b = 2
const c = 3
`)
    const parser = parse(code)
    expect(parser.lines.length).toBe(4)
    expect(parser.pre.before).toContain('<pre')
    expect(parser.lines.every((line) => line.class.includes('line'))).toBe(true)

    expect(parser.stringify()).toMatchSnapshot()
  })

  it('normal parse line node add class', () => {
    const code = genCode(`  const a = 1
  const b = 2
  console.log(a + b)`)
    const parser = parse(code)

    parser.line((node) => node.class.push('highlighted'))

    expect(parser.stringify()).toMatchSnapshot()
  })

  it('parse highlight lines', () => {
    const code = genCode(`const a = 1
const b = 2
const c = 3
console.log(a + b)

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)

    highlightLines(parser, resolveHighlightLines('{1,3,6-8}'))

    const result = parser.stringify()

    expect(parser.lines[0].class.includes('highlighted')).toBe(true) // line 1
    expect(parser.lines[6].class.includes('highlighted')).toBe(true) // line 7
    expect(parser.lines[4].class.includes('highlighted')).toBe(false) // line 4

    expect(result).toMatchSnapshot()
  })

  it('parse notation highlight', () => {
    const code = genCode(`const a = 1
const b = 2
const c = 3 // [!code highlight]
console.log(a + b) // [!code hl]

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)
    notationHighlight(parser)

    const result = parser.stringify()

    expect(parser.lines[2].class.includes('highlighted')).toBe(true) // line 3
    // magic comment should be removed
    expect(parser.lines[2].content.includes('// [!code highlight]')).toBe(false) // line 3
    expect(parser.lines[3].class.includes('highlighted')).toBe(true) // line 4

    // pre tag should add has-highlighted class
    expect(parser.pre.class.includes('has-highlighted')).toBe(true)

    expect(result).toMatchSnapshot()
  })

  it('parse notation highlight:number', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code highlight:3]
const c = 3
console.log(a + b)

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)
    notationHighlight(parser)

    const result = parser.stringify()

    expect(
      parser.lines
        .slice(1, 4)
        .every((line) => line.class.includes('highlighted')),
    ).toBe(true)

    expect(parser.lines[4].class.includes('highlighted')).toBe(false)

    expect(result).toMatchSnapshot()
  })

  it('parse notation diff', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code ++]
const c = 3
console.log(a + b) // [!code --]

function add(a, b) { // [!code ++]
  return a + b
}
`)
    const parser = parse(code)
    notationDiff(parser)

    const result = parser.stringify()

    expect(parser.lines[1].class.includes('diff add')).toBe(true) // line 2
    expect(parser.lines[3].class.includes('diff remove')).toBe(true) // line 4

    expect(parser.lines[5].content.includes('// [!code ++]')).toBe(false)

    expect(parser.pre.class.includes('has-diff')).toBe(true)

    expect(result).toMatchSnapshot()
  })

  it('parse notation diff ++:number', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code ++:3]
const c = 3
console.log(a + b)

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)
    notationDiff(parser)

    const result = parser.stringify()

    expect(
      parser.lines.slice(1, 4).every((line) => line.class.includes('diff add')),
    ).toBe(true)

    expect(parser.lines[4].class.includes('diff add')).toBe(false)

    expect(result).toMatchSnapshot()
  })

  it('parse notation focus', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code focus]
const c = 3
console.log(a + b)

function add(a, b) { // [!code focus]
  return a + b
}
`)
    const parser = parse(code)
    notationFocus(parser)

    const result = parser.stringify()

    expect(parser.lines[1].class.includes('focused')).toBe(true) // line 2
    expect(parser.lines[5].class.includes('focused')).toBe(true) // line 5

    expect(parser.pre.class.includes('has-focused')).toBe(true)

    expect(result).toMatchSnapshot()
  })

  it('parse notation focus:number', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code focus:3]
const c = 3
console.log(a + b)

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)
    notationFocus(parser)

    const result = parser.stringify()

    expect(
      parser.lines.slice(1, 4).every((line) => line.class.includes('focused')),
    ).toBe(true)

    expect(parser.lines[4].class.includes('focused')).toBe(false)

    expect(result).toMatchSnapshot()
  })

  it('parse notation error level', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code warning]
const c = 3
console.log(a + b) // [!code error]

function add(a, b) { // [!code warning]
  return a + b
}
`)
    const parser = parse(code)
    notationErrorLevel(parser)

    const result = parser.stringify()

    expect(parser.lines[1].class.includes('warning')).toBe(true) // line 2
    expect(parser.lines[3].class.includes('error')).toBe(true) // line 4

    expect(parser.lines[5].content.includes('// [!code warning]')).toBe(false)

    expect(parser.pre.class.includes('has-highlighted')).toBe(true)

    expect(result).toMatchSnapshot()
  })

  it('parse notation diff error:number', () => {
    const code = genCode(`const a = 1
const b = 2 // [!code error:3]
const c = 3
console.log(a + b)

function add(a, b) {
  return a + b
}
`)
    const parser = parse(code)
    notationErrorLevel(parser)

    const result = parser.stringify()

    expect(
      parser.lines.slice(1, 4).every((line) => line.class.includes('error')),
    ).toBe(true)

    expect(parser.lines[4].class.includes('error')).toBe(false)

    expect(result).toMatchSnapshot()
  })
})
