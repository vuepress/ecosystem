import { describe, expect, it } from 'vitest'

import { sanitizeFilePath } from '../src/node/utils.js'

describe(sanitizeFilePath, () => {
  it('should keep an ordinary file name untouched', () => {
    for (const name of [
      'index.ts',
      'src/components/HelloWorld.vue',
      // CJK characters must not be encoded
      '中文文件.ts',
      '日本語.md',
      '한국어.md',
      // An inner space is fine, only the leading and trailing ones are trimmed
      '文档 说明.md',
      'sp ace.ts',
      'trailing .ts',
      // An `&` which does not start an entity is kept
      'a&b.ts',
      "it's.ts",
      'a=b,c;d.ts',
      '100%-done.ts',
      '.gitignore',
      '.env.local',
    ])
      expect(sanitizeFilePath(name)).toBe(name)
  })

  it('should encode the characters breaking the rendered title', () => {
    expect(sanitizeFilePath('quo"te.ts')).toBe('quo%22te.ts')
    expect(sanitizeFilePath('tick`tick.ts')).toBe('tick%60tick.ts')
    expect(sanitizeFilePath('lt<gt>.ts')).toBe('lt%3Cgt%3E.ts')
    expect(sanitizeFilePath(String.raw`back\slash.ts`)).toBe('back%5Cslash.ts')
  })

  it('should encode an HTML entity, since it is decoded by the highlighter', () => {
    expect(sanitizeFilePath('a&amp;b.ts')).toBe('a%26amp;b.ts')
    expect(sanitizeFilePath('a&#34;b.ts')).toBe('a%26#34;b.ts')
    // A `&` that can not start an entity is kept
    expect(sanitizeFilePath('a&b.ts')).toBe('a&b.ts')
    expect(sanitizeFilePath('a&;b.ts')).toBe('a&;b.ts')
  })

  it('should encode the leading and trailing whitespace only', () => {
    expect(sanitizeFilePath(' leading.ts')).toBe('%20leading.ts')
    expect(sanitizeFilePath('trailing.ts ')).toBe('trailing.ts%20')
    expect(sanitizeFilePath(' both.ts ')).toBe('%20both.ts%20')
    expect(sanitizeFilePath('in ner.ts')).toBe('in ner.ts')
  })

  it('should produce a value without a quote or a backslash', () => {
    for (const name of [
      'quo"te.ts',
      String.raw`back\slash.ts`,
      'a&amp;b.ts',
      '"v-html="x',
      '</span><script>',
    ]) {
      const encoded = sanitizeFilePath(name)

      expect(encoded).not.toContain('"')
      expect(encoded).not.toContain('\\')
      expect(encoded).not.toContain('<')
      expect(encoded).not.toContain('>')
      expect(encoded).not.toContain('`')
      expect(encoded).not.toMatch(/&[a-z#][a-z0-9]{1,31};/iu)
      expect(encoded).toBe(encoded.trim())
    }
  })
})
