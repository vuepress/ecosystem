import { describe, expect, it } from 'vitest'
import { stripExt } from '../src/node/utils/stripExt.js'

describe('stripExt', () => {
  it('should strip the extension from a file path', () => {
    const filepath = '/path/to/file.txt'
    const expected = '/path/to/file'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with no extension', () => {
    const filepath = '/path/to/file'
    const expected = '/path/to/file'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with multiple dots', () => {
    const filepath = '/path.to/file.txt'
    const expected = '/path.to/file'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with trailing slashes', () => {
    const filepath = '/path/to/file.txt/'
    const expected = '/path/to/file.txt/'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle empty strings', () => {
    const filepath = ''
    const expected = ''
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with only a filename', () => {
    const filepath = 'file.txt'
    const expected = 'file'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with only a directory', () => {
    const filepath = '/path/to/'
    const expected = '/path/to/'
    expect(stripExt(filepath)).toBe(expected)
  })

  it('should handle paths with special characters', () => {
    const filepath = '/path/to/file@#$.txt'
    const expected = '/path/to/file@#$'
    expect(stripExt(filepath)).toBe(expected)
  })
})
