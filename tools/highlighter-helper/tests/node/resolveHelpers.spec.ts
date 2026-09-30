import { describe, expect, it } from 'vitest'

import { resolveCollapsedLines } from '../../src/node/collapsedLines/resolveCollapsedLine.js'
import { resolveLineNumbers } from '../../src/node/lineNumbers/resolveLineNumbers.js'
import { resolveAttr } from '../../src/node/utils/resolveAttr.js'
import { resolveWhitespacePosition } from '../../src/node/whitespace.js'

describe(resolveAttr, () => {
  it('reads a double quoted attribute from the info string', () => {
    expect(resolveAttr('js title="example.js"', 'title')).toBe('example.js')
  })

  it('reads a single quoted attribute', () => {
    expect(resolveAttr("js title='example.js'", 'title')).toBe('example.js')
  })

  it('reads the attribute when other attributes follow it', () => {
    expect(resolveAttr('js title="a.js" {1,2}', 'title')).toBe('a.js')
  })

  it('returns null when the attribute is absent', () => {
    expect(resolveAttr('js', 'title')).toBeNull()
  })

  it('returns null when the attribute is not closed', () => {
    expect(resolveAttr('js title="a.js', 'title')).toBeNull()
  })
})

describe(resolveLineNumbers, () => {
  it('returns true for the bare mark', () => {
    expect(resolveLineNumbers('js :line-numbers')).toBe(true)
  })

  it('returns the start number for the valued mark', () => {
    expect(resolveLineNumbers('js :line-numbers=10')).toBe(10)
  })

  it('returns false for the negated mark', () => {
    expect(resolveLineNumbers('js :no-line-numbers')).toBe(false)
  })

  it('returns null when no mark is present', () => {
    expect(resolveLineNumbers('js')).toBeNull()
  })
})

describe(resolveCollapsedLines, () => {
  it('returns true for the bare mark', () => {
    expect(resolveCollapsedLines('js :collapsed-lines')).toBe(true)
  })

  it('returns the start number for the valued mark', () => {
    expect(resolveCollapsedLines('js :collapsed-lines=20')).toBe(20)
  })

  it('returns false for the negated mark', () => {
    expect(resolveCollapsedLines('js :no-collapsed-lines')).toBe(false)
  })

  it('returns null when no mark is present', () => {
    expect(resolveCollapsedLines('js')).toBeNull()
  })
})

describe(resolveWhitespacePosition, () => {
  it('uses the position from the info string', () => {
    expect(resolveWhitespacePosition('js :whitespace=all', 'boundary')).toBe(
      'all',
    )
    expect(
      resolveWhitespacePosition('js :whitespace=leading', 'trailing'),
    ).toBe('leading')
  })

  it('falls back to the global option when the mark has no value', () => {
    expect(resolveWhitespacePosition('js :whitespace', 'boundary')).toBe(
      'boundary',
    )
  })

  it('falls back to all when the mark has no value and the global option is not a position', () => {
    expect(resolveWhitespacePosition('js :whitespace', true)).toBe('all')
  })

  it('keeps an invalid position from disabling the global option', () => {
    expect(resolveWhitespacePosition('js :whitespace=evil', 'boundary')).toBe(
      'boundary',
    )
  })

  it('returns false when the mark disables whitespace', () => {
    expect(resolveWhitespacePosition('js :no-whitespace', 'boundary')).toBe(
      false,
    )
    expect(
      resolveWhitespacePosition(
        'js :no-whitespace :whitespace=all',
        'boundary',
      ),
    ).toBe(false)
  })

  it('uses the global option when no mark is present', () => {
    expect(resolveWhitespacePosition('js', 'boundary')).toBe('boundary')
  })

  it('returns false when there is no mark and the global option is not a position', () => {
    expect(resolveWhitespacePosition('js', true)).toBe(false)
  })
})
