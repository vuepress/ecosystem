import { describe, expect, it } from 'vitest'

import { parseIconIndex } from '../src/node/fileIcons/parseIndex.js'

describe(parseIconIndex, () => {
  it('should add the prefix back to every icon name', () => {
    const index = parseIconIndex(
      'vscode-icons:file-type-',
      'access accda accdb\ntypescript ts mts',
    )

    expect([...index.entries()]).toStrictEqual([
      ['accda', 'vscode-icons:file-type-access'],
      ['accdb', 'vscode-icons:file-type-access'],
      ['ts', 'vscode-icons:file-type-typescript'],
      ['mts', 'vscode-icons:file-type-typescript'],
    ])
  })

  it('should keep a key that only contains one character', () => {
    const index = parseIconIndex('prefix:', 'icon a\nother 1 2')

    expect(index.get('a')).toBe('prefix:icon')
    expect(index.get('1')).toBe('prefix:other')
    expect(index.get('2')).toBe('prefix:other')
  })

  it('should handle an empty prefix', () => {
    const index = parseIconIndex('', 'vscode-icons:default-file readme')

    expect(index.get('readme')).toBe('vscode-icons:default-file')
  })

  it('should keep a key that contains a dot or a dash', () => {
    const index = parseIconIndex(
      'vscode-icons:file-type-',
      'node package.json yarn.lock\ndocker docker-compose.yml .dockerignore',
    )

    expect(index.get('package.json')).toBe('vscode-icons:file-type-node')
    expect(index.get('yarn.lock')).toBe('vscode-icons:file-type-node')
    expect(index.get('docker-compose.yml')).toBe(
      'vscode-icons:file-type-docker',
    )
    expect(index.get('.dockerignore')).toBe('vscode-icons:file-type-docker')
  })

  it('should ignore an empty line', () => {
    // A trailing line break must not produce an entry
    const index = parseIconIndex('prefix:', 'icon a\n')

    expect(index.size).toBe(1)
    expect(index.has('')).toBe(false)
  })

  it('should keep the last icon of a key that is listed twice', () => {
    const index = parseIconIndex('prefix:', 'first a\nsecond a')

    expect(index.size).toBe(1)
    expect(index.get('a')).toBe('prefix:second')
  })
})
